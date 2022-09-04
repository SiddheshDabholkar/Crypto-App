import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import React from "react";
import type { SingleType } from "./Single.type";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStack } from "../index.type";
import { Foundation, Ionicons, Entypo } from "@expo/vector-icons";
import Animated, {
  FadeInDown,
  FadeInUp,
  SlideInDown,
  SlideInUp,
  ZoomIn,
} from "react-native-reanimated";

const RImage = Animated.createAnimatedComponent(Image);

const Single: React.FC<SingleType> = () => {
  const { data } = useRoute<RouteProp<RootStack, "Single">>().params;

  const CardsData = [
    {
      id: 1,
      icon: <Foundation name="dollar" size={30} color="black" />,
      name: "market capitalization",
      data: data?.market_cap,
    },
    {
      id: 2,
      icon: <Entypo name="suitcase" size={30} color="black" />,
      name: "circulating supply",
      data: data?.circulating_supply,
    },
    {
      id: 3,
      icon: <Ionicons name="analytics-outline" size={30} color="black" />,
      name: "24 hours high",
      data: data?.high_24h,
    },
    {
      id: 4,
      icon: <Ionicons name="analytics-outline" size={30} color="black" />,
      name: "24 hours low",
      data: data?.low_24h,
    },
  ];

  return (
    <Animated.View
      style={styles.container}
      entering={FadeInDown}
      exiting={FadeInUp}
    >
      <View style={styles.top}>
        <ImageBackground
          style={styles.banner}
          resizeMode="cover"
          source={require("../../assets/illustration.jpg")}
        />
      </View>
      <RImage
        source={{ uri: data?.image }}
        style={styles.img}
        resizeMode="contain"
        entering={FadeInUp.delay(500)}
        exiting={FadeInDown.delay(500)}
      />
      <View style={styles.bottom}>
        <View style={styles.details}>
          <Text style={styles.name}>{data?.name}</Text>
          <View style={styles.cardsCont}>
            {CardsData.map((d, i) => (
              <Animated.View
                key={d.id}
                style={styles.card}
                entering={FadeInDown.delay(i * 100)}
                exiting={FadeInUp.delay(i * 100)}
              >
                {d.icon}
                <Text style={styles.cardText}>{d.name}</Text>
                <Text style={styles.data}>{d.data}</Text>
              </Animated.View>
            ))}
          </View>
        </View>
      </View>
      <Text>last updated:{data?.last_updated}</Text>
    </Animated.View>
  );
};

export default Single;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  img: {
    height: 250,
    width: 150,
    position: "absolute",
    top: 150,
    zIndex: 100,
  },
  top: {
    height: "30%",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  bottom: {
    height: "68%",
    width: "100%",
    flexDirection: "column",
    padding: 10,
  },
  banner: {
    height: "100%",
    width: "100%",
  },
  details: {
    marginTop: "25%",
  },
  name: {
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
  },
  cardsCont: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "90%",
  },
  card: {
    width: "45%",
    height: "45%",
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
  },
  source: {
    fontSize: 10,
    color: "gray",
  },
  cardText: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  data: {
    marginTop: 2,
    color: "#49a3ff",
    fontSize: 13,
  },
});
