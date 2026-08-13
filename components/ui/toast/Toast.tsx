import { THEME } from "@/constants/theme";
import { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export type ToastType =
  | "success"
  | "error"
  | "warning"
  | "info";

type Props = {
  message: string;
  type?: ToastType;
};

export default function Toast({
  message,
  type = "info",
}: Props) {
  const translateY = useSharedValue(40);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withSequence(
      withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.cubic),
      }),
      withDelay(
        2200,
        withTiming(40, {
          duration: 300,
          easing: Easing.in(Easing.cubic),
        })
      )
    );

    opacity.value = withSequence(
      withTiming(1, {
        duration: 300,
      }),
      withDelay(
        2200,
        withTiming(0, {
          duration: 300,
        })
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: translateY.value,
      },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.container,
        styles[type],
        animatedStyle,
      ]}
    >
      <Text style={styles.text}>
        {message}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: THEME.radius.lg,
    marginHorizontal: 20,
    marginBottom: 24,
  },

  text: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "600",
  },

  success: {
    backgroundColor: "#2E7D32",
  },

  error: {
    backgroundColor: "#C62828",
  },

  warning: {
    backgroundColor: "#ED6C02",
  },

  info: {
    backgroundColor: THEME.colors.primary,
  },
});