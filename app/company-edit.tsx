import CompanyForm from "@/components/company/CompanyForm";
import { Header } from "@/components/layout/Header";
import { COLORS } from "@/constants/colors";
import { companyService } from "@/services/companyService";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

export default function CompanyEdit() {
  const { id } = useLocalSearchParams();

  const [name, setName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [manager, setManager] = useState("");

  useEffect(() => {
    if (!id) return;

    const company = companyService.findById(Number(id));

    if (!company) {
      Alert.alert("Erro", "Empresa não encontrada.");
      router.back();
      return;
    }

    setName(company.name);
    setCnpj(company.cnpj);
    setPhone(company.phone);
    setEmail(company.email);
    setManager(company.manager);
  }, [id]);

  function handleUpdate() {
    if (!id) return;

    companyService.update({
      id: Number(id),
      name,
      cnpj,
      phone,
      email,
      manager,
    });

    Alert.alert("Sucesso", "Empresa atualizada com sucesso!");

    router.back();
  }

  return (
    <View style={styles.container}>
      <Header title="Editar Empresa" />

      <CompanyForm
        name={name}
        cnpj={cnpj}
        phone={phone}
        email={email}
        manager={manager}
        onChangeName={setName}
        onChangeCnpj={setCnpj}
        onChangePhone={setPhone}
        onChangeEmail={setEmail}
        onChangeManager={setManager}
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