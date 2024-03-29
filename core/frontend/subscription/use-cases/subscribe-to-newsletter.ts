import create from "zustand/vanilla";
import { SubscriptionGateway } from "../port/subscription-gateway";
import { NotificationService } from "../../port/notification-service";
import { NOTIFICATION } from "../../../common/subscription/subscription-constants";
import { validateEmail } from "../../../common/subscription/validation/validate-email-service";

type SubscriptionStore = {
  email: string;
  isLoading: boolean;
  errorMessage: string;
  updateUserEmail: (email: string) => void;
  subscribeBlogReader: () => Promise<void>;
  resetErrorMessage: () => void;
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
    updateUserEmail: (email: string) => {
      const { errorMessage, resetErrorMessage } = getState();
      if (!!errorMessage) {
        resetErrorMessage();
      }
      set({ email });
    },
    resetErrorMessage: () => set({ errorMessage: "" }),
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
