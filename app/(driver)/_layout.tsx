import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../../src/hooks/useAuth";

export default function DriverLayout() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace("/login");
    else if (user.role !== "driver") router.replace("/home");
  }, [user]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
