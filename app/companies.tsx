import CompanyCard from "@/components/company/CompanyCard";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Header } from "@/components/layout/Header";
import { COLORS } from "@/constants/colors";
import { companyService } from "@/services/companyService";
import { Company } from "@/types/Company";

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([]);

  function loadCompanies() {
    const data = companyService.list();
    setCompanies(data);
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
  <CompanyCard company={item} />
)}
      />

      <Button
        title="Nova Empresa"
        onPress={() => router.push("/company-create")}
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