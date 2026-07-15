import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useBookings } from "../hooks/useBookings";
import { formatFare } from "../utils/format";
import { theme } from "../styles/theme";

export function RatingScreen({ bookingId }: { bookingId: string }) {
  const { t } = useTranslation();
  const router = useRouter();
  const { bookings } = useBookings();
  const booking = bookings.find((b) => b.id === bookingId);

  const [rating, setRating] = useState(0);

  const driverName = booking?.driverName ?? "Alex";
  const fare = booking?.fare;

  const handleDone = () => {
    // Rating submission has no backend yet; finish the flow.
    router.replace("/home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.map} />
      <View style={styles.dim} />

      <View style={styles.card}>
        <View style={styles.check}>
          <MaterialIcons name="check" size={28} color={theme.colors.white} />
        </View>

        <View style={styles.fareBlock}>
          <Text style={styles.fareLabel}>{t("rating.finalFare")}</Text>
          <Text style={styles.fareValue}>
            {fare != null ? formatFare(fare) : "—"}
          </Text>
        </View>

        <View style={styles.starsBlock}>
          <Text style={styles.ratePrompt}>{t("rating.rateTrip", { name: driverName })}</Text>
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((n) => (
              <TouchableOpacity
                key={n}
                onPress={() => setRating(n)}
                activeOpacity={0.7}
                hitSlop={8}
              >
                <MaterialIcons
                  name="star"
                  size={36}
                  color={n <= rating ? theme.colors.primary : theme.colors.border}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.done} onPress={handleDone} activeOpacity={0.9}>
          <Text style={styles.doneText}>{t("rating.done")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.surfaceContainer,
  },
  dim: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.scrim,
  },
  card: {
    width: "100%",
    maxWidth: 360,
    marginHorizontal: theme.spacing(3),
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing(4),
    alignItems: "center",
    gap: theme.spacing(3),
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 12,
  },
  check: {
    width: 56,
    height: 56,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  fareBlock: {
    alignItems: "center",
    gap: 4,
  },
  fareLabel: {
    fontSize: theme.fontSize.sm,
    fontWeight: "600",
    color: theme.colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  fareValue: {
    fontSize: 40,
    fontWeight: "700",
    color: theme.colors.primary,
  },
  starsBlock: {
    alignItems: "center",
    gap: theme.spacing(2),
    width: "100%",
  },
  ratePrompt: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textMuted,
    textAlign: "center",
  },
  stars: {
    flexDirection: "row",
    gap: theme.spacing(1),
    justifyContent: "center",
  },
  done: {
    width: "100%",
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    paddingVertical: theme.spacing(2),
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(1),
  },
  doneText: {
    color: theme.colors.white,
    fontSize: theme.fontSize.lg,
    fontWeight: "700",
  },
});
