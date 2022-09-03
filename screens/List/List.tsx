import { ListRenderItemInfo, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";
import type { GetList, ListType } from "./List.type";

const List: React.FC<ListType> = () => {
  const [data, setData] = useState<GetList[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

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
    return;
  }

  console.log(data);

  return (
    <View style={[styles.container]}>
      <FlatList
        data={data}
        keyExtractor={(item: GetList) => item.id}
        renderItem={({ item }: ListRenderItemInfo<GetList>) => (
          <View style={{ flex: 1 }}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
