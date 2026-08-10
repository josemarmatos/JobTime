import SectionTitle from "@/components/layout/SectionTitle";
import Card from "@/components/ui/Card";
import { DashboardStatistics } from "@/types/Dashboard";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  stats: DashboardStatistics;
};

export default function AlertsPanel({
  stats,
}: Props) {
  const alerts: string[] = [];

  if (stats.totalCompanies === 0) {
    alerts.push("Nenhuma empresa cadastrada.");
  }

  if (stats.totalEmployees === 0) {
    alerts.push("Nenhum funcionário cadastrado.");
  }

  if (stats.todayScales === 0) {
    alerts.push("Nenhuma escala programada para hoje.");
  }

  if (alerts.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <SectionTitle title="Alertas" />

      <Card>
        {alerts.map((alert, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.icon}>⚠️</Text>

            <Text style={styles.text}>
              {alert}
            </Text>
          </View>
        ))}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },

  icon: {
    fontSize: 22,
    marginRight: 12,
  },

  text: {
    flex: 1,
    fontSize: 15,
    color: "#444",
  },
});