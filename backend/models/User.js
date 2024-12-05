const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = 'fitness_users';

class User {
  static async create(userData) {
    const params = {
      TableName: TABLE_NAME,
      Item: {
        userId: userData.email, // Using email as the primary key
        name: userData.name,
        email: userData.email,
        height: userData.height,
        weight: userData.weight,
        age: userData.age,
        trainingFrequency: userData.trainingFrequency,
        activityLevel: userData.activityLevel,
        goal: userData.goal,
        streak: 0,
        weightHistory: [{
          weight: userData.weight,
          date: new Date().toISOString()
        }],
        waterIntake: [],
        calorieIntake: [],
        workouts: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    };

    try {
      await dynamoDB.put(params).promise();
      return params.Item;
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  static async get(userId) {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        userId
      }
    };

    try {
      const result = await dynamoDB.get(params).promise();
      return result.Item;
    } catch (error) {
      throw new Error(`Error getting user: ${error.message}`);
    }
  }

  static async update(userId, updateData) {
    const updateExpressions = [];
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};

    Object.entries(updateData).forEach(([key, value]) => {
      if (key !== 'userId') {
        updateExpressions.push(`#${key} = :${key}`);
        expressionAttributeNames[`#${key}`] = key;
        expressionAttributeValues[`:${key}`] = value;
      }
    });

    expressionAttributeValues[':updatedAt'] = new Date().toISOString();
    updateExpressions.push('#updatedAt = :updatedAt');
    expressionAttributeNames['#updatedAt'] = 'updatedAt';

    const params = {
      TableName: TABLE_NAME,
      Key: { userId },
      UpdateExpression: `SET ${updateExpressions.join(', ')}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW'
    };

    try {
      const result = await dynamoDB.update(params).promise();
      return result.Attributes;
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  static async addWeightRecord(userId, weight) {
    const weightRecord = {
      weight,
      date: new Date().toISOString()
    };

    const params = {
      TableName: TABLE_NAME,
      Key: { userId },
      UpdateExpression: 'SET weightHistory = list_append(if_not_exists(weightHistory, :empty_list), :weight)',
      ExpressionAttributeValues: {
        ':weight': [weightRecord],
        ':empty_list': []
      },
      ReturnValues: 'ALL_NEW'
    };

    try {
      const result = await dynamoDB.update(params).promise();
      return result.Attributes.weightHistory;
    } catch (error) {
      throw new Error(`Error adding weight record: ${error.message}`);
    }
  }

  static async updateStreak(userId, increment = true) {
    const params = {
      TableName: TABLE_NAME,
      Key: { userId },
      UpdateExpression: increment 
        ? 'SET streak = if_not_exists(streak, :zero) + :one'
        : 'SET streak = :zero',
      ExpressionAttributeValues: {
        ':zero': 0,
        ':one': 1
      },
      ReturnValues: 'ALL_NEW'
    };

    try {
      const result = await dynamoDB.update(params).promise();
      return result.Attributes.streak;
    } catch (error) {
      throw new Error(`Error updating streak: ${error.message}`);
    }
  }

  static async getStats(userId) {
    try {
      const user = await this.get(userId);
      if (!user) throw new Error('User not found');

      return {
        streak: user.streak || 0,
        weightProgress: user.weightHistory || [],
        waterIntake: user.waterIntake || [],
        calorieIntake: user.calorieIntake || [],
        lastWorkout: user.workouts?.[user.workouts.length - 1],
        goal: user.goal
      };
    } catch (error) {
      throw new Error(`Error getting user stats: ${error.message}`);
    }
  }
}

module.exports = User;
