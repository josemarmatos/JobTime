import SectionTitle from "@/components/layout/SectionTitle";
import Card from "@/components/ui/Card";
import { ScaleListItem } from "@/services/scaleService";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  scales: ScaleListItem[];
  onPress?: (scale: ScaleListItem) => void;
};

function formatDate(value: string): string {
  const [year, month, day] =
    value.split("-");

  if (!year || !month || !day) {
    return value;
  }

  return `${day}/${month}`;
}

export default function UpcomingScales({
  scales,
  onPress,
}: Props) {
  return (
    <View style={styles.container}>
      <SectionTitle title="Próximas escalas" />

      {scales.length === 0 ? (
        <Card>
          <Text style={styles.empty}>
            Nenhuma escala agendada.
          </Text>
        </Card>
      ) : (
        scales.map((scale, index) => (
          <Card
            key={scale.id}
            onPress={
              onPress
                ? () => onPress(scale)
                : undefined
            }
          >
            <View style={styles.item}>
              <View style={styles.dateContainer}>
                <Text style={styles.date}>
                  {formatDate(
                    scale.work_date
                  )}
                </Text>

                <Text style={styles.time}>
                  {scale.start_time}
                </Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.employee}>
                  {scale.employee_name}
                </Text>

                <Text style={styles.company}>
                  {scale.company_name}
                </Text>

                <Text style={styles.shift}>
                  {scale.shift_name}
                  {" • "}
                  {scale.start_time}
                  {" - "}
                  {scale.end_time}
                </Text>
              </View>

              <Text style={styles.arrow}>
                ›
              </Text>
            </View>

            {index < scales.length - 1 ? (
              <View style={styles.divider} />
            ) : null}
          </Card>
        ))
      )}
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
  },

  dateContainer: {
    width: 64,
    alignItems: "center",
    marginRight: 16,
  },

  date: {
    fontSize: 15,
    fontWeight: "700",
  },

  time: {
    marginTop: 4,
    fontSize: 13,
    color: "#666",
  },

  info: {
    flex: 1,
  },

  employee: {
    fontSize: 16,
    fontWeight: "700",
  },

  company: {
    marginTop: 3,
    fontSize: 14,
    color: "#666",
  },

  shift: {
    marginTop: 5,
    fontSize: 13,
    color: "#888",
  },

  arrow: {
    marginLeft: 8,
    fontSize: 26,
    color: "#999",
  },

  divider: {
    height: 1,
    backgroundColor: "#ECECEC",
    marginTop: 16,
  },

  empty: {
    fontSize: 15,
    color: "#666",
  },
});