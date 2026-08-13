import { COLORS } from "./colors";
import radius from "./radius";
import shadow from "./shadow";
import spacing from "./spacing";
import typography from "./typography";

/**
 * Compatibilidade com o template padrão do Expo
 */
export const Colors = {
  light: {
    text: COLORS.text,
    background: COLORS.background,
    tint: COLORS.primary,
    icon: COLORS.textSecondary,
    tabIconDefault: COLORS.textSecondary,
    tabIconSelected: COLORS.primary,
  },

  dark: {
    text: "#FFFFFF",
    background: "#000000",
    tint: COLORS.primary,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: COLORS.primary,
  },
};

/**
 * Design System do Job Time
 */
export const THEME = {
  colors: COLORS,

  spacing,

  radius,

  typography,

  shadow,
} as const;

export default THEME;