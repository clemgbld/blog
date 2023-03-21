import { toast } from "react-toastify";
import { NotificationService } from "../../../core/frontend/port/notification-service";

export const notificationService: NotificationService = {
  success: (message: string) => {
    toast.success(message);
  },
  error: (message: string) => {
    toast.error(message);
  },
};
