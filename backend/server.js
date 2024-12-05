const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fitness_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Models
const User = require('./models/User');
const Workout = require('./models/Workout');

// Authentication Middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

// Routes

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, height, weight, age, trainingFrequency, activityLevel, goal } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      height,
      weight,
      age,
      trainingFrequency,
      activityLevel,
      goal,
      weightHistory: [{ weight }],
    });

    await user.save();

    // Generate token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || 'your-secret-key');

    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send({ error: 'Invalid login credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ error: 'Invalid login credentials' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || 'your-secret-key');
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// User Routes
app.get('/api/users/:id/stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('workouts')
      .select('-password');

    if (!user) {
      return res.status(404).send();
    }

    // Calculate stats
    const stats = {
      streak: user.streak,
      weightProgress: user.weightHistory,
      upcomingWorkouts: await Workout.findUpcoming(user._id),
      recentWorkouts: await Workout.getHistory(user._id),
    };

    res.send(stats);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Workout Routes
app.post('/api/workouts', auth, async (req, res) => {
  try {
    const workout = new Workout({
      ...req.body,
      user: req.user._id,
    });
    await workout.save();
    res.status(201).send(workout);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/api/workouts/:userId', auth, async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.params.userId });
    res.send(workouts);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Progress Routes
app.post('/api/progress/:userId/weight', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.weightHistory.push({
      weight: req.body.weight,
      date: new Date(),
    });
    await user.save();
    res.send(user.weightHistory);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
