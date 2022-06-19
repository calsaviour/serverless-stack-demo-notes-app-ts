import util from "util";
import AWS from "aws-sdk";
let logs: Array<any>;
// Log AWS SDK calls
AWS.config.logger = { log: debug };
export default function debug(eventName: string, options: {
  body: any,
  pathParameters: any,
  queryStringParameters: any
}) {
  logs.push({
    date: new Date(),
    string: util.format.apply(null, [eventName, options]),
  });
}
export function init(event: any) {
  logs = [];
  // Log API event
  debug("API event", {
    body: event.body,
    pathParameters: event.pathParameters,
    queryStringParameters: event.queryStringParameters,
  });
}
export function flush(e: any) {
  logs.forEach(({ date, string }) => console.debug(date, string));
  console.error(e);
}
