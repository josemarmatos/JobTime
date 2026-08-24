import PrimaryButton from "@/components/buttons/PrimaryButton";
import CompanyCard from "@/components/company/CompanyCard";
import EmptyState from "@/components/feedback/EmptyState";
import { Header } from "@/components/layout/Header";
import SearchBar from "@/components/search/SearchBar";
import { COLORS } from "@/constants/colors";
import { companyService } from "@/services/companyService";
import { Company } from "@/types/Company";
import { Picker } from "@react-native-picker/picker";
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
  const [companies, setCompanies] =
    useState<Company[]>([]);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

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

  const normalizedSearch =
    search.trim().toLowerCase();

  const filteredCompanies =
    companies.filter((company) => {
      const matchesSearch =
        company.name
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" &&
          company.active === 1) ||
        (statusFilter === "inactive" &&
          company.active === 0);

      return (
        matchesSearch &&
        matchesStatus
      );
    });

  const emptyState =
    companies.length === 0 ? (
      <EmptyState
        icon="🏢"
        title="Nenhuma empresa cadastrada"
        description='Clique em "Nova Empresa" para começar.'
      />
    ) : (
      <EmptyState
        icon="🔍"
        title="Nenhuma empresa encontrada"
        description="Tente outro nome ou status."
      />
    );

  return (
    <View style={styles.container}>
      <Header title="Empresas" />

      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Pesquisar empresa..."
      />

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>
          Filtrar por status
        </Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={statusFilter}
            onValueChange={(itemValue) =>
              setStatusFilter(String(itemValue))
            }
          >
            <Picker.Item
              label="Todas"
              value="all"
            />

            <Picker.Item
              label="Ativas"
              value="active"
            />

            <Picker.Item
              label="Inativas"
              value="inactive"
            />
          </Picker>
        </View>
      </View>

      <FlatList
        data={filteredCompanies}
        keyExtractor={(item) =>
          String(item.id)
        }
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={emptyState}
        renderItem={({ item }) => (
          <CompanyCard
            company={item}
            onEdit={() =>
              handleEditCompany(item.id!)
            }
            onDelete={() =>
              handleDeleteCompany(item.id!)
            }
            onStatusChange={loadCompanies}
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

  filterContainer: {
    marginBottom: 16,
  },

  filterLabel: {
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

  list: {
    paddingTop: 20,
    paddingBottom: 20,
  },
});