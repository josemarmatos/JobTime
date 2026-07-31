import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import PrimaryInput from "@/components/inputs/PrimaryInput";
import { COLORS } from "@/constants/colors";

export default function HomeScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (!email.trim()) {
      Alert.alert("Atenção", "Informe seu e-mail.");
      return;
    }

    if (!password.trim()) {
      Alert.alert("Atenção", "Informe sua senha.");
      return;
    }

    router.replace("/dashboard");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>JOB TIME</Text>

      <Text style={styles.subtitle}>
        Gestão inteligente de equipes
      </Text>

      <PrimaryInput
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
      />

      <PrimaryInput
        placeholder="Digite sua senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <PrimaryButton
        title="Entrar"
        onPress={handleLogin}
      />

      <Text style={styles.link}>
        Esqueci minha senha
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: COLORS.background,
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 18,
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 40,
  },

  link: {
    textAlign: "center",
    color: COLORS.primary,
    marginTop: 20,
    fontWeight: "600",
  },
});