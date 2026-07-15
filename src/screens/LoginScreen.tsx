import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { Screen } from "../components/Screen";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import type { UserRole } from "../types";
import { theme } from "../styles/theme";

export function LoginScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { signIn, isFirebaseConfigured } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("passenger");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setError(null);
    setLoading(true);
    const res = await signIn(email, password, role);
    setLoading(false);
    if (res.error) {
      setError(res.error);
      return;
    }
    router.replace("/");
  };

  return (
    <Screen>
      <Text style={styles.title}>{t("auth.loginTitle")}</Text>
      <Text style={styles.subtitle}>{t("auth.loginSubtitle")}</Text>

      <View style={styles.form}>
        {!isFirebaseConfigured && (
          <View style={styles.roleSwitch}>
            <Text style={styles.roleLabel}>{t("auth.role")}</Text>
            <View style={styles.roleToggle}>
              <TouchableOpacity
                style={[styles.roleBtn, role === "passenger" && styles.roleBtnActive]}
                onPress={() => setRole("passenger")}
                activeOpacity={0.8}
              >
                <Text
                  style={[styles.roleText, role === "passenger" && styles.roleTextActive]}
                >
                  {t("auth.passenger")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.roleBtn, role === "driver" && styles.roleBtnActive]}
                onPress={() => setRole("driver")}
                activeOpacity={0.8}
              >
                <Text
                  style={[styles.roleText, role === "driver" && styles.roleTextActive]}
                >
                  {t("auth.driver")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <Input
          label={t("common.email")}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="you@example.com"
        />
        <Input
          label={t("common.password")}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="••••••••"
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Button label={t("auth.signIn")} onPress={onSubmit} loading={loading} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: "700",
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing(3),
  },
  form: {
    marginTop: theme.spacing(1),
  },
  roleSwitch: {
    marginBottom: theme.spacing(2),
  },
  roleLabel: {
    fontSize: theme.fontSize.sm,
    fontWeight: "600",
    color: theme.colors.textMuted,
    marginBottom: theme.spacing(0.5),
  },
  roleToggle: {
    flexDirection: "row",
    backgroundColor: theme.colors.surfaceContainer,
    borderRadius: theme.radius.md,
    padding: 4,
  },
  roleBtn: {
    flex: 1,
    paddingVertical: theme.spacing(1.5),
    borderRadius: theme.radius.sm,
    alignItems: "center",
  },
  roleBtnActive: {
    backgroundColor: theme.colors.primary,
  },
  roleText: {
    fontWeight: "600",
    color: theme.colors.textMuted,
  },
  roleTextActive: {
    color: theme.colors.white,
  },
  error: {
    color: theme.colors.danger,
    marginBottom: theme.spacing(1.5),
  },
});
