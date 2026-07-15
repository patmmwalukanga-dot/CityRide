import React, { createContext, useState, useEffect, type ReactNode } from "react";
import {
  onAuthChanged,
  signInWithEmail,
  signOut as fbSignOut,
  signUpWithEmail,
} from "../services/authService";
import { FIREBASE_READY } from "../constants/firebaseConfig";
import type { User, UserRole } from "../types";

export interface AuthContextValue {
  user: User | null;
  initializing: boolean;
  isFirebaseConfigured: boolean;
  signIn: (
    email: string,
    password: string,
    role?: UserRole,
  ) => Promise<{ error?: string }>;
  signUp: (params: {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: UserRole;
  }) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function mockUser(role: UserRole, email: string): User {
  return {
    uid: `mock-${Date.now()}`,
    name: email.split("@")[0] || "Demo",
    email,
    phone: "",
    role,
    createdAt: Date.now(),
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    if (!FIREBASE_READY) {
      setInitializing(false);
      return;
    }
    const unsub = onAuthChanged((u) => {
      setUser(u);
      setInitializing(false);
    });
    return unsub;
  }, []);

  const signIn = async (
    email: string,
    password: string,
    role: UserRole = "passenger",
  ) => {
    const res = await signInWithEmail(email, password);
    if (res.error) {
      if (res.error === "FIREBASE_NOT_CONFIGURED") {
        setUser(mockUser(role, email));
        return {};
      }
      return { error: res.error };
    }
    setUser(res.user);
    return {};
  };

  const signUp = async (params: {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: UserRole;
  }) => {
    const res = await signUpWithEmail(params);
    if (res.error) {
      if (res.error === "FIREBASE_NOT_CONFIGURED") {
        setUser(mockUser(params.role, params.email));
        return {};
      }
      return { error: res.error };
    }
    setUser(res.user);
    return {};
  };

  const signOut = async () => {
    if (FIREBASE_READY) await fbSignOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, initializing, isFirebaseConfigured: FIREBASE_READY, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
