import { THEME } from "@/constants/theme";
import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  children: ReactNode;
};

export default function FormSection({
  title,
  children,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: THEME.spacing.xl,
  },

  title: {
    marginBottom: THEME.spacing.md,

    fontSize: THEME.typography.fontSize.lg,

    fontWeight:
      THEME.typography.fontWeight.bold,

    color: THEME.colors.text,
  },
});