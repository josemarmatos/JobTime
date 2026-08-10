import { COLORS } from "./colors";
import radius from "./radius";
import shadow from "./shadow";
import spacing from "./spacing";
import typography from "./typography";

export const Colors = {
  light: {
    text: COLORS.text,
    background: COLORS.background,
    tint: COLORS.primary,
    icon: COLORS.secondary,
    tabIconDefault: "#999999",
    tabIconSelected: COLORS.primary,
  },

  dark: {
    text: "#FFFFFF",
    background: "#121212",
    tint: COLORS.primary,
    icon: "#CCCCCC",
    tabIconDefault: "#888888",
    tabIconSelected: COLORS.primary,
  },
};

export const THEME = {
  colors: COLORS,

  spacing,

  radius,

  typography,

  shadow,
} as const;

export default THEME;