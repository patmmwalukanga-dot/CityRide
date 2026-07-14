import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { Screen } from "../components/Screen";
import { Button } from "../components/Button";
import { StatusBadge } from "../components/StatusBadge";
import { useAuth } from "../hooks/useAuth";
import { useBookings } from "../hooks/useBookings";
import { theme } from "../constants/theme";
import { formatFare } from "../utils/format";

export function BookingDetailsScreen({ bookingId }: { bookingId: string }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { bookings, acceptBooking, updateStatus } = useBookings();

  const booking = bookings.find((b) => b.id === bookingId);

  if (!booking) {
    return (
      <Screen title={t("details.title")}>
        <Text style={styles.muted}>{t("history.empty")}</Text>
      </Screen>
    );
  }

  const isDriver = user?.role === "driver";

  return (
    <Screen title={t("details.title")}>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>{t("details.status")}</Text>
          <StatusBadge status={booking.status} />
        </View>
        <Text style={styles.route}>
          {booking.pickup} → {booking.destination}
        </Text>
        <Text style={styles.fare}>{formatFare(booking.fare)}</Text>
        <Text style={styles.meta}>
          {t("details.passenger")}: {booking.passengerName}
        </Text>
        {booking.driverName ? (
          <Text style={styles.meta}>
            {t("details.driver")}: {booking.driverName}
          </Text>
        ) : null}
      </View>

      <View style={styles.actions}>
        {isDriver && booking.status === "requested" && user ? (
          <Button
            label={t("details.accept")}
            onPress={() => acceptBooking(booking.id, user.uid, user.name)}
          />
        ) : null}

        {isDriver && booking.status === "accepted" ? (
          <Button
            label={t("details.start")}
            onPress={() => updateStatus(booking.id, "in_progress")}
          />
        ) : null}

        {isDriver && booking.status === "in_progress" ? (
          <Button
            label={t("details.complete")}
            onPress={() => updateStatus(booking.id, "completed")}
          />
        ) : null}

        {!isDriver && booking.status === "requested" ? (
          <Button
            label={t("details.cancel")}
            variant="ghost"
            onPress={() => updateStatus(booking.id, "cancelled")}
          />
        ) : null}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing(2),
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  label: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
    fontWeight: "600",
  },
  route: {
    fontSize: theme.fontSize.lg,
    fontWeight: "700",
    color: theme.colors.text,
  },
  fare: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.primary,
    fontWeight: "700",
    marginVertical: theme.spacing(0.5),
  },
  meta: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
  },
  actions: {
    marginTop: theme.spacing(2),
    gap: theme.spacing(1),
  },
  muted: {
    color: theme.colors.textMuted,
  },
});
