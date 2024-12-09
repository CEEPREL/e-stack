"use client";

import React, { useState } from "react";
import { FirebaseError } from "firebase/app";
import { useAuth } from "@/contexts/authContext/GlobalContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface SignInProps {
  onClose: () => void;
  toSignUp: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onClose, toSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { login, isModalOpen, setIsModalOpen } = useAuth();
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      setErrorMessage("");
      await login(email, password);

      setEmail("");
      setPassword("");
      setIsModalOpen(false);
      router.push("/");
    } catch (e) {
      console.error(e);
      if (e instanceof FirebaseError) {
        switch (e.code) {
          case "auth/user-not-found":
            setErrorMessage("No user found with this email. Please sign up.");
            break;
          case "auth/wrong-password":
            setErrorMessage("Incorrect password. Please try again.");
            break;
          case "auth/invalid-email":
            setErrorMessage("Invalid email format. Please check your email.");
            break;
          default:
            setErrorMessage("An unexpected error occurred. Please try again.");
        }
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      aria-hidden={!isModalOpen}
    >
      <div className="relative bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <Button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-white bg-red-500 p-2 rounded"
        >
          ×
        </Button>
        <div className="text-center">
          <p className="text-gray-400 mb-2">Welcome back</p>
          <h1 className="text-white text-2xl mb-5">Sign In</h1>
        </div>

        {errorMessage && (
          <div className="bg-red-500 text-white p-3 rounded mb-4">
            {errorMessage}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-400"
        />
        <Button
          onClick={handleSignIn}
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-800"
        >
          Sign In
        </Button>
        <Button onClick={toSignUp} className="mt-4 text-gray-300">
          New user?{" "}
          <span className="text-indigo-400 hover:text-indigo-600 underline">
            Sign up here
          </span>
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
