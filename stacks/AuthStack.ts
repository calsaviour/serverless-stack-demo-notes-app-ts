import * as iam from 'aws-cdk-lib/aws-iam';
import { Auth, use, StackContext } from '@serverless-stack/resources';

import { StorageStack } from './StorageStack';
import { ApiStack } from './ApiStack';

export function AuthStack({ stack, app }: StackContext) {
  const { bucket } = use(StorageStack);
  const { api } = use(ApiStack);

  // Create a Cognito User Pool and Identity Pool
  const auth = new Auth(stack, 'Auth', {
    login: ['email'],
  });

  // Policy granting access to a specific folder in the bucket
  auth.attachPermissionsForAuthUsers([
    // Allow access to the API
    api,
    new iam.PolicyStatement({
      actions: ['s3:*'],
      effect: iam.Effect.ALLOW,
      resources: [
        bucket.bucketArn + '/private/${cognito-identity.amazonaws.com:sub}/*',
      ],
    }),
  ]);

  if (!auth.cognitoIdentityPoolId) {
    throw new Error('auth.cognitoIdentityPoolId not defined')
  }

  // Show the auth resources in the output
  stack.addOutputs({
    Region: app.region,
    UserPoolId: auth.userPoolId,
    IdentityPoolId: auth.cognitoIdentityPoolId,
    UserPoolClientId: auth.userPoolClientId,
  });

  // Return the auth resource
  return {
    auth,
  };
}
