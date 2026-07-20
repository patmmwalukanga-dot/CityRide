export const theme = {
  colors: {
    // Midnight Velocity palette
    primary: "#000000",
    onPrimary: "#FFFFFF",
    primaryContainer: "#1B1B1B",
    onPrimaryContainer: "#848484",

    secondary: "#5D5E61",
    onSecondary: "#FFFFFF",
    secondaryContainer: "#DFDFE2",
    onSecondaryContainer: "#616365",

    tertiary: "#000000",
    onTertiary: "#FFFFFF",
    tertiaryContainer: "#0B1C30",
    onTertiaryContainer: "#75859D",

    surface: "#F9F9F9",
    surfaceDim: "#DADADA",
    surfaceBright: "#F9F9F9",
    surfaceContainerLowest: "#FFFFFF",
    surfaceContainerLow: "#F3F3F3",
    surfaceContainer: "#EEEEEE",
    surfaceContainerHigh: "#E8E8E8",
    surfaceContainerHighest: "#E2E2E2",
    onSurface: "#1B1B1B",
    onSurfaceVariant: "#4C4546",

    inverseSurface: "#303030",
    inverseOnSurface: "#F1F1F1",
    inversePrimary: "#C6C6C6",

    outline: "#7E7576",
    outlineVariant: "#CFC4C5",
    surfaceTint: "#5E5E5E",

    background: "#F9F9F9",
    onBackground: "#1B1B1B",
    surfaceVariant: "#E2E2E2",

    error: "#BA1A1A",
    onError: "#FFFFFF",
    errorContainer: "#FFDAD6",
    onErrorContainer: "#93000A",

    primaryFixed: "#E2E2E2",
    primaryFixedDim: "#C6C6C6",
    onPrimaryFixed: "#1B1B1B",
    onPrimaryFixedVariant: "#474747",

    secondaryFixed: "#E2E2E5",
    secondaryFixedDim: "#C6C6C9",
    onSecondaryFixed: "#1A1C1E",
    onSecondaryFixedVariant: "#454749",

    tertiaryFixed: "#D3E4FE",
    tertiaryFixedDim: "#B7C8E1",
    onTertiaryFixed: "#0B1C30",
    onTertiaryFixedVariant: "#38485D",

    // Legacy aliases for backward compatibility
    text: "#1B1B1B",
    textMuted: "#4C4546",
    border: "#CFC4C5",
    success: "#2E7D32",
    danger: "#BA1A1A",
    white: "#FFFFFF",
    scrim: "rgba(0, 0, 0, 0.4)",
    darkBackground: "#000000",
  },
  spacing: (multiplier: number) => multiplier * 4,
  radius: {
    sm: 4,
    DEFAULT: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  fontSize: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 18,
    xl: 24,
    "2xl": 28,
  },
  fontFamily: {
    default: "Inter",
  },
} as const;

export type Theme = typeof theme;