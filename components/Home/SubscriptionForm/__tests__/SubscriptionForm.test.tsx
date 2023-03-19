import { render, screen } from "@testing-library/react";
import { buildInMemorySubscriptionGateway } from "../../../../infrastructure/frontend/subscription/in-memory-subscription-gateway";
import { notificationService } from "../../../../infrastructure/frontend/notification/notification-service";
import SubscriptionForm from "../SubscriptionForm";
import { SubscriptionProvider } from "../../../../providers/SubscriptionProvider";

describe("SubscriptionForm", () => {
  it("should subscribe the user to the news letter", async () => {
    const subscribeSpy = jest.fn();

    render(
      <SubscriptionProvider
        notificationService={notificationService}
        subscriptionGateway={buildInMemorySubscriptionGateway({
          spy: subscribeSpy,
        })}
      >
        <SubscriptionForm />
      </SubscriptionProvider>
    );

    const subscriptionInput = screen.getByLabelText(
      "Subscribe to the news letter"
    );
  });
});
