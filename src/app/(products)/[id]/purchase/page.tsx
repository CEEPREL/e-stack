// import { PaystackButton } from "react-paystack";
import React from "react";
import { useAuth } from "@/contexts/authContext/GlobalContext";
import { useEffect } from "react";
import Link from "next/link";
import db from "@/db/db";
import { notFound } from "next/navigation";
import { metadata } from "@/app/layout";
import { Button } from "@/components/ui/button";
import { Paystack } from "@/components/payments/paystack";

export default async function page({}: // param: { id },
{
  // param: { id: string };
}) {
  // const publicKey = "sk_test_bf28873012c70f5a3c9636172459779bcebe38be";
  // const { currentUser, setIsSignInOpen } = useAuth();
  // const product = await db.product.findUnique({ where: { id } });

  // const config = {
  //   reference: new Date().getTime().toString(),
  //   email: currentUser?.email,
  //   amount: product?.priceInCents,
  //   publicKey: publicKey,
  //   metadata: {
  //     custom_fields: [
  //       {
  //         display_name: "description",
  //         variable_name: "description",
  //         value: "Funding Wallet",
  //       },
  //       // To pass extra metadata, add an object with the same fields as above
  //     ],
  //   },
  // };
  // // const handlePaystackCloseAction = () => {
  //   // implementation for  whatever you want to do when the Paystack dialog closed.
  //   console.log("closed");
  // };

  // const handlePaystackSuccessAction = (reference) => {
  //   // Implementation for whatever you want to do with reference and after success call.
  //   console.log(reference);
  // };

  // const componentProps = {
  //   ...config,
  //   text: "Paystack Button Implementation",
  //   onSuccess: (reference) => handlePaystackSuccessAction(reference),
  //   onClose: handlePaystackCloseAction,
  // };

  // componentProps.metadata == null | undefined

  // if (componentProps.metadata == null) {
  //   return notFound;
  // }

  return (
    <div>
      You can make a purchase
      <Paystack />
    </div>
  );
}
