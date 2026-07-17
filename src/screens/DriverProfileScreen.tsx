import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../hooks/useAuth";
import { useLocalization } from "../hooks/useLocalization";
import { theme } from "../styles/theme";

const GLASS = "rgba(255, 255, 255, 0.85)";

const PROFILE_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC0k6_4u8PAfagmG6AfJU8NQ6PEM7KSqVbA2TWggcOzIHa-olz5h3rmqKcVtGxy_dtlUtUQWYyuClMXNT16wZOywiWyERCTKAyTAJ1agHKxRlH9yPMAX_oMYCxBa0v855Czc76Q53Jcc3TLqTzw8uxcYfqeiuwNJTRd7W6MR9gnSbkoJFO5T2g6BTVx101LSup1lMaySfxpY-wpR5TFHXsB4L9Tq1txTeChLGuoQ7j4WGNaA7WCq9TNiGxzAaeKaFP-KSzC-K2SbhjQ";

type IconName = React.ComponentProps<typeof MaterialIcons>["name"];

interface NavItem {
  icon: IconName;
  label: string;
  onPress: () => void;
  value?: string;
}

export function DriverProfileScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { language, languages } = useLocalization();
  const insets = useSafeAreaInsets();

  const name = user?.name ?? "Sarah Phiri";
  const currentLanguage =
    languages.find((l) => l.code === language)?.label ?? "";

  const goSettings = () =>
    router.push(user?.role === "driver" ? "/driver-settings" : "/settings");

  return (
    <View style={styles.container}>
      <View style={[styles.appBar, { paddingTop: insets.top }]}>
        <TouchableOpacity style={styles.menuBtn} activeOpacity={0.8}>
          <MaterialIcons name="menu" size={24} color={theme.colors.onSurface} />
        </TouchableOpacity>
        <View style={styles.titlePill}>
          <Text style={styles.titleText}>{t("profile.title")}</Text>
        </View>
        <View style={styles.spacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatarRing}>
              <Image source={{ uri: PROFILE_AVATAR }} style={styles.avatarImg} />
            </View>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>4.9</Text>
              <MaterialIcons
                name="star"
                size={14}
                color={theme.colors.onPrimary}
              />
            </View>
          </View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.subtitle}>{t("profile.memberSince")}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.groupTitle}>{t("driverProfile.earningsOverview")}</Text>
          <View style={styles.earnCard}>
            <View style={styles.earnCol}>
              <Text style={styles.earnLabel}>{t("driverProfile.totalEarnings")}</Text>
              <View style={styles.earnValueWrap}>
                <Text style={styles.earnCurrency}>ZK</Text>
                <Text style={styles.earnValue} numberOfLines={1} ellipsizeMode="tail">1,250.00</Text>
              </View>
            </View>
            <View style={[styles.earnCol, styles.earnCenter]}>
              <Text style={styles.earnLabel}>{t("driverProfile.trips")}</Text>
              <Text style={styles.earnValue}>14</Text>
            </View>
            <View style={[styles.earnCol, styles.earnRight]}>
              <Text style={styles.earnLabel}>{t("driverProfile.rating")}</Text>
              <Text style={styles.earnValue}>4.98</Text>
            </View>
          </View>
        </View>

        <NavGroup
          title={t("profile.groupAccount")}
          items={[
            { icon: "person", label: t("profile.personalInfo"), onPress: goSettings },
            {
              icon: "payments",
              label: t("profile.paymentMethods"),
              onPress: goSettings,
            },
          ]}
        />
        <NavGroup
          title={t("profile.groupPreferences")}
          items={[
            {
              icon: "directions-car",
              label: t("profile.rideTypes"),
              onPress: goSettings,
            },
            {
              icon: "language",
              label: t("settings.language"),
              value: currentLanguage,
              onPress: goSettings,
            },
          ]}
        />
        <NavGroup
          title={t("profile.groupSupport")}
          items={[
            { icon: "help", label: t("profile.helpCenter"), onPress: goSettings },
            {
              icon: "chat-bubble",
              label: t("profile.contactUs"),
              onPress: goSettings,
            },
          ]}
        />
        <NavGroup
          title={t("profile.groupLegal")}
          items={[
            { icon: "gavel", label: t("profile.terms"), onPress: goSettings },
            { icon: "privacy-tip", label: t("profile.privacy"), onPress: goSettings },
          ]}
        />

        <TouchableOpacity style={styles.logout} onPress={signOut} activeOpacity={0.9}>
          <MaterialIcons name="logout" size={20} color={theme.colors.error} />
          <Text style={styles.logoutText}>{t("profile.signOut")}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function NavGroup({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupTitle}>{title}</Text>
      <View style={styles.card}>
        {items.map((item, index) => (
          <View key={item.label}>
            {index > 0 && <View style={styles.divider} />}
            <TouchableOpacity style={styles.row} onPress={item.onPress} activeOpacity={0.7}>
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
    backgroundColor: "rgba(255, 255, 255, 0.85)",
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
    color: theme.colors.onSurface,
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
  header: {
    alignItems: "center",
    marginBottom: theme.spacing(5),
  },
  avatarWrap: {
    position: "relative",
    marginBottom: theme.spacing(3),
  },
  avatarRing: {
    width: 128,
    height: 128,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary,
    padding: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  avatarImg: {
    width: "100%",
    height: "100%",
    borderRadius: theme.radius.full,
    borderWidth: 4,
    borderColor: theme.colors.surface,
    backgroundColor: theme.colors.surfaceVariant,
  },
  ratingBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: theme.colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: theme.radius.full,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  ratingText: {
    color: theme.colors.onPrimary,
    fontSize: theme.fontSize.sm,
    fontWeight: "700",
  },
  name: {
    fontSize: theme.fontSize.xl,
    fontWeight: "700",
    color: theme.colors.primary,
    marginBottom: theme.spacing(1),
  },
  subtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.onSurfaceVariant,
  },
  section: {
    marginBottom: theme.spacing(4),
  },
  group: {
    marginBottom: theme.spacing(4),
  },
  groupTitle: {
    fontSize: theme.fontSize.sm,
    fontWeight: "600",
    color: theme.colors.secondary,
    paddingHorizontal: 4,
    marginBottom: theme.spacing(1.5),
  },
  earnCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: theme.radius.lg,
    padding: theme.spacing(3),
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  earnCol: {
    flex: 1,
    alignItems: "center",
  },
  earnCenter: {
    borderLeftWidth: 1,
    borderColor: theme.colors.outlineVariant,
  },
  earnRight: {
    borderLeftWidth: 1,
    borderColor: theme.colors.outlineVariant,
  },
  earnLabel: {
    fontSize: theme.fontSize.xs,
    fontWeight: "600",
    color: theme.colors.secondary,
    marginBottom: theme.spacing(1),
  },
  earnValueWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(0.5),
  },
  earnCurrency: {
    fontSize: theme.fontSize.xl,
    fontWeight: "700",
    color: theme.colors.primary,
  },
  earnValue: {
    fontSize: theme.fontSize.xl,
    fontWeight: "700",
    color: theme.colors.primary,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: theme.colors.outlineVariant,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: theme.spacing(2.5),
    paddingHorizontal: theme.spacing(2),
  },
  rowLead: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(2),
  },
  rowLabel: {
    fontSize: theme.fontSize.md,
    color: theme.colors.onSurface,
    fontWeight: "600",
  },
  rowTrail: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(1),
  },
  rowValue: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.onSurfaceVariant,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.outlineVariant,
    marginHorizontal: theme.spacing(2),
  },
  logout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(1),
    marginTop: theme.spacing(5),
    paddingVertical: theme.spacing(2),
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.error,
    backgroundColor: "rgba(186, 26, 26, 0.05)",
  },
  logoutText: {
    fontSize: theme.fontSize.md,
    fontWeight: "600",
    color: theme.colors.error,
  },
});
