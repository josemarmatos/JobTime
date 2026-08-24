import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "@/constants/colors";
import { scaleService } from "@/services/scaleService";
import { Scale, ScaleStatus } from "@/types/Scale";

type Props = {
  scale: Scale & {
    employee_name?: string;
  };

  onEdit?: () => void;
  onDelete?: () => void;
  onStatusChange?: () => void;
};

function getStatusLabel(
  status: ScaleStatus
): string {
  switch (status) {
    case "scheduled":
      return "Agendada";

    case "completed":
      return "Concluída";

    case "cancelled":
      return "Cancelada";
  }
}

function getStatusStyle(
  status: ScaleStatus
) {
  switch (status) {
    case "scheduled":
      return styles.scheduled;

    case "completed":
      return styles.completed;

    case "cancelled":
      return styles.cancelled;
  }
}

export default function ScaleCard({
  scale,
  onEdit,
  onDelete,
  onStatusChange,
}: Props) {
  const isScheduled =
    scale.status === "scheduled";

  function handleEdit() {
    if (!isScheduled) {
      Alert.alert(
        "Edição não permitida",
        "Escalas concluídas ou canceladas não podem ser alteradas."
      );

      return;
    }

    onEdit?.();
  }

  function handleComplete() {
    Alert.alert(
      "Concluir escala",
      "Deseja marcar esta escala como concluída?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Concluir",
          onPress: () => {
            scaleService.updateStatus(
              scale.id!,
              "completed"
            );

            onStatusChange?.();
          },
        },
      ]
    );
  }

  function handleCancel() {
    Alert.alert(
      "Cancelar escala",
      "Deseja realmente cancelar esta escala?",
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Cancelar escala",
          style: "destructive",
          onPress: () => {
            scaleService.updateStatus(
              scale.id!,
              "cancelled"
            );

            onStatusChange?.();
          },
        },
      ]
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.employee}>
        {scale.employee_name ??
          "Funcionário"}
      </Text>

      <View style={styles.row}>
        <Text style={styles.label}>
          Data:
        </Text>

        <Text style={styles.value}>
          {scale.work_date}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>
          Horário:
        </Text>

        <Text style={styles.value}>
          {scale.start_time} às{" "}
          {scale.end_time}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>
          Turno:
        </Text>

        <Text style={styles.value}>
          {scale.shift_name}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>
          Status:
        </Text>

        <Text
          style={[
            styles.status,
            getStatusStyle(scale.status),
          ]}
        >
          {getStatusLabel(scale.status)}
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
        {isScheduled ? (
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEdit}
          >
            <Text style={styles.buttonText}>
              Editar
            </Text>
          </TouchableOpacity>
        ) : null}

        {isScheduled ? (
          <>
            <TouchableOpacity
              style={styles.completeButton}
              onPress={handleComplete}
            >
              <Text style={styles.buttonText}>
                Concluir
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
            >
              <Text style={styles.buttonText}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </>
        ) : null}

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
    color: "#1976D2",
  },

  completed: {
    color: "#2E7D32",
  },

  cancelled: {
    color: "#D32F2F",
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
    flexWrap: "wrap",
  },

  editButton: {
    backgroundColor: "#1976D2",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
  },

  completeButton: {
    backgroundColor: "#2E7D32",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
  },

  cancelButton: {
    backgroundColor: "#F57C00",
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