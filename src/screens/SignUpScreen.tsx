import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { Screen } from "../components/Screen";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { theme } from "../styles/theme";
import type { UserRole } from "../types";

export function SignUpScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { signUp } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("passenger");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setError(null);
    setLoading(true);
    const res = await signUp({ name, email, phone, password, role });
    setLoading(false);
    if (res.error) {
      setError(res.error);
      return;
    }
    router.replace("/");
  };

  return (
    <Screen>
      <Text style={styles.title}>{t("auth.signupTitle")}</Text>
      <Text style={styles.subtitle}>{t("auth.signupSubtitle")}</Text>

      <View style={styles.form}>
        <Input label={t("common.name")} value={name} onChangeText={setName} />
        <Input
          label={t("common.email")}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Input
          label={t("common.phone")}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <Input
          label={t("common.password")}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={styles.roleLabel}>{t("auth.role")}</Text>
        <View style={styles.roleRow}>
          <RoleChip
            label={t("auth.passenger")}
            active={role === "passenger"}
            onPress={() => setRole("passenger")}
          />
          <RoleChip
            label={t("auth.driver")}
            active={role === "driver"}
            onPress={() => setRole("driver")}
          />
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Button label={t("auth.signUp")} onPress={onSubmit} loading={loading} />
      </View>

      <TouchableOpacity
        style={styles.link}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.linkText}>
          {t("auth.haveAccount")} {t("auth.signIn")}
        </Text>
      </TouchableOpacity>
    </Screen>
  );
}

function RoleChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        { backgroundColor: active ? theme.colors.primary : theme.colors.surface },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.chipText,
          { color: active ? theme.colors.white : theme.colors.text },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: "800",
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
  roleLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
    fontWeight: "600",
    marginBottom: theme.spacing(0.5),
  },
  roleRow: {
    flexDirection: "row",
    gap: theme.spacing(1),
    marginBottom: theme.spacing(2),
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
  error: {
    color: theme.colors.danger,
    marginBottom: theme.spacing(1.5),
  },
  link: {
    marginTop: theme.spacing(3),
    alignItems: "center",
  },
  linkText: {
    color: theme.colors.primary,
    fontWeight: "600",
  },
});
