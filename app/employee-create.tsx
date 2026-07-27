import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import PrimaryInput from "@/components/inputs/PrimaryInput";
import { Header } from "@/components/layout/Header";
import { COLORS } from "@/constants/colors";

export default function EmployeeCreate() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [position, setPosition] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  function handleSave() {
  if (
    !name.trim() ||
    !cpf.trim() ||
    !position.trim() ||
    !phone.trim() ||
    !email.trim() ||
    !company.trim()
  ) {
    Alert.alert(
      "Campos obrigatórios",
      "Preencha todos os campos."
    );
    return;
  }

  Alert.alert(
    "Sucesso",
    "Funcionário cadastrado com sucesso!"
  );

  setName("");
  setCpf("");
  setPosition("");
  setPhone("");
  setEmail("");
  setCompany("");
}

  return (
    <View style={styles.container}>
      <Header title="Cadastrar Funcionário" />

      <PrimaryInput
        label="Nome Completo"
        placeholder="Digite o nome"
        value={name}
        onChangeText={setName}
      />

      <PrimaryInput
        label="CPF"
        placeholder="Digite o CPF"
        value={cpf}
        onChangeText={setCpf}
      />

      <PrimaryInput
        label="Cargo"
        placeholder="Digite o cargo"
        value={position}
        onChangeText={setPosition}
      />

      <PrimaryInput
        label="Telefone"
        placeholder="Digite o telefone"
        value={phone}
        onChangeText={setPhone}
      />

      <PrimaryInput
        label="E-mail"
        placeholder="Digite o e-mail"
        value={email}
        onChangeText={setEmail}
      />

      <PrimaryInput
        label="Empresa"
        placeholder="Digite a empresa"
        value={company}
        onChangeText={setCompany}
      />

      <PrimaryButton
        title="Salvar Funcionário"
        onPress={handleSave}
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