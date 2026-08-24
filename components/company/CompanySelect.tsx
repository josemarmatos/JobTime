import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import { COLORS } from "@/constants/colors";
import { companyService } from "@/services/companyService";
import { Company } from "@/types/Company";

type Props = {
  label?: string;
  value: number;
  onChange: (companyId: number) => void;
  error?: string;
  onBlur?: () => void;
};

export default function CompanySelect({
  label,
  value,
  onChange,
  error,
  onBlur,
}: Props) {
  const [companies, setCompanies] =
    useState<Company[]>([]);

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

      <View
        style={[
          styles.pickerContainer,
          error && styles.pickerError,
        ]}
      >
        <Picker
          selectedValue={value}
          onValueChange={(itemValue) => {
            onChange(Number(itemValue));
          }}
          onBlur={onBlur}
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

      {error ? (
        <Text style={styles.error}>
          {error}
        </Text>
      ) : null}
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

  pickerError: {
    borderColor: "#D32F2F",
  },

  error: {
    marginTop: 6,
    color: "#D32F2F",
    fontSize: 14,
  },
});