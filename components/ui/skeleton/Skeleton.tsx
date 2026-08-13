import { THEME } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import {
  DimensionValue,
  LayoutChangeEvent,
  StyleSheet,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type Props = {
  width?: DimensionValue;
  height?: number;
  borderRadius?: number;

  /**
   * Cor de fundo do Skeleton
   */
  backgroundColor?: string;

  /**
   * Opacidade do brilho
   */
  highlightOpacity?: number;

  /**
   * Velocidade da animação (ms)
   */
  speed?: number;
};

export default function Skeleton({
  width = "100%",
  height = 20,
  borderRadius = THEME.radius.md,

  backgroundColor = "#E5E7EB",
  highlightOpacity = 0.45,
  speed = 1400,
}: Props) {
  const translateX = useSharedValue(-200);
  const containerWidth = useSharedValue(0);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(1, {
        duration: speed,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, [speed]);

  const animatedStyle = useAnimatedStyle(() => {
    const travel = containerWidth.value + 120;

    return {
      transform: [
        {
          translateX: -120 + travel * translateX.value,
        },
      ],
    };
  });

  function onLayout(event: LayoutChangeEvent) {
    containerWidth.value = event.nativeEvent.layout.width;
  }

  return (
    <View
      onLayout={onLayout}
      style={[
        styles.container,
        {
          width,
          height,
          borderRadius,
          backgroundColor,
        },
      ]}
    >
      <Animated.View style={[styles.shimmer, animatedStyle]}>
        <LinearGradient
          colors={[
            "rgba(255,255,255,0)",
            `rgba(255,255,255,${highlightOpacity})`,
            "rgba(255,255,255,0)",
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },

  shimmer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 120,
  },

  gradient: {
    flex: 1,
  },
});