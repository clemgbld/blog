import { toast } from "react-toastify";
import { NotificationService } from "../../../core/frontend/port/notification-service";

const options = {
  autoClose: 5000,
  type: toast.TYPE.INFO,
  hideProgressBar: false,
  position: toast.POSITION.TOP_LEFT,
  pauseOnHover: true,
  progress: 0.2,
  rtl: true,
};

export const notificationService: NotificationService = {
  success: (message: string) => {
    toast.success(message, options);
  },
  error: (message: string) => {
    toast.error(message, options);
  },
};
