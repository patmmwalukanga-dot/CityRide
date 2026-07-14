import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
  type User as FbUser,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import type { User, UserRole } from "../types";

export interface AuthResult {
  user: User | null;
  error?: string;
}

export async function signUpWithEmail(params: {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
}): Promise<AuthResult> {
  if (!auth || !db) return { user: null, error: "FIREBASE_NOT_CONFIGURED" };
  const authInstance = auth;
  const database = db;
  try {
    const cred = await createUserWithEmailAndPassword(
      authInstance,
      params.email,
      params.password,
    );
    const user: User = {
      uid: cred.user.uid,
      name: params.name,
      email: params.email,
      phone: params.phone,
      role: params.role,
      createdAt: Date.now(),
    };
    await setDoc(doc(database, "users", cred.user.uid), user);
    return { user };
  } catch (e) {
    return { user: null, error: (e as { code?: string })?.code ?? "SIGNUP_FAILED" };
  }
}

export async function signInWithEmail(
  email: string,
  password: string,
): Promise<AuthResult> {
  if (!auth || !db) return { user: null, error: "FIREBASE_NOT_CONFIGURED" };
  const authInstance = auth;
  const database = db;
  try {
    const cred = await signInWithEmailAndPassword(authInstance, email, password);
    const snap = await getDoc(doc(database, "users", cred.user.uid));
    const user = snap.exists() ? (snap.data() as User) : null;
    return { user };
  } catch (e) {
    return { user: null, error: (e as { code?: string })?.code ?? "SIGNIN_FAILED" };
  }
}

// Phone Number Authentication is preferred per the spec, but it requires a
// reCAPTCHA verifier in React Native. Stubbed here; wire up signInWithPhoneNumber
// with an ApplicationVerifier when native setup is ready.
export async function signInWithPhone(
  _phone: string,
  _code: string,
): Promise<AuthResult> {
  return { user: null, error: "PHONE_AUTH_NOT_IMPLEMENTED" };
}

export async function signOut(): Promise<void> {
  if (auth) await fbSignOut(auth);
}

export function onAuthChanged(cb: (user: User | null) => void): () => void {
  if (!auth || !db) {
    cb(null);
    return () => {};
  }
  const authInstance = auth;
  const database = db;
  return onAuthStateChanged(authInstance, async (fbUser: FbUser | null) => {
    if (!fbUser) {
      cb(null);
      return;
    }
    const snap = await getDoc(doc(database, "users", fbUser.uid));
    cb(snap.exists() ? (snap.data() as User) : null);
  });
}
