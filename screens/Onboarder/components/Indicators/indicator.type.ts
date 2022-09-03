import Animated from "react-native-reanimated";

export type IndicatorType = {
  activeIndex: Animated.SharedValue<number>;
  translateX: Animated.SharedValue<number>;
  index: number;
};
