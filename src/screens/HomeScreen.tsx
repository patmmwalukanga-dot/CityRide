import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../styles/theme";

export function HomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [destination, setDestination] = useState("");

  const goBooking = () => router.push("/booking");

  const quickPlaces: {
    icon: React.ComponentProps<typeof MaterialIcons>["name"];
    label: string;
    address: string;
    eta: number;
  }[] = [
    { icon: "home", label: t("home.quickHome"), address: t("home.addrHome"), eta: 12 },
    { icon: "work", label: t("home.quickWork"), address: t("home.addrWork"), eta: 25 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.map}>
        <View style={styles.userMarkerHalo} />
        <View style={styles.userMarker} />
        <View style={[styles.vehicleDot, { top: "42%", left: "38%" }]} />
        <View style={[styles.vehicleDot, { top: "58%", left: "62%" }]} />
        <View style={[styles.vehicleDot, { top: "65%", left: "30%" }]} />
      </View>

      <TouchableOpacity
        style={[styles.menu, { top: insets.top + theme.spacing(3) }]}
        activeOpacity={0.8}
      >
        <MaterialIcons name="menu" size={24} color={theme.colors.text} />
      </TouchableOpacity>

      <View style={[styles.sheet, { paddingBottom: insets.bottom + theme.spacing(3) }]}>
        <View style={styles.sheetHeader}>
          <Text style={styles.title}>{t("home.title")}</Text>
          <Text style={styles.subtitle}>{t("home.subtitle")}</Text>
        </View>

        <View style={styles.searchRow}>
          <MaterialIcons
            name="search"
            size={20}
            color={theme.colors.primary}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.input}
            placeholder={t("home.enterDestination")}
            placeholderTextColor={theme.colors.textMuted}
            value={destination}
            onChangeText={setDestination}
            onSubmitEditing={goBooking}
            returnKeyType="search"
          />
          <TouchableOpacity style={styles.later} onPress={goBooking}>
            <MaterialIcons name="schedule" size={18} color={theme.colors.white} />
            <Text style={styles.laterText}>{t("home.later")}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.quickList}>
          {quickPlaces.map((p) => (
            <TouchableOpacity
              key={p.label}
              style={styles.quickItem}
              onPress={goBooking}
              activeOpacity={0.7}
            >
              <View style={styles.quickIcon}>
                <MaterialIcons name={p.icon} size={20} color={theme.colors.text} />
              </View>
              <View style={styles.quickText}>
                <Text style={styles.quickLabel}>{p.label}</Text>
                <Text style={styles.quickAddress}>{p.address}</Text>
              </View>
              <Text style={styles.quickEta}>{t("home.eta", { min: p.eta })}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
  userMarkerHalo: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 64,
    height: 64,
    marginLeft: -32,
    marginTop: -32,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary,
    opacity: 0.15,
  },
  userMarker: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 16,
    height: 16,
    marginLeft: -8,
    marginTop: -8,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary,
    borderWidth: 4,
    borderColor: theme.colors.white,
  },
  vehicleDot: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary,
  },
  menu: {
    position: "absolute",
    top: theme.spacing(3),
    left: theme.spacing(3),
    width: 48,
    height: 48,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    zIndex: 50,
  },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderBottomWidth: 0,
    zIndex: 20,
  },
  sheetHeader: {
    marginBottom: theme.spacing(2),
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: "700",
    color: theme.colors.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
    marginTop: theme.spacing(0.5),
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surfaceContainer,
    borderRadius: theme.radius.md,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  searchIcon: {
    opacity: 0.5,
  },
  input: {
    flex: 1,
    height: 52,
    paddingHorizontal: theme.spacing(1.5),
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
  },
  later: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(0.5),
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing(1),
    paddingHorizontal: theme.spacing(1.5),
    borderRadius: theme.radius.sm,
  },
  laterText: {
    color: theme.colors.white,
    fontSize: theme.fontSize.sm,
    fontWeight: "600",
  },
  quickList: {
    marginTop: theme.spacing(1),
  },
  quickItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing(1.5),
    paddingHorizontal: theme.spacing(1),
    borderRadius: theme.radius.sm,
  },
  quickIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.surfaceVariant,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing(2),
  },
  quickText: {
    flex: 1,
  },
  quickLabel: {
    fontSize: theme.fontSize.sm,
    fontWeight: "600",
    color: theme.colors.text,
  },
  quickAddress: {
    fontSize: 12,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
  quickEta: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
  },
});
