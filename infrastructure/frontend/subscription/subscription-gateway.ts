import { SubscriptionGateway } from "../../../core/frontend/subscription/port/subscription-gateway";
import { SUBSCRIPTION_GATEWAY_ENDPOINT } from "./subscription-gateway-constants";
import { API_ENDPOINT } from "../rest-service/rest-service-constants";
import { REST_METHODS } from "../rest-service/rest-service-constants";

export const buildSubscriptionGateway = (): SubscriptionGateway => ({
  subscribe: async (email: string) => {
    await fetch(`${API_ENDPOINT}${SUBSCRIPTION_GATEWAY_ENDPOINT}`, {
      method: REST_METHODS.POST,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email }),
    });
  },
});
