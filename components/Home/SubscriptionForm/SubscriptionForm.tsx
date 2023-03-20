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
    isLoading,
  } = subscriptionStore((state) => state);

  return (
    <>
      <div>
        <h2>Subscribe to my newsletter</h2>
        <form>
          <div>
            <label htmlFor="subscription">Your best email:</label>
            <input
              value={email}
              onChange={({ target: { value } }) => updateUserEmail(value)}
              onFocus={() => resetErrorMessage()}
              type="text"
              id="subscription"
              name="subscription"
              placeholder="your.email@exemple.com"
            />
            <p>{errorMessage}</p>
            <button
              onClick={async (e) => {
                e.preventDefault();
                await subscribeBlogReader();
              }}
              type="submit"
              disabled={isLoading}
            >
              Subscribe
              {isLoading && <span role="progressbar" />}
            </button>
          </div>
        </form>
      </div>

      <ToastContainer />
    </>
  );
};

export default SubscriptionForm;
