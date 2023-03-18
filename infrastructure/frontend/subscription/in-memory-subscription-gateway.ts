import { SubscriptionGateway } from "../../../core/frontend/subscription/port/subscription-gateway";

type InMemorySubscriptionGatewayProps = {
  spy?: (email: string) => Promise<void>;
  isSubscriptionError?: boolean;
};

export const buildInMemorySubscriptionGateway = ({
  spy,
  isSubscriptionError,
}: InMemorySubscriptionGatewayProps): SubscriptionGateway => ({
  subscribe: spy
    ? spy
    : async (email: string) => {
        if (isSubscriptionError) {
          throw new Error("Something went wrong");
        }
        return Promise.resolve();
      },
});
