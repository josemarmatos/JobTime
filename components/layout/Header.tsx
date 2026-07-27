import { COLORS } from "@/constants/colors";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
};

export function Header({ title }: Props) {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.back}>←</Text>
      </Pressable>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 25,
  },

  back: {
    fontSize: 28,
    color: COLORS.primary,
    marginRight: 15,
    fontWeight: "bold",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.text,
  },
});