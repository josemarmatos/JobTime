import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/constants/colors";
import { employeeService } from "@/services/employeeService";
import { Employee } from "@/types/Employee";

type Props = {
  label?: string;
  value: number;
  onChange: (employeeId: number) => void;
};

export default function EmployeeSelect({
  label,
  value,
  onChange,
}: Props) {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const data = employeeService.list();
    setEmployees(data);
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
            label="Selecione um funcionário..."
            value={0}
          />

          {employees.map((employee) => (
            <Picker.Item
              key={employee.id}
              label={employee.name}
              value={employee.id}
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