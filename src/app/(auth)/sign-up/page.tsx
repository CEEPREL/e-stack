"use client";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/firebase";
import { updateProfile } from "firebase/auth";

const SignUp = ({
  onClose,
  toSignIn,
}: {
  onClose: () => void;
  toSignIn: () => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);

      // Update the user's profile with first and last name
      if (res?.user) {
        await updateProfile(res.user, {
          displayName: `${firstName} ${lastName}`,
        });
        console.log(user);
      }

      // Clear form fields
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
    } catch (e) {
      console.error("Error during sign-up:", e);
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
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <button onClick={toSignIn} className=" text-white">
          Have an account?{" "}
          <span className="text-indigo-600 hover:text-indigo-800 underline">
            Sign in Here
          </span>
        </button>
        {error && <p className="text-red-500 mt-3">{error.message}</p>}
      </div>
    </div>
  );
};

export default SignUp;
