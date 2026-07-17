import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../styles/theme";
import type { UserRole } from "../types";

const BACKGROUND_IMAGE =
  "https://lh3.googleusercontent.com/aida/AP1WRLs8D-BHDyE74Kotu9bgYpQYYnEE2wqy31UV3jd0hnpqVhMppyX5Bad0lgU2VOs_kAQOujA-UGOm3_7rPKyfC7mJwgsCyprp-p82S1f1oB6_qbbb073Ukafe7egIQFANkERHZe3tPWlw_unRjzR54OS7Hfhnl6Hnol-MA4ZcwHxCm0_idm3iJ0SnnXZSYD6eAArWMzcgSsrmiKeWpaYszePcQFt4prJeJd_QGpfchbAZGvCaAoQua8M-e2pG";

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
                <MaterialCommunityIcons
                  name="navigation"
                  size={20}
                  color="#FFFFFF"
                />
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
              <MaterialCommunityIcons
                name="email-outline"
                size={20}
                color="#FFFFFF"
              />
              <Text style={styles.emailButtonText}>
                Continue with Email
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
  content: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 32,
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
    gap: 12,
    marginBottom: 8,
  },
  roleLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  roleButtons: {
    gap: 12,
  },
  roleButton: {
    paddingVertical: 16,
    paddingHorizontal: 16,
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
    fontSize: 24,
    marginBottom: 4,
  },
  roleButtonTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(255,255,255,0.8)",
  },
  roleButtonTitleActive: {
    color: "#FFFFFF",
  },
  roleButtonDesc: {
    fontSize: 13,
    color: "rgba(255,255,255,0.5)",
    marginTop: 2,
  },
  roleButtonDescActive: {
    color: "rgba(255,255,255,0.7)",
  },
  buttonsSection: {
    paddingBottom: 40,
    paddingTop: 16,
    gap: 20,
  },
  emailButton: {
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
  signInLink: {
    alignItems: "center",
    paddingVertical: 4,
  },
  signInText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
  },
  signInHighlight: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});