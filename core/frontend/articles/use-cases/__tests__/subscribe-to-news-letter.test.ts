import { createSubscriptionStore } from "../subscribe-to-news-letter";

describe("subscribe a new user to the blog news letter", () => {
  describe("user email handling", () => {
    it("should have an empty email initially", () => {
      const subscriptionStore = createSubscriptionStore();
      expect(subscriptionStore.getState().email).toBe("");
    });

    it("should update the user email", () => {
      const subscriptionStore = createSubscriptionStore();
      subscriptionStore.getState().updateUserEmail("example@hotmail.fr");
      expect(subscriptionStore.getState().email).toBe("example@hotmail.fr");
    });
  });
});
