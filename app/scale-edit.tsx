import {
  router,
  useLocalSearchParams,
} from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
} from "react-native";

import { Header } from "@/components/layout/Header";
import ScaleForm from "@/components/scale/ScaleForm";
import { COLORS } from "@/constants/colors";
import { scaleService } from "@/services/scaleService";
import { Scale } from "@/types/Scale";

export default function ScaleEdit() {
  const { id } =
    useLocalSearchParams();

  const [scale, setScale] =
    useState<Scale | null>(null);

  useEffect(() => {
    if (!id) return;

    const data =
      scaleService.findById(
        Number(id)
      );

    if (!data) {
      Alert.alert(
        "Erro",
        "Escala não encontrada."
      );

      router.back();

      return;
    }

    setScale(data);
  }, [id]);

  function handleUpdate(
    updatedScale: Scale
  ) {
    try {
      scaleService.update(
        updatedScale
      );

      Alert.alert(
        "Sucesso",
        "Escala atualizada com sucesso!"
      );

      router.back();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar a escala.";

      Alert.alert(
        "Não foi possível atualizar",
        message
      );
    }
  }

  if (!scale) {
    return (
      <View
        style={styles.container}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Editar Escala" />

      <ScaleForm
        initialValues={scale}
        buttonTitle="Salvar Alterações"
        onSubmit={handleUpdate}
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
});