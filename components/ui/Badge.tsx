import { THEME } from "@/constants/theme";
import { StyleSheet, Text, View } from "react-native";

type Variant =
  | "success"
  | "warning"
  | "danger"
  | "primary"
  | "secondary";

type Props = {
  label: string;
  variant?: Variant;
};

export default function Badge({
  label,
  variant = "primary",
}: Props) {
  return (
    <View
      style={[
        styles.badge,
        styles[variant],
      ]}
    >
      <Text style={styles.text}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",

    paddingHorizontal: THEME.spacing.md,

    paddingVertical: THEME.spacing.xs,

    borderRadius: THEME.radius.pill,
  },

  text: {
    color: THEME.colors.white,

    fontSize: THEME.typography.fontSize.xs,

    fontWeight: THEME.typography.fontWeight.bold,
  },

  primary: {
    backgroundColor: THEME.colors.primary,
  },

  secondary: {
    backgroundColor: THEME.colors.secondary,
  },

  success: {
    backgroundColor: THEME.colors.success,
  },

  warning: {
    backgroundColor: THEME.colors.warning,
  },

  danger: {
    backgroundColor: THEME.colors.danger,
  },
});