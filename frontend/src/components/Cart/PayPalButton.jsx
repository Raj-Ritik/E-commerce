import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess, onError }) => {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": "AfavrtyO6wYGg62iD6AcPxT705OwfOIuLGe9uza7ck_DGe0qXGwEvy5SfKgFmusqyjwutkeDRuHUwXFD",
        currency: "USD",
        intent: "capture",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              { amount: { currency_code: "USD", value: amount } },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(onSuccess);
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
