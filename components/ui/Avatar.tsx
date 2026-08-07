import { COLORS } from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  name: string;
  size?: number;
};

export default function Avatar({
  name,
  size = 48,
}: Props) {
  const initials = name
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            fontSize: size * 0.4,
          },
        ]}
      >
        {initials}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: COLORS.white,
    fontWeight: "700",
  },
});