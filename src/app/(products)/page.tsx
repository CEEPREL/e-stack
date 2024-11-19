"use client";
import React, { useState } from "react";
import { Header } from "@/components/header/Header";
import SignIn from "../(auth)/sign-in/page";
import { useRouter } from "next/navigation";

export default function HomePage({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const handleSignInOpen = () => {
    setIsSignInOpen(true);
  };

  const handleSignInClose = () => {
    setIsSignInOpen(false);
    router.push("/");
  };

  return (
    <>
      {isSignInOpen && <SignIn onClose={handleSignInClose} />}
      <Header handleclick={handleSignInOpen} />
      {children}
    </>
  );
}
