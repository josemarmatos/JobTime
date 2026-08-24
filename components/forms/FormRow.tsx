import { THEME } from "@/constants/theme";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  children: ReactNode;
};

export default function FormRow({
  children,
}: Props) {
  return (
    <View style={styles.row}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: THEME.spacing.md,
    marginBottom: THEME.spacing.md,
  },
});