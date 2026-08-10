import DashboardCard from "@/components/cards/DashboardCard";
import SectionTitle from "@/components/layout/SectionTitle";
import { router } from "expo-router";
import { View } from "react-native";

export default function ManagementSection() {
  return (
    <View>
      <SectionTitle title="Gerenciamento" />

      <DashboardCard
        icon="🏢"
        title="Empresas"
        subtitle="Cadastrar e editar empresas"
        onPress={() => router.push("/companies")}
      />

      <DashboardCard
        icon="👥"
        title="Funcionários"
        subtitle="Gerenciar colaboradores"
        onPress={() => router.push("/employees")}
      />

      <DashboardCard
        icon="📅"
        title="Escalas"
        subtitle="Organizar jornadas"
        onPress={() => router.push("/scales")}
      />
    </View>
  );
}