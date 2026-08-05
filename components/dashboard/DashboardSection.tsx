import { COLORS } from "@/constants/colors";
import { ReactNode } from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";

type Props = {
  title: string;
  children: ReactNode;
};

export default function DashboardSection({
  title,
  children,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 28,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 14,
  },
});