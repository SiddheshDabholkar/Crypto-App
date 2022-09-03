import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStack } from "../index.type";

export type GetList = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: "2021-11-10T14:24:11.849Z";
  atl: number;
  atl_change_percentage: number;
  atl_date: Date;
  roi: null;
  last_updated: Date;
};

export type ListType = NativeStackScreenProps<RootStack, "List">;
