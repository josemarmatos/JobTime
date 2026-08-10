import SectionTitle from "@/components/layout/SectionTitle";
import Card from "@/components/ui/Card";
import { DashboardStatistics } from "@/types/Dashboard";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  stats: DashboardStatistics;
};

export default function DashboardSummary({
  stats,
}: Props) {
  return (
    <View style={styles.container}>
      <SectionTitle title="Resumo Geral" />

      <Card>
        <View style={styles.row}>
          <Text style={styles.label}>🏢 Empresas</Text>
          <Text style={styles.value}>
            {stats.totalCompanies}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>👥 Funcionários</Text>
          <Text style={styles.value}>
            {stats.totalEmployees}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>📅 Escalas</Text>
          <Text style={styles.value}>
            {stats.totalScales}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>✅ Ativos</Text>
          <Text style={styles.value}>
            {stats.activeEmployees}
          </Text>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },

  label: {
    fontSize: 16,
    fontWeight: "500",
  },

  value: {
    fontSize: 18,
    fontWeight: "700",
  },
});