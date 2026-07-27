import PrimaryButton from "@/components/buttons/PrimaryButton";
import { Header } from "@/components/layout/Header";
import { COLORS } from "@/constants/colors";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
export default function Employees() {
  return (
    <View style={styles.container}>
      <Header title="Funcionários" />
<PrimaryButton
  title="+ Novo Funcionário"
  onPress={() => router.push("/employee-create")}
/>
      <Text style={styles.subtitle}>
        Em breve você poderá cadastrar, editar e excluir funcionários.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 30,
  },
});