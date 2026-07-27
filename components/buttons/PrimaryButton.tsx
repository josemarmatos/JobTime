import { COLORS } from "@/constants/colors";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  title: string;
  onPress?: () => void;
};

export default function PrimaryButton({
  title,
  onPress,
}: Props) {
  return (
    <Pressable
  style={styles.button}
  onPress={() => {
    console.log("PRIMARY BUTTON");
    onPress?.();
  }}
>
      <Text style={styles.text}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  text: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
});