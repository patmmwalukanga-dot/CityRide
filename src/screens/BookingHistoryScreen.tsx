import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { Screen } from "../components/Screen";
import { BookingCard } from "../components/BookingCard";
import { useAuth } from "../hooks/useAuth";
import { useBookings } from "../hooks/useBookings";
import { theme } from "../constants/theme";

export function BookingHistoryScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useAuth();
  const { bookingsForPassenger } = useBookings();

  const history = user ? bookingsForPassenger(user.uid) : [];

  return (
    <Screen title={t("history.title")}>
      <ScrollView contentContainerStyle={styles.list}>
        {history.length === 0 ? (
          <Text style={styles.empty}>{t("history.empty")}</Text>
        ) : (
          history.map((b) => (
            <BookingCard
              key={b.id}
              booking={b}
              onPress={() =>
                router.push({ pathname: "/booking/[id]", params: { id: b.id } })
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
