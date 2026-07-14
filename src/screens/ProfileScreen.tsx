import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { Screen } from "../components/Screen";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { theme } from "../constants/theme";

export function ProfileScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user, signOut } = useAuth();

  return (
    <Screen title={t("profile.title")}>
      <View style={styles.card}>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <Text style={styles.role}>
          {t("profile.role")}: {user?.role}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.row}
        onPress={() =>
          router.push(user?.role === "driver" ? "/driver/settings" : "/settings")
        }
      >
        <Text style={styles.rowText}>{t("profile.settings")}</Text>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>

      <View style={styles.action}>
        <Button
          label={t("profile.signOut")}
          variant="ghost"
          onPress={signOut}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing(2),
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing(2),
  },
  name: {
    fontSize: theme.fontSize.lg,
    fontWeight: "700",
    color: theme.colors.text,
  },
  email: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
    marginTop: theme.spacing(0.5),
  },
  role: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.primary,
    marginTop: theme.spacing(0.5),
    textTransform: "capitalize",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing(1.5),
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  rowText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    fontWeight: "600",
  },
  chevron: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.textMuted,
  },
  action: {
    marginTop: theme.spacing(3),
  },
});
