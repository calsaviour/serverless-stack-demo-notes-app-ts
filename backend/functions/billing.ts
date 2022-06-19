import { APIGatewayProxyEvent } from "aws-lambda";

import Stripe from "stripe";
import handler from "../util/handler";
import { calculateCost } from "../util/cost";

export const main = handler(async (event: APIGatewayProxyEvent) => {
  // Request body is passed in as a JSON encoded string in "event.body"
  const { storage, source } = JSON.parse(event.body || "{}");
  const amount = calculateCost(storage);
  const description = "Scratch charge";

  // Load our secret key from the environment variables
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2020-08-27",
  });

  await stripe.charges.create({
    source,
    amount,
    description,
    currency: "usd",
  });
  return { status: true };
});
