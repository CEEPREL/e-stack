"use client";
import React, { useState } from "react";
import { Header } from "@/components/header/Header";
import SignIn from "../(auth)/sign-in/page";
import { useRouter } from "next/navigation";
import SignUp from "../(auth)/sign-up/page";

export default function HomePage({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(true);

  const handleSignInOpen = () => {
    setIsSignInOpen(true);
  };

  const handleSignInClose = () => {
    setIsSignInOpen(false);
    router.push("/");
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
      <Header handleclick={handleSignInOpen} />
      {children}
    </>
  );
}
