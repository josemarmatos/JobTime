import { ToastProvider } from "@/components/ui/toast/ToastProvider";
import { runMigrations } from "@/database/migrations";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    console.log("RootLayout executado");

    try {
      runMigrations();
      console.log("Banco de dados inicializado com sucesso.");
    } catch (error) {
      console.error(
        "Erro ao inicializar o banco:",
        error
      );
    }
  }, []);

  return (
    <ThemeProvider
      value={
        colorScheme === "dark"
          ? DarkTheme
          : DefaultTheme
      }
    >
      <ToastProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="index"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="dashboard"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="modal"
            options={{
              presentation: "modal",
              title: "Modal",
            }}
          />
        </Stack>

        <StatusBar style="auto" />
      </ToastProvider>
    </ThemeProvider>
  );
}