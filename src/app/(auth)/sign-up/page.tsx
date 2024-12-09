"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContext/GlobalContext";
import SignIn from "@/components/auth/SignIn";
import SignUp from "@/components/auth/SignUp";

const SignUpPage = () => {
  const router = useRouter();
  const {
    currentUser,
    userDataObj,
    isSignedUp,
    setIsSignedUp,
    setIsSignInOpen,
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

  return <SignUp onClose={handleSignInClose} toSignIn={handleAuthMode} />;
};

export default SignUpPage;
