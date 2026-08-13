import { THEME } from "@/constants/theme";
import { StyleSheet, View } from "react-native";
import Skeleton from "./Skeleton";

export default function SkeletonCard() {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Skeleton
          width={48}
          height={48}
          borderRadius={24}
        />

        <View style={styles.content}>
          <Skeleton width="70%" height={18} />

          <View style={{ height: THEME.spacing.sm }} />

          <Skeleton width="50%" height={14} />
        </View>
      </View>

      <Skeleton
        width={24}
        height={24}
        borderRadius={12}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: THEME.colors.white,

    borderRadius: THEME.radius.lg,

    padding: THEME.spacing.lg,

    marginBottom: THEME.spacing.md,

    borderWidth: 1,

    borderColor: THEME.colors.border,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    ...THEME.shadow.md,
  },

  row: {
    flexDirection: "row",

    alignItems: "center",

    flex: 1,
  },

  content: {
    flex: 1,

    marginLeft: THEME.spacing.md,
  },
});