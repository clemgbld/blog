"use client";
import { useSubscriptionStore } from "../../../providers/SubscriptionProvider";
import { ToastContainer } from "react-toastify";

const SubscriptionForm = () => {
  const subscriptionStore = useSubscriptionStore();
  const { email, updateUserEmail, subscribeBlogReader } = subscriptionStore(
    (state) => state
  );
  return (
    <>
      <form>
        <div>
          <label htmlFor="subscription">Your best email:</label>
          <input
            value={email}
            onChange={({ target: { value } }) => updateUserEmail(value)}
            type="text"
            id="subscription"
          />
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
