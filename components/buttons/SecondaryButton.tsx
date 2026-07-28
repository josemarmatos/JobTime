import {
    Pressable,
    StyleSheet,
    Text,
} from "react-native";

import { COLORS } from "@/constants/colors";

type Props = {
  title: string;
  onPress: () => void;
};

export default function SecondaryButton({
  title,
  onPress,
}: Props) {
  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.text}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: COLORS.primary,

    borderRadius: 8,

    paddingVertical: 10,
    paddingHorizontal: 18,

    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    color: COLORS.primary,
    fontWeight: "600",
    fontSize: 15,
  },
});