import clientPromise from "../../../infrastructure/backend/db/mongodb";
import { NextRequest } from "next/server";
import { generateId } from "../../../infrastructure/backend/id-generator/generate-id";
import { buildMongoDbSubscriptionRepository } from "../../../infrastructure/backend/subscription/mongodb-subscription-repository";
import { subscribeToNewsletter } from "../../../core/backend/subscription/use-cases/subscribe-to-newsletter";
import { object, string } from "zod";

const emailSchema = object({
  email: string(),
});

export async function POST(req: NextRequest) {
  const request = await req.json();
  const checkedBody = emailSchema.safeParse(req.body);
  const email = checkedBody.success ? request.body.email : "";
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const subscriptionRepository = buildMongoDbSubscriptionRepository(db);
    await subscribeToNewsletter({
      subscriptionRepository,
      email,
      id: generateId(),
    });
    return new Response(null, { status: 201 });
  } catch (err) {
    if (err instanceof Error) {
      return new Response(null, { status: 400, statusText: err.message });
    }
  }
}
