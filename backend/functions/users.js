const User = require('../models/User');
const { verifyToken } = require('./auth');

exports.getUserProfile = async (event) => {
  try {
    await verifyToken(event);
    const userId = event.requestContext.authorizer.claims.sub;

    const user = await User.get(userId);
    if (!user) {
      return {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
          error: 'User not found'
        })
      };
    }

    // Remove sensitive information
    delete user.password;

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(user)
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

exports.updateUserProfile = async (event) => {
  try {
    await verifyToken(event);
    const userId = event.requestContext.authorizer.claims.sub;
    const updates = JSON.parse(event.body);

    const updatedUser = await User.update(userId, updates);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(updatedUser)
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

exports.getUserStats = async (event) => {
  try {
    await verifyToken(event);
    const userId = event.requestContext.authorizer.claims.sub;

    const stats = await User.getStats(userId);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(stats)
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

exports.logWeight = async (event) => {
  try {
    await verifyToken(event);
    const userId = event.requestContext.authorizer.claims.sub;
    const { weight } = JSON.parse(event.body);

    const weightHistory = await User.addWeightRecord(userId, weight);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(weightHistory)
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

exports.updateStreak = async (event) => {
  try {
    await verifyToken(event);
    const userId = event.requestContext.authorizer.claims.sub;
    const { increment } = JSON.parse(event.body);

    const newStreak = await User.updateStreak(userId, increment);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ streak: newStreak })
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
