import { SubscriptionGateway } from "../../../core/frontend/subscription/port/subscription-gateway";

export const buildSubscriptionGateway = (): SubscriptionGateway => ({
  subscribe: async (email: string) => {
    await fetch("/api/subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email }),
    });
  },
});
