import create from "zustand/vanilla";

type SubscriptionGateway = {
  subscribe: (email: string) => Promise<void>;
};

type NotificationService = {
  success: (message: string) => void;
  error: (message: string) => void;
};

type Subscription = {
  email: string;
  isLoading: false;
  updateUserEmail: (email: string) => void;
  subscribeBlogReader: () => Promise<void>;
};

type SubscriptionStoreDependency = {
  subscriptionGateway: SubscriptionGateway;
  notificationService: NotificationService;
};

export const createSubscriptionStore = ({
  subscriptionGateway,
  notificationService,
}: SubscriptionStoreDependency) =>
  create<Subscription>((set, getState) => ({
    email: "",
    isLoading: false,
    updateUserEmail: (email: string) => set({ email }),
    subscribeBlogReader: async () => {
      await subscriptionGateway.subscribe(getState().email);
      notificationService.success("Successfully subscribed to the news letter");
      getState().updateUserEmail("");
    },
  }));
