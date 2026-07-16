import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../src/hooks/useAuth";
import { SplashScreen } from "../src/screens/SplashScreen";
import { FIREBASE_READY } from "../src/constants/firebaseConfig";

const SPLASH_DURATION = 3000; // 3 seconds minimum

export default function Index() {
  const { user, initializing } = useAuth();
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);
  const splashStartTime = useRef(Date.now());

  useEffect(() => {
    if (initializing) return;

    const elapsed = Date.now() - splashStartTime.current;
    const remaining = Math.max(0, SPLASH_DURATION - elapsed);

    const timer = setTimeout(() => {
      setShowSplash(false);
      if (!user) {
        router.replace("/login");
        return;
      }
      if (user.role === "driver") router.replace("/driver-home");
      else router.replace("/home");
    }, remaining);

    return () => clearTimeout(timer);
  }, [user, initializing, FIREBASE_READY]);

  if (showSplash || initializing) return <SplashScreen />;
  return null;
}