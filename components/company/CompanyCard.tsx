import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/constants/colors";
import { Company } from "@/types/Company";

type Props = {
  company: Company;
};

export default function CompanyCard({ company }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>
        {company.name}
      </Text>

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
});