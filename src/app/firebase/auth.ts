import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
} from "firebase/auth";

// Define the return type for functions interacting with Firebase Authentication
type AuthResult = Promise<UserCredential | void>;

export async function doCreateUserWithEmailAndPassword(
  email: string,
  password: string
) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

export const doSignInWithEmailAndPassword = (
  email: string,
  password: string
): AuthResult => {
  return signInWithEmailAndPassword(auth, email, password) as AuthResult;
};

export const doSignInWithGoogle = async (): Promise<void> => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  // Add logic to handle the user (e.g., add user to Firestore)
};

export const doSignOut = (): Promise<void> => {
  return auth.signOut();
};

export const doPasswordReset = (email: string): Promise<void> => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password: string): Promise<void> => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("No authenticated user to update the password.");
  }
  return updatePassword(currentUser, password);
};

export const doSendEmailVerification = (): Promise<void> => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("No authenticated user to send email verification.");
  }
  return sendEmailVerification(currentUser, {
    url: `${window.location.origin}/home`,
  });
};
