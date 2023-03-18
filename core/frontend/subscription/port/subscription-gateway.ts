export type SubscriptionGateway = {
  subscribe: (email: string) => Promise<void>;
};
