import { SubscriptonRepository } from "../repositories/supscription-repository";
import { validateEmail } from "../../../common/subscription/validation/validate-email-service";

export const subscribeToNewsletter = async ({
  subscriptionRepository,
  id,
  email,
}: {
  subscriptionRepository: SubscriptonRepository;
  id: string;
  email: string;
}) => {
  const errorMessage = validateEmail(email);
  if (errorMessage) {
    throw new Error(errorMessage);
  }
  await subscriptionRepository.subscribeBlogReader({ id, email });
};
