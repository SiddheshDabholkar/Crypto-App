import Animated from "react-native-reanimated";
import { Datatype } from "../../data";

export type PageProps = {
  data: Datatype;
  index: number;
  translateX: Animated.SharedValue<number>;
  translateY: Animated.SharedValue<number>;
};
