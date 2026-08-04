import { COLORS } from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  icon?: string;
  title: string;
  description?: string;
};

export default function EmptyState({
  icon = "📋",
  title,
  description,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>

      <Text style={styles.title}>
        {title}
      </Text>

      {description && (
        <Text style={styles.description}>
          {description}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
    paddingHorizontal: 20,
  },

  icon: {
    fontSize: 54,
    marginBottom: 12,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    textAlign: "center",
  },

  description: {
    marginTop: 10,
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
});