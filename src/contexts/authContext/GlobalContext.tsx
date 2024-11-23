"use client";
import { auth, firebasedDB } from "@/app/firebase/firebase";

import React, { useContext, useState, useEffect, ReactNode } from "react";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

// Define the shape of the user object from Firestore
type UserData = {
  name?: string;
  email?: string;
  [key: string]: any; // For additional user fields in Firestore
};

// Define the shape of the Auth context
interface AuthContextType {
  currentUser: FirebaseUser | null;
  userDataObj: UserData | null;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUserDataObj: React.Dispatch<React.SetStateAction<UserData | null>>;
  loading: boolean;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSignedUp: boolean;
  setIsSignedUp: React.Dispatch<React.SetStateAction<boolean>>;
  isSignInOpen: boolean;
  setIsSignInOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with a default value
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

// Hook to use the Auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userDataObj, setUserDataObj] = useState<UserData | null>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isSignedUp, setIsSignedUp] = useState(true);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  // AUTH HANDLERS
  async function signup(email: string, password: string): Promise<void> {
    await createUserWithEmailAndPassword(auth, email, password);
  }

  async function login(email: string, password: string): Promise<void> {
    await useSignInWithEmailAndPassword(auth);
  }

  async function logout(): Promise<void> {
    setUserDataObj(null);
    setCurrentUser(null);
    await signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      setCurrentUser(user);
      try {
        if (user) {
          const docRef = doc(firebasedDB, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserDataObj(docSnap.data() as UserData);
          }
        } else {
          setUserDataObj(null);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    userDataObj,
    signup,
    login,
    logout,
    setUserDataObj,
    loading,
    isModalOpen,
    setIsModalOpen,
    isSignedUp,
    setIsSignedUp,
    isSignInOpen,
    setIsSignInOpen,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
