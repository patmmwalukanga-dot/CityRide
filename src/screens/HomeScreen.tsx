import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { Screen } from "../components/Screen";
import { Button } from "../components/Button";
import { BookingCard } from "../components/BookingCard";
import { useAuth } from "../hooks/useAuth";
import { useBookings } from "../hooks/useBookings";
import { theme } from "../styles/theme";

export function HomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useAuth();
  const { bookingsForPassenger } = useBookings();

  const recent = user ? bookingsForPassenger(user.uid).slice(0, 5) : [];

  return (
    <Screen title={t("home.title")}>
      <Button
        label={t("home.requestRide")}
        onPress={() => router.push("/booking")}
      />

      <Text style={styles.section}>{t("home.recent")}</Text>
      <ScrollView contentContainerStyle={styles.list}>
        {recent.length === 0 ? (
          <Text style={styles.empty}>{t("history.empty")}</Text>
        ) : (
          recent.map((b) => (
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
  section: {
    fontSize: theme.fontSize.lg,
    fontWeight: "700",
    color: theme.colors.text,
    marginVertical: theme.spacing(2),
  },
  list: {
    paddingBottom: theme.spacing(2),
  },
  empty: {
    color: theme.colors.textMuted,
    fontSize: theme.fontSize.md,
  },
});
