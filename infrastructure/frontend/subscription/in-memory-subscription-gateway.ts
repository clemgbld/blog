import { SubscriptionGateway } from "../../../core/frontend/subscription/port/subscription-gateway";

type InMemorySubscriptionGatewayProps = {
  spy?: (email: string) => Promise<void>;
};

export const buildInMemorySubscriptionGateway = ({
  spy,
}: InMemorySubscriptionGatewayProps): SubscriptionGateway => ({
  subscribe: spy ? spy : async (email: string) => Promise.resolve(),
});
