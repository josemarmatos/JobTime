import PrimaryButton from "@/components/buttons/PrimaryButton";
import PrimaryInput from "@/components/inputs/PrimaryInput";
import { Header } from "@/components/layout/Header";
import { COLORS } from "@/constants/colors";
import { companyService } from "@/services/companyService";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

export default function CompanyCreate() {
  const [name, setName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [manager, setManager] = useState("");

  function handleSave() {
  if (
    !name.trim() ||
    !cnpj.trim() ||
    !phone.trim() ||
    !email.trim() ||
    !manager.trim()
  ) {
    Alert.alert(
      "Campos obrigatórios",
      "Preencha todos os campos."
    );
    return;
  }

  try {
    companyService.create({
      name,
      cnpj,
      phone,
      email,
      manager,
    });

    Alert.alert(
      "Sucesso",
      "Empresa cadastrada com sucesso!"
    );

    setName("");
    setCnpj("");
    setPhone("");
    setEmail("");
    setManager("");

  } catch (error) {
    console.error(error);

    Alert.alert(
      "Erro",
      "Não foi possível salvar a empresa."
    );
  }
}
  return (
    <View style={styles.container}>
      <Header title="Nova Empresa" />

      <PrimaryInput
        label="Nome da Empresa"
        placeholder="Digite o nome da empresa"
        value={name}
        onChangeText={setName}
      />

      <PrimaryInput
        label="CNPJ"
        placeholder="00.000.000/0000-00"
        value={cnpj}
        onChangeText={setCnpj}
      />

      <PrimaryInput
        label="Telefone"
        placeholder="(00) 00000-0000"
        value={phone}
        onChangeText={setPhone}
      />

      <PrimaryInput
        label="E-mail"
        placeholder="empresa@email.com"
        value={email}
        onChangeText={setEmail}
      />

      <PrimaryInput
        label="Responsável"
        placeholder="Nome do responsável"
        value={manager}
        onChangeText={setManager}
      />

      <PrimaryButton
        title="Salvar Empresa"
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