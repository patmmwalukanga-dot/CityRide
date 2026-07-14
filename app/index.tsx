import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../src/hooks/useAuth";
import { SplashScreen } from "../src/screens/SplashScreen";

export default function Index() {
  const { user, initializing } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (initializing) return;
    if (!user) router.replace("/login");
    else if (user.role === "driver") router.replace("/driver-requests");
    else router.replace("/home");
  }, [user, initializing]);

  if (initializing) return <SplashScreen />;
  return null;
}
