import SectionTitle from "@/components/layout/SectionTitle";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { StyleSheet, Text, View } from "react-native";

export default function SystemStatus() {
  return (
    <View style={styles.container}>
      <SectionTitle title="Sistema" />

      <Card>
        <View style={styles.row}>
          <Text style={styles.label}>
            Banco de Dados
          </Text>

          <Badge
            label="Online"
            variant="success"
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>
            Aplicativo
          </Text>

          <Text style={styles.value}>
            Job Time
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>
            Versão
          </Text>

          <Text style={styles.value}>
            1.0.0
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>
            Banco
          </Text>

          <Text style={styles.value}>
            SQLite
          </Text>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },

  label: {
    fontSize: 15,
    color: "#666",
  },

  value: {
    fontSize: 15,
    fontWeight: "700",
  },
});