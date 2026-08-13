import { THEME } from "@/constants/theme";
import { StyleSheet, View } from "react-native";
import Skeleton from "./Skeleton";

export default function SkeletonStat() {
  return (
    <View style={styles.card}>
      <Skeleton
        width={36}
        height={36}
        borderRadius={18}
      />

      <View style={{ height: THEME.spacing.sm }} />

      <Skeleton
        width="60%"
        height={14}
      />

      <View style={{ height: THEME.spacing.xs }} />

      <Skeleton
        width="40%"
        height={28}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",

    backgroundColor: THEME.colors.white,

    borderRadius: THEME.radius.lg,

    padding: THEME.spacing.lg,

    marginBottom: THEME.spacing.md,

    alignItems: "center",

    ...THEME.shadow.md,
  },
});