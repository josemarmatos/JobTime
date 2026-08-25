import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Badge from "@/components/ui/Badge";
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

function getStatusBadge(
  status: ScaleStatus
) {
  switch (status) {
    case "scheduled":
      return {
        label: "Agendada",
        variant: "primary" as const,
      };

    case "completed":
      return {
        label: "Concluída",
        variant: "success" as const,
      };

    case "cancelled":
      return {
        label: "Cancelada",
        variant: "danger" as const,
      };
  }
}

function formatDate(
  value: string
): string {
  const [year, month, day] =
    value.split("-");

  if (!year || !month || !day) {
    return value;
  }

  return `${day}/${month}/${year}`;
}

function timeToMinutes(
  value: string
): number {
  const [hours, minutes] =
    value.split(":").map(Number);

  return hours * 60 + minutes;
}

function isOvernight(
  startTime: string,
  endTime: string
): boolean {
  return (
    timeToMinutes(endTime) <
    timeToMinutes(startTime)
  );
}

export default function ScaleCard({
  scale,
  onEdit,
  onDelete,
  onStatusChange,
}: Props) {
  const isScheduled =
    scale.status === "scheduled";

  const overnight = isOvernight(
    scale.start_time,
    scale.end_time
  );

  const statusBadge =
    getStatusBadge(scale.status);

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
          {formatDate(scale.work_date)}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>
          Horário:
        </Text>

        <Text style={styles.value}>
          {scale.start_time} →{" "}
          {scale.end_time}
        </Text>
      </View>

      {overnight ? (
        <View style={styles.overnightContainer}>
          <Text style={styles.overnightText}>
            🌙 Jornada noturna
          </Text>
        </View>
      ) : null}

      <View style={styles.row}>
        <Text style={styles.label}>
          Turno:
        </Text>

        <Text style={styles.value}>
          {scale.shift_name}
        </Text>
      </View>

      <View style={styles.statusRow}>
        <Text style={styles.label}>
          Status:
        </Text>

        <Badge
          label={statusBadge.label}
          variant={statusBadge.variant}
        />
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

        {isScheduled ? (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={onDelete}
          >
            <Text style={styles.buttonText}>
              Excluir
            </Text>
          </TouchableOpacity>
        ) : null}
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

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
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

  overnightContainer: {
    marginBottom: 8,
  },

  overnightText: {
    color: "#5E35B1",
    fontWeight: "600",
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