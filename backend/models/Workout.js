const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = 'fitness_workouts';

class Workout {
  static async create(workoutData) {
    const workoutId = uuidv4();
    const timestamp = new Date().toISOString();

    const params = {
      TableName: TABLE_NAME,
      Item: {
        workoutId,
        userId: workoutData.userId,
        name: workoutData.name,
        exercises: workoutData.exercises || [],
        completed: false,
        scheduledFor: workoutData.scheduledFor,
        type: workoutData.type || 'custom',
        createdAt: timestamp,
        updatedAt: timestamp,
        progress: []
      }
    };

    try {
      await dynamoDB.put(params).promise();
      return params.Item;
    } catch (error) {
      throw new Error(`Error creating workout: ${error.message}`);
    }
  }

  static async get(workoutId, userId) {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        workoutId,
        userId
      }
    };

    try {
      const result = await dynamoDB.get(params).promise();
      return result.Item;
    } catch (error) {
      throw new Error(`Error getting workout: ${error.message}`);
    }
  }

  static async getUserWorkouts(userId) {
    const params = {
      TableName: TABLE_NAME,
      IndexName: 'UserWorkouts',
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    };

    try {
      const result = await dynamoDB.query(params).promise();
      return result.Items;
    } catch (error) {
      throw new Error(`Error getting user workouts: ${error.message}`);
    }
  }

  static async getUpcoming(userId) {
    const now = new Date().toISOString();
    
    const params = {
      TableName: TABLE_NAME,
      IndexName: 'UserWorkouts',
      KeyConditionExpression: 'userId = :userId',
      FilterExpression: 'scheduledFor > :now AND completed = :completed',
      ExpressionAttributeValues: {
        ':userId': userId,
        ':now': now,
        ':completed': false
      }
    };

    try {
      const result = await dynamoDB.query(params).promise();
      return result.Items.sort((a, b) => a.scheduledFor.localeCompare(b.scheduledFor));
    } catch (error) {
      throw new Error(`Error getting upcoming workouts: ${error.message}`);
    }
  }

  static async completeWorkout(workoutId, userId, exerciseData) {
    const timestamp = new Date().toISOString();

    const params = {
      TableName: TABLE_NAME,
      Key: {
        workoutId,
        userId
      },
      UpdateExpression: 'SET completed = :completed, completedAt = :completedAt, progress = list_append(if_not_exists(progress, :empty_list), :progress), updatedAt = :updatedAt',
      ExpressionAttributeValues: {
        ':completed': true,
        ':completedAt': timestamp,
        ':progress': [{ date: timestamp, exercises: exerciseData }],
        ':empty_list': [],
        ':updatedAt': timestamp
      },
      ReturnValues: 'ALL_NEW'
    };

    try {
      const result = await dynamoDB.update(params).promise();
      return result.Attributes;
    } catch (error) {
      throw new Error(`Error completing workout: ${error.message}`);
    }
  }

  static async getHistory(userId, limit = 10) {
    const params = {
      TableName: TABLE_NAME,
      IndexName: 'UserWorkouts',
      KeyConditionExpression: 'userId = :userId',
      FilterExpression: 'completed = :completed',
      ExpressionAttributeValues: {
        ':userId': userId,
        ':completed': true
      },
      Limit: limit
    };

    try {
      const result = await dynamoDB.query(params).promise();
      return result.Items.sort((a, b) => b.completedAt.localeCompare(a.completedAt));
    } catch (error) {
      throw new Error(`Error getting workout history: ${error.message}`);
    }
  }

  static async update(workoutId, userId, updateData) {
    const updateExpressions = [];
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};

    Object.entries(updateData).forEach(([key, value]) => {
      if (!['workoutId', 'userId'].includes(key)) {
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
      Key: {
        workoutId,
        userId
      },
      UpdateExpression: `SET ${updateExpressions.join(', ')}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW'
    };

    try {
      const result = await dynamoDB.update(params).promise();
      return result.Attributes;
    } catch (error) {
      throw new Error(`Error updating workout: ${error.message}`);
    }
  }
}

module.exports = Workout;
