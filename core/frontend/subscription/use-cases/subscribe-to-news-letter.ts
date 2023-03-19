import create from "zustand/vanilla";
import { SubscriptionGateway } from "../port/subscription-gateway";
import { NotificationService } from "../../port/notification-service";
import {
  NOTIFICATION,
  ERROR_MESSAGES,
  MAX_EMAIL_CHARACTERS,
} from "../subscription-constants";
import { validateEmail } from "../validation/validate-email-service";

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
      const errorMessage = validateEmail(email);
      if (errorMessage) return set({ errorMessage });
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
