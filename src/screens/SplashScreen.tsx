import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { theme } from "../styles/theme";

const { width, height } = Dimensions.get("window");

export function SplashScreen() {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const bottomFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade-in-up animation for main content
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Bottom decorative element fade-in
    Animated.timing(bottomFade, {
      toValue: 1,
      duration: 800,
      delay: 600,
      useNativeDriver: true,
    }).start();

    // Shimmer animation loop
    const shimmerLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
    shimmerLoop.start();

    return () => shimmerLoop.stop();
  }, []);

  const shimmerOpacity = shimmerAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.6, 1, 0.6],
  });

  return (
    <View style={styles.container}>
      {/* Background gradient effect */}
      <View style={styles.backgroundTop} />
      <View style={styles.backgroundBottom} />

      {/* Decorative circles */}
      <View style={styles.decorativeCircle1} />
      <View style={styles.decorativeCircle2} />

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
        {/* Logo Section */}
        <View style={styles.logoSection}>
          {/* Navigation Icon in Rounded Square */}
          <View style={styles.iconContainer}>
            <View style={styles.glowPulse} />
            <Text style={styles.iconText}>▲</Text>
          </View>

          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>CityRide</Text>
            <Animated.Text
              style={[styles.subtitle, { opacity: shimmerOpacity }]}
            >
              PREMIUM MOBILITY
            </Animated.Text>
          </View>
        </View>
      </Animated.View>

      {/* Decorative Bottom Element */}
      <Animated.View
        style={[
          styles.bottomDecoration,
          { opacity: bottomFade },
        ]}
      >
        <View style={[styles.dot, { backgroundColor: theme.colors.secondary }]} />
        <View style={[styles.line, { backgroundColor: theme.colors.primary }]} />
        <View style={[styles.dot, { backgroundColor: theme.colors.secondary }]} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  backgroundTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.5,
    backgroundColor: theme.colors.primary,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  backgroundBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.3,
    backgroundColor: theme.colors.surfaceVariant,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  decorativeCircle1: {
    position: "absolute",
    top: -60,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  decorativeCircle2: {
    position: "absolute",
    bottom: height * 0.2,
    left: -80,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(13, 71, 161, 0.05)",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logoSection: {
    alignItems: "center",
    gap: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: theme.colors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 12,
  },
  glowPulse: {
    ...StyleSheet.absoluteFill,
    borderRadius: 20,
    backgroundColor: "rgba(13, 71, 161, 0.08)",
  },
  iconText: {
    fontSize: 48,
    color: theme.colors.primary,
  },
  titleContainer: {
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: theme.colors.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "600",
    color: theme.colors.text,
    letterSpacing: 4.8,
    textTransform: "uppercase",
  },
  bottomDecoration: {
    position: "absolute",
    bottom: 48,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  line: {
    width: 40,
    height: 2,
    borderRadius: 1,
  },
});