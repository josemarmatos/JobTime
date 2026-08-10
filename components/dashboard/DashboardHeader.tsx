import Avatar from "@/components/ui/Avatar";
import { COLORS } from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";

export default function DashboardHeader() {
  const hour = new Date().getHours();

  let greeting = "Boa noite";

  if (hour >= 5 && hour < 12) {
    greeting = "Bom dia";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Boa tarde";
  }

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.greeting}>
          👋 {greeting}
        </Text>

        <Text style={styles.name}>
          Josemar
        </Text>

        <Text style={styles.date}>
          {today}
        </Text>
      </View>

      <Avatar
        name="Josemar Teodoro Matos"
        size={60}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 28,
  },

  left: {
    flex: 1,
  },

  greeting: {
    fontSize: 18,
    color: COLORS.text,
  },

  name: {
    fontSize: 30,
    fontWeight: "700",
    color: COLORS.text,

    marginTop: 4,
  },

  date: {
    marginTop: 6,

    fontSize: 14,

    color: "#777",
    textTransform: "capitalize",
  },
});