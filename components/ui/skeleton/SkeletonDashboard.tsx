import { THEME } from "@/constants/theme";
import { StyleSheet, View } from "react-native";
import SkeletonCard from "./SkeletonCard";
import SkeletonStat from "./SkeletonStat";

export default function SkeletonDashboard() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <SkeletonCard />

      {/* KPIs */}
      <View style={styles.stats}>
        <SkeletonStat />
        <SkeletonStat />
      </View>

      <View style={styles.stats}>
        <SkeletonStat />
        <SkeletonStat />
      </View>

      {/* Cards inferiores */}
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: THEME.spacing.md,
  },

  stats: {
    flexDirection: "row",

    justifyContent: "space-between",
  },
});