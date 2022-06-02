import React, { useState, useEffect, useRef } from "react";

import { MAX_SHOP_ITEMS_AMOUNT, BASE_SHOP_URL } from "../../../constants";
import { Clothes, ClothesFetch } from "../../../sharedTypes/fetchedTypes";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../store/Store";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../slices/authSlice";
type ClothesItemsProps = {
  priceInFilterRange: (price: number) => boolean;
  productInSearchCategory: (product: Clothes) => boolean;
  itemsCount: number;
  setItemsCount: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  data: ClothesFetch | null;
  error: boolean;
};
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0,
};
export function useProducts({
  itemsCount,
  setItemsCount,
  loading,
  data,
}: ClothesItemsProps) {
  const lastItemRef = useRef<HTMLElement | null>(null);
  const { cart, user } = useSelector(selectAuth);
  const dispatch = useDispatch<any>();
  function getItemCount(itemId: number) {
    if (user) {
      if (itemId in cart) return cart[itemId];
      return 0;
    }
  }
  function getCartMessage() {
    return user ? "ADD TO CART" : "LOGIN TO ADD";
  }
  function handleAddToCart(itemId: number) {
    if (!user) return;
    dispatch(addToCart(itemId));
  }
  function allItemsFetches() {
    return data!.length % 8 && !loading;
  }
  useEffect(() => {
    function getNewItems(entries: IntersectionObserverEntry[]) {
      if (loading) return;
      if (itemsCount >= MAX_SHOP_ITEMS_AMOUNT) return;
      if (entries[0].isIntersecting)
        setItemsCount((prevItemsCount) => prevItemsCount + 8); //fetch 8 additional items
    }
    const observer = new IntersectionObserver(getNewItems, options);
    if (lastItemRef.current) observer.observe(lastItemRef.current);
    return () => {
      if (lastItemRef.current) observer.unobserve(lastItemRef.current);
    };
  }, [lastItemRef, loading]);
  return {
    lastItemRef,
    cart,
    user,
    dispatch,
    getItemCount,
    getCartMessage,
    handleAddToCart,
    allItemsFetches,
  };
}
