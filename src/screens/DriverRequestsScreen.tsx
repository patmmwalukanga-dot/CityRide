import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { Screen } from "../components/Screen";
import { BookingCard } from "../components/BookingCard";
import { useBookings } from "../hooks/useBookings";
import { theme } from "../constants/theme";

export function DriverRequestsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { availableRequests } = useBookings();

  const requests = availableRequests();

  return (
    <Screen title={t("driver.title")}>
      <ScrollView contentContainerStyle={styles.list}>
        {requests.length === 0 ? (
          <Text style={styles.empty}>{t("driver.empty")}</Text>
        ) : (
          requests.map((b) => (
            <BookingCard
              key={b.id}
              booking={b}
              onPress={() =>
                router.push({
                  pathname: "/driver/booking/[id]",
                  params: { id: b.id },
                })
              }
            />
          ))
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: theme.spacing(2),
  },
  empty: {
    color: theme.colors.textMuted,
    fontSize: theme.fontSize.md,
  },
});
