import { Email } from "../../../core/backend/subscription/entities/email";
import { SubscriptonRepository } from "../../../core/backend/subscription/repositories/supscription-repository";

export const buildInMemorySubscriptionRepository = ({
  storageSource = new Map(),
}: {
  storageSource?: Map<string, string>;
}): SubscriptonRepository => ({
  subscribeBlogReader: async ({ id, email }: Email) => {
    storageSource.set(id, email);
  },
});
