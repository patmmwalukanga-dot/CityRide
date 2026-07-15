import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../hooks/useAuth";
import { useBookings } from "../hooks/useBookings";
import { theme } from "../styles/theme";

const RIDES: {
  id: string;
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  nameKey: string;
  eta: number;
  fare: number;
}[] = [
  { id: "standard", icon: "directions-car", nameKey: "booking.standard", eta: 3, fare: 12.5 },
  { id: "premium", icon: "local-taxi", nameKey: "booking.premium", eta: 5, fare: 18.0 },
];

export function BookingScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useAuth();
  const { requestBooking } = useBookings();

  const [selected, setSelected] = useState("standard");
  const [loading, setLoading] = useState(false);

  const selectedRide = RIDES.find((r) => r.id === selected) ?? RIDES[0];

  const handleRequest = () => {
    if (!user || loading) return;
    setLoading(true);
    setTimeout(() => {
      const booking = requestBooking({
        passengerId: user.uid,
        passengerName: user.name,
        pickup: t("booking.demoPickup"),
        destination: t("booking.demoDestination"),
        fare: selectedRide.fare,
      });
      setLoading(false);
      router.replace({ pathname: "/booking/[id]", params: { id: booking.id } });
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.map}>
        <View style={[styles.mapDot, { top: "72%", left: "22%" }]} />
        <View style={[styles.mapDot, styles.mapDotAccent, { top: "26%", right: "24%" }]} />
      </View>

      <View style={styles.pills}>
        <View style={styles.pill}>
          <MaterialIcons name="my-location" size={20} color={theme.colors.primary} />
          <Text style={styles.pillText} numberOfLines={1}>
            {t("booking.demoPickup")}
          </Text>
        </View>
        <View style={styles.pill}>
          <MaterialIcons name="location-on" size={20} color={theme.colors.danger} />
          <Text style={styles.pillText} numberOfLines={1}>
            {t("booking.demoDestination")}
          </Text>
        </View>
      </View>

      <View style={styles.sheet}>
        <View style={styles.grabber} />
        <Text style={styles.heading}>{t("booking.selectRide")}</Text>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          {RIDES.map((ride) => {
            const isSelected = ride.id === selected;
            return (
              <TouchableOpacity
                key={ride.id}
                style={[styles.ride, isSelected && styles.rideSelected]}
                onPress={() => setSelected(ride.id)}
                activeOpacity={0.8}
              >
                <View style={styles.rideIcon}>
                  <MaterialIcons name={ride.icon} size={28} color={theme.colors.primary} />
                </View>
                <View style={styles.rideText}>
                  <Text style={styles.rideName}>{t(ride.nameKey)}</Text>
                  <Text style={styles.rideEta}>{t("booking.minAway", { min: ride.eta })}</Text>
                </View>
                <Text style={styles.rideFare}>{`K ${ride.fare.toFixed(2)}`}</Text>
              </TouchableOpacity>
            );
          })}

          <View style={styles.payment}>
            <View style={styles.paymentIcon}>
              <MaterialIcons name="credit-card" size={18} color={theme.colors.white} />
            </View>
            <Text style={styles.paymentText}>{t("booking.paymentMethod")}</Text>
            <MaterialIcons
              name="expand-more"
              size={18}
              color={theme.colors.textMuted}
            />
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.request} onPress={handleRequest} activeOpacity={0.9}>
          <Text style={styles.requestText}>{t("booking.request", { type: t(selectedRide.nameKey) })}</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.overlay}>
          <View style={styles.overlayCard}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={styles.overlayTitle}>{t("booking.finding")}</Text>
            <Text style={styles.overlayText}>{t("booking.connecting")}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.surfaceContainer,
  },
  mapDot: {
    position: "absolute",
    width: 16,
    height: 16,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary,
    borderWidth: 4,
    borderColor: theme.colors.white,
  },
  mapDotAccent: {
    backgroundColor: theme.colors.danger,
  },
  pills: {
    position: "absolute",
    top: theme.spacing(3),
    left: theme.spacing(2),
    right: theme.spacing(2),
    gap: theme.spacing(1),
    zIndex: 10,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(1),
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing(1.5),
    paddingHorizontal: theme.spacing(2),
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  pillText: {
    flex: 1,
    fontSize: theme.fontSize.sm,
    fontWeight: "700",
    color: theme.colors.text,
  },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "64%",
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: theme.spacing(1),
    paddingHorizontal: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderBottomWidth: 0,
    zIndex: 20,
  },
  grabber: {
    width: 40,
    height: 4,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.border,
    opacity: 0.5,
    alignSelf: "center",
    marginVertical: theme.spacing(1),
  },
  heading: {
    fontSize: theme.fontSize.lg,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: theme.spacing(2),
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    gap: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  ride: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(2),
    backgroundColor: theme.colors.surfaceContainer,
    borderRadius: theme.radius.lg,
    paddingVertical: theme.spacing(2),
    paddingHorizontal: theme.spacing(2),
    borderWidth: 2,
    borderColor: "transparent",
  },
  rideSelected: {
    backgroundColor: theme.colors.surfaceContainer,
    borderColor: theme.colors.primary,
  },
  rideIcon: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  rideText: {
    flex: 1,
  },
  rideName: {
    fontSize: theme.fontSize.md,
    fontWeight: "700",
    color: theme.colors.text,
  },
  rideEta: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
  rideFare: {
    fontSize: theme.fontSize.lg,
    fontWeight: "700",
    color: theme.colors.text,
  },
  payment: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(2),
    borderTopWidth: 1,
    borderColor: theme.colors.border,
  },
  paymentIcon: {
    width: 24,
    height: 24,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  paymentText: {
    flex: 1,
    fontSize: theme.fontSize.sm,
    fontWeight: "700",
    color: theme.colors.text,
    letterSpacing: 1,
  },
  request: {
    marginTop: theme.spacing(2),
    height: 56,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  requestText: {
    color: theme.colors.white,
    fontSize: theme.fontSize.lg,
    fontWeight: "700",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.scrim,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 60,
  },
  overlayCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing(4),
    alignItems: "center",
    width: 280,
    gap: theme.spacing(2),
  },
  overlayTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: "700",
    color: theme.colors.text,
  },
  overlayText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
    textAlign: "center",
  },
});
