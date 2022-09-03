import React, { useRef } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Animated, {
  Extrapolate,
  FadeInUp,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import { PageProps } from "./Page.type";
import LottieView from "lottie-react-native";

const { height, width } = Dimensions.get("window");

const AnimatedLottie = Animated.createAnimatedComponent(LottieView);

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
    return {
      fontSize,
    };
  });
  // const rDescriptionStyle = useAnimatedStyle(() => {});

  return (
    <Animated.View style={[styles.container]}>
      <AnimatedLottie
        autoPlay
        ref={animation}
        style={{
          width: 300,
          height: 300,
        }}
        source={data.img}
      />
      <Animated.Text style={[styles.title, rTitleStyle]}>
        {data.title}
      </Animated.Text>
      <Animated.Text style={[styles.description]}>
        {data.description}
      </Animated.Text>
    </Animated.View>
  );
};

export default Page;

const styles = StyleSheet.create({
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
