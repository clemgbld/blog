import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

    const subscriptionInput = screen.getByLabelText("Your best email:");

    await userEvent.type(subscriptionInput, "example@hotmail.fr");

    const submitButton = screen.getByRole("button");

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(subscribeSpy).toHaveBeenCalledWith("example@hotmail.fr");
    });

    expect(
      screen.getByText("Successfully subscribed to the news letter")
    ).toBeInTheDocument();
  });
});
