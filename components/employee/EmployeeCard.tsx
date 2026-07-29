import {
  Alert,
  StyleSheet,
  Text,
  View,
} from "react-native";

import DangerButton from "@/components/buttons/DangerButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import { COLORS } from "@/constants/colors";
import { Employee } from "@/types/Employee";

type Props = {
  employee: Employee;
  companyName: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function EmployeeCard({
  employee,
  companyName,
  onEdit,
  onDelete,
}: Props) {

  function handleEdit() {
    if (onEdit) {
      onEdit();
      return;
    }

    Alert.alert(
      "Editar",
      "Função de edição será implementada."
    );
  }

  function handleDelete() {
    if (onDelete) {
      onDelete();
      return;
    }

    Alert.alert(
      "Excluir",
      "Função de exclusão será implementada."
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.name}>
        {employee.name}
      </Text>

      <Text style={styles.info}>
        Empresa: {companyName}
      </Text>

      <Text style={styles.info}>
        Cargo: {employee.role}
      </Text>

      <Text style={styles.info}>
        Telefone: {employee.phone}
      </Text>

      <Text style={styles.info}>
        E-mail: {employee.email}
      </Text>

      <View style={styles.actions}>
        <View style={styles.button}>
          <SecondaryButton
            title="Editar"
            onPress={handleEdit}
          />
        </View>

        <View style={styles.button}>
          <DangerButton
            title="Excluir"
            onPress={handleDelete}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,

    borderWidth: 1,
    borderColor: "#E5E7EB",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 3,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 10,
  },

  info: {
    fontSize: 15,
    color: "#444",
    marginBottom: 4,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    gap: 10,
  },

  button: {
    flex: 1,
  },
});