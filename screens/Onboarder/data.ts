export type Datatype = {
  id: number;
  title: string;
  description: string;
  img: string;
};

export const data: Datatype[] = [
  {
    id: 1,
    title: "Easily Money Transfer",
    description: "The future is in your hand all the things are easy with app",
    img: require("../../assets/lottie/one.json"),
  },
  {
    id: 2,
    title: "Trade at your own pace",
    description: "The future is in your hand all the things are easy with app",
    img: require("../../assets/lottie/two.json"),
  },
  {
    id: 3,
    title: "Support",
    description: "The future is in your hand all the things are easy with app",
    img: require("../../assets/lottie/three.json"),
  },
  {
    id: 4,
    title: "Easy transfers",
    description: "The future is in your hand all the things are easy with app",
    img: require("../../assets/lottie/four.json"),
  },
];
