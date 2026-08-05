import { DashboardCard } from "@/components/cards/DashboardCard";
import DashboardSection from "@/components/dashboard/DashboardSection";
import StatCard from "@/components/stats/StatCard";
import { COLORS } from "@/constants/colors";
import { dashboardService } from "@/services/dashboardService";
import { DashboardStatistics } from "@/types/Dashboard";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Dashboard() {
  const [stats, setStats] =
    useState<DashboardStatistics>({
      totalCompanies: 0,
      totalEmployees: 0,
      activeEmployees: 0,
      inactiveEmployees: 0,
      totalScales: 0,
      todayScales: 0,
    });

  function loadDashboard() {
    const data =
      dashboardService.getStatistics();

    setStats(data);
  }

  useFocusEffect(
    useCallback(() => {
      loadDashboard();
    }, [])
  );

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>
        👋 Olá, Josemar
      </Text>

      <Text style={styles.subtitle}>
        Job Time{"\n"}
        Sistema de Gestão de Equipes
      </Text>

      <DashboardSection title="📊 Visão Geral">

        <View style={styles.row}>
          <StatCard
            icon="🏢"
            title="Empresas"
            value={stats.totalCompanies}
          />

          <StatCard
            icon="👥"
            title="Funcionários"
            value={stats.totalEmployees}
          />
        </View>

        <View style={styles.row}>
          <StatCard
            icon="📅"
            title="Escalas"
            value={stats.totalScales}
          />

          <StatCard
            icon="🟢"
            title="Ativos"
            value={stats.activeEmployees}
          />
        </View>

        <View style={styles.row}>
          <StatCard
            icon="🔴"
            title="Inativos"
            value={stats.inactiveEmployees}
          />

          <StatCard
            icon="📆"
            title="Hoje"
            value={stats.todayScales}
          />
        </View>

      </DashboardSection>

      <DashboardSection title="⚡ Acesso Rápido">

        <DashboardCard
          title="👥 Funcionários"
          onPress={() =>
            router.push("/employees")
          }
        />

        <DashboardCard
          title="📅 Escalas"
          onPress={() =>
            router.push("/scales")
          }
        />

        <DashboardCard
          title="🏢 Empresas"
          onPress={() =>
            router.push("/companies")
          }
        />

        <DashboardCard
          title="📊 Relatórios"
          onPress={() =>
            Alert.alert(
              "Relatórios",
              "Módulo em desenvolvimento."
            )
          }
        />

      </DashboardSection>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: COLORS.text,
    marginTop: 20,
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
    marginBottom: 24,
    lineHeight: 24,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});