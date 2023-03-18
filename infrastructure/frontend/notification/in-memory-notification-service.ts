import { NotificationService } from "../../../core/frontend/port/notification-service";

type inMemoryNotificationServiceProps = {
  successSpy?: (message: string) => void;
  errorSpy?: (message: string) => void;
};

export const buildInMemoryNotificationService = ({
  successSpy,
  errorSpy,
}: inMemoryNotificationServiceProps): NotificationService => ({
  success: successSpy ? successSpy : (message: string) => {},
  error: errorSpy ? errorSpy : (message: string) => {},
});
