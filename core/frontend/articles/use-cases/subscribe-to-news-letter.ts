import create from "zustand/vanilla";

type SubscriptionGateway = {
  subscribe: (email: string) => Promise<void>;
};

type Subscription = {
  email: string;
  updateUserEmail: (email: string) => void;
};

type SubscriptionStoreDependency = {
  subscriptionGateway: SubscriptionGateway;
};

export const createSubscriptionStore = (
  dependency: SubscriptionStoreDependency
) =>
  create<Subscription>((set) => ({
    email: "",
    updateUserEmail: (email: string) => set({ email }),
  }));
