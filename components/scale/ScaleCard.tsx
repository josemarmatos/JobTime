import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { COLORS } from "@/constants/colors";
import { Scale } from "@/types/Scale";

type Props = {
  scale: Scale & {
    employee_name?: string;
  };

  onEdit?: () => void;
  onDelete?: () => void;
};

export default function ScaleCard({
  scale,
  onEdit,
  onDelete,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.employee}>
        {scale.employee_name ?? "Funcionário"}
      </Text>

      <View style={styles.row}>
        <Text style={styles.label}>Data:</Text>

        <Text style={styles.value}>
          {scale.work_date}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Horário:</Text>

        <Text style={styles.value}>
          {scale.start_time} às {scale.end_time}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Turno:</Text>

        <Text style={styles.value}>
          {scale.shift_name}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Status:</Text>

        <Text
          style={[
            styles.status,
            scale.status === "scheduled"
              ? styles.scheduled
              : styles.otherStatus,
          ]}
        >
          {scale.status}
        </Text>
      </View>

      {scale.notes ? (
        <View style={styles.notesContainer}>
          <Text style={styles.notesLabel}>
            Observações
          </Text>

          <Text style={styles.notes}>
            {scale.notes}
          </Text>
        </View>
      ) : null}

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={onEdit}
        >
          <Text style={styles.buttonText}>
            Editar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={onDelete}
        >
          <Text style={styles.buttonText}>
            Excluir
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 3,
  },

  employee: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 14,
  },

  row: {
    flexDirection: "row",
    marginBottom: 8,
  },

  label: {
    width: 70,
    fontWeight: "bold",
    color: COLORS.text,
  },

  value: {
    flex: 1,
    color: COLORS.text,
  },

  status: {
    fontWeight: "bold",
  },

  scheduled: {
    color: "#2E7D32",
  },

  otherStatus: {
    color: "#F57C00",
  },

  notesContainer: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    paddingTop: 10,
  },

  notesLabel: {
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 4,
  },

  notes: {
    color: "#666",
    lineHeight: 20,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
    gap: 10,
  },

  editButton: {
    backgroundColor: "#1976D2",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
  },

  deleteButton: {
    backgroundColor: "#D32F2F",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});