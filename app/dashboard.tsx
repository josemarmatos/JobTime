import { DashboardCard } from "@/components/cards/DashboardCard";
import Screen from "@/components/layout/Screen";
import SectionTitle from "@/components/layout/SectionTitle";
import StatCard from "@/components/stats/StatCard";
import { dashboardService } from "@/services/dashboardService";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Dashboard() {
  const [stats, setStats] = useState({
    companies: 0,
    employees: 0,
    scales: 0,
    activeEmployees: 0,
  });

  useEffect(() => {
    const data = dashboardService.getStatistics();

    setStats({
      companies: data.totalCompanies,
      employees: data.totalEmployees,
      scales: data.totalScales,
      activeEmployees: data.activeEmployees,
    });
  }, []);

  return (
    <Screen>
      <Text style={styles.greeting}>👋 Olá, Josemar</Text>

      <Text style={styles.subtitle}>
        Job Time{"\n"}
        Sistema Inteligente de Gestão
      </Text>

      <SectionTitle title="Indicadores" />

      <View style={styles.statsGrid}>
        <StatCard
          icon="🏢"
          title="Empresas"
          value={stats.companies}
        />

        <StatCard
          icon="👥"
          title="Funcionários"
          value={stats.employees}
        />

        <StatCard
          icon="📅"
          title="Escalas"
          value={stats.scales}
        />

        <StatCard
          icon="✅"
          title="Ativos"
          value={stats.activeEmployees}
        />
      </View>

      <SectionTitle title="Gerenciamento" />

      <DashboardCard
        icon="🏢"
        title="Empresas"
        subtitle="Cadastrar e editar empresas"
        onPress={() => router.push("/companies")}
      />

      <DashboardCard
        icon="👥"
        title="Funcionários"
        subtitle="Gerenciar colaboradores"
        onPress={() => router.push("/employees")}
      />

      <DashboardCard
        icon="📅"
        title="Escalas"
        subtitle="Organizar jornadas"
        onPress={() => router.push("/scales")}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  greeting: {
    fontSize: 34,
    fontWeight: "700",
    marginTop: 10,
  },

  subtitle: {
    fontSize: 18,
    color: "#666",
    lineHeight: 28,
    marginTop: 6,
    marginBottom: 25,
  },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});