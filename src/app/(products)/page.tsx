"use client";
import React, { useEffect, useState } from "react";
import SignIn from "../(auth)/sign-in/page";
import { useRouter } from "next/navigation";
import SignUp from "../(auth)/sign-up/page";
import { useAuth } from "@/contexts/authContext/GlobalContext";

export default function HomePage({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  // const [isSignInOpen, setIsSignInOpen] = useState(false);
  // const [isSignedUp, setIsSignedUp] = useState(true);
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
        ? isSignInOpen && (
            <SignIn onClose={handleSignInClose} toSignUp={handleAuthMode} />
          )
        : isSignInOpen && (
            <SignUp onClose={handleSignInClose} toSignIn={handleAuthMode} />
          )}
      {children}
    </>
  );
}
