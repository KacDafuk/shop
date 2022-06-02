export type Clothes = {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
};
export type ClothesFetch = Clothes[];
export type SearchCategory =
  | "all"
  | "jewelery"
  | "men's clothing"
  | "women's clothing"
  | "electronics";
