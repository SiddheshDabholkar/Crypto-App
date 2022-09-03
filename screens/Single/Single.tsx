import { StyleSheet, Text, View } from "react-native";
import React from "react";
import type { SingleType } from "./Single.type";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStack } from "../index.type";

const Single: React.FC<SingleType> = () => {
  const { data } = useRoute<RouteProp<RootStack, "Single">>().params;

  

  return (
    <View style={styles.container}>
      <Text>{data.name}</Text>
    </View>
  );
};

export default Single;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
