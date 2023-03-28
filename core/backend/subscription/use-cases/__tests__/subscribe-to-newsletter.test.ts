import { buildInMemorySubscriptionRepository } from "../../../../../infrastructure/backend/subscription/in-memory-subscription-repository";
import { subscribeToNewsletter } from "../subscribe-to-newsletter";

describe("subscribe to the newsletter", () => {
  it("should sucessfully subscribe the blog reader to the newsletter", async () => {
    const storageSource: Map<string, string> = new Map();
    const subscriptionRepository = buildInMemorySubscriptionRepository({
      storageSource,
    });
    await subscribeToNewsletter({
      subscriptionRepository,
      id: "1",
      email: "exemple@hotmail.fr",
    });

    expect(storageSource.get("1")).toBe("exemple@hotmail.fr");
  });
});
