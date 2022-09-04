import { GetList } from "./List/List.type";

export type RootStack = {
  Onboarder: undefined;
  List: undefined;
  Single: {
    data: GetList | undefined;
  };
};
