"use client";
import React from "react";
import { useAuth } from "@/contexts/authContext/GlobalContext";
import { useEffect } from "react";
import Link from "next/link";

export default function page() {
  const { currentUser, setIsSignInOpen } = useAuth();
  useEffect(() => {
    if (!currentUser) {
      setIsSignInOpen(true);
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div>
        Kindly sign-in to make a purchase{" "}
        <Link
          onClick={() => {}}
          className="text-blue-600 hover:underline"
          href={"/"}
        >
          Sign-in
        </Link>
      </div>
    ); // Optional loading state
  }

  return <div>You can make a purchase</div>;
}
