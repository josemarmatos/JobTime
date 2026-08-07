import { COLORS } from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  icon?: string;
  title: string;
  message?: string;
};

export default function EmptyState({
  icon = "📂",
  title,
  message,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>
        {icon}
      </Text>

      <Text style={styles.title}>
        {title}
      </Text>

      {message && (
        <Text style={styles.message}>
          {message}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 24,
  },

  icon: {
    fontSize: 52,
    marginBottom: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    textAlign: "center",
  },

  message: {
    marginTop: 10,
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
});