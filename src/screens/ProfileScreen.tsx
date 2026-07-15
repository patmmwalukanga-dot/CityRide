import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Screen } from "../components/Screen";
import { useAuth } from "../hooks/useAuth";
import { useLocalization } from "../hooks/useLocalization";
import { theme } from "../styles/theme";

type IconName = React.ComponentProps<typeof MaterialIcons>["name"];

interface NavItem {
  icon: IconName;
  label: string;
  onPress: () => void;
  value?: string;
}

export function ProfileScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { language, languages } = useLocalization();

  const goSettings = () =>
    router.push(user?.role === "driver" ? "/driver/settings" : "/settings");

  const currentLanguage =
    languages.find((l) => l.code === language)?.label ?? "";

  const initial = (user?.name ?? "?").charAt(0).toUpperCase();

  return (
    <Screen title={t("profile.title")}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>4.9</Text>
            <MaterialIcons name="star" size={14} color={theme.colors.white} />
          </View>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.subtitle}>{t("profile.memberSince")}</Text>
        </View>

        <ProfileGroup
          title={t("profile.groupAccount")}
          items={[
            { icon: "person", label: t("profile.personalInfo"), onPress: goSettings },
            { icon: "payments", label: t("profile.paymentMethods"), onPress: goSettings },
          ]}
        />
        <ProfileGroup
          title={t("profile.groupPreferences")}
          items={[
            { icon: "directions-car", label: t("profile.rideTypes"), onPress: goSettings },
            {
              icon: "language",
              label: t("settings.language"),
              value: currentLanguage,
              onPress: goSettings,
            },
          ]}
        />
        <ProfileGroup
          title={t("profile.groupSupport")}
          items={[
            { icon: "help", label: t("profile.helpCenter"), onPress: goSettings },
            { icon: "chat-bubble", label: t("profile.contactUs"), onPress: goSettings },
          ]}
        />
        <ProfileGroup
          title={t("profile.groupLegal")}
          items={[
            { icon: "gavel", label: t("profile.terms"), onPress: goSettings },
            { icon: "privacy-tip", label: t("profile.privacy"), onPress: goSettings },
          ]}
        />

        <TouchableOpacity style={styles.logout} onPress={signOut}>
          <MaterialIcons name="logout" size={20} color={theme.colors.danger} />
          <Text style={styles.logoutText}>{t("profile.signOut")}</Text>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  );
}

function ProfileGroup({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupTitle}>{title}</Text>
      <View style={styles.card}>
        {items.map((item, index) => (
          <View key={item.label}>
            {index > 0 && <View style={styles.divider} />}
            <TouchableOpacity style={styles.row} onPress={item.onPress}>
              <View style={styles.rowLead}>
                <MaterialIcons
                  name={item.icon}
                  size={22}
                  color={theme.colors.primary}
                />
                <Text style={styles.rowLabel}>{item.label}</Text>
              </View>
              <View style={styles.rowTrail}>
                {item.value ? (
                  <Text style={styles.rowValue}>{item.value}</Text>
                ) : null}
                <MaterialIcons
                  name="chevron-right"
                  size={20}
                  color={theme.colors.textMuted}
                />
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: theme.spacing(4),
  },
  header: {
    alignItems: "center",
    marginBottom: theme.spacing(4),
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surface,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: theme.fontSize.xl,
    fontWeight: "700",
    color: theme.colors.primary,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(0.5),
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing(0.5),
    paddingHorizontal: theme.spacing(1.5),
    borderRadius: theme.radius.full,
    marginTop: theme.spacing(1),
  },
  ratingText: {
    color: theme.colors.white,
    fontSize: theme.fontSize.sm,
    fontWeight: "700",
  },
  name: {
    fontSize: theme.fontSize.xl,
    fontWeight: "700",
    color: theme.colors.text,
    marginTop: theme.spacing(1),
  },
  subtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
    marginTop: theme.spacing(0.5),
  },
  group: {
    marginBottom: theme.spacing(3),
  },
  groupTitle: {
    fontSize: theme.fontSize.sm,
    fontWeight: "600",
    color: theme.colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: theme.spacing(1),
    paddingHorizontal: theme.spacing(1),
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: theme.spacing(2),
    paddingHorizontal: theme.spacing(2),
  },
  rowLead: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(2),
  },
  rowLabel: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    fontWeight: "600",
  },
  rowTrail: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(1),
  },
  rowValue: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginHorizontal: theme.spacing(2),
  },
  logout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(1),
    marginTop: theme.spacing(3),
    paddingVertical: theme.spacing(2),
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.danger,
  },
  logoutText: {
    fontSize: theme.fontSize.md,
    fontWeight: "600",
    color: theme.colors.danger,
  },
});
