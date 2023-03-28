import { buildInMemorySubscriptionRepository } from "../../../../../infrastructure/backend/subscription/in-memory-subscription-repository";
import { ERROR_MESSAGES } from "../../../../common/subscription/subscription-constants";
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

  it("should validate that there is an email", async () => {
    const storageSource: Map<string, string> = new Map();
    const subscriptionRepository = buildInMemorySubscriptionRepository({
      storageSource,
    });
    await expect(
      subscribeToNewsletter({
        subscriptionRepository,
        id: "1",
        email: "",
      })
    ).rejects.toEqual(new Error(ERROR_MESSAGES.EMPTY));
    expect(storageSource.get("1")).toBeUndefined();
  });

  it("should validate that the email is valid", async () => {
    const storageSource: Map<string, string> = new Map();
    const subscriptionRepository = buildInMemorySubscriptionRepository({
      storageSource,
    });
    await expect(
      subscribeToNewsletter({
        subscriptionRepository,
        id: "1",
        email: "exemple@hotmail",
      })
    ).rejects.toEqual(new Error(ERROR_MESSAGES.NOT_VALID));
    expect(storageSource.get("1")).toBeUndefined();
  });

  it("should validate that the email is not too long", async () => {
    const storageSource: Map<string, string> = new Map();
    const subscriptionRepository = buildInMemorySubscriptionRepository({
      storageSource,
    });
    await expect(
      subscribeToNewsletter({
        subscriptionRepository,
        id: "1",
        email: `example${"e".repeat(303)}@hotmail.fr`,
      })
    ).rejects.toEqual(new Error(ERROR_MESSAGES.TOO_LONG));
    expect(storageSource.get("1")).toBeUndefined();
  });
});
