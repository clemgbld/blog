import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { buildInMemorySubscriptionGateway } from "../../../../infrastructure/frontend/subscription/in-memory-subscription-gateway";
import { notificationService } from "../../../../infrastructure/frontend/notification/notification-service";
import SubscriptionForm from "../SubscriptionForm";
import { SubscriptionProvider } from "../../../../providers/SubscriptionProvider";

const renderSubscriptionForm = ({
  spy,
  isSubscriptionError,
}: {
  spy?: jest.Mock<any, any>;
  isSubscriptionError?: boolean;
}) =>
  render(
    <SubscriptionProvider
      notificationService={notificationService}
      subscriptionGateway={buildInMemorySubscriptionGateway({
        spy,
        isSubscriptionError,
      })}
    >
      <SubscriptionForm />
    </SubscriptionProvider>
  );

describe("SubscriptionForm", () => {
  it("should subscribe the user to the newsletter", async () => {
    const subscribeSpy = jest.fn();

    renderSubscriptionForm({ spy: subscribeSpy });

    const subscriptionInput = screen.getByLabelText("Your best email:");

    await userEvent.type(subscriptionInput, "example@hotmail.fr");

    const submitButton = screen.getByRole("button");

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(subscribeSpy).toHaveBeenCalledWith("example@hotmail.fr");
    });

    expect(
      screen.getByText("Successfully subscribed to the newsletter")
    ).toBeInTheDocument();

    expect(screen.getByLabelText("Your best email:")).toHaveValue("");
  });

  it("should dispaly an error notification when the subscripton goes wrong", async () => {
    renderSubscriptionForm({ isSubscriptionError: true });
    const subscriptionInput = screen.getByLabelText("Your best email:");

    await userEvent.type(subscriptionInput, "example@hotmail.fr");

    const submitButton = screen.getByRole("button");

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    });
  });

  it("should display an error message when the user try to submit an non valid email", async () => {
    renderSubscriptionForm({});

    const subscriptionInput = screen.getByLabelText("Your best email:");

    await userEvent.type(subscriptionInput, "example@hotmail");

    const submitButton = screen.getByRole("button");

    await userEvent.click(submitButton);

    expect(
      screen.getByText("Email adress should be a valid address email")
    ).toBeInTheDocument();
  });

  it("should have no error message when the user submit a wrong email and try to type another email", async () => {
    renderSubscriptionForm({});

    const subscriptionInput = screen.getByLabelText("Your best email:");

    await userEvent.type(subscriptionInput, "example@hotmail");

    const submitButton = screen.getByRole("button");

    await userEvent.click(submitButton);

    await userEvent.type(subscriptionInput, ".fr");

    expect(
      screen.queryByText("Email adress should be a valid address email")
    ).not.toBeInTheDocument();
  });
});
