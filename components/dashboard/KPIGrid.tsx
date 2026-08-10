import StatCard from "@/components/stats/StatCard";
import { DashboardStatistics } from "@/types/Dashboard";
import { StyleSheet, View } from "react-native";

type Props = {
  stats: DashboardStatistics;
};

export default function KPIGrid({
  stats,
}: Props) {
  return (
    <View style={styles.container}>
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
          icon="✅"
          title="Ativos"
          value={stats.activeEmployees}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },

  row: {
    flexDirection: "row",
  },
});