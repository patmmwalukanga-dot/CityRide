import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { theme } from "../constants/theme";

interface ButtonProps extends Omit<PressableProps, "style"> {
  label: string;
  variant?: "primary" | "secondary" | "ghost";
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Button({
  label,
  variant = "primary",
  loading,
  style,
  disabled,
  ...rest
}: ButtonProps) {
  const background =
    variant === "primary"
      ? theme.colors.primary
      : variant === "secondary"
        ? theme.colors.secondary
        : theme.colors.surface;

  const textColor =
    variant === "ghost" ? theme.colors.primary : theme.colors.white;

  return (
    <Pressable
      {...rest}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: background, opacity: pressed || disabled ? 0.7 : 1 },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    borderRadius: theme.radius.md,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.spacing(2),
  },
  label: {
    fontSize: theme.fontSize.md,
    fontWeight: "600",
  },
});
