import { DashboardCard } from "@/components/cards/DashboardCard";
import { COLORS } from "@/constants/colors";
import { router } from "expo-router";
import { Alert, StyleSheet, Text, View } from "react-native";

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>👋 Olá, Josemar</Text>

      <Text style={styles.subtitle}>
        Job Time{"\n"}
        Sistema de Gestão de Equipes
      </Text>

      <DashboardCard
  title="👥 Funcionários"
  onPress={() => router.push("/employees")}
/>

      <DashboardCard
        title="📅 Escalas"
        onPress={() => Alert.alert("Escalas")}
      />

      <DashboardCard
  title="🏢 Empresas"
  onPress={() => router.push("/companies")}
/>

      <DashboardCard
        title="📊 Relatórios"
        onPress={() => Alert.alert("Relatórios")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.text,
    marginTop: 40,
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
    marginBottom: 30,
    lineHeight: 24,
  },
});