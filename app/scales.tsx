import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import { Header } from "@/components/layout/Header";
import ScaleCard from "@/components/scale/ScaleCard";
import { COLORS } from "@/constants/colors";
import {
  ScaleListItem,
  scaleService,
} from "@/services/scaleService";

export default function Scales() {
  const [scales, setScales] = useState<ScaleListItem[]>([]);

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

  return (
    <View style={styles.container}>
      <Header title="Escalas" />

      <PrimaryButton
        title="+ Nova Escala"
        onPress={() => router.push("/scale-create")}
      />

      <FlatList
        data={scales}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <PrimaryButton
              title="Cadastrar primeira escala"
              onPress={() => router.push("/scale-create")}
            />
          </View>
        }
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

  emptyContainer: {
    marginTop: 40,
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