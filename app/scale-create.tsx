import { Alert, StyleSheet, View } from "react-native";

import { useRouter } from "expo-router";

import { Header } from "@/components/layout/Header";
import ScaleForm from "@/components/scale/ScaleForm";
import { COLORS } from "@/constants/colors";
import { scaleService } from "@/services/scaleService";
import { Scale } from "@/types/Scale";

export default function ScaleCreate() {
  const router = useRouter();

  function handleCreate(scale: Omit<Scale, "id">) {
    scaleService.create(scale);

    Alert.alert(
      "Sucesso",
      "Escala cadastrada com sucesso!"
    );

    router.back();
  }

  return (
    <View style={styles.container}>
      <Header title="Nova Escala" />

      <ScaleForm
        buttonTitle="Salvar Escala"
        onSubmit={handleCreate}
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