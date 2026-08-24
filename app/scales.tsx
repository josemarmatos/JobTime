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

import PrimaryButton from "@/components/buttons/PrimaryButton";
import EmptyState from "@/components/feedback/EmptyState";
import { Header } from "@/components/layout/Header";
import ScaleCard from "@/components/scale/ScaleCard";
import SearchBar from "@/components/search/SearchBar";
import { COLORS } from "@/constants/colors";
import {
  ScaleListItem,
  scaleService,
} from "@/services/scaleService";

type StatusFilter =
  | "all"
  | "scheduled"
  | "completed"
  | "cancelled";

type PeriodFilter =
  | "all"
  | "today"
  | "upcoming"
  | "past";

function getTodayString(): string {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(
    today.getMonth() + 1
  ).padStart(2, "0");
  const day = String(
    today.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function Scales() {
  const [scales, setScales] =
    useState<ScaleListItem[]>([]);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("all");

  const [periodFilter, setPeriodFilter] =
    useState<PeriodFilter>("all");

  function loadScales() {
    const data =
      scaleService.listWithEmployee();

    setScales(data);
  }

  useFocusEffect(
    useCallback(() => {
      loadScales();
    }, [])
  );

  function handleDelete(id: number) {
    Alert.alert(
      "Excluir escala",
      "Deseja realmente excluir esta escala?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            scaleService.delete(id);
            loadScales();
          },
        },
      ]
    );
  }

  const normalizedSearch =
    search.trim().toLowerCase();

  const today = getTodayString();

  const filteredScales =
    scales.filter((scale) => {
      const matchesSearch =
        scale.employee_name
          .toLowerCase()
          .includes(normalizedSearch) ||
        scale.company_name
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "all" ||
        scale.status === statusFilter;

      const matchesPeriod =
        periodFilter === "all" ||
        (periodFilter === "today" &&
          scale.work_date === today) ||
        (periodFilter === "upcoming" &&
          scale.work_date > today) ||
        (periodFilter === "past" &&
          scale.work_date < today);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPeriod
      );
    });

  const emptyState =
    scales.length === 0 ? (
      <EmptyState
        icon="📅"
        title="Nenhuma escala cadastrada"
        description='Clique em "+ Nova Escala" para começar.'
      />
    ) : (
      <EmptyState
        icon="🔍"
        title="Nenhuma escala encontrada"
        description="Tente outro termo ou filtro."
      />
    );

  return (
    <View style={styles.container}>
      <Header title="Escalas" />

      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Pesquisar funcionário ou empresa..."
      />

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>
          Filtrar por status
        </Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={statusFilter}
            onValueChange={(itemValue) =>
              setStatusFilter(
                itemValue as StatusFilter
              )
            }
          >
            <Picker.Item
              label="Todas"
              value="all"
            />

            <Picker.Item
              label="Agendadas"
              value="scheduled"
            />

            <Picker.Item
              label="Concluídas"
              value="completed"
            />

            <Picker.Item
              label="Canceladas"
              value="cancelled"
            />
          </Picker>
        </View>
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>
          Filtrar por período
        </Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={periodFilter}
            onValueChange={(itemValue) =>
              setPeriodFilter(
                itemValue as PeriodFilter
              )
            }
          >
            <Picker.Item
              label="Todas"
              value="all"
            />

            <Picker.Item
              label="Hoje"
              value="today"
            />

            <Picker.Item
              label="Próximas"
              value="upcoming"
            />

            <Picker.Item
              label="Anteriores"
              value="past"
            />
          </Picker>
        </View>
      </View>

      <PrimaryButton
        title="+ Nova Escala"
        onPress={() =>
          router.push("/scale-create")
        }
      />

      <FlatList
        data={filteredScales}
        keyExtractor={(item) =>
          String(item.id)
        }
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={emptyState}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <Text style={styles.company}>
              {item.company_name}
            </Text>

            <ScaleCard
              scale={item}
              onEdit={() =>
                router.push({
                  pathname: "/scale-edit",
                  params: {
                    id: String(item.id),
                  },
                })
              }
              onDelete={() =>
                handleDelete(item.id!)
              }
              onStatusChange={loadScales}
            />
          </View>
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

  cardContainer: {
    marginBottom: 4,
  },

  company: {
    marginBottom: 6,
    marginLeft: 6,
    fontWeight: "600",
    color: "#666",
    fontSize: 14,
  },
});