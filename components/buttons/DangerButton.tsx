import {
    Pressable,
    StyleSheet,
    Text,
} from "react-native";

type Props = {
  title: string;
  onPress: () => void;
};

export default function DangerButton({
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
    backgroundColor: "#DC2626",

    borderRadius: 8,

    paddingVertical: 10,
    paddingHorizontal: 18,

    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 15,
  },
});