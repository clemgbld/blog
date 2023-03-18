import { createSubscriptionStore } from "../subscribe-to-news-letter";

type InMemorySubscriptionGatewayProps = {
  spy?: (email: string) => Promise<void>;
};

type inMemoryNotificationServiceProps = {
  successSpy?: (message: string) => void;
  errorSpy?: (message: string) => void;
};

const buildInMemorySubscriptionGateway = ({
  spy,
}: InMemorySubscriptionGatewayProps) => ({
  subscribe: spy ? spy : async (email: string) => Promise.resolve(),
});

const buildInMemoryNotificationService = ({
  successSpy,
  errorSpy,
}: inMemoryNotificationServiceProps) => ({
  success: successSpy ? successSpy : (message: string) => {},
  error: errorSpy ? errorSpy : (message: string) => {},
});

describe("subscribe a new user to the blog news letter", () => {
  describe("user email handling", () => {
    it("should have an empty email initially", () => {
      const subscriptionGateway = buildInMemorySubscriptionGateway({});
      const notificationService = buildInMemoryNotificationService({});
      const subscriptionStore = createSubscriptionStore({
        subscriptionGateway,
        notificationService,
      });
      expect(subscriptionStore.getState().email).toBe("");
    });

    it("should update the user email", () => {
      const subscriptionGateway = buildInMemorySubscriptionGateway({});
      const notificationService = buildInMemoryNotificationService({});
      const subscriptionStore = createSubscriptionStore({
        subscriptionGateway,
        notificationService,
      });
      subscriptionStore.getState().updateUserEmail("example@hotmail.fr");
      expect(subscriptionStore.getState().email).toBe("example@hotmail.fr");
    });
  });

  describe("subscription handling", () => {
    it("should sucessfully subscriber the user to the blog news letter", async () => {
      const subscribeSpy = jest.fn().mockResolvedValue(undefined);
      const successNotificationSpy = jest.fn();

      const notificationService = buildInMemoryNotificationService({
        successSpy: successNotificationSpy,
      });

      const subscriptionGateway = buildInMemorySubscriptionGateway({
        spy: subscribeSpy,
      });
      const subscriptionStore = createSubscriptionStore({
        subscriptionGateway,
        notificationService,
      });

      subscriptionStore.getState().updateUserEmail("example@hotmail.fr");
      await subscriptionStore.getState().subscribeBlogReader();
      expect(subscribeSpy).toHaveBeenCalledWith("example@hotmail.fr");
      expect(successNotificationSpy).toHaveBeenCalledWith(
        "Successfully subscribed to the news letter"
      );
      expect(subscriptionStore.getState().email).toBe("");
      expect(subscriptionStore.getState().isLoading).toBe(false);
    });
  });
});
