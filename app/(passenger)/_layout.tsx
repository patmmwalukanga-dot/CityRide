import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../../src/hooks/useAuth";

export default function PassengerLayout() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace("/login");
    else if (user.role !== "passenger") router.replace("/driver-requests");
  }, [user]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
