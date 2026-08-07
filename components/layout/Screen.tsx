import { COLORS } from "@/constants/colors";
import { ReactNode } from "react";
import {
    SafeAreaView,
    StyleSheet,
} from "react-native";

type Props = {
  children: ReactNode;
};

export default function Screen({
  children,
}: Props) {
  return (
    <SafeAreaView style={styles.container}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
});