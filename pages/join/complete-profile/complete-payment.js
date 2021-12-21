import React from "react";
import CompletePayment from "@/components/join/CompletePayment";
import parseCookies from "@/helpers/cookieParser";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

export default function Index({ token }) {
  const stripePromise = loadStripe(
    "pk_test_51IjpywIWp3VgGAPOQ7pmQ0wIbnDaqon8IDtMCe3XCJ6SnjUMgNCUX7QoV0kyBMREAB301HoaCRqDIeTtA9kz09aC00xrz5UKIl"
  );
  const onFinishBillingInformation = (values) => {
    console.log("here", values);
  };

  return (
    <div>
      <Elements stripe={stripePromise}>
        <CompletePayment
          token={token}
          onFinishBillingInformation={onFinishBillingInformation}
        />
      </Elements>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  //   this is only available on server and not cliet!!!!
  // how good is that fam?
  console.log(token);
  return {
    props: {
      token: token,
    },
  };
}
