"use client";
import React from "react";
import { usePaystackPayment } from "react-paystack";
import { Button } from "../ui/button";
import { useAuth } from "@/contexts/authContext/GlobalContext";
import db from "@/db/db";

export const Paystack = () => {
  const { currentUser, setIsSignInOpen } = useAuth();

  const config: {
    reference: string;
    email: string | undefined;
    amount: number;
    publicKey: string;
  } = {
    reference: new Date().getTime().toString(),
    email: currentUser?.email ?? undefined,
    amount: 20000000,
    publicKey: "pk_test_53695798eb7e1d93d2f96e77438ee4825efefd47",
  };

  // you can call this function anything
  const onSuccess = (reference: any) => {
    console.log(reference);
  };

  const onClose = () => {
    console.log("closed");
  };

  const initializePayment = usePaystackPayment(config);
  return (
    <div>
      <Button
        onClick={() => {
          initializePayment({ onSuccess, onClose });
        }}
      >
        Pay with Paystack
      </Button>
    </div>
  );
};

// function Paystack() {
//   return (
//     <div>
//       <PaystackHookExample />
//     </div>
//   );
// }

// export default Paystack;
