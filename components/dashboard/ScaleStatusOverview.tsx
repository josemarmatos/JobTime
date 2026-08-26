import SectionTitle from "@/components/layout/SectionTitle";
import Card from "@/components/ui/Card";
import { DashboardStatistics } from "@/types/Dashboard";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  stats: DashboardStatistics;
};

export default function ScaleStatusOverview({
  stats,
}: Props) {
  return (
    <View style={styles.container}>
      <SectionTitle title="Status das Escalas" />

      <Card>
        <View style={styles.item}>
          <View
            style={[
              styles.indicator,
              styles.scheduled,
            ]}
          />

          <Text style={styles.label}>
            Agendadas
          </Text>

          <Text style={styles.value}>
            {stats.scheduledScales}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.item}>
          <View
            style={[
              styles.indicator,
              styles.completed,
            ]}
          />

          <Text style={styles.label}>
            Concluídas
          </Text>

          <Text style={styles.value}>
            {stats.completedScales}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.item}>
          <View
            style={[
              styles.indicator,
              styles.cancelled,
            ]}
          />

          <Text style={styles.label}>
            Canceladas
          </Text>

          <Text style={styles.value}>
            {stats.cancelledScales}
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

  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },

  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },

  scheduled: {
    backgroundColor: "#1976D2",
  },

  completed: {
    backgroundColor: "#2E7D32",
  },

  cancelled: {
    backgroundColor: "#D32F2F",
  },

  label: {
    flex: 1,
    fontSize: 15,
    color: "#666",
  },

  value: {
    fontSize: 20,
    fontWeight: "700",
  },

  divider: {
    height: 1,
    backgroundColor: "#ECECEC",
    marginVertical: 4,
  },
});