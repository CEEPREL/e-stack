"use client";
import { useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/firebase";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import { useAuth } from "@/contexts/authContext/GlobalContext";

const SignIn = ({
  onClose,
  toSignUp,
}: {
  onClose: () => void;
  toSignUp: () => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const [isModalOpen, setIsModalOpen] = useState(true);
  const { isModalOpen, setIsModalOpen, signup, login } = useAuth();

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const handleSignIn = async () => {
    try {
      setErrorMessage("");
      const res = await signInWithEmailAndPassword(email, password);

      if (res?.user) {
        setEmail("");
        setPassword("");
        setIsModalOpen(false); // Close modal
        router.push("/"); // Redirect to home page
      }
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
      }
    }
  };

  if (!isModalOpen) return null; // Hide modal if closed

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <button
        onClick={onClose} // Close modal
        className="absolute top-5 right-5 text-white bg-red-500 p-2 rounded"
      >
        Close
      </button>
      <div className="flex flex-col items-center justify-center h-auto bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <p className="text-white">Welcome back</p>
        <h1 className="text-white text-2xl mb-5">Sign In</h1>

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
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-100"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-100"
        />
        <button
          onClick={handleSignIn}
          className="w-full p-3 bg-gray-700 rounded text-white hover:bg-gray-900"
        >
          Sign In
        </button>
        <button onClick={toSignUp} className=" text-white">
          New user?{" "}
          <span className="text-indigo-600 hover:text-indigo-800 underline">
            Sign up Here
          </span>
        </button>
      </div>
    </div>
  );
};

export default SignIn;
