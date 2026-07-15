import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { APP_NAME, BRAND } from "../constants/config";
import { theme } from "../styles/theme";

export function SplashScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>{APP_NAME[0]}</Text>
      </View>
      <Text style={styles.name}>{APP_NAME}</Text>
      <Text style={styles.tagline}>{BRAND.tagline}</Text>
      <ActivityIndicator
        style={styles.spinner}
        color={theme.colors.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 96,
    height: 96,
    borderRadius: 24,
    backgroundColor: theme.colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(2),
  },
  logoText: {
    fontSize: 48,
    fontWeight: "800",
    color: theme.colors.white,
  },
  name: {
    fontSize: theme.fontSize.xl,
    fontWeight: "800",
    color: theme.colors.white,
  },
  tagline: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.white,
    opacity: 0.85,
    marginTop: theme.spacing(0.5),
  },
  spinner: {
    marginTop: theme.spacing(4),
  },
});
