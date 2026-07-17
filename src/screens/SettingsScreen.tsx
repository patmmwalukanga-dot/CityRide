import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { Screen } from "../components/Screen";
import { useLocalization } from "../hooks/useLocalization";
import { theme } from "../styles/theme";

export function SettingsScreen() {
  const { t } = useTranslation();
  const { language, languages, setLanguage } = useLocalization();

  return (
    <Screen title={t("settings.title")}>
      <Text style={styles.label}>{t("settings.language")}</Text>
      <View style={styles.chips}>
        {languages.map((l) => (
          <TouchableOpacity
            key={l.code}
            style={[
              styles.chip,
              {
                backgroundColor:
                  language === l.code
                    ? theme.colors.primary
                    : theme.colors.surface,
              },
            ]}
            onPress={() => setLanguage(l.code)}
          >
            <Text
              style={[
                styles.chipText,
                {
                  color:
                    language === l.code
                      ? theme.colors.white
                      : theme.colors.text,
                },
              ]}
            >
              {l.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>{t("settings.theme")}</Text>
      <View style={styles.colors}>
        <View style={[styles.swatch, { backgroundColor: theme.colors.primary }]}>
          <Text style={styles.swatchText}>Primary</Text>
        </View>
        <View
          style={[styles.swatch, { backgroundColor: theme.colors.secondary }]}
        >
          <Text style={styles.swatchText}>Secondary</Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.onSurface,
    fontWeight: "600",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  chips: {
    flexDirection: "row",
    gap: theme.spacing(1),
  },
  chip: {
    flex: 1,
    height: 44,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  chipText: {
    fontWeight: "600",
  },
  colors: {
    flexDirection: "row",
    gap: theme.spacing(1),
  },
  swatch: {
    flex: 1,
    height: 56,
    borderRadius: theme.radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  swatchText: {
    color: theme.colors.white,
    fontWeight: "700",
  },
});
