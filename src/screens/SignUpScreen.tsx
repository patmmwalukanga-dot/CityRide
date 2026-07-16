import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from "react-native";
import { useRouter } from "expo-router";
import { theme } from "../styles/theme";
import type { UserRole } from "../types";

export function SignUpScreen() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>("passenger");

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;
  const buttonsFade = useRef(new Animated.Value(0)).current;

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

  const handleEmailSignUp = () => {
    router.push({
      pathname: "/signup-email",
      params: { role },
    });
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

        {/* Main Content */}
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY }],
            },
          ]}
        >
          {/* Brand Logo */}
          <View style={styles.brandSection}>
            <View style={styles.brandIconContainer}>
              <Text style={styles.brandIcon}>▲</Text>
            </View>
            <Text style={styles.brandName}>CityRide</Text>
          </View>

          {/* Headline Section */}
          <View style={styles.headlineSection}>
            <Text style={styles.headlineTitle}>Create your account</Text>
            <Text style={styles.headlineSubtitle}>
              Start your journey with CityRide today.
            </Text>
          </View>

          {/* Role Selection */}
          <View style={styles.roleContainer}>
            <Text style={styles.roleLabel}>I want to sign up as</Text>
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
                    styles.roleButtonTitle,
                    role === "passenger" && styles.roleButtonTitleActive,
                  ]}
                >
                  Passenger
                </Text>
                <Text
                  style={[
                    styles.roleButtonDesc,
                    role === "passenger" && styles.roleButtonDescActive,
                  ]}
                >
                  Book minibus rides
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
                    styles.roleButtonTitle,
                    role === "driver" && styles.roleButtonTitleActive,
                  ]}
                >
                  Driver
                </Text>
                <Text
                  style={[
                    styles.roleButtonDesc,
                    role === "driver" && styles.roleButtonDescActive,
                  ]}
                >
                  Offer minibus rides
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {/* Buttons Section */}
        <Animated.View
          style={[
            styles.buttonsSection,
            { opacity: buttonsFade },
          ]}
        >
          {/* Continue with Email */}
          <TouchableOpacity
            style={styles.emailButton}
            onPress={handleEmailSignUp}
            activeOpacity={0.9}
          >
            <Text style={styles.emailIcon}>✉</Text>
            <Text style={styles.emailButtonText}>
              Continue as {role === "passenger" ? "Passenger" : "Driver"}
            </Text>
          </TouchableOpacity>

          {/* Terms & Privacy */}
          <Text style={styles.termsText}>
            By signing up, you agree to our{" "}
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

          {/* Sign In Link */}
          <TouchableOpacity
            style={styles.signInLink}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.signInText}>
              Already have an account?{" "}
              <Text style={styles.signInHighlight}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
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
  content: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 24,
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
  headlineSection: {
    gap: 8,
    marginBottom: 32,
  },
  headlineTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: theme.colors.text,
    letterSpacing: -0.5,
  },
  headlineSubtitle: {
    fontSize: 16,
    color: theme.colors.textMuted,
    lineHeight: 22,
  },
  roleContainer: {
    gap: 12,
  },
  roleLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: theme.colors.text,
    letterSpacing: 0.3,
  },
  roleButtons: {
    gap: 12,
  },
  roleButton: {
    paddingVertical: 16,
    paddingHorizontal: 16,
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
    fontSize: 24,
    marginBottom: 4,
  },
  roleButtonTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.text,
  },
  roleButtonTitleActive: {
    color: theme.colors.primary,
  },
  roleButtonDesc: {
    fontSize: 13,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
  roleButtonDescActive: {
    color: theme.colors.primary,
  },
  buttonsSection: {
    paddingBottom: 40,
    gap: 20,
  },
  emailButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    borderRadius: theme.radius.md,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  emailIcon: {
    fontSize: 18,
    color: theme.colors.white,
  },
  emailButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.white,
  },
  termsText: {
    fontSize: 13,
    color: theme.colors.textMuted,
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 8,
  },
  termsLink: {
    color: theme.colors.secondary,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  signInLink: {
    alignItems: "center",
    paddingVertical: 4,
  },
  signInText: {
    fontSize: 14,
    color: theme.colors.textMuted,
  },
  signInHighlight: {
    color: theme.colors.primary,
    fontWeight: "600",
  },
});