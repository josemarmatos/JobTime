import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import EmployeeForm from "@/components/employee/EmployeeForm";
import { Header } from "@/components/layout/Header";
import { COLORS } from "@/constants/colors";
import { employeeService } from "@/services/employeeService";

export default function EmployeeCreate() {
  const router = useRouter();

  const [companyId, setCompanyId] = useState(0);

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  function handleSave() {
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

    employeeService.create({
      company_id: companyId,
      name,
      cpf,
      phone,
      email,
      role,
      admission_date: "",
      birth_date: "",
      active: 1,
    });

    Alert.alert(
      "Sucesso",
      "Funcionário cadastrado com sucesso!"
    );

    router.back();
  }

  return (
    <View style={styles.container}>
      <Header title="Cadastrar Funcionário" />

      <EmployeeForm
        companyId={companyId}
        name={name}
        cpf={cpf}
        role={role}
        phone={phone}
        email={email}
        onChangeCompanyId={setCompanyId}
        onChangeName={setName}
        onChangeCpf={setCpf}
        onChangeRole={setRole}
        onChangePhone={setPhone}
        onChangeEmail={setEmail}
        buttonTitle="Salvar Funcionário"
        onSubmit={handleSave}
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