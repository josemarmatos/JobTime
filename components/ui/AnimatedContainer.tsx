import { ReactNode, useEffect } from "react";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from "react-native-reanimated";

type Props = {
  children: ReactNode;
  delay?: number;
};

export default function AnimatedContainer({
  children,
  delay = 0,
}: Props) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withTiming(1, {
        duration: 350,
        easing: Easing.out(Easing.cubic),
      })
    );

    translateY.value = withDelay(
      delay,
      withTiming(0, {
        duration: 350,
        easing: Easing.out(Easing.cubic),
      })
    );
  }, [delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      {
        translateY: translateY.value,
      },
    ],
  }));

  return (
    <Animated.View style={animatedStyle}>
      {children}
    </Animated.View>
  );
}