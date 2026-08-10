import PrimaryButton from "@/components/buttons/PrimaryButton";
import SectionTitle from "@/components/layout/SectionTitle";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function QuickActions() {
  return (
    <View style={styles.container}>
      <SectionTitle title="Ações rápidas" />

      <PrimaryButton
        title="🏢 Nova Empresa"
        onPress={() => router.push("/company-create")}
      />

      <View style={styles.space} />

      <PrimaryButton
        title="👥 Novo Funcionário"
        onPress={() => router.push("/employee-create")}
      />

      <View style={styles.space} />

      <PrimaryButton
        title="📅 Nova Escala"
        onPress={() => router.push("/scale-create")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 28,
  },

  space: {
    height: 12,
  },
});