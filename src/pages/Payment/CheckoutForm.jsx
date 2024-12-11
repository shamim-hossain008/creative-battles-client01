import React, { useEffect, useState } from "react";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import "../Payment/CheckoutForm.css";

const CheckoutForm = ({ price, contestId }) => {
  const { user } = useAuth();
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState();
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (price > 1) {
      getClientSecret({ price: price });
    }
  }, [price]);

  //   get client secret
  const getClientSecret = async (price) => {
    const { data } = await axiosSecure.post(`/create-payment-intent`, price);
    // console.log("clientSecret from server------>", data);
    setClientSecret(data.clientSecret);
  };

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    setProcessing(true);
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
      setProcessing(false);
      return;
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    //   confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirmError", confirmError);
      setError(confirmError.message);
      setProcessing(false);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      console.log(paymentIntent);
      //   create payment info object
      const paymentInfo = {
        user: {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
        },

        price: price,
        contestId: contestId,
        transactionId: paymentIntent.id,
        date: new Date(),
        status: "completed",
      };
      delete paymentInfo._id;

      try {
        // save payment info in submit collection (db)
        const { data } = await axiosSecure.post("/submit", paymentInfo);

        toast.success("Thank you for your payment");
        navigate("/dashboard/my-participated-contest"); // Use absolute path
      } catch (error) {
        console.error(error.message);
      }
    }
    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="my-10 mx-10">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn bg-[#37C5BD]"
        type="submit"
        disabled={!stripe || !clientSecret || processing}
      >
        Pay ${price}
      </button>
      <p className="text-red-600">{error}</p>
      {transactionId && (
        <p className="text-green-600"> Your transaction id:{transactionId} </p>
      )}
    </form>
  );
};

export default CheckoutForm;
