import SectionTitle from "@/components/layout/SectionTitle";
import Card from "@/components/ui/Card";
import { DashboardStatistics } from "@/types/Dashboard";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  stats: DashboardStatistics;
};

export default function TodayOverview({
  stats,
}: Props) {
  return (
    <View style={styles.container}>
      <SectionTitle title="Hoje" />

      <Card>
        <View style={styles.item}>
          <Text style={styles.icon}>📅</Text>

          <View style={styles.info}>
            <Text style={styles.title}>
              Escalas de Hoje
            </Text>

            <Text style={styles.value}>
              {stats.todayScales}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.item}>
          <Text style={styles.icon}>👥</Text>

          <View style={styles.info}>
            <Text style={styles.title}>
              Funcionários Ativos
            </Text>

            <Text style={styles.value}>
              {stats.activeEmployees}
            </Text>
          </View>
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

  icon: {
    fontSize: 30,
    marginRight: 16,
  },

  info: {
    flex: 1,
  },

  title: {
    fontSize: 15,
    color: "#666",
  },

  value: {
    marginTop: 4,
    fontSize: 24,
    fontWeight: "700",
  },

  divider: {
    height: 1,
    backgroundColor: "#ECECEC",
    marginVertical: 10,
  },
});