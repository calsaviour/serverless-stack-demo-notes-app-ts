import { APIGatewayProxyEvent } from "aws-lambda";

import handler from "../util/handler";
import dynamoDb from "../util/dynamoDb";

export const main = handler(async (event: APIGatewayProxyEvent) => {
  // Request body is passed in as a JSON encoded string in "event.body"
  const data = JSON.parse(event.body || "{}");

  const params = {
    TableName: process.env.TABLE_NAME || "temp",
    // "Key" defines the partition key and sort key of the item to be updated
    Key: {
      userId: event.requestContext.authorizer ? event.requestContext.authorizer.iam.cognitoIdentity.identityId : "", // The id of the author
      noteId: event.pathParameters ? event.pathParameters.id : "", // The id of the note from the path
    },
    // "UpdateExpression" defines the attributes to be updated
    // "ExpressionAttributeValues" defines the value in the update expression
    UpdateExpression: "SET content = :content, attachment = :attachment, updatedAt = :updatedAt",
    ExpressionAttributeValues: {
      ":attachment": data.attachment || null,
      ":content": data.content || null,
      ":updatedAt": Date.now(),
    },
    // "ReturnValues" specifies if and how to return the item"s attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect "result" below to see how it works with different settings
    ReturnValues: "ALL_NEW",
  };

  await dynamoDb.update(params);

  return { status: true };
});
