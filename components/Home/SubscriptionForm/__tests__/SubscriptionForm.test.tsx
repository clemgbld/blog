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

const subscribe = async (email = "example@hotmail.fr") => {
  const subscriptionInput = screen.getByLabelText("Your best email:");

  await userEvent.type(subscriptionInput, email);

  const submitButton = screen.getByRole("button");

  await userEvent.click(submitButton);

  return { subscriptionInput };
};

describe("SubscriptionForm", () => {
  it("should subscribe the user to the newsletter", async () => {
    const subscribeSpy = jest.fn();

    renderSubscriptionForm({ spy: subscribeSpy });

    await subscribe();

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

    await subscribe();

    await waitFor(() => {
      expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    });
  });

  it("should display an error message when the user try to submit an non valid email", async () => {
    renderSubscriptionForm({});

    await subscribe("example@hotmail");

    expect(
      screen.getByText("Email adress should be a valid address email")
    ).toBeInTheDocument();
  });

  it("should have no error message when the user submit a wrong email and try to type another email", async () => {
    renderSubscriptionForm({});

    const { subscriptionInput } = await subscribe("example@hotmail");

    await userEvent.type(subscriptionInput, ".fr");

    expect(
      screen.queryByText("Email adress should be a valid address email")
    ).not.toBeInTheDocument();
  });
});
