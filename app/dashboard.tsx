import AlertsPanel from "@/components/dashboard/AlertsPanel";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import KPIGrid from "@/components/dashboard/KPIGrid";
import ManagementSection from "@/components/dashboard/ManagementSection";
import QuickActions from "@/components/dashboard/QuickActions";
import SystemStatus from "@/components/dashboard/SystemStatus";
import TodayOverview from "@/components/dashboard/TodayOverview";
import Screen from "@/components/layout/Screen";
import { dashboardService } from "@/services/dashboardService";
import { DashboardStatistics } from "@/types/Dashboard";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStatistics>({
    totalCompanies: 0,
    totalEmployees: 0,
    activeEmployees: 0,
    inactiveEmployees: 0,
    totalScales: 0,
    todayScales: 0,
  });

  useEffect(() => {
    const data = dashboardService.getStatistics();
    setStats(data);
  }, []);

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <DashboardHeader />

        <KPIGrid stats={stats} />

        <DashboardSummary stats={stats} />

        <TodayOverview stats={stats} />

        <AlertsPanel stats={stats} />

        <QuickActions />

        <ManagementSection />

        <SystemStatus />
      </ScrollView>
    </Screen>
  );
}