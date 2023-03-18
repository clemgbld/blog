import create from "zustand/vanilla";
import { SubscriptionGateway } from "../port/subscription-gateway";
import { NotificationService } from "../../port/notification-service";
import { NOTIFICATION } from "../subscription-constants";

type SubscriptionStore = {
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
  create<SubscriptionStore>((set, getState) => ({
    email: "",
    isLoading: false,
    updateUserEmail: (email: string) => set({ email }),
    subscribeBlogReader: async () => {
      await subscriptionGateway.subscribe(getState().email);
      notificationService.success(NOTIFICATION.SUCCESS);
      getState().updateUserEmail("");
    },
  }));
