import { createSubscriptionStore } from "../subscribe-to-news-letter";
import { buildInMemorySubscriptionGateway } from "../../../../../infrastructure/frontend/subscription/in-memory-subscription-gateway";
import { buildInMemoryNotificationService } from "../../../../../infrastructure/frontend/notification/in-memory-notification-service";

let subscribeSpy: (email: string) => Promise<void>,
  successNotificationSpy: (message: string) => void,
  errorNotificationSpy: (message: string) => void;

beforeEach(() => {
  subscribeSpy = jest.fn().mockResolvedValue(undefined);
  successNotificationSpy = jest.fn();
  errorNotificationSpy: jest.fn();
});

const setupSubscriptionStore = ({
  subscribeSpy,
  successNotificationSpy,
  errorNotificationSpy,
}: {
  subscribeSpy?: (email: string) => Promise<void>;
  successNotificationSpy?: (message: string) => void;
  errorNotificationSpy?: (message: string) => void;
}) => {
  const subscriptionGateway = buildInMemorySubscriptionGateway({
    spy: subscribeSpy,
  });
  const notificationService = buildInMemoryNotificationService({
    successSpy: successNotificationSpy,
    errorSpy: errorNotificationSpy,
  });
  const { getState } = createSubscriptionStore({
    subscriptionGateway,
    notificationService,
  });

  return {
    getCurrentEmailState: () => getState().email,
    getCurrentLoadingState: () => getState().isLoading,
    updateUserEmail: getState().updateUserEmail,
    subscribeBlogReader: getState().subscribeBlogReader,
  };
};

describe("subscribe a new user to the blog news letter", () => {
  describe("user email handling", () => {
    it("should have an empty email initially", () => {
      const { getCurrentEmailState } = setupSubscriptionStore({});
      expect(getCurrentEmailState()).toBe("");
    });

    it("should update the user email", () => {
      const { getCurrentEmailState, updateUserEmail } = setupSubscriptionStore(
        {}
      );
      updateUserEmail("example@hotmail.fr");
      expect(getCurrentEmailState()).toBe("example@hotmail.fr");
    });
  });

  describe("subscription handling", () => {
    it("should sucessfully subscriber the user to the blog news letter", async () => {
      const {
        getCurrentEmailState,
        updateUserEmail,
        getCurrentLoadingState,
        subscribeBlogReader,
      } = setupSubscriptionStore({
        successNotificationSpy,
        subscribeSpy,
      });

      updateUserEmail("example@hotmail.fr");
      await subscribeBlogReader();
      expect(subscribeSpy).toHaveBeenCalledWith("example@hotmail.fr");
      expect(successNotificationSpy).toHaveBeenCalledWith(
        "Successfully subscribed to the news letter"
      );
      expect(getCurrentEmailState()).toBe("");
      expect(getCurrentLoadingState()).toBe(false);
    });
  });
});
