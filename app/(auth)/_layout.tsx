import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../../src/hooks/useAuth";

export default function AuthLayout() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace(user.role === "driver" ? "/driver-requests" : "/home");
    }
  }, [user]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
