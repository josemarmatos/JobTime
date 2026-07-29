import PrimaryButton from "@/components/buttons/PrimaryButton";
import CompanyCard from "@/components/company/CompanyCard";
import { Header } from "@/components/layout/Header";
import { COLORS } from "@/constants/colors";
import { companyService } from "@/services/companyService";
import { Company } from "@/types/Company";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([]);

  function loadCompanies() {
    const data = companyService.list();
    setCompanies(data);
  }

  function handleCreateCompany() {
    router.push("/company-create");
  }

  function handleEditCompany(id: number) {
    router.push({
      pathname: "/company-edit",
      params: {
        id: String(id),
      },
    });
  }

  function handleDeleteCompany(id: number) {
    Alert.alert(
      "Excluir Empresa",
      "Tem certeza que deseja excluir esta empresa?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
  try {
    companyService.delete(id);

    loadCompanies();

    Alert.alert(
      "Sucesso",
      "Empresa excluída com sucesso!"
    );
  } catch (error) {
    console.error(error);

    Alert.alert(
      "Não foi possível excluir",
      "Esta empresa possui funcionários vinculados.\n\nExclua ou transfira os funcionários antes de excluir a empresa."
    );
  }
},
        },
      ]
    );
  }

  useFocusEffect(
    useCallback(() => {
      loadCompanies();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Header title="Empresas" />

      <FlatList
        data={companies}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={
          <Text style={styles.message}>
            Nenhuma empresa cadastrada.
          </Text>
        }
        renderItem={({ item }) => (
          <CompanyCard
            company={item}
            onEdit={() => handleEditCompany(item.id!)}
            onDelete={() => handleDeleteCompany(item.id!)}
          />
        )}
      />

      <PrimaryButton
        title="Nova Empresa"
        onPress={handleCreateCompany}
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

  message: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 18,
    color: "#666",
  },
});