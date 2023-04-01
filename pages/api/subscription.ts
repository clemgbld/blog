import clientPromise from "../../infrastructure/backend/db/mongodb";
import { generateId } from "../../infrastructure/backend/id-generator/generate-id";
import { buildMongoDbSubscriptionRepository } from "../../infrastructure/backend/subscription/mongodb-subscription-repository";
import { subscribeToNewsletter } from "../../core/backend/subscription/use-cases/subscribe-to-newsletter";
import { object, string } from "zod";
import { mapErrorToHttpStatus } from "../../utils/map-error-to-http-status";
import { NextApiRequest, NextApiResponse } from "next";

const emailSchema = object({
  email: string(),
});

export default async function hanlder(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const checkedBody = emailSchema.safeParse(req.body);
  const email = checkedBody.success ? req.body.email : "";
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const subscriptionRepository = buildMongoDbSubscriptionRepository(db);
    await subscribeToNewsletter({
      subscriptionRepository,
      email,
      id: generateId(),
    });
    return res.status(201).json({});
  } catch (err) {
    if (err instanceof Error) {
      return res
        .status(mapErrorToHttpStatus(err.message))
        .json({ message: err.message });
    }
  }
}
