import { Header } from "@/components/layout/Header";
import { COLORS } from "@/constants/colors";
import { router } from "expo-router";
import {
    Button,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function Companies() {
  return (
    <View style={styles.container}>
      <Header title="Empresas" />

      <Text style={styles.message}>
        Nenhuma empresa cadastrada.
      </Text>

      <Button
        title="Nova Empresa"
        onPress={() => router.push("/company-create")}
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

  message: {
    marginTop: 40,
    marginBottom: 30,
    fontSize: 18,
    textAlign: "center",
    color: "#666",
  },
});