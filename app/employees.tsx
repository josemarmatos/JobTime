import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  View,
} from "react-native";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import EmployeeCard from "@/components/employee/EmployeeCard";
import EmptyState from "@/components/feedback/EmptyState";
import { Header } from "@/components/layout/Header";
import SearchBar from "@/components/search/SearchBar";
import { COLORS } from "@/constants/colors";
import {
  EmployeeListItem,
  employeeService,
} from "@/services/employeeService";

export default function Employees() {
  const [employees, setEmployees] = useState<EmployeeListItem[]>([]);
  const [search, setSearch] = useState("");

  function loadEmployees() {
    const data = employeeService.listWithCompany();
    setEmployees(data);
  }

  useFocusEffect(
    useCallback(() => {
      loadEmployees();
    }, [])
  );

  function handleDelete(id: number) {
    Alert.alert(
      "Excluir funcionário",
      "Deseja realmente excluir este funcionário?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            employeeService.delete(id);
            loadEmployees();
          },
        },
      ]
    );
  }

  const filteredEmployees = employees.filter((employee) =>
    employee.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const emptyState =
    employees.length === 0 ? (
      <EmptyState
        icon="👥"
        title="Nenhum funcionário cadastrado"
        description='Clique em "+ Novo Funcionário" para começar.'
      />
    ) : (
      <EmptyState
        icon="🔍"
        title="Nenhum funcionário encontrado"
        description="Tente outro termo de pesquisa."
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

      <PrimaryButton
        title="+ Novo Funcionário"
        onPress={() => router.push("/employee-create")}
      />

      <FlatList
        data={filteredEmployees}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={emptyState}
        renderItem={({ item }) => (
          <EmployeeCard
            employee={item}
            companyName={item.company_name}
            onEdit={() =>
              router.push({
                pathname: "/employee-edit",
                params: {
                  id: String(item.id),
                },
              })
            }
            onDelete={() => handleDelete(item.id!)}
          />
        )}
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

  list: {
    paddingTop: 20,
    paddingBottom: 20,
  },
});