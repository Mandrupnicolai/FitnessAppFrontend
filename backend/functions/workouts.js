const Workout = require('../models/Workout');
const { verifyToken } = require('./auth');

exports.createWorkout = async (event) => {
  try {
    await verifyToken(event);
    const body = JSON.parse(event.body);
    const userId = event.requestContext.authorizer.claims.sub;

    const workout = await Workout.create({
      userId,
      ...body
    });

    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(workout)
    };
  } catch (error) {
    return {
      statusCode: error.message === 'Invalid token' ? 401 : 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        error: error.message
      })
    };
  }
};

exports.getUserWorkouts = async (event) => {
  try {
    await verifyToken(event);
    const userId = event.requestContext.authorizer.claims.sub;

    const workouts = await Workout.getUserWorkouts(userId);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(workouts)
    };
  } catch (error) {
    return {
      statusCode: error.message === 'Invalid token' ? 401 : 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        error: error.message
      })
    };
  }
};

exports.getUpcomingWorkouts = async (event) => {
  try {
    await verifyToken(event);
    const userId = event.requestContext.authorizer.claims.sub;

    const workouts = await Workout.getUpcoming(userId);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(workouts)
    };
  } catch (error) {
    return {
      statusCode: error.message === 'Invalid token' ? 401 : 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        error: error.message
      })
    };
  }
};

exports.completeWorkout = async (event) => {
  try {
    await verifyToken(event);
    const userId = event.requestContext.authorizer.claims.sub;
    const workoutId = event.pathParameters.workoutId;
    const body = JSON.parse(event.body);

    const workout = await Workout.completeWorkout(workoutId, userId, body.exercises);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(workout)
    };
  } catch (error) {
    return {
      statusCode: error.message === 'Invalid token' ? 401 : 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        error: error.message
      })
    };
  }
};

exports.getWorkoutHistory = async (event) => {
  try {
    await verifyToken(event);
    const userId = event.requestContext.authorizer.claims.sub;
    const limit = event.queryStringParameters?.limit || 10;

    const history = await Workout.getHistory(userId, parseInt(limit));

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(history)
    };
  } catch (error) {
    return {
      statusCode: error.message === 'Invalid token' ? 401 : 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        error: error.message
      })
    };
  }
};
