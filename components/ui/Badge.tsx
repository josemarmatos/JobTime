import { COLORS } from "@/constants/colors";
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

    paddingHorizontal: 12,

    paddingVertical: 6,

    borderRadius: 20,
  },

  text: {
    color: COLORS.white,

    fontSize: 12,

    fontWeight: "700",
  },

  primary: {
    backgroundColor: COLORS.primary,
  },

  secondary: {
    backgroundColor: COLORS.secondary,
  },

  success: {
    backgroundColor: COLORS.success,
  },

  warning: {
    backgroundColor: COLORS.warning,
  },

  danger: {
    backgroundColor: COLORS.danger,
  },
});