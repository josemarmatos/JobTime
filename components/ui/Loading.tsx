import { THEME } from "@/constants/theme";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  message?: string;
};

export default function Loading({
  message = "Carregando...",
}: Props) {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color={THEME.colors.primary}
      />

      <Text style={styles.text}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    padding: THEME.spacing.xl,
  },

  text: {
    marginTop: THEME.spacing.md,

    fontSize: THEME.typography.fontSize.md,

    fontWeight: THEME.typography.fontWeight.medium,

    color: THEME.colors.textSecondary,

    textAlign: "center",
  },
});