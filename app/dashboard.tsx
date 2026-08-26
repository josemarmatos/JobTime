import AlertsPanel from "@/components/dashboard/AlertsPanel";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import KPIGrid from "@/components/dashboard/KPIGrid";
import ManagementSection from "@/components/dashboard/ManagementSection";
import QuickActions from "@/components/dashboard/QuickActions";
import ScaleStatusOverview from "@/components/dashboard/ScaleStatusOverview";
import SystemStatus from "@/components/dashboard/SystemStatus";
import TodayOverview from "@/components/dashboard/TodayOverview";
import UpcomingScales from "@/components/dashboard/UpcomingScales";
import Screen from "@/components/layout/Screen";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import SkeletonDashboard from "@/components/ui/skeleton/SkeletonDashboard";
import { useToast } from "@/components/ui/toast/ToastProvider";
import { dashboardService } from "@/services/dashboardService";
import { hapticService } from "@/services/hapticService";
import {
  ScaleListItem,
  scaleService,
} from "@/services/scaleService";
import { DashboardStatistics } from "@/types/Dashboard";
import {
  router,
} from "expo-router";
import {
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  RefreshControl,
  ScrollView,
} from "react-native";

export default function Dashboard() {
  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const { showToast } = useToast();

  const [stats, setStats] =
    useState<DashboardStatistics>({
      totalCompanies: 0,
      totalEmployees: 0,
      activeEmployees: 0,
      inactiveEmployees: 0,
      totalScales: 0,
      todayScales: 0,
      scheduledScales: 0,
      completedScales: 0,
      cancelledScales: 0,
    });

  const [upcomingScales, setUpcomingScales] =
    useState<ScaleListItem[]>([]);

  const loadDashboard =
    useCallback(async () => {
      const data =
        await Promise.resolve(
          dashboardService.getStatistics()
        );

      const upcoming =
        scaleService.getUpcoming(5);

      setStats(data);
      setUpcomingScales(upcoming);
    }, []);

  useEffect(() => {
    async function initialize() {
      try {
        await loadDashboard();
      } catch (error) {
        console.error(error);

        await hapticService.error();

        showToast(
          "Erro ao carregar o Dashboard.",
          "error"
        );
      } finally {
        setLoading(false);
      }
    }

    initialize();
  }, [
    loadDashboard,
    showToast,
  ]);

  const onRefresh =
    useCallback(async () => {
      setRefreshing(true);

      try {
        await loadDashboard();

        await hapticService.success();

        showToast(
          "Dashboard atualizado com sucesso!",
          "success"
        );
      } catch (error) {
        console.error(error);

        await hapticService.error();

        showToast(
          "Erro ao atualizar o Dashboard.",
          "error"
        );
      } finally {
        setRefreshing(false);
      }
    }, [
      loadDashboard,
      showToast,
    ]);

  function handleUpcomingScalePress(
    scale: ScaleListItem
  ) {
    if (!scale.id) {
      return;
    }

    router.push({
      pathname: "/scale-edit",
      params: {
        id: String(scale.id),
      },
    });
  }

  return (
    <Screen>
      {loading ? (
        <SkeletonDashboard />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          <AnimatedContainer>
            <DashboardHeader />
          </AnimatedContainer>

          <AnimatedContainer delay={80}>
            <KPIGrid stats={stats} />
          </AnimatedContainer>

          <AnimatedContainer delay={160}>
            <DashboardSummary stats={stats} />
          </AnimatedContainer>

          <AnimatedContainer delay={240}>
            <TodayOverview stats={stats} />
          </AnimatedContainer>

          <AnimatedContainer delay={320}>
            <ScaleStatusOverview
              stats={stats}
            />
          </AnimatedContainer>

          <AnimatedContainer delay={400}>
            <UpcomingScales
              scales={upcomingScales}
              onPress={
                handleUpcomingScalePress
              }
            />
          </AnimatedContainer>

          <AnimatedContainer delay={480}>
            <AlertsPanel stats={stats} />
          </AnimatedContainer>

          <AnimatedContainer delay={560}>
            <QuickActions />
          </AnimatedContainer>

          <AnimatedContainer delay={640}>
            <ManagementSection />
          </AnimatedContainer>

          <AnimatedContainer delay={720}>
            <SystemStatus />
          </AnimatedContainer>
        </ScrollView>
      )}
    </Screen>
  );
}