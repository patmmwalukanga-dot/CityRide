import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { theme } from "../styles/theme";
import { formatFare } from "../utils/format";
import { StatusBadge } from "./StatusBadge";
import type { Booking } from "../types";

interface BookingCardProps {
  booking: Booking;
  onPress?: () => void;
}

export function BookingCard({ booking, onPress }: BookingCardProps) {
  const { t } = useTranslation();
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.row}>
        <Text style={styles.route}>
          {booking.pickup} → {booking.destination}
        </Text>
        <StatusBadge status={booking.status} />
      </View>
      <View style={styles.meta}>
        <Text style={styles.fare}>{formatFare(booking.fare)}</Text>
        <Text style={styles.passenger}>
          {t("details.passenger")}: {booking.passengerName}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  route: {
    flex: 1,
    fontSize: theme.fontSize.md,
    fontWeight: "600",
    color: theme.colors.text,
    marginRight: theme.spacing(1),
  },
  meta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: theme.spacing(0.5),
  },
  fare: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.primary,
    fontWeight: "700",
  },
  passenger: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
  },
});
