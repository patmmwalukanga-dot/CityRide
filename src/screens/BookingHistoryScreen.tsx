import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Screen } from "../components/Screen";
import { StatusBadge } from "../components/StatusBadge";
import { useAuth } from "../hooks/useAuth";
import { useBookings } from "../hooks/useBookings";
import { formatFare, formatTimestamp } from "../utils/format";
import { theme } from "../styles/theme";
import type { Booking, BookingStatus } from "../types";

const PAST: BookingStatus[] = ["completed", "cancelled"];
const UPCOMING: BookingStatus[] = ["requested", "accepted", "in_progress"];

export function BookingHistoryScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useAuth();
  const { bookings, bookingsForPassenger } = useBookings();
  const [tab, setTab] = useState<"past" | "upcoming">("past");

  const source = user ? bookingsForPassenger(user.uid) : bookings;
  const list = source.filter((b) =>
    (tab === "past" ? PAST : UPCOMING).includes(b.status),
  );

  const open = (id: string) =>
    router.push({ pathname: "/booking/[id]", params: { id } });

  return (
    <Screen title={t("history.title")}>
      <View style={styles.tabs}>
        <TabButton
          label={t("history.past")}
          active={tab === "past"}
          onPress={() => setTab("past")}
        />
        <TabButton
          label={t("history.upcoming")}
          active={tab === "upcoming"}
          onPress={() => setTab("upcoming")}
        />
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {list.length === 0 ? (
          <Text style={styles.empty}>{t("history.empty")}</Text>
        ) : (
          list.map((b) => (
            <TouchableOpacity
              key={b.id}
              style={styles.card}
              onPress={() => open(b.id)}
              activeOpacity={0.8}
            >
              <View style={styles.thumb}>
                <MaterialIcons
                  name="map"
                  size={28}
                  color={theme.colors.textMuted}
                />
              </View>
              <View style={styles.body}>
                <View style={styles.topRow}>
                  <Text style={styles.dest} numberOfLines={1}>
                    {b.destination}
                  </Text>
                  <Text style={styles.fare}>{formatFare(b.fare)}</Text>
                </View>
                <View style={styles.bottomRow}>
                  <View style={styles.meta}>
                    <View style={styles.dateRow}>
                      <MaterialIcons
                        name="calendar-today"
                        size={14}
                        color={theme.colors.textMuted}
                      />
                      <Text style={styles.date}>{formatTimestamp(b.createdAt)}</Text>
                    </View>
                    <Text style={styles.driver}>
                      {t("history.driver", { name: b.driverName ?? "—" })}
                    </Text>
                  </View>
                  <StatusBadge status={b.status} />
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </Screen>
  );
}

function TabButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.tab, active && styles.tabActive]}
      onPress={onPress}
    >
      <Text style={[styles.tabText, active && styles.tabTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: "row",
    backgroundColor: theme.colors.surfaceContainer,
    borderRadius: theme.radius.md,
    padding: 4,
    marginBottom: theme.spacing(2),
  },
  tab: {
    flex: 1,
    paddingVertical: theme.spacing(1.5),
    borderRadius: theme.radius.sm,
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: theme.colors.surface,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  tabText: {
    fontSize: theme.fontSize.sm,
    fontWeight: "600",
    color: theme.colors.textMuted,
  },
  tabTextActive: {
    color: theme.colors.primary,
  },
  list: {
    paddingBottom: theme.spacing(2),
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(2),
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surfaceVariant,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 1,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dest: {
    flex: 1,
    fontSize: theme.fontSize.md,
    fontWeight: "700",
    color: theme.colors.text,
    marginRight: theme.spacing(1),
  },
  fare: {
    fontSize: theme.fontSize.md,
    fontWeight: "700",
    color: theme.colors.primary,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: theme.spacing(0.5),
  },
  meta: {
    flex: 1,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  date: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
  },
  driver: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
  empty: {
    color: theme.colors.textMuted,
    fontSize: theme.fontSize.md,
  },
});
