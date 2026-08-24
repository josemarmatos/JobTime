import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import EmployeeForm from "@/components/employee/EmployeeForm";
import { Header } from "@/components/layout/Header";
import { COLORS } from "@/constants/colors";
import { employeeService } from "@/services/employeeService";
import {
  formatCPF,
  formatPhone,
} from "@/validation/masks";

export default function EmployeeEdit() {
  const { id } = useLocalSearchParams();

  const [companyId, setCompanyId] = useState(0);

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!id) return;

    const employee =
      employeeService.findById(Number(id));

    if (!employee) {
      Alert.alert(
        "Erro",
        "Funcionário não encontrado."
      );

      router.back();
      return;
    }

    setCompanyId(employee.company_id);
    setName(employee.name);

    setCpf(formatCPF(employee.cpf));

    setRole(employee.role);

    setPhone(formatPhone(employee.phone));

    setEmail(employee.email);
  }, [id]);

  function handleUpdate() {
    if (!id) return;

    if (
      companyId === 0 ||
      !name.trim() ||
      !cpf.trim() ||
      !role.trim() ||
      !phone.trim() ||
      !email.trim()
    ) {
      Alert.alert(
        "Campos obrigatórios",
        "Preencha todos os campos."
      );

      return;
    }

    employeeService.update({
      id: Number(id),
      company_id: companyId,
      name: name.trim(),
      cpf,
      phone,
      email: email.trim(),
      role: role.trim(),
      admission_date: "",
      birth_date: "",
      active: 1,
    });

    Alert.alert(
      "Sucesso",
      "Funcionário atualizado com sucesso!"
    );

    router.back();
  }

  return (
    <View style={styles.container}>
      <Header title="Editar Funcionário" />

      <EmployeeForm
        companyId={companyId}
        name={name}
        cpf={cpf}
        role={role}
        phone={phone}
        email={email}
        onChangeCompanyId={setCompanyId}
        onChangeName={setName}
        onChangeCpf={(value) => {
          setCpf(formatCPF(value));
        }}
        onChangeRole={setRole}
        onChangePhone={(value) => {
          setPhone(formatPhone(value));
        }}
        onChangeEmail={setEmail}
        buttonTitle="Salvar Alterações"
        onSubmit={handleUpdate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
});