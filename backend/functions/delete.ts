import { APIGatewayProxyEvent } from "aws-lambda";

import handler from "../util/handler";
import dynamoDb from "../util/dynamoDb";

export const main = handler(async (event: APIGatewayProxyEvent) => {
  const params = {
    TableName: process.env.TABLE_NAME || "temp",
    // "Key" defines the partition key and sort key of the item to be removed
    Key: {
      userId: event.requestContext.authorizer ? event.requestContext.authorizer.iam.cognitoIdentity.identityId : "", // The id of the author
      noteId: event.pathParameters ? event.pathParameters.id : "", // The id of the note from the path
    },
  };

  await dynamoDb.delete(params);

  return { status: true };
});
