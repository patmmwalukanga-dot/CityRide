import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { theme } from "../styles/theme";
import { useAuth } from "../hooks/useAuth";
import type { UserRole } from "../types";

export function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("passenger");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError("");
    const result = await signIn(email.trim(), password.trim(), role);
    if (result.error) {
      setError(result.error);
      setLoading(false);
    }
    // If no error, AuthContext will update user and app/index.tsx will redirect
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            style={styles.flex}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Brand Logo */}
            <Animated.View
              style={[
                styles.brandSection,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY }],
                },
              ]}
            >
              <View style={styles.brandIconContainer}>
                <Text style={styles.brandIcon}>▲</Text>
              </View>
              <Text style={styles.brandName}>CityRide</Text>
            </Animated.View>

            {/* Header */}
            <Animated.View
              style={[
                styles.headerSection,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY }],
                },
              ]}
            >
              <Text style={styles.headerTitle}>Welcome back</Text>
              <Text style={styles.headerSubtitle}>
                Sign in to your account to continue.
              </Text>
            </Animated.View>

            {/* Form */}
            <Animated.View
              style={[
                styles.form,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY }],
                },
              ]}
            >
              {/* Role Selection */}
              <View style={styles.roleContainer}>
                <Text style={styles.roleLabel}>I am a</Text>
                <View style={styles.roleButtons}>
                  <TouchableOpacity
                    style={[
                      styles.roleButton,
                      role === "passenger" && styles.roleButtonActive,
                    ]}
                    onPress={() => setRole("passenger")}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.roleButtonIcon,
                        role === "passenger" && styles.roleButtonIconActive,
                      ]}
                    >
                      👤
                    </Text>
                    <Text
                      style={[
                        styles.roleButtonText,
                        role === "passenger" && styles.roleButtonTextActive,
                      ]}
                    >
                      Passenger
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.roleButton,
                      role === "driver" && styles.roleButtonActive,
                    ]}
                    onPress={() => setRole("driver")}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.roleButtonIcon,
                        role === "driver" && styles.roleButtonIconActive,
                      ]}
                    >
                      🚗
                    </Text>
                    <Text
                      style={[
                        styles.roleButtonText,
                        role === "driver" && styles.roleButtonTextActive,
                      ]}
                    >
                      Driver
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Email Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="you@example.com"
                  placeholderTextColor={theme.colors.textMuted}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  textContentType="emailAddress"
                  autoComplete="email"
                  importantForAutofill="yes"
                />
              </View>

              {/* Password Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  placeholderTextColor={theme.colors.textMuted}
                  secureTextEntry
                  textContentType="password"
                  autoComplete="password"
                  importantForAutofill="yes"
                />
              </View>

              {/* Error Message */}
              {error ? (
                <Text style={styles.errorText}>{error}</Text>
              ) : null}

              {/* Forgot Password */}
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </TouchableOpacity>

              {/* Sign In Button */}
              <TouchableOpacity
                style={[styles.signInButton, loading && styles.signInButtonDisabled]}
                onPress={handleSignIn}
                activeOpacity={0.9}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={theme.colors.white} size="small" />
                ) : (
                  <Text style={styles.signInButtonText}>
                    Sign In as {role === "passenger" ? "Passenger" : "Driver"}
                  </Text>
                )}
              </TouchableOpacity>

              {/* Sign Up Link */}
              <TouchableOpacity
                style={styles.signUpLink}
                onPress={() => router.push("/signup")}
              >
                <Text style={styles.signUpText}>
                  Don't have an account?{" "}
                  <Text style={styles.signUpHighlight}>Sign Up</Text>
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 24,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surfaceContainer,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  backArrow: {
    fontSize: 22,
    color: theme.colors.text,
    fontWeight: "300",
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 24,
    paddingBottom: 40,
  },
  brandSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 40,
  },
  brandIconContainer: {
    width: 36,
    height: 36,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  brandIcon: {
    fontSize: 18,
    color: theme.colors.white,
  },
  brandName: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.primary,
    letterSpacing: -0.3,
  },
  headerSection: {
    gap: 8,
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: theme.colors.text,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: theme.colors.textMuted,
    lineHeight: 22,
  },
  form: {
    gap: 20,
  },
  roleContainer: {
    gap: 10,
  },
  roleLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: theme.colors.text,
    letterSpacing: 0.3,
  },
  roleButtons: {
    flexDirection: "row",
    gap: 12,
  },
  roleButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: theme.radius.md,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  roleButtonActive: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.surfaceVariant,
  },
  roleButtonIcon: {
    fontSize: 18,
  },
  roleButtonIconActive: {
    // no change needed
  },
  roleButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.textMuted,
  },
  roleButtonTextActive: {
    color: theme.colors.primary,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: theme.colors.text,
    letterSpacing: 0.3,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: theme.colors.text,
  },
  errorText: {
    fontSize: 13,
    color: theme.colors.danger,
    fontWeight: "500",
    textAlign: "center",
  },
  forgotPassword: {
    alignSelf: "flex-end",
  },
  forgotPasswordText: {
    fontSize: 14,
    color: theme.colors.secondary,
    fontWeight: "500",
  },
  signInButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    borderRadius: theme.radius.md,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  signInButtonDisabled: {
    opacity: 0.7,
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.white,
  },
  signUpLink: {
    alignItems: "center",
    paddingVertical: 4,
  },
  signUpText: {
    fontSize: 14,
    color: theme.colors.textMuted,
  },
  signUpHighlight: {
    color: theme.colors.primary,
    fontWeight: "600",
  },
});