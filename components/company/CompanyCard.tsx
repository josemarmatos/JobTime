import {
  Alert,
  StyleSheet,
  Text,
  View,
} from "react-native";

import DangerButton from "@/components/buttons/DangerButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import { COLORS } from "@/constants/colors";
import { companyService } from "@/services/companyService";
import { Company } from "@/types/Company";

type Props = {
  company: Company;
  onEdit?: () => void;
  onDelete?: () => void;
  onStatusChange?: () => void;
};

export default function CompanyCard({
  company,
  onEdit,
  onDelete,
  onStatusChange,
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

  function handleStatusChange() {
    const isActive = company.active === 1;

    const action = isActive
      ? "Inativar"
      : "Ativar";

    const message = isActive
      ? "Deseja realmente inativar esta empresa?"
      : "Deseja realmente ativar esta empresa?";

    Alert.alert(
      `${action} empresa`,
      message,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: action,
          onPress: () => {
            companyService.updateStatus(
              company.id,
              isActive ? 0 : 1
            );

            onStatusChange?.();
          },
        },
      ]
    );
  }

  const isActive = company.active === 1;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>
          {company.name}
        </Text>

        <View
          style={[
            styles.statusBadge,
            isActive
              ? styles.activeBadge
              : styles.inactiveBadge,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              isActive
                ? styles.activeText
                : styles.inactiveText,
            ]}
          >
            {isActive ? "Ativa" : "Inativa"}
          </Text>
        </View>
      </View>

      <Text style={styles.info}>
        CNPJ: {company.cnpj}
      </Text>

      <Text style={styles.info}>
        Responsável: {company.manager}
      </Text>

      <Text style={styles.info}>
        Telefone: {company.phone}
      </Text>

      <Text style={styles.info}>
        E-mail: {company.email}
      </Text>

      <View style={styles.actions}>
        <View style={styles.button}>
          <SecondaryButton
            title="Editar"
            onPress={handleEdit}
          />
        </View>

        <View style={styles.button}>
          <SecondaryButton
            title={
              isActive
                ? "Inativar"
                : "Ativar"
            }
            onPress={handleStatusChange}
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

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    gap: 10,
  },

  name: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  activeBadge: {
    backgroundColor: "#E8F5E9",
  },

  inactiveBadge: {
    backgroundColor: "#F5F5F5",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },

  activeText: {
    color: "#2E7D32",
  },

  inactiveText: {
    color: "#757575",
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