import { THEME } from "@/constants/theme";
import { StyleSheet, Text } from "react-native";

type Props = {
  title: string;
};

export default function SectionTitle({
  title,
}: Props) {
  return (
    <Text style={styles.title}>
      {title}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: THEME.typography.fontSize.xl,

    fontWeight: THEME.typography.fontWeight.bold,

    color: THEME.colors.text,

    marginTop: THEME.spacing.lg,

    marginBottom: THEME.spacing.md,
  },
});