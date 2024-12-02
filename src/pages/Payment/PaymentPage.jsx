import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentPage = () => {
  const location = useLocation();
  const { price, contestId } = location.state || {}; // Retrieve price from state
  if (!price || !contestId) {
    return (
      <div className="text-red-500 font-sm">
        Error: Missing contest details. Please try again.
      </div>
    ); // Handle missing data
  }
  return (
    <div>
      <h2 className="text-xl font-bold text-center m-6 text-[#37C5BD]">
        Please Pay For Contest Registration
      </h2>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm price={price} contestId={contestId}></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default PaymentPage;
