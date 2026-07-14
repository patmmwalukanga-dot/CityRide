import { Slot } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { initI18n } from "../src/localization";
import { AuthProvider } from "../src/context/AuthContext";
import { BookingProvider } from "../src/context/BookingContext";
import { theme } from "../src/constants/theme";

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    initI18n().finally(() => {
      if (active) setReady(true);
    });
    return () => {
      active = false;
    };
  }, []);

  if (!ready) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.colors.primary,
        }}
      >
        <ActivityIndicator color={theme.colors.white} />
      </View>
    );
  }

  return (
    <AuthProvider>
      <BookingProvider>
        <StatusBar style="light" />
        <Slot />
      </BookingProvider>
    </AuthProvider>
  );
}
