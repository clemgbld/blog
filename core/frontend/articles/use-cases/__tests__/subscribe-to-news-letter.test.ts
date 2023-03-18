import { createSubscriptionStore } from "../subscribe-to-news-letter";

type InMemorySubscriptionGatewayProps = {
  spy?: (email: string) => Promise<void>;
};

const buildInMemorySubscriptionGateway = ({
  spy,
}: InMemorySubscriptionGatewayProps) => ({
  subscribe: spy ? spy : async (email: string) => Promise.resolve(),
});

describe("subscribe a new user to the blog news letter", () => {
  describe("user email handling", () => {
    it("should have an empty email initially", () => {
      const subscriptionGateway = buildInMemorySubscriptionGateway({});
      const subscriptionStore = createSubscriptionStore({
        subscriptionGateway,
      });
      expect(subscriptionStore.getState().email).toBe("");
    });

    it("should update the user email", () => {
      const subscriptionGateway = buildInMemorySubscriptionGateway({});
      const subscriptionStore = createSubscriptionStore({
        subscriptionGateway,
      });
      subscriptionStore.getState().updateUserEmail("example@hotmail.fr");
      expect(subscriptionStore.getState().email).toBe("example@hotmail.fr");
    });
  });

  describe("subscription handling", () => {
    it("should sucessfully subscriber the user to the blog news letter", async () => {
      const subscribeSpy = jest.fn().mockResolvedValue(undefined);
      const subscriptionGateway = buildInMemorySubscriptionGateway({
        spy: subscribeSpy,
      });
      const subscriptionStore = createSubscriptionStore({
        subscriptionGateway,
      });
    });
  });
});
