import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import { theme } from "../styles/theme";
import { formatFare } from "../utils/format";
import { MaterialIcons } from "@expo/vector-icons";
import type { Booking } from "../types";

interface BookingCardProps {
  booking: Booking;
  onPress?: () => void;
}

export function BookingCard({ booking, onPress }: BookingCardProps) {
  const { t } = useTranslation();
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.routeRow}>
        <View style={styles.routeIcon}>
          <MaterialIcons name="radio-button-checked" size={18} color={theme.colors.primary} />
        </View>
        <Text style={styles.route} numberOfLines={1}>
          {booking.pickup}
        </Text>
      </View>

      <View style={styles.middleBlock}>
        <Text style={styles.requestedText}>{t("request.requested")}</Text>
        <Text style={styles.passengerName}>
          {t("details.passenger")}: {booking.passengerName}
        </Text>
      </View>

      <View style={styles.bottomRow}>
        <Text style={styles.fare} numberOfLines={1} ellipsizeMode="tail">{formatFare(booking.fare)}</Text>
        <MaterialIcons name="chevron-right" size={20} color={theme.colors.primary} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderWidth: 1,
    borderColor: theme.colors.outlineVariant,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    gap: theme.spacing(1.5),
  },
  routeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(1),
  },
  routeIcon: {
    width: 24,
    height: 24,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surfaceContainerLow,
    alignItems: "center",
    justifyContent: "center",
  },
  route: {
    flex: 1,
    fontSize: theme.fontSize.md,
    fontWeight: "600",
    color: theme.colors.onSurface,
  },
  middleBlock: {
    alignItems: "center",
    gap: theme.spacing(0.5),
    paddingVertical: theme.spacing(1),
  },
  requestedText: {
    fontSize: theme.fontSize.xs,
    fontWeight: "600",
    color: theme.colors.secondary,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  passengerName: {
    fontSize: theme.fontSize.sm,
    fontWeight: "700",
    color: theme.colors.primary,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fare: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.primary,
    fontWeight: "700",
    flexShrink: 0,
  },
});
