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

export default function Scales() {
  const [scales, setScales] = useState<ScaleListItem[]>([]);
  const [search, setSearch] = useState("");

  function loadScales() {
    const data = scaleService.listWithEmployee();
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

  const filteredScales = scales.filter((scale) => {
    const term = search.toLowerCase();

    return (
      scale.employee_name
        .toLowerCase()
        .includes(term) ||
      scale.company_name
        .toLowerCase()
        .includes(term)
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
        description="Tente outro termo de pesquisa."
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

      <PrimaryButton
        title="+ Nova Escala"
        onPress={() => router.push("/scale-create")}
      />

      <FlatList
        data={filteredScales}
        keyExtractor={(item) => String(item.id)}
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
              onDelete={() => handleDelete(item.id!)}
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