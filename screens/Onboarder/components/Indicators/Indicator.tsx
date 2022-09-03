import { Dimensions, StyleSheet, View } from "react-native";
import React from "react";
import { IndicatorType } from "./indicator.type";
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const { width } = Dimensions.get("screen");
const Indicator: React.FC<IndicatorType> = ({
  activeIndex,
  index,
  translateX,
}) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const IndicatorStyle = useAnimatedStyle(() => {
    const isActive = activeIndex.value === index;
    const rwidth = interpolate(
      translateX.value,
      inputRange,
      [20, 30, 20],
      Extrapolate.CLAMP
    );

    const backgroundColor = interpolateColor(
      isActive ? 1 : 0,
      [1, 0],
      ["#000", "#fff"]
    );

    return {
      width: withSpring(rwidth),
      backgroundColor: backgroundColor,
    };
  });

  return <Animated.View style={[styles.indicators, IndicatorStyle]} />;
};

export default Indicator;

const styles = StyleSheet.create({
  indicators: {
    height: 10,
    marginRight: 4,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
  },
});
