import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/constants/colors";
import { companyService } from "@/services/companyService";
import { Company } from "@/types/Company";

type Props = {
  label?: string;
  value: number;
  onChange: (companyId: number) => void;
};

export default function CompanySelect({
  label,
  value,
  onChange,
}: Props) {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const data = companyService.list();
    setCompanies(data);
  }, []);

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
        </Text>
      )}

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={value}
          onValueChange={(itemValue) =>
            onChange(Number(itemValue))
          }
        >
          <Picker.Item
            label="Selecione uma empresa..."
            value={0}
          />

          {companies.map((company) => (
            <Picker.Item
              key={company.id}
              label={company.name}
              value={company.id}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 6,
  },

  pickerContainer: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    overflow: "hidden",
  },
});