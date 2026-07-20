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
  ImageBackground,
  Linking,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../styles/theme";
import { useAuth } from "../hooks/useAuth";
import type { UserRole } from "../types";

const BACKGROUND_IMAGE =
  "https://lh3.googleusercontent.com/aida/AP1WRLs8D-BHDyE74Kotu9bgYpQYYnEE2wqy31UV3jd0hnpqVhMppyX5Bad0lgU2VOs_kAQOujA-UGOm3_7rPKyfC7mJwgsCyprp-p82S1f1oB6_qbbb073Ukafe7egIQFANkERHZe3tPWlw_unRjzR54OS7Hfhnl6Hnol-MA4ZcwHxCm0_idm3iJ0SnnXZSYD6eAArWMzcgSsrmiKeWpaYszePcQFt4prJeJd_QGpfchbAZGvCaAoQua8M-e2pG";

export function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("passenger");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;
  const buttonsFade = useRef(new Animated.Value(0)).current;
  const formFade = useRef(new Animated.Value(0)).current;

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

    Animated.timing(buttonsFade, {
      toValue: 1,
      duration: 600,
      delay: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  React.useEffect(() => {
    if (showEmailForm) {
      Animated.timing(formFade, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    } else {
      formFade.setValue(0);
    }
  }, [showEmailForm]);

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
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: BACKGROUND_IMAGE }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Dark overlay */}
        <View style={styles.backgroundOverlay} />

        {/* Decorative circle */}
        <View style={styles.decorativeCircle} />

        <SafeAreaView style={styles.safeArea}>
          {/* Back Button - glassmorphism style */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={22}
              color="#1B1B1B"
            />
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
                  <MaterialCommunityIcons
                    name="navigation"
                    size={20}
                    color="#FFFFFF"
                  />
                </View>
                <Text style={styles.brandName}>CityRide</Text>
              </Animated.View>

              {/* Headline Section */}
              <Animated.View
                style={[
                  styles.headlineSection,
                  {
                    opacity: fadeAnim,
                    transform: [{ translateY }],
                  },
                ]}
              >
                <Text style={styles.headlineTitle}>Welcome back</Text>
                <Text style={styles.headlineSubtitle}>
                  Sign in to your account to continue.
                </Text>
              </Animated.View>

              {/* Role Selection */}
              <Animated.View
                style={[
                  styles.roleContainer,
                  {
                    opacity: fadeAnim,
                    transform: [{ translateY }],
                  },
                ]}
              >
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
                    <Text style={styles.roleButtonIcon}>👤</Text>
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
                    <Text style={styles.roleButtonIcon}>🚗</Text>
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
              </Animated.View>

                {/* Action Buttons (when email form is hidden) */}
              {!showEmailForm && (
                <Animated.View
                  style={[
                    styles.actionButtons,
                    { opacity: buttonsFade },
                  ]}
                >
                  {/* Continue with Email Button */}
                  <TouchableOpacity
                    style={styles.emailButton}
                    onPress={() => setShowEmailForm(true)}
                    activeOpacity={0.9}
                  >
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={20}
                      color={theme.colors.onPrimary}
                    />
                    <Text style={styles.emailButtonText}>
                      Continue with Email
                    </Text>
                  </TouchableOpacity>

                  {/* Terms & Privacy */}
                  <Text style={styles.termsText}>
                    By signing in, you agree to our{" "}
                    <Text
                      style={styles.termsLink}
                      onPress={() => Linking.openURL("#")}
                    >
                      Terms of Service
                    </Text>{" "}
                    and{" "}
                    <Text
                      style={styles.termsLink}
                      onPress={() => Linking.openURL("#")}
                    >
                      Privacy Policy
                    </Text>
                    .
                  </Text>

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
              )}

              {/* Email Form (shown when "Continue with Email" is pressed) */}
              {showEmailForm && (
                <Animated.View
                  style={[
                    styles.emailForm,
                    {
                      opacity: formFade,
                    },
                  ]}
                >
                  {/* Email Input */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput
                      style={styles.input}
                      value={email}
                      onChangeText={setEmail}
                      placeholder="you@example.com"
                      placeholderTextColor="#848484"
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
                      placeholderTextColor="#848484"
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
                    <Text style={styles.forgotPasswordText}>
                      Forgot password?
                    </Text>
                  </TouchableOpacity>

                  {/* Sign In Button */}
                  <TouchableOpacity
                    style={[styles.signInButton, loading && styles.signInButtonDisabled]}
                    onPress={handleSignIn}
                    activeOpacity={0.9}
                    disabled={loading}
                  >
                    {loading ? (
                      <ActivityIndicator color="#000000" size="small" />
                    ) : (
                      <Text style={styles.signInButtonText}>
                        Sign In as {role === "passenger" ? "Passenger" : "Driver"}
                      </Text>
                    )}
                  </TouchableOpacity>

                  {/* Back to sign-in options */}
                  <TouchableOpacity
                    style={styles.backToOptions}
                    onPress={() => {
                      setShowEmailForm(false);
                      setError("");
                    }}
                  >
                    <Text style={styles.backToOptionsText}>
                      Other sign-in options
                    </Text>
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
              )}
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  decorativeCircle: {
    position: "absolute",
    top: -80,
    right: -80,
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    opacity: 0.3,
  },
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 9999,
    backgroundColor: "rgba(249,249,249,0.8)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.08,
    shadowRadius: 40,
    elevation: 6,
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
    marginBottom: 32,
  },
  brandIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  brandName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.3,
  },
  headlineSection: {
    gap: 8,
    marginBottom: 32,
  },
  headlineTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  headlineSubtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.6)",
    lineHeight: 22,
  },
  roleContainer: {
    gap: 10,
    marginBottom: 24,
  },
  roleLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
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
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  roleButtonActive: {
    borderColor: "#FFFFFF",
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  roleButtonIcon: {
    fontSize: 18,
  },
  roleButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgba(255,255,255,0.7)",
  },
  roleButtonTextActive: {
    color: "#FFFFFF",
  },
  actionButtons: {
    gap: 20,
  },
  emailButton: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  emailButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  termsText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.5)",
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 8,
  },
  termsLink: {
    color: "#FFFFFF",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  emailForm: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#FFFFFF",
  },
  errorText: {
    fontSize: 13,
    color: "#BA1A1A",
    fontWeight: "500",
    textAlign: "center",
  },
  forgotPassword: {
    alignSelf: "flex-end",
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    fontWeight: "500",
  },
  signInButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
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
    color: "#000000",
  },
  backToOptions: {
    alignItems: "center",
    paddingVertical: 4,
  },
  backToOptionsText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    fontWeight: "500",
  },
  signUpLink: {
    alignItems: "center",
    paddingVertical: 4,
  },
  signUpText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
  },
  signUpHighlight: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});