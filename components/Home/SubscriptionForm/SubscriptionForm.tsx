"use client";
import { useSubscriptionStore } from "../../../providers/SubscriptionProvider";
import { ToastContainer } from "react-toastify";

const SubscriptionForm = () => {
  const subscriptionStore = useSubscriptionStore();
  const {
    email,
    updateUserEmail,
    subscribeBlogReader,
    errorMessage,
    resetErrorMessage,
  } = subscriptionStore((state) => state);
  return (
    <>
      <form>
        <div>
          <label htmlFor="subscription">Your best email:</label>
          <input
            value={email}
            onChange={({ target: { value } }) => updateUserEmail(value)}
            onFocus={() => resetErrorMessage()}
            type="text"
            id="subscription"
            placeholder="your.email@exemple.com"
          />
          <p>{errorMessage}</p>
          <button
            onClick={async (e) => {
              e.preventDefault();
              await subscribeBlogReader();
            }}
            type="submit"
          >
            Subscribe
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default SubscriptionForm;
