import * as debug from "./debug";

import { APIGatewayProxyEvent, Context, Handler, APIGatewayProxyCallback } from "aws-lambda";

export default function handler(lambda: Handler) {
  return async function (event: APIGatewayProxyEvent, context: Context, callback: APIGatewayProxyCallback) {
    let body, statusCode;
    // Start debugger
    debug.init(event);

    try {
      // Run the Lambda
      body = await lambda(event, context, callback);
      statusCode = 200;
    } catch (e) {
      // Print debug messages
      debug.flush(e);
      body = { error: (e as Error).message };
      statusCode = 500;
    }
    // Return HTTP response
    return {
      statusCode,
      body: JSON.stringify(body),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  };
}
