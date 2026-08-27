import { Picker } from "@react-native-picker/picker";
import {
  router,
  useFocusEffect,
} from "expo-router";
import {
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import EmployeeCard from "@/components/employee/EmployeeCard";
import EmptyState from "@/components/feedback/EmptyState";
import { Header } from "@/components/layout/Header";
import SearchBar from "@/components/search/SearchBar";
import { COLORS } from "@/constants/colors";
import { companyService } from "@/services/companyService";
import {
  EmployeeListItem,
  employeeService,
} from "@/services/employeeService";
import { Company } from "@/types/Company";

export default function Employees() {
  const [employees, setEmployees] =
    useState<EmployeeListItem[]>([]);

  const [companies, setCompanies] =
    useState<Company[]>([]);

  const [search, setSearch] =
    useState("");

  const [companyFilter, setCompanyFilter] =
    useState(0);

  const [statusFilter, setStatusFilter] =
    useState("all");

  function loadEmployees() {
    const data =
      employeeService.listWithCompany();

    setEmployees(data);
  }

  function loadCompanies() {
    const data =
      companyService.list();

    setCompanies(data);
  }

  useEffect(() => {
    loadCompanies();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadEmployees();
      loadCompanies();
    }, [])
  );

  function handleDelete(id: number) {
    Alert.alert(
      "Excluir funcionário",
      "Deseja realmente excluir este funcionário? Esta ação é permanente.",
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
              employeeService.delete(id);

              loadEmployees();

              Alert.alert(
                "Sucesso",
                "Funcionário excluído com sucesso."
              );
            } catch (error) {
              const message =
                error instanceof Error
                  ? error.message
                  : "Não foi possível excluir o funcionário.";

              Alert.alert(
                "Não foi possível excluir",
                message
              );
            }
          },
        },
      ]
    );
  }

  const normalizedSearch =
    search.trim().toLowerCase();

  const filteredEmployees =
    employees.filter((employee) => {
      const matchesSearch =
        employee.name
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesCompany =
        companyFilter === 0 ||
        employee.company_id ===
          companyFilter;

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" &&
          employee.active === 1) ||
        (statusFilter === "inactive" &&
          employee.active === 0);

      return (
        matchesSearch &&
        matchesCompany &&
        matchesStatus
      );
    });

  const emptyState =
    employees.length === 0 ? (
      <EmptyState
        icon="👥"
        title="Nenhum funcionário cadastrado"
        description='Clique em "+ Novo Funcionário" para começar.'
      />
    ) : (
      <EmptyState
        icon="🔎"
        title="Nenhum funcionário encontrado"
        description="Tente outro nome, empresa ou status."
      />
    );

  return (
    <View style={styles.container}>
      <Header title="Funcionários" />

      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Pesquisar funcionário..."
      />

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>
          Filtrar por empresa
        </Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={companyFilter}
            onValueChange={(itemValue) =>
              setCompanyFilter(
                Number(itemValue)
              )
            }
          >
            <Picker.Item
              label="Todas as empresas"
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
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>
          Filtrar por status
        </Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={statusFilter}
            onValueChange={(itemValue) =>
              setStatusFilter(
                String(itemValue)
              )
            }
          >
            <Picker.Item
              label="Todos"
              value="all"
            />

            <Picker.Item
              label="Ativos"
              value="active"
            />

            <Picker.Item
              label="Inativos"
              value="inactive"
            />
          </Picker>
        </View>
      </View>

      <PrimaryButton
        title="+ Novo Funcionário"
        onPress={() =>
          router.push(
            "/employee-create"
          )
        }
      />

      <FlatList
        data={filteredEmployees}
        keyExtractor={(item) =>
          String(item.id)
        }
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          emptyState
        }
        renderItem={({ item }) => (
          <EmployeeCard
            employee={item}
            companyName={
              item.company_name
            }
            onEdit={() =>
              router.push({
                pathname:
                  "/employee-edit",
                params: {
                  id: String(item.id),
                },
              })
            }
            onDelete={() =>
              handleDelete(item.id!)
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      COLORS.background,
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