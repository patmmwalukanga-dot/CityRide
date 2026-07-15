import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { Screen } from "../components/Screen";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { theme } from "../styles/theme";

export function LoginScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setError(null);
    setLoading(true);
    const res = await signIn(email, password);
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

      <TouchableOpacity
        style={styles.link}
        onPress={() => router.push("/signup")}
      >
        <Text style={styles.linkText}>
          {t("auth.dontHaveAccount")} {t("auth.signUp")}
        </Text>
      </TouchableOpacity>
    </Screen>
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
