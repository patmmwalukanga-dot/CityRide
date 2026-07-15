import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Screen } from "../components/Screen";
import { Button } from "../components/Button";
import { StatusBadge } from "../components/StatusBadge";
import { useAuth } from "../hooks/useAuth";
import { useBookings } from "../hooks/useBookings";
import { theme } from "../styles/theme";
import { formatFare } from "../utils/format";

export function BookingDetailsScreen({ bookingId }: { bookingId: string }) {
  const { t } = useTranslation();
  const router = useRouter();
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
        <View style={styles.header}>
          <View style={styles.routeBlock}>
            <Text style={styles.route} numberOfLines={1}>
              {booking.pickup}
            </Text>
            <MaterialIcons
              name="south"
              size={18}
              color={theme.colors.textMuted}
            />
            <Text style={styles.route} numberOfLines={1}>
              {booking.destination}
            </Text>
          </View>
          <StatusBadge status={booking.status} />
        </View>

        <View style={styles.divider} />

        <View style={styles.body}>
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
            label={t("active.navigate")}
            onPress={() =>
              router.push({ pathname: "/active/[id]", params: { id: booking.id } })
            }
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

        {!isDriver && booking.status === "completed" && user ? (
          <Button
            label={t("rating.rate")}
            onPress={() =>
              router.push({ pathname: "/rating/[id]", params: { id: booking.id } })
            }
          />
        ) : null}

        {!isDriver && (booking.status === "accepted" || booking.status === "in_progress") ? (
          <Button
            label={t("tracking.open")}
            onPress={() =>
              router.push({ pathname: "/tracking/[id]", params: { id: booking.id } })
            }
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
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(2),
  },
  routeBlock: {
    flex: 1,
    minWidth: 0,
  },
  route: {
    fontSize: theme.fontSize.md,
    fontWeight: "700",
    color: theme.colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing(2),
  },
  body: {
    gap: theme.spacing(1),
  },
  fare: {
    fontSize: theme.fontSize.xl,
    color: theme.colors.primary,
    fontWeight: "700",
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
