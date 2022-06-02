import React, { useState, useRef } from "react";
import { useFetch } from "../../hooks/useFetch";
import {
  ClothesFetch,
  Clothes as ClothesType,
  SearchCategory,
} from "../../sharedTypes/fetchedTypes";
type Categories = [
  "all",
  "jewelery",
  "men's clothing",
  "women's clothing",
  "electronics"
];
const BASE_URL = "https://fakestoreapi.com/products";
const categories: Categories = [
  "all",
  "jewelery",
  "men's clothing",
  "women's clothing",
  "electronics",
];
type PriceFilter = {
  from: number;
  to: number;
};
export function useClothes() {
  const [itemsCount, setItemsCount] = useState<number>(8);
  const [searchCategory, setSearchCategory] = useState<SearchCategory>("all");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>({
    from: 0,
    to: Infinity,
  });

  function priceInFilterRange(price: number) {
    const { from, to } = priceFilter;
    console.log(from, to, "FROM TO");
    return price >= from && price <= to;
  }
  function productInSearchCategory(product: ClothesType) {
    if (searchCategory == "all") return true;
    return product.category.includes(searchCategory);
  }
  function handleCategoryChange(
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) {
    setSearchCategory(e.currentTarget.value as SearchCategory);
  }
  function handleFilterChange(
    e: React.ChangeEvent<HTMLInputElement>,
    key: "from" | "to"
  ) {
    console.log(e, e.target, "TARGEt");
    function parseNumberInput(value: string, key: "from" | "to") {
      console.log(value, key);
      if (value === "") {
        switch (key) {
          case "from":
            return 0;
          case "to":
            return Infinity;
        }
      }
      return parseInt(value);
    }
    setPriceFilter((prevPriceFilter) => ({
      ...prevPriceFilter,
      [key]: parseNumberInput(e.target.value, key),
    }));
  }
  function getFetchCategory() {
    if (searchCategory === "all") return "";
    return "/category/" + searchCategory;
  }
  const { data, loading, error } = useFetch<ClothesFetch>(
    `${BASE_URL}${getFetchCategory()}?limit=${itemsCount}`
  );
  return {
    itemsCount,
    searchCategory,
    priceFilter,
    priceInFilterRange,
    productInSearchCategory,
    handleCategoryChange,
    handleFilterChange,
    getFetchCategory,
    loading,
    data,
    error,
    setItemsCount,
  };
}
