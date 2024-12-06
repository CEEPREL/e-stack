"use client";
import React, { useEffect } from "react";
import { useAuth } from "@/contexts/authContext/GlobalContext";
import Link from "next/link";

export default function Page() {
  const { currentUser, setIsSignInOpen } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      setIsSignInOpen(true);
    }
  }, [currentUser, setIsSignInOpen]);

  if (!currentUser) {
    return (
      <div>
        Kindly sign in to make a purchase{" "}
        <Link
          onClick={() => setIsSignInOpen(true)}
          className="text-blue-600 hover:underline"
          href={"/"}
        >
          Sign-in
        </Link>
      </div>
    );
  }

  return <div>You can make a purchase</div>;
}
