import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import React from "react";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import Page from "./components/page";
import { data } from "./data";
import { percentageDifference } from "./components/utils";
import { useNavigation } from "@react-navigation/native";
import { RootStack } from "../index.type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Indicators from "./components/Indicators";

const { height, width } = Dimensions.get("window");
const DIFF = percentageDifference(height, width);

const Onboarder = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const { navigate } = useNavigation<NativeStackNavigationProp<RootStack>>();

  const activeIndex = useDerivedValue(() => {
    return Math.round(translateX.value / width);
  });

  console.log("activeIndex", activeIndex.value);

  const scrollHandler = useAnimatedScrollHandler((e) => {
    translateX.value = e.contentOffset.x;
    translateY.value = e.contentOffset.y;
  });

  const OnPressNext = () => {
    if (activeIndex.value === data.length - 1) {
      navigate("List");
    } else {
      scrollRef?.current?.scrollTo({
        x: width * (activeIndex.value + 1),
      });
    }
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        ref={scrollRef as any}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
      >
        {data.map((d, i) => (
          <Page
            data={d}
            key={d.id.toString()}
            translateX={translateX}
            translateY={translateY}
            index={i}
          />
        ))}
      </Animated.ScrollView>
      <View style={[styles.footer]}>
        <View style={[styles.Indicator]}>
          {data.map((d, i) => (
            <Indicators
              key={i.toString()}
              activeIndex={activeIndex}
              index={i}
              translateX={translateX}
            />
          ))}
        </View>
        <Pressable style={styles.next} onPress={OnPressNext}>
          <Text>next</Text>
        </Pressable>
      </View>
      <Pressable style={styles.skip} onPress={() => navigate("List")}>
        <Text style={styles.skipText}>Skip</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  skip: {
    position: "absolute",
    top: 40,
    right: 30,
  },
  skipText: {
    fontSize: 14,
  },
  next: {
    borderColor: "#000",
    borderWidth: 1,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 20,
    paddingHorizontal: 30,
    alignItems: "center",
    height: "9%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Indicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default Onboarder;
