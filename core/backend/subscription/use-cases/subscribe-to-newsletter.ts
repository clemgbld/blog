import { SubscriptonRepository } from "../repositories/supscription-repository";

export const subscribeToNewsletter = async ({
  subscriptionRepository,
  id,
  email,
}: {
  subscriptionRepository: SubscriptonRepository;
  id: string;
  email: string;
}) => {
  await subscriptionRepository.subscribeBlogReader({ id, email });
};
