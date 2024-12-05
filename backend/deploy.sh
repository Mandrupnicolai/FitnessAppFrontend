#!/bin/bash

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "AWS CLI is not installed. Please install it first."
    exit 1
fi

# Check if environment parameter is provided
if [ -z "$1" ]; then
    echo "Please provide environment (dev or prod)"
    echo "Usage: ./deploy.sh dev|prod"
    exit 1
fi

ENV=$1
STACK_NAME="fitness-app-$ENV"
REGION="eu-north-1"
TEMPLATE_FILE="cloudformation/template.json"
APPLICATION_TAG="arn:aws:resource-groups:eu-north-1:013579844657:group/FitnessApplication/0dfsy26tw15qj59ipsmhtllieh"

echo "Deploying to $ENV environment in $REGION..."

# Create/Update CloudFormation stack
aws cloudformation deploy \
    --template-file $TEMPLATE_FILE \
    --stack-name $STACK_NAME \
    --parameter-overrides Environment=$ENV \
    --capabilities CAPABILITY_IAM \
    --region $REGION \
    --tags awsApplication=$APPLICATION_TAG

if [ $? -eq 0 ]; then
    echo "Stack deployment successful!"
    
    # Get stack outputs
    USER_POOL_ID=$(aws cloudformation describe-stacks \
        --stack-name $STACK_NAME \
        --query 'Stacks[0].Outputs[?OutputKey==`UserPoolId`].OutputValue' \
        --output text \
        --region $REGION)
    
    USER_POOL_CLIENT_ID=$(aws cloudformation describe-stacks \
        --stack-name $STACK_NAME \
        --query 'Stacks[0].Outputs[?OutputKey==`UserPoolClientId`].OutputValue' \
        --output text \
        --region $REGION)
    
    # Store values in SSM Parameter Store
    aws ssm put-parameter \
        --name "/fitness-app/user-pool-id" \
        --value "$USER_POOL_ID" \
        --type String \
        --overwrite \
        --region $REGION

    aws ssm put-parameter \
        --name "/fitness-app/user-pool-client-id" \
        --value "$USER_POOL_CLIENT_ID" \
        --type String \
        --overwrite \
        --region $REGION

    echo "Configuration values stored in SSM Parameter Store"
    echo "UserPoolId: $USER_POOL_ID"
    echo "UserPoolClientId: $USER_POOL_CLIENT_ID"
    
    # Deploy serverless application
    echo "Deploying serverless application..."
    serverless deploy --stage $ENV --region $REGION
else
    echo "Stack deployment failed!"
    exit 1
fi
