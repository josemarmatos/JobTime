import { THEME } from "@/constants/theme";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  icon: string;
  title: string;
  value: number;
};

export default function StatCard({
  icon,
  title,
  value,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.icon}>
        {icon}
      </Text>

      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.value}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",

    backgroundColor: THEME.colors.white,

    borderRadius: THEME.radius.lg,

    padding: THEME.spacing.lg,

    marginBottom: THEME.spacing.md,

    alignItems: "center",

    justifyContent: "center",

    borderWidth: 1,

    borderColor: THEME.colors.border,

    ...THEME.shadow.md,
  },

  icon: {
    fontSize: THEME.typography.fontSize.xxl,

    marginBottom: THEME.spacing.sm,
  },

  title: {
    fontSize: THEME.typography.fontSize.sm,

    color: THEME.colors.textSecondary,

    textAlign: "center",
  },

  value: {
    marginTop: THEME.spacing.xs,

    fontSize: THEME.typography.fontSize.xxl,

    fontWeight: THEME.typography.fontWeight.bold,

    color: THEME.colors.primary,
  },
});