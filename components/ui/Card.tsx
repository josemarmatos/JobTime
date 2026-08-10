import { THEME } from "@/constants/theme";
import { ReactNode } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

type Props = {
  children: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function Card({
  children,
  onPress,
  style,
}: Props) {
  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.card,
          pressed && styles.pressed,
          style,
        ]}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: THEME.colors.white,

    borderRadius: THEME.radius.lg,

    padding: THEME.spacing.lg,

    borderWidth: 1,

    borderColor: THEME.colors.border,

    ...THEME.shadow.md,
  },

  pressed: {
    opacity: 0.95,

    transform: [
      {
        scale: 0.98,
      },
    ],
  },
});