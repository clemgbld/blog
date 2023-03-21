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
        <h2>Subscribe to my newsletter:</h2>
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
            {!!errorMessage && <p>{errorMessage}</p>}
          </div>
        </form>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default SubscriptionForm;
