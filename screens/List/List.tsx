import {
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";
import type { GetList, ListType } from "./List.type";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  Layout,
  ZoomOut,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { RootStack } from "../index.type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const CryptoData = [
  { id: 1, name: "Bitcoin" },
  { id: 2, name: "Ethereum" },
  { id: 3, name: "Tether" },
  { id: 4, name: "USD Coin" },
];

const List: React.FC<ListType> = () => {
  const [search, onChangeSearch] = useState<string>("");
  const [data, setData] = useState<GetList[] | []>([]);
  const [searchedData, setSearchedData] = useState<GetList[] | []>(data);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const initialMode = useRef<boolean>(true);
  const { navigate } = useNavigation<NativeStackNavigationProp<RootStack>>();

  useEffect(() => {
    setSearchedData(data);
  }, [data]);

  useEffect(() => {
    if (search === "") {
      setSearchedData(data);
    } else {
      const searched = data.filter((d) =>
        d.name.toLowerCase().includes(search.toLowerCase())
      );
      setSearchedData(searched);
    }
  }, [search]);

  useEffect(() => {
    initialMode.current = false;
  }, []);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get<GetList[]>(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      )
      .then((res: any) => {
        setIsLoading(false);
        setData(res.data);
      })
      .catch((error: any) => {
        setIsLoading(false);
        setIsError(true);
        setError(error);
      });
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Text>loading...</Text>;
  }

  if (error) {
    console.log("error", error);
  }

  const renderItem = ({ item, index }: ListRenderItemInfo<GetList>) => {
    return (
      <Pressable
        onPress={() =>
          navigate("Single", {
            data: item,
          })
        }
      >
        <Animated.View
          style={[styles.Card]}
          exiting={FadeIn}
          layout={Layout.delay(500)}
          entering={initialMode.current ? FadeIn.delay(110 * index) : FadeIn}
        >
          <View style={[styles.leftCard]}>
            <Image
              style={[styles.img]}
              resizeMode="contain"
              source={{ uri: item.image }}
            />
          </View>
          <View style={[styles.rightCard]}>
            <Text>{item.name}</Text>
            <Text>current price {item.current_price}$</Text>
          </View>
        </Animated.View>
      </Pressable>
    );
  };

  const EmptyData = () => {
    return (
      <Animated.View
        style={styles.EmptyData}
        entering={FadeInUp.delay(500)}
        exiting={FadeInDown.delay(500)}
      >
        <Text>No such crypto currency found</Text>
        <View style={styles.Tags}>
          {CryptoData.map((d) => (
            <Pressable key={d.id} onPress={() => onChangeSearch(d.name)}>
              <View style={styles.tag}>
                <Text style={styles.textTag}>{d.name}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={[styles.container]}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={[styles.Header]}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeSearch}
              value={search}
              selectionColor="#000"
            />
            <Pressable>
              <Text>Search</Text>
            </Pressable>
          </View>
        }
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll={true}
        data={searchedData}
        keyExtractor={(item: GetList) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={EmptyData}
      />
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  Header: {
    width: "100%",
    padding: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: 60,
    backgroundColor: "#fff",
  },
  Card: {
    height: 150,
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  img: {
    height: 50,
    width: 100,
  },
  leftCard: {
    width: "30%",
  },
  rightCard: {
    width: "70%",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    marginRight: 5,
    padding: 2,
    paddingHorizontal: 7,
  },
  Tags: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tag: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
    paddingHorizontal: 5,
    paddingVertical: 3,
    marginRight: 5,
  },
  EmptyData: {
    flexDirection: "column",
    alignItems: "center",
  },
  textTag: {
    fontSize: 12,
  },
});
