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
import { useBookings } from "../hooks/useBookings";
import { formatFare } from "../utils/format";
import { theme } from "../styles/theme";

const GLASS = "rgba(255, 255, 255, 0.85)";
const GLASS_SURFACE = "rgba(249, 249, 249, 0.82)";

const DRIVER_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCOyQi4W0JcY9SPu-4n9YmdztByqrmX74qXLEj4bj5di1ngfv3_q02dzwahJciuKk0keh0i0jsu8d91DlUEkGC1RSbBnbppc-Bzr99k2GAOGC7yjcuWlhrTSBp3rBQzNA-Qcki3SFFiuyMde2_1cqKA5RPn7eaa7v-RZdL0U3fcLgMpQC5-mLqDKHXFRKZaiD8Dd4J30ou0LAsHiWFoqsa4Fhp2wBAXRD1ES8fLtrcKBhIB4KMoSaS4fLjy1PIjNpr1MRRnJtq80Xk";
const MAP_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuApHEUy7S1WifLJEwXaUGsRg9kBXdaSy509V5LrUvXHLbNQ7oDBjdu3Vaz0zW6J3mP0KHIZ31KJiNikIOjdyj-y07nPDBRd4TZ6FJ4mK_FrsiJRj_e31PGfbJHmm8bIN0irT_cgUOCwU4mXTnuVTIbZU177CZWxmh0caUdkkh8tsHAhYgF-VnycmdmrfQaxt0xdE5S0fGcZT9DLYYI8j9JXdXnw8ikIm1HDXViGQvgf9gRa2ojCej_u6ENifLsnu1JAVv_mf9jSJL7Y";

export function DriverHomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { availableRequests } = useBookings();
  const insets = useSafeAreaInsets();

  const [online, setOnline] = useState(true);
  const requests = availableRequests();
  const request = requests[0];

  const ping = useRef(new Animated.Value(0)).current;
  const dot = useRef(new Animated.Value(0.3)).current;
  const reqPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pingLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(ping, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(ping, { toValue: 0, duration: 0, useNativeDriver: true }),
      ]),
    );
    const dotLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(dot, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(dot, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ]),
    );
    pingLoop.start();
    dotLoop.start();
    return () => {
      pingLoop.stop();
      dotLoop.stop();
    };
  }, [ping, dot]);

  useEffect(() => {
    if (!online) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(reqPulse, {
          toValue: 1.02,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(reqPulse, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [online, reqPulse]);

  const pingScale = ping.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2.2],
  });
  const pingOpacity = ping.interpolate({
    inputRange: [0, 1],
    outputRange: [0.18, 0],
  });

  return (
    <View style={styles.container}>
      {/* Map */}
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
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconBtn} activeOpacity={0.8}>
              <MaterialIcons name="sensors" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn} activeOpacity={0.8}>
              <MaterialIcons
                name="notifications"
                size={24}
                color={theme.colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Online badge */}
      <View style={[styles.onlineBadge, { top: insets.top + 80 }]}>
        <Animated.View
          style={[styles.onlineDot, { opacity: dot }]}
        />
        <Text style={styles.onlineText}>{t("driverHome.online")}</Text>
      </View>

      {/* Vehicle marker */}
      <View style={styles.markerWrap}>
        <Animated.View
          style={[
            styles.pingRing,
            { transform: [{ scale: pingScale }], opacity: pingOpacity },
          ]}
        />
        <View style={styles.vehicleBubble}>
          <MaterialIcons
            name="directions-car"
            size={28}
            color={theme.colors.white}
          />
        </View>
      </View>

      {/* Bottom interaction zone */}
      <View style={[styles.bottomZone, { paddingBottom: insets.bottom || theme.spacing(3) }]}>
        {online ? (
          request ? (
            <Animated.View
              style={[styles.requestCardWrap, { transform: [{ scale: reqPulse }] }]}
            >
              <TouchableOpacity
                style={styles.requestCard}
                onPress={() =>
                  router.push({
                    pathname: "/request/[id]",
                    params: { id: request.id },
                  })
                }
                activeOpacity={0.9}
              >
                <View style={styles.reqInfo}>
                  <Text style={styles.reqTitle}>{t("driverHome.newRequest")}</Text>
                  <Text style={styles.reqSub}>
                    {`${formatFare(request.fare ?? 65)} • ${t("booking.minAway", { min: 5 })}`}
                  </Text>
                </View>
                <MaterialIcons
                  name="chevron-right"
                  size={22}
                  color={theme.colors.primary}
                />
              </TouchableOpacity>
            </Animated.View>
          ) : (
            <View style={styles.requestCard}>
              <Text style={styles.reqTitle}>{t("driverHome.noRequests")}</Text>
            </View>
          )
        ) : (
          <View style={styles.requestCard}>
            <Text style={styles.reqTitle}>{t("driverHome.offline")}</Text>
          </View>
        )}

        {/* Stats */}
        <View style={styles.statsCard}>
          <View style={[styles.statCol, styles.statLeft]}>
            <Text style={styles.statLabel}>{t("driverHome.rides")}</Text>
            <Text style={styles.statValue}>3</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={[styles.statCol, styles.statRight]}>
            <Text style={styles.statLabel}>{t("driverProfile.rating")}</Text>
            <View style={styles.ratingRow}>
              <MaterialIcons
                name="star"
                size={16}
                color={theme.colors.primary}
              />
              <Text style={styles.statValue}>4.9</Text>
            </View>
          </View>
        </View>

        {/* Online / Offline toggle */}
        <TouchableOpacity
          style={styles.offlineBtn}
          onPress={() => setOnline((o) => !o)}
          activeOpacity={0.9}
        >
          <MaterialIcons
            name="power-settings-new"
            size={22}
            color={theme.colors.white}
          />
          <Text style={styles.offlineText}>
            {online ? t("driverHome.goOffline") : t("driverHome.goOnline")}
          </Text>
        </TouchableOpacity>
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
    opacity: 0.9,
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
    gap: theme.spacing(1.5),
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.full,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.surfaceVariant,
  },
  headerTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: "700",
    color: theme.colors.primary,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(2),
  },
  iconBtn: {
    padding: 4,
  },
  onlineBadge: {
    position: "absolute",
    top: 80,
    alignSelf: "center",
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(0.5),
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
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.success,
  },
  onlineText: {
    color: theme.colors.white,
    fontSize: theme.fontSize.sm,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  markerWrap: {
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: 10,
    transform: [{ translateX: -30 }, { translateY: -30 }],
    alignItems: "center",
    justifyContent: "center",
  },
  pingRing: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 96,
    height: 96,
    marginLeft: -48,
    marginTop: -48,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary,
  },
  vehicleBubble: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: theme.radius.full,
    borderWidth: 4,
    borderColor: theme.colors.white,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  bottomZone: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    paddingHorizontal: 20,
    gap: theme.spacing(2),
  },
  requestCardWrap: {
    width: "100%",
  },
  requestCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: GLASS,
    borderRadius: theme.radius.lg,
    padding: theme.spacing(2),
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  reqInfo: {
    flex: 1,
  },
  reqTitle: {
    color: theme.colors.primary,
    fontWeight: "700",
    fontSize: theme.fontSize.sm,
  },
  reqSub: {
    color: theme.colors.textMuted,
    fontSize: theme.fontSize.sm,
    fontWeight: "600",
    textTransform: "uppercase",
    marginTop: 2,
  },
  acceptBtn: {
    backgroundColor: theme.colors.success,
    paddingVertical: theme.spacing(1.5),
    paddingHorizontal: theme.spacing(3),
    borderRadius: theme.radius.md,
    marginLeft: theme.spacing(2),
  },
  acceptText: {
    color: theme.colors.white,
    fontWeight: "600",
    fontSize: theme.fontSize.md,
    letterSpacing: 0.5,
  },
  statsCard: {
    flexDirection: "row",
    backgroundColor: GLASS,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    padding: theme.spacing(2),
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: -4 },
    elevation: 6,
  },
  statCol: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  statLeft: {
    borderRightWidth: 1,
    borderColor: "rgba(207, 196, 197, 0.3)",
  },
  statRight: {
    borderLeftWidth: 1,
    borderColor: "rgba(207, 196, 197, 0.3)",
  },
  statLabel: {
    fontSize: theme.fontSize.sm,
    fontWeight: "600",
    color: theme.colors.textMuted,
    textTransform: "uppercase",
  },
  statValue: {
    fontSize: theme.fontSize.lg,
    fontWeight: "700",
    color: theme.colors.primary,
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statDivider: {
    width: 0,
  },
  offlineBtn: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(1),
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing(2.5),
    borderRadius: theme.radius.lg,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  offlineText: {
    color: theme.colors.white,
    fontWeight: "600",
    fontSize: theme.fontSize.lg,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
