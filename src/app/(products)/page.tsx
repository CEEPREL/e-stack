"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SignUp from "../(auth)/sign-up/page";
import { useAuth } from "@/contexts/authContext/GlobalContext";
import SignInPage from "../(auth)/sign-in/page";
import SignUpPage from "../(auth)/sign-up/page";

export default function HomePage({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const {
    currentUser,
    userDataObj,
    isSignedUp,
    setIsSignedUp,
    setIsSignInOpen,
    isSignInOpen,
  } = useAuth();
  const [data, setData] = useState<null | {}>();

  useEffect(() => {
    if (currentUser || userDataObj) {
      return;
    }
    setData(userDataObj);
  }, [currentUser, userDataObj, setIsSignInOpen]);

  const handleSignInOpen = () => {
    setIsSignInOpen(true);
  };

  const handleSignInClose = () => {
    setIsSignInOpen(false);
    router.push("/");
    setIsSignedUp(true);
  };
  const handleAuthMode = () => {
    setIsSignedUp(!isSignedUp);
  };

  return (
    <>
      {isSignedUp
        ? isSignInOpen && <SignInPage />
        : isSignInOpen && <SignUpPage />}
      {children}
    </>
  );
}
