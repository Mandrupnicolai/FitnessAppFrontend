const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();
const User = require('../models/User');

const USER_POOL_ID = process.env.COGNITO_USER_POOL_ID;
const CLIENT_ID = process.env.COGNITO_CLIENT_ID;

exports.register = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { email, password, name, height, weight, age, trainingFrequency, activityLevel, goal } = body;

    // Register user in Cognito
    const params = {
      ClientId: CLIENT_ID,
      Username: email,
      Password: password,
      UserAttributes: [
        {
          Name: 'email',
          Value: email
        },
        {
          Name: 'name',
          Value: name
        }
      ]
    };

    await cognito.signUp(params).promise();

    // Create user in DynamoDB
    const user = await User.create({
      email,
      name,
      height,
      weight,
      age,
      trainingFrequency,
      activityLevel,
      goal
    });

    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        message: 'User registered successfully',
        user
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
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

exports.login = async (event) => {
  try {
    const { email, password } = JSON.parse(event.body);

    const params = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: CLIENT_ID,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password
      }
    };

    const authResult = await cognito.initiateAuth(params).promise();
    const user = await User.get(email);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        token: authResult.AuthenticationResult.IdToken,
        user
      })
    };
  } catch (error) {
    return {
      statusCode: 401,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        error: 'Invalid credentials'
      })
    };
  }
};

exports.verifyToken = async (event) => {
  try {
    const token = event.headers.Authorization;
    
    const params = {
      AccessToken: token
    };

    await cognito.getUser(params).promise();
    return true;
  } catch (error) {
    throw new Error('Invalid token');
  }
};
