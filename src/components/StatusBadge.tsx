import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { theme } from "../constants/theme";
import type { BookingStatus } from "../types";

const statusColors: Record<BookingStatus, string> = {
  requested: theme.colors.secondary,
  accepted: theme.colors.primary,
  in_progress: "#1565C0",
  completed: theme.colors.success,
  cancelled: theme.colors.danger,
};

export function StatusBadge({ status }: { status: BookingStatus }) {
  const { t } = useTranslation();
  return (
    <View style={[styles.badge, { backgroundColor: statusColors[status] }]}>
      <Text style={styles.text}>{t(`status.${status}`)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: theme.spacing(1),
    borderRadius: theme.radius.sm,
  },
  text: {
    color: theme.colors.white,
    fontSize: theme.fontSize.sm,
    fontWeight: "600",
  },
});
