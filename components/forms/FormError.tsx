import { THEME } from "@/constants/theme";
import { StyleSheet, Text } from "react-native";

type Props = {
  message?: string;
};

export default function FormError({
  message,
}: Props) {
  if (!message) {
    return null;
  }

  return (
    <Text style={styles.error}>
      {message}
    </Text>
  );
}

const styles = StyleSheet.create({
  error: {
    color: "#D32F2F",
    fontSize: THEME.typography.fontSize.sm,
    marginTop: 4,
    marginLeft: 2,
  },
});