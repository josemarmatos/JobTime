import { COLORS } from "@/constants/colors";
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

    backgroundColor: COLORS.white,

    borderRadius: 18,

    padding: 20,

    marginBottom: 14,

    alignItems: "center",

    shadowColor: "#000",

    shadowOpacity: 0.08,

    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 3,
  },

  icon: {
    fontSize: 32,
    marginBottom: 10,
  },

  title: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
  },

  value: {
    marginTop: 8,
    fontSize: 30,
    fontWeight: "700",
    color: COLORS.primary,
  },
});