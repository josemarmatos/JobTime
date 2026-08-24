import { THEME } from "@/constants/theme";
import { ReactNode } from "react";
import { ScrollView, StyleSheet } from "react-native";

type Props = {
  children: ReactNode;
};

export default function FormContainer({
  children,
}: Props) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },

  content: {
    padding: THEME.spacing.lg,
    paddingBottom: THEME.spacing.xxl,
  },
});