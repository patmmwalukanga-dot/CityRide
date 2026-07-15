import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { BookingCard } from "../components/BookingCard";
import { useBookings } from "../hooks/useBookings";
import { theme } from "../styles/theme";

const GLASS = "rgba(255, 255, 255, 0.85)";

export function DriverRequestsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { availableRequests } = useBookings();
  const insets = useSafeAreaInsets();

  const requests = availableRequests();

  return (
    <View style={styles.container}>
      {/* Top app bar */}
      <View style={[styles.appBar, { paddingTop: insets.top }]}>
        <TouchableOpacity style={styles.menuBtn} activeOpacity={0.8}>
          <MaterialIcons name="menu" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <View style={styles.titlePill}>
          <Text style={styles.titleText}>{t("driver.title")}</Text>
        </View>
        <View style={styles.spacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {requests.length === 0 ? (
          <Text style={styles.empty}>{t("driver.empty")}</Text>
        ) : (
          requests.map((b) => (
            <BookingCard
              key={b.id}
              booking={b}
              onPress={() =>
                router.push({
                  pathname: "/request/[id]",
                  params: { id: b.id },
                })
              }
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  appBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: theme.spacing(1),
    backgroundColor: GLASS,
  },
  menuBtn: {
    width: 48,
    height: 48,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  titlePill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.full,
    paddingVertical: theme.spacing(1),
    paddingHorizontal: theme.spacing(3),
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  titleText: {
    fontSize: theme.fontSize.md,
    fontWeight: "600",
    color: theme.colors.text,
  },
  spacer: {
    width: 48,
    height: 48,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(5),
  },
  empty: {
    color: theme.colors.textMuted,
    fontSize: theme.fontSize.md,
  },
});
