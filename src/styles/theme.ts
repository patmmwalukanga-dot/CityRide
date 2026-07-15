export const theme = {
  colors: {
    primary: "#0D47A1",
    secondary: "#FF6D00",
    background: "#F7F9FC",
    surface: "#FFFFFF",
    text: "#102A43",
    textMuted: "#627D98",
    border: "#D9E2EC",
    success: "#2E7D32",
    danger: "#C62828",
    white: "#FFFFFF",
  },
  spacing: (multiplier: number) => multiplier * 8,
  radius: {
    sm: 8,
    md: 12,
    lg: 20,
  },
  fontSize: {
    sm: 13,
    md: 15,
    lg: 18,
    xl: 24,
  },
} as const;

export type Theme = typeof theme;
