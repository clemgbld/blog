import create from "zustand/vanilla";
import { SubscriptionGateway } from "../port/subscription-gateway";
import { NotificationService } from "../../port/notification-service";
import {
  NOTIFICATION,
  ERROR_MESSAGES,
  MAX_EMAIL_CHARACTERS,
} from "../subscription-constants";

type SubscriptionStore = {
  email: string;
  isLoading: boolean;
  errorMessage: string;
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
    errorMessage: "",
    updateUserEmail: (email: string) => set({ email }),
    subscribeBlogReader: async () => {
      const { email, updateUserEmail } = getState();
      if (!email) return set({ errorMessage: ERROR_MESSAGES.EMPTY });
      if (email.length > MAX_EMAIL_CHARACTERS)
        return set({
          errorMessage: ERROR_MESSAGES.TOO_LONG,
        });
      set({ isLoading: true });
      try {
        await subscriptionGateway.subscribe(email);
        notificationService.success(NOTIFICATION.SUCCESS);
      } catch (e) {
        if (e instanceof Error) {
          notificationService.error(e.message);
        }
      }
      updateUserEmail("");
      set({ isLoading: false });
    },
  }));
