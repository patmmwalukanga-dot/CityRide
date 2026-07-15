import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../src/hooks/useAuth";
import { SplashScreen } from "../src/screens/SplashScreen";
import { FIREBASE_READY } from "../src/constants/firebaseConfig";

export default function Index() {
  const { user, initializing } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (initializing) return;
    if (!FIREBASE_READY) {
      router.replace("/home");
      return;
    }
    if (!user) router.replace("/login");
    else if (user.role === "driver") router.replace("/driver-requests");
    else router.replace("/home");
  }, [user, initializing, FIREBASE_READY]);

  if (initializing) return <SplashScreen />;
  return null;
}
