import React, { useRef } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { PageProps } from "./Page.type";
import LottieView from "lottie-react-native";

const { height, width } = Dimensions.get("window");

const Page: React.FC<PageProps> = ({ data, index, translateX, translateY }) => {
  const animation = useRef(null);

  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const rTitleStyle = useAnimatedStyle(() => {
    const fontSize = interpolate(
      translateX.value,
      inputRange,
      [20, 30, 20],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP
    );
    const left = interpolate(
      translateX.value,
      inputRange,
      [0, width / 7, width],
      Extrapolate.CLAMP
    );
    return {
      fontSize,
      opacity,
      left,
    };
  });
  const rDescriptionStyle = useAnimatedStyle(() => {
    const fontSize = interpolate(
      translateX.value,
      inputRange,
      [12, 14, 12],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP
    );
    const left = interpolate(
      translateX.value,
      inputRange,
      [800, 10, 800],
      Extrapolate.CLAMP
    );
    return {
      fontSize,
      opacity,
      left,
    };
  });

  return (
    <Animated.View style={[styles.container]}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          height: 300,
          width: 300,
        }}
        source={data.img}
      />
      <Animated.Text style={[styles.title, rTitleStyle]}>
        {data.title}
      </Animated.Text>
      <Animated.Text style={[styles.description, rDescriptionStyle]}>
        {data.description}
      </Animated.Text>
    </Animated.View>
  );
};

export default Page;

const styles = StyleSheet.create({
  lottie: {
    height: 300,
    width: 300,
  },
  container: {
    height,
    width,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    height: 200,
    width: 200,
  },
  title: {
    position: "absolute",
    top: "60%",
    fontWeight: "bold",
  },
  description: {
    fontWeight: "600",
    fontStyle: "italic",
  },
});
