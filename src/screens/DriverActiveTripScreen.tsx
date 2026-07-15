import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../hooks/useAuth";
import { useBookings } from "../hooks/useBookings";
import { theme } from "../styles/theme";

// Translucent surfaces matching the HTML glass-panel / surface bars.
const GLASS = "rgba(255, 255, 255, 0.85)";
const GLASS_SURFACE = "rgba(249, 249, 249, 0.82)";

const DRIVER_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC_LK49q9A1WIuU2eS7onA553kMGPDPp-WsHURCR_jdVzuU45jxMtN7ZBqAMVxVY2yTxm3kw-RrqxRQs1MfarWyejkRHsyQakwBuQ--QM28FjSHC-0XSjyIswqfSv0frMqpe40xLOmTZ759HVlv7sUPG52cQpE6yRyvBxg0y6CffW87Ge2EV8pfBl2nyjOZ4zSXnLmNtji45YvOW8Kz3mSCFvEv_1iHDS8xdpDrmcdUUdVw3weg3pet_0_x5PFyBe0henE-Lb6Qn9_5";
const PASSENGER_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCN5ZvQJAnUddBWgPfdn7fRnu8FC5lEK43l8Y9VG2rkAg5T7n8V0PtP2E_VjJwrg8dvcto7rj0y0AMxnIOpAAHqIYmPg0VOypuk-Juu0-KBuOP9B7azSZDVTrTkS0eoXY2aDbWk5-lzPCVawFeSHETE-p161GuRWrVeAh7uKVohtOsTu_yyAjmHjDhQ_ut0sHf7MP1fucEphAZ1im5ngs4FY8SLq7AFGwaiyqwStecvr7zHr6cYoFkqooqeJa10lj4K6jWgGN6hrAfK";
const MAP_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDfyMOC-1z9cVGlsfx0RRNoPR41HCz-Z_O5RHu4oo8fbUv8ooRuNGq-W2BQKB52va1T1UqIn1Q781q6ECc9csxFTbKerhmwIGD5d-TFa0Wia3AyyAqUOFOQuVQd5c5nifk7tkvFv6AW55-ZTPcFy5aE06liittinQaaJ93RCw-1CWIKj4BpSY_TzSmrdLemC3RBI--diJodvw75i1G9U3BU2md_CpWPVuGurSOTa_HEs1sxR41YukK2LqijGQ4GxzgBzZ-369yfuYMk";

type Phase = "idle" | "starting" | "started";

export function DriverActiveTripScreen({ bookingId }: { bookingId: string }) {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useAuth();
  const { bookings, updateStatus } = useBookings();
  const insets = useSafeAreaInsets();

  const booking = bookings.find((b) => b.id === bookingId);

  const [phase, setPhase] = useState<Phase>("idle");
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (phase !== "idle") return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.02,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [phase, pulse]);

  if (!booking) {
    return (
      <View style={styles.container}>
        <View style={styles.map} />
        <View style={styles.fallback}>
          <Text style={styles.fallbackText}>{t("history.empty")}</Text>
        </View>
      </View>
    );
  }

  const passengerName = booking.passengerName ?? "Sarah";
  const dropoff = booking.destination ?? "East Park Mall, Main Entrance";

  const handleArrived = () => {
    if (phase !== "idle" || !booking) return;
    setPhase("starting");
    updateStatus(booking.id, "in_progress");
    setTimeout(() => setPhase("started"), 800);
  };

  const arrivedLabel =
    phase === "idle"
      ? t("active.arrived")
      : phase === "starting"
        ? t("active.starting")
        : t("active.started");
  const arrivedBg = phase === "idle" ? theme.colors.primary : theme.colors.success;

  return (
    <View style={styles.container}>
      {/* Map layer */}
      <View style={styles.map}>
        <Image
          source={{ uri: MAP_IMAGE }}
          style={styles.mapImage}
          resizeMode="cover"
        />
      </View>

      {/* Top app bar */}
      <View style={[styles.headerSafe, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image source={{ uri: DRIVER_AVATAR }} style={styles.headerAvatar} />
            <Text style={styles.headerTitle}>CityRide Driver</Text>
          </View>
          <MaterialIcons
            name="sensors"
            size={24}
            color={theme.colors.primary}
          />
        </View>
      </View>

      {/* Live instruction bar */}
      <View style={[styles.instructionWrap, { top: insets.top + 80 }]}>
        <View style={styles.instruction}>
          <View style={styles.instructionIcon}>
            <MaterialIcons
              name="turn-left"
              size={32}
              color={theme.colors.white}
            />
          </View>
          <View style={styles.instructionBody}>
            <View style={styles.instructionTop}>
              <Text style={styles.instructionDist}>200m</Text>
              <Text style={styles.instructionLabel}>Turn Left</Text>
            </View>
            <Text style={styles.instructionRoad}>onto Great East Rd</Text>
          </View>
        </View>
      </View>

      {/* Passenger details sheet */}
      <View style={[styles.sheet, { paddingBottom: insets.bottom + theme.spacing(3) }]}>
        <View style={styles.sheetCard}>
          <View style={styles.handle} />

          <View style={styles.passengerRow}>
            <View style={styles.passengerLeft}>
              <Image
                source={{ uri: PASSENGER_AVATAR }}
                style={styles.passengerAvatar}
              />
              <View>
                <Text style={styles.passengerName}>{passengerName}</Text>
                <View style={styles.ratingRow}>
                  <MaterialIcons
                    name="star"
                    size={18}
                    color={theme.colors.secondary}
                  />
                  <Text style={styles.ratingText}>4.9 Star Rating</Text>
                </View>
              </View>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8}>
                <MaterialIcons
                  name="chat-bubble"
                  size={22}
                  color={theme.colors.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8}>
                <MaterialIcons
                  name="call"
                  size={22}
                  color={theme.colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Journey stats */}
          <View style={styles.stats}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>{t("active.distance")}</Text>
              <Text style={styles.statValue}>1.2 km</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>{t("active.time")}</Text>
              <Text style={styles.statValue}>4 min</Text>
            </View>
          </View>

          {/* Drop-off */}
          <View style={styles.destRow}>
            <MaterialIcons
              name="location-on"
              size={22}
              color={theme.colors.primary}
              style={styles.destIcon}
            />
            <View>
              <Text style={styles.destLabel}>{t("active.dropoff")}</Text>
              <Text style={styles.destValue}>{dropoff}</Text>
            </View>
          </View>

          {/* Primary action */}
          <Animated.View
            style={[styles.arrivedWrap, { transform: [{ scale: pulse }] }]}
          >
            <TouchableOpacity
              style={[styles.arrived, { backgroundColor: arrivedBg }]}
              onPress={handleArrived}
              activeOpacity={0.9}
            >
              <Text style={styles.arrivedText}>{arrivedLabel.toUpperCase()}</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
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
  mapImage: {
    width: "100%",
    height: "100%",
  },
  headerSafe: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: GLASS_SURFACE,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 64,
    paddingHorizontal: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(2),
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.full,
    borderWidth: 2,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surfaceVariant,
  },
  headerTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: "700",
    color: theme.colors.primary,
  },
  instructionWrap: {
    position: "absolute",
    top: 80,
    left: 0,
    right: 0,
    zIndex: 40,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  instruction: {
    width: "100%",
    maxWidth: 512,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(3),
    backgroundColor: GLASS,
    borderRadius: theme.radius.lg,
    padding: theme.spacing(2),
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  instructionIcon: {
    width: 56,
    height: 56,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  instructionBody: {
    flex: 1,
  },
  instructionTop: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: theme.spacing(0.5),
  },
  instructionDist: {
    fontSize: theme.fontSize.lg,
    fontWeight: "700",
    color: theme.colors.primary,
  },
  instructionLabel: {
    fontSize: theme.fontSize.sm,
    fontWeight: "600",
    color: theme.colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  instructionRoad: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
  sheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    paddingHorizontal: 20,
    paddingBottom: theme.spacing(3),
  },
  sheetCard: {
    backgroundColor: GLASS,
    borderRadius: 32,
    padding: theme.spacing(3),
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: -4 },
    elevation: 12,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.border,
    opacity: 0.3,
    alignSelf: "center",
    marginBottom: theme.spacing(2),
  },
  passengerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  passengerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(2),
  },
  passengerAvatar: {
    width: 64,
    height: 64,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surfaceVariant,
  },
  passengerName: {
    fontSize: theme.fontSize.lg,
    fontWeight: "700",
    color: theme.colors.text,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(0.5),
    marginTop: 2,
  },
  ratingText: {
    fontSize: theme.fontSize.sm,
    fontWeight: "600",
    color: theme.colors.textMuted,
  },
  actions: {
    flexDirection: "row",
    gap: theme.spacing(1),
  },
  actionBtn: {
    width: 48,
    height: 48,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  stats: {
    flexDirection: "row",
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.surfaceContainer,
    borderRadius: theme.radius.lg,
    padding: theme.spacing(2),
  },
  statLabel: {
    fontSize: theme.fontSize.sm,
    fontWeight: "600",
    color: theme.colors.textMuted,
    textTransform: "uppercase",
    marginBottom: theme.spacing(0.5),
  },
  statValue: {
    fontSize: theme.fontSize.lg,
    fontWeight: "700",
    color: theme.colors.primary,
  },
  destRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: theme.spacing(2),
    paddingVertical: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  destIcon: {
    marginTop: 2,
  },
  destLabel: {
    fontSize: theme.fontSize.sm,
    fontWeight: "600",
    color: theme.colors.textMuted,
    textTransform: "uppercase",
  },
  destValue: {
    fontSize: theme.fontSize.md,
    fontWeight: "700",
    color: theme.colors.text,
  },
  arrivedWrap: {
    marginTop: theme.spacing(3),
  },
  arrived: {
    height: 56,
    borderRadius: theme.radius.lg,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  arrivedText: {
    color: theme.colors.white,
    fontSize: theme.fontSize.lg,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  fallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(3),
  },
  fallbackText: {
    color: theme.colors.textMuted,
  },
});
