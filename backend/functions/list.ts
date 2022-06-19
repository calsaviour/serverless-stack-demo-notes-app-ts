import { APIGatewayProxyEvent } from "aws-lambda";

import handler from "../util/handler";
import dynamoDb from "../util/dynamoDb";

export const main = handler(async (event: APIGatewayProxyEvent) => {
  const params = {
    TableName: process.env.TABLE_NAME || "temp",
    // "KeyConditionExpression" defines the condition for the query
    // - "userId = :userId": only return items with matching "userId"
    // partition key
    KeyConditionExpression: "userId = :userId",
    // "ExpressionAttributeValues" defines the value in the condition
    // - ":userId": defines "userId" to be the id of the author
    ExpressionAttributeValues: {
      ":userId": event.requestContext.authorizer ? event.requestContext.authorizer.iam.cognitoIdentity.identityId : "", // The id of the author
    },
  }

  const result = await dynamoDb.query(params);
  // Return the matching list of items in response body
  return result.Items;
});
