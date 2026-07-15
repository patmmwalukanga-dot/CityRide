import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useBookings } from "../hooks/useBookings";
import { theme } from "../styles/theme";

const DRIVER_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBsXOBIK-753ib451IRYqcZfASCQ0-cVerh_9iElgR7OaUySLiRaWubyjSC8z1Q7g0JaK6WrCG4XzHTV-nFLcnOVR5_vLTMqzVoIsqxTfUQNVI2SJ0WP2QG8W9HqFjMKByB5ggfaj_c9UTodekjFimAdECYGv7QJQzEnJzdJdWnwDH4UQV6MnSAwi0pcAuhEcs75f45T4RMWL-KW6lpwblZ2Di8s3I65ymoSXiKTqlNPn9jeoW4_WyCC4qN_fGxWIAaXFt9wNEsmwqE";

export function RideTrackingScreen({ bookingId }: { bookingId: string }) {
  const { t } = useTranslation();
  const router = useRouter();
  const { bookings, updateStatus } = useBookings();

  const booking = bookings.find((b) => b.id === bookingId);

  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(progress, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        }),
      ]),
    );
    const timer = setTimeout(() => loop.start(), 500);
    return () => {
      clearTimeout(timer);
      loop.stop();
    };
  }, [progress]);

  const carLeft = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["15%", "25%"],
  });
  const carTop = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["65%", "52%"],
  });

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

  const handleCancel = () => {
    updateStatus(booking.id, "cancelled");
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Mock map background */}
      <View style={styles.map}>
        <View style={[styles.routeDot, { top: "52%", left: "25%" }]} />
        <View
          style={[styles.routeDot, styles.routeDotAccent, { top: "65%", left: "15%" }]}
        />
      </View>

      {/* Pickup pin */}
      <View style={styles.pin}>
        <View style={styles.pinOuter}>
          <View style={styles.pinInner} />
        </View>
      </View>

      {/* Moving driver car */}
      <Animated.View style={[styles.car, { left: carLeft, top: carTop }]}>
        <View style={styles.carBubble}>
          <MaterialIcons
            name="directions-car"
            size={20}
            color={theme.colors.white}
          />
        </View>
      </Animated.View>

      {/* Status banner */}
      <View style={styles.banner}>
        <MaterialIcons name="near-me" size={18} color={theme.colors.white} />
        <Text style={styles.bannerText}>{t("tracking.arriving")}</Text>
      </View>

      {/* Menu / back */}
      <TouchableOpacity
        style={styles.menu}
        onPress={() => router.back()}
        activeOpacity={0.8}
      >
        <MaterialIcons name="menu" size={24} color={theme.colors.primary} />
      </TouchableOpacity>

      {/* Driver profile card */}
      <View style={styles.card}>
        <View style={styles.cardInner}>
          <View style={styles.handle} />

          <View style={styles.driverRow}>
            <View style={styles.avatarWrap}>
              <Image source={{ uri: DRIVER_AVATAR }} style={styles.avatar} />
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>4.9</Text>
                <MaterialIcons
                  name="star"
                  size={10}
                  color={theme.colors.secondary}
                />
              </View>
            </View>

            <View style={styles.driverInfo}>
              <Text numberOfLines={1} style={styles.driverName}>
                {booking.driverName ?? "Alex"}
              </Text>
              <Text numberOfLines={1} style={styles.driverCar}>
                Silver Toyota Camry • 7XYZ89
              </Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity style={styles.actionBtn} activeOpacity={0.9}>
                <MaterialIcons
                  name="chat-bubble"
                  size={22}
                  color={theme.colors.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn} activeOpacity={0.9}>
                <MaterialIcons name="call" size={22} color={theme.colors.primary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Progress */}
          <View style={styles.progressWrap}>
            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>
            <View style={styles.progressLabels}>
              <Text numberOfLines={1} style={styles.addressText}>
                {booking.pickup ?? "125 High St."}
              </Text>
              <TouchableOpacity onPress={handleCancel}>
                <Text style={styles.cancelText}>{t("tracking.cancel")}</Text>
              </TouchableOpacity>
            </View>
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
  routeDot: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary,
    borderWidth: 3,
    borderColor: theme.colors.white,
  },
  routeDotAccent: {
    backgroundColor: theme.colors.secondary,
  },
  pin: {
    position: "absolute",
    top: "52%",
    left: "25%",
    zIndex: 20,
    transform: [{ translateX: -12 }, { translateY: -24 }],
  },
  pinOuter: {
    width: 24,
    height: 24,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary,
    borderWidth: 2,
    borderColor: theme.colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  pinInner: {
    width: 6,
    height: 6,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.white,
  },
  car: {
    position: "absolute",
    zIndex: 20,
    transform: [{ rotate: "-45deg" }],
  },
  carBubble: {
    backgroundColor: theme.colors.primary,
    padding: 8,
    borderRadius: theme.radius.md,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  banner: {
    position: "absolute",
    top: theme.spacing(5),
    alignSelf: "center",
    zIndex: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(1),
    paddingVertical: theme.spacing(1),
    paddingHorizontal: theme.spacing(2),
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.full,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  bannerText: {
    color: theme.colors.white,
    fontSize: theme.fontSize.sm,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  menu: {
    position: "absolute",
    top: theme.spacing(5),
    left: theme.spacing(1),
    zIndex: 50,
    width: 40,
    height: 40,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  card: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 40,
    paddingHorizontal: theme.spacing(2),
    paddingBottom: theme.spacing(5),
  },
  cardInner: {
    backgroundColor: theme.colors.surface,
    borderRadius: 32,
    padding: theme.spacing(3),
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 12,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.border,
    opacity: 0.4,
    alignSelf: "center",
    marginBottom: theme.spacing(2),
  },
  driverRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(2),
  },
  avatarWrap: {
    position: "relative",
    flexShrink: 0,
  },
  avatar: {
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
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.sm,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: "700",
    color: theme.colors.text,
  },
  driverInfo: {
    flex: 1,
    minWidth: 0,
  },
  driverName: {
    fontSize: theme.fontSize.lg,
    fontWeight: "700",
    color: theme.colors.text,
  },
  driverCar: {
    fontSize: theme.fontSize.sm,
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
    backgroundColor: theme.colors.surfaceContainer,
    alignItems: "center",
    justifyContent: "center",
  },
  progressWrap: {
    marginTop: theme.spacing(3),
  },
  progressTrack: {
    height: 4,
    width: "100%",
    backgroundColor: theme.colors.surfaceContainer,
    borderRadius: theme.radius.full,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    width: "75%",
    backgroundColor: theme.colors.primary,
  },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  addressText: {
    flex: 1,
    fontSize: theme.fontSize.sm,
    fontWeight: "600",
    color: theme.colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  cancelText: {
    fontSize: theme.fontSize.sm,
    fontWeight: "700",
    color: theme.colors.danger,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginLeft: theme.spacing(2),
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
