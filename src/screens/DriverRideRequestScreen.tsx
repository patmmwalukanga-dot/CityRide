import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../hooks/useAuth";
import { useBookings } from "../hooks/useBookings";
import { formatFare } from "../utils/format";
import { theme } from "../styles/theme";

const GLASS = "rgba(255, 255, 255, 0.85)";
const GLASS_SURFACE = "rgba(249, 249, 249, 0.82)";

const DRIVER_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBytcQabpP8xaiSeqrqz4XC4zCfxNYDxx45Gg6uQeTVWAxx-_z7Ci2pL_JFcQrBBurI5eghpqumhCzgESJ9EeEh5iZ16_5HHvFreHaKHlMaeZ42Pzah7f8A9uOs1_pam_r0KQH0KBXPLY-GBznhXUzKJ-dnKFRUBz9PwBpGmsRDWFax_ZTyI35hSLXhZBMb4E4peTGFB9oMRtbRYWLiPuxrF0N-pgIcqT3r7EZYpaD6XOH67KKE5pCJr_Kq8LaKdVSLf0WQqRAPA-Tk";
const MAP_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD2imhw5CQV73Mo_ftbYnC757K0JtxOIBoe39xYMR-25M_5ddZmlBrD4rhXEWJAsHVrL_2Qv8cnze_ucWvbcRF9KZzmgmUqsQQEzoBQCdyzwOTSXYcn16qw-fuW8Slm8fEAh1uQr2NMoakXrxygl9hLIvxLqZ2E8JAxv4OnADNJF9PkHrHMUrU4GdG_41_dd1RFsoQ4VOxaDkjvAujwghUWxHgWlLXisfwBeEzhITAGJoZROJRO3BGdnZ2VjrEqnzrv6HSCgXKJoTcz";

const COUNTDOWN_START = 15;

export function DriverRideRequestScreen({ bookingId }: { bookingId: string }) {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useAuth();
  const { bookings, acceptBooking } = useBookings();
  const insets = useSafeAreaInsets();

  const booking = bookings.find((b) => b.id === bookingId);

  const [timeLeft, setTimeLeft] = useState(COUNTDOWN_START);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (expired) return;
    const id = setInterval(() => {
      setTimeLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          setExpired(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [expired]);

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

  const fare = formatFare(booking.fare ?? 65);
  const pickup = booking.pickup ?? "Levy Junction Mall";
  const dropoff = booking.destination ?? "Kabulonga Shopping Centre";

  const handleAccept = () => {
    if (!booking) return;
    acceptBooking(booking.id, user?.uid ?? "", user?.name ?? "");
    router.push({ pathname: "/active/[id]", params: { id: booking.id } });
  };

  const handleDecline = () => router.back();

  if (expired) {
    return (
      <View style={styles.container}>
        <View style={styles.map} />
        <View style={[styles.main, { paddingTop: insets.top + 80, paddingBottom: insets.bottom + 40 }]}>
          <View style={styles.modal}>
            <MaterialIcons
              name="timer-off"
              size={48}
              color={theme.colors.danger}
              style={styles.expiredIcon}
            />
            <Text style={styles.expiredTitle}>{t("request.expired")}</Text>
            <Text style={styles.expiredSub}>
              {t("driver.empty")}
            </Text>
            <TouchableOpacity
              style={styles.acceptBtn}
              onPress={() => router.back()}
              activeOpacity={0.9}
            >
              <Text style={styles.acceptText}>
                {t("request.backOnline").toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Map background */}
      <View style={styles.map}>
        <Image
          source={{ uri: MAP_IMAGE }}
          style={styles.mapImage}
          resizeMode="cover"
        />
        <View style={styles.mapOverlay} />
      </View>

      {/* Top app bar */}
      <View style={[styles.headerSafe, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image source={{ uri: DRIVER_AVATAR }} style={styles.headerAvatar} />
            <View style={styles.headerTitles}>
              <Text style={styles.headerTitle}>CityRide Driver</Text>
              <View style={styles.onlineRow}>
                <View style={styles.onlineDot} />
                <Text style={styles.onlineText}>{t("driverHome.online")}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.8}>
            <MaterialIcons name="sensors" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Request modal */}
      <View style={[styles.main, { paddingTop: insets.top + 80, paddingBottom: insets.bottom + 40 }]}>
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <View style={styles.countdown}>
              <Text style={styles.countdownText}>{timeLeft}</Text>
            </View>
            <Text style={styles.modalLabel}>{t("driverHome.newRequest")}</Text>
            <Text style={styles.fare}>{fare}</Text>
            <Text style={styles.fareSub}>
              <MaterialIcons name="schedule" size={16} color={theme.colors.white} />
              {` ${t("booking.minAway", { min: 5 })} (1.2 km)`}
            </Text>
          </View>

          {/* Route details */}
          <View style={styles.route}>
            <View style={styles.connector} />
            <View style={styles.routeRow}>
              <View style={styles.routeIcon}>
                <MaterialIcons
                  name="radio-button-checked"
                  size={22}
                  color={theme.colors.primary}
                />
              </View>
              <View style={styles.routeText}>
                <Text style={styles.routeLabel}>{t("request.pickup")}</Text>
                <Text style={styles.routeValue}>{pickup}</Text>
              </View>
            </View>
            <View style={styles.routeRow}>
              <View style={styles.routeIcon}>
                <MaterialIcons
                  name="location-on"
                  size={22}
                  color={theme.colors.danger}
                />
              </View>
              <View style={styles.routeText}>
                <Text style={styles.routeLabel}>{t("request.dropoff")}</Text>
                <Text style={styles.routeValue}>{dropoff}</Text>
              </View>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.acceptBtn}
              onPress={handleAccept}
              activeOpacity={0.9}
            >
              <Text style={styles.acceptText}>
                {t("driverHome.accept").toUpperCase()}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.declineBtn}
              onPress={handleDecline}
              activeOpacity={0.9}
            >
              <Text style={styles.declineText}>
                {t("request.decline").toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tier indicator */}
          <View style={styles.tier}>
            <View style={styles.tierLeft}>
              <MaterialIcons
                name="stars"
                size={20}
                color={theme.colors.primary}
              />
              <Text style={styles.tierText}>{t("request.goldTier")}</Text>
            </View>
            <Text style={styles.tierBonus}>{t("request.goldBonus")}</Text>
          </View>
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
    opacity: 0.8,
  },
  mapOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
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
    gap: theme.spacing(1),
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surfaceContainer,
  },
  headerTitles: {
    flexDirection: "column",
  },
  headerTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: "700",
    color: theme.colors.primary,
  },
  onlineRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.success,
  },
  onlineText: {
    fontSize: theme.fontSize.sm,
    fontWeight: "600",
    color: theme.colors.textMuted,
  },
  iconBtn: {
    padding: 4,
  },
  main: {
    flex: 1,
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 40,
  },
  modal: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: GLASS,
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
  },
  modalHeader: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing(3),
    alignItems: "center",
    position: "relative",
  },
  countdown: {
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(2),
    width: 48,
    height: 48,
    borderRadius: theme.radius.full,
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  countdownText: {
    color: theme.colors.white,
    fontSize: theme.fontSize.sm,
    fontWeight: "700",
  },
  modalLabel: {
    fontSize: theme.fontSize.sm,
    fontWeight: "600",
    color: theme.colors.white,
    textTransform: "uppercase",
    letterSpacing: 1,
    opacity: 0.7,
    marginBottom: theme.spacing(0.5),
  },
  fare: {
    fontSize: theme.fontSize.xl,
    fontWeight: "700",
    color: theme.colors.white,
  },
  fareSub: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.white,
    opacity: 0.8,
    marginTop: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  route: {
    padding: theme.spacing(3),
    gap: theme.spacing(3),
    position: "relative",
  },
  connector: {
    position: "absolute",
    left: 41,
    top: 44,
    bottom: 44,
    width: 2,
    backgroundColor: "rgba(207, 196, 197, 0.5)",
  },
  routeRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: theme.spacing(2),
  },
  routeIcon: {
    width: 24,
    marginTop: 2,
    alignItems: "center",
    zIndex: 10,
  },
  routeText: {
    flex: 1,
  },
  routeLabel: {
    fontSize: theme.fontSize.sm,
    fontWeight: "600",
    color: theme.colors.textMuted,
    textTransform: "uppercase",
  },
  routeValue: {
    fontSize: theme.fontSize.md,
    fontWeight: "600",
    color: theme.colors.text,
  },
  actions: {
    paddingHorizontal: theme.spacing(3),
    gap: theme.spacing(2),
  },
  acceptBtn: {
    width: "100%",
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing(2),
    borderRadius: theme.radius.lg,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  acceptText: {
    color: theme.colors.white,
    fontWeight: "600",
    fontSize: theme.fontSize.lg,
    letterSpacing: 0.5,
  },
  declineBtn: {
    width: "100%",
    backgroundColor: "transparent",
    paddingVertical: theme.spacing(2),
    borderRadius: theme.radius.lg,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  declineText: {
    color: theme.colors.textMuted,
    fontWeight: "600",
    fontSize: theme.fontSize.lg,
    letterSpacing: 0.5,
  },
  tier: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(2),
    backgroundColor: theme.colors.surfaceContainer,
    borderRadius: theme.radius.full,
    paddingVertical: theme.spacing(1.5),
    paddingHorizontal: theme.spacing(2),
  },
  tierLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(1),
  },
  tierText: {
    fontSize: theme.fontSize.sm,
    fontWeight: "600",
    color: theme.colors.textMuted,
  },
  tierBonus: {
    fontSize: theme.fontSize.sm,
    fontWeight: "700",
    color: theme.colors.primary,
  },
  expiredIcon: {
    marginBottom: theme.spacing(2),
  },
  expiredTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: "700",
    color: theme.colors.text,
  },
  expiredSub: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
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
