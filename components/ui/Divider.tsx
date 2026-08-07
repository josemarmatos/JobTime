import { COLORS } from "@/constants/colors";
import { StyleSheet, View } from "react-native";

type Props = {
  marginVertical?: number;
};

export default function Divider({
  marginVertical = 16,
}: Props) {
  return (
    <View
      style={[
        styles.divider,
        { marginVertical },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    width: "100%",
  },
});