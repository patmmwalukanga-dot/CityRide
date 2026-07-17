import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../hooks/useAuth";
import { useBookings } from "../hooks/useBookings";
import { theme } from "../styles/theme";

const DRIVER_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBsXOBIK-753ib451IRYqcZfASCQ0-cVerh_9iElgR7OaUySLiRaWubyjSC8z1Q7g0JaK6WrCG4XzHTV-nFLcnOVR5_vLTMqzVoIsqxTfUQNVI2SJ0WP2QG8W9HqFjMKByB5ggfaj_c9UTodekjFimAdECYGv7QJQzEnJzdJdWnwDH4UQV6MnSAwi0pcAuhEcs75f45T4RMWL-KW6lpwblZ2Di8s3I65ymoSXiKTqlNPn9jeoW4_WyCC4qN_fGxWIAaXFt9wNEsmwqE";
const MAP_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCj2OU4-nbKsyFi86CSTWDe7EJUw5S_oZhu1u6SdjGJVX0_XuAcHXfiM-88yuxzbt8foqyu4di-tTczWe-aVTRRYcah8ov2PdoHRqUIi49SlT9ra0x-ShR7Fz00SUc-aK-Px2Bh1RZbW4d0J12rnmIXXsB_rlE6-LUc0NmX8lWV2r-zuZDBAk04DVzRg_SXTf8hjtp5xpAMaYXSI1w-_vsc6BDLG2JVeDYGvVVdaGfNpjckXOU-Olijdi2qBN9v5hMOo3zTd-ZyAXXW";

export function BookingDetailsScreen({ bookingId }: { bookingId: string }) {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useAuth();
  const { bookings, acceptBooking, updateStatus } = useBookings();

  const booking = bookings.find((b) => b.id === bookingId);

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

  const isDriver = user?.role === "driver";

  return (
    <View style={styles.container}>
      <View style={styles.map}>
        <Image
          source={{ uri: MAP_IMAGE }}
          style={styles.mapImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.statusBanner}>
        <MaterialIcons name="near-me" size={18} color={theme.colors.onPrimary} />
        <Text style={styles.statusText}>Arriving in 2 mins</Text>
      </View>

      <View style={styles.bottomSheet}>
        <View style={styles.handle} />
        <View style={styles.driverRow}>
          <View style={styles.driverAvatarWrap}>
            <Image source={{ uri: DRIVER_AVATAR }} style={styles.driverAvatar} />
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>4.9</Text>
              <MaterialIcons name="star" size={10} color={theme.colors.onPrimary} />
            </View>
          </View>
          <View style={styles.driverInfo}>
            <Text style={styles.driverName}>{booking.driverName ?? "Alex"}</Text>
            <Text style={styles.driverMeta}>
              {booking.vehicle ?? "Silver Toyota Camry"} • {booking.plate ?? "7XYZ89"}
            </Text>
          </View>
          <View style={styles.driverActions}>
            <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8}>
              <MaterialIcons name="chat-bubble" size={22} color={theme.colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8}>
              <MaterialIcons name="call" size={22} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.progressWrap}>
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.progressLabel}>{booking.pickup}</Text>
            {isDriver && booking.status === "requested" && user ? (
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => updateStatus(booking.id, "cancelled")}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            ) : null}
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
    backgroundColor: theme.colors.surfaceContainerLow,
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
  statusBanner: {
    position: "absolute",
    top: 60,
    left: "50%",
    transform: [{ translateX: -80 }],
    zIndex: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(1),
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing(0.5),
    paddingHorizontal: theme.spacing(2),
    borderRadius: theme.radius.full,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  statusText: {
    color: theme.colors.onPrimary,
    fontSize: theme.fontSize.sm,
    fontWeight: "600",
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 40,
    paddingHorizontal: 20,
    paddingBottom: theme.spacing(3),
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.outlineVariant,
    opacity: 0.3,
    alignSelf: "center",
    marginBottom: theme.spacing(2),
  },
  driverRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(2),
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: theme.radius.lg,
    padding: theme.spacing(2),
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: -4 },
    elevation: 12,
  },
  driverAvatarWrap: {
    position: "relative",
    flexShrink: 0,
  },
  driverAvatar: {
    width: 64,
    height: 64,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surfaceVariant,
  },
  ratingBadge: {
    position: "absolute",
    bottom: -4,
    right: -4,
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    backgroundColor: theme.colors.primary,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: theme.radius.full,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  ratingText: {
    color: theme.colors.onPrimary,
    fontSize: theme.fontSize.sm,
    fontWeight: "700",
  },
  driverInfo: {
    flex: 1,
    minWidth: 0,
  },
  driverName: {
    fontSize: theme.fontSize.lg,
    fontWeight: "700",
    color: theme.colors.onSurface,
  },
  driverMeta: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.onSurfaceVariant,
    marginTop: 2,
  },
  driverActions: {
    flexDirection: "row",
    gap: theme.spacing(1),
  },
  actionBtn: {
    width: 48,
    height: 48,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    borderColor: theme.colors.outlineVariant,
    alignItems: "center",
    justifyContent: "center",
  },
  progressWrap: {
    marginTop: theme.spacing(3),
  },
  progressTrack: {
    height: 4,
    backgroundColor: theme.colors.surfaceContainerHighest,
    borderRadius: theme.radius.full,
    overflow: "hidden",
  },
  progressFill: {
    width: "75%",
    height: "100%",
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.full,
  },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
  progressLabel: {
    fontSize: theme.fontSize.sm,
    fontWeight: "600",
    color: theme.colors.onSurface,
  },
  cancelBtn: {
    paddingVertical: theme.spacing(0.5),
    paddingHorizontal: theme.spacing(1),
  },
  cancelText: {
    color: theme.colors.error,
    fontSize: theme.fontSize.sm,
    fontWeight: "700",
  },
  fallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(3),
  },
  fallbackText: {
    color: theme.colors.onSurfaceVariant,
  },
});
