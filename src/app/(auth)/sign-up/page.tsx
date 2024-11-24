"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/authContext/GlobalContext";

const SignUp = ({
  onClose,
  toSignIn,
}: {
  onClose: () => void;
  toSignIn: () => void;
}) => {
  const { signup } = useAuth();

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Error and loading states
  const [signInError, setSignInError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setSignInError(null); // Clear previous errors
    setLoading(true); // Start loading
    try {
      // Perform sign-up
      await signup(email, password, firstName, lastName);

      // Clear form fields after successful signup
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");

      console.log("Signup successful");
      onClose(); // Close the modal after successful signup
    } catch (e) {
      // Handle error
      if (e instanceof Error) {
        setSignInError(e.message);
      } else {
        setSignInError("An unexpected error occurred");
      }
      console.error("Error during sign-up:", e);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <button
        onClick={onClose} // Close modal
        className="absolute top-5 right-5 text-white bg-red-500 p-2 rounded"
      >
        Close
      </button>
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Sign Up</h1>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <button
          onClick={handleSignUp}
          className={`w-full p-3 rounded text-white ${
            loading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-500"
          }`}
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <button onClick={toSignIn} className="text-white mt-3">
          Have an account?{" "}
          <span className="text-indigo-600 hover:text-indigo-800 underline">
            Sign in Here
          </span>
        </button>
        {signInError && <p className="text-red-500 mt-3">{signInError}</p>}
      </div>
    </div>
  );
};

export default SignUp;
