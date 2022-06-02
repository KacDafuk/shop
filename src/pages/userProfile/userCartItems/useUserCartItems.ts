import React, { useEffect, useState } from "react";
import styles from "./userCartItems.module.css";
import { UserCart } from "../../../sharedTypes/sharedAuth";
import LoadingTruck from "../../../components/loadingTruck/LoadingTruck";
import { ClothesFetch } from "../../../sharedTypes/fetchedTypes";
import { BASE_SHOP_URL } from "../../../constants";
import { Link } from "react-router-dom";
import Tooltip from "../../../components/tooltip/Tooltip";
import { useDispatch } from "react-redux";
import { addToCart, deleteCartItem } from "../../../slices/authSlice";
type ProductsInfo = {
  loading: boolean;
  products: ClothesFetch;
};
type UserCartProps = {
  cart: UserCart;
};
export function useUSerCartItems(cart: UserCart) {
  const [productsInfo, setProductsInfo] = useState<ProductsInfo>({
    loading: true,
    products: [],
  });
  const dispatch = useDispatch<any>();
  function getOrderMessage() {
    if (!productsInfo.products.length) return "Your cart is empty";
    return "ORDER NOW";
  }
  function handleOrder() {
    if (productsInfo.products.length == 0) return;
    dispatch(
      deleteCartItem({
        itemId: -1,
        deleteOption: "emptyCart",
      })
    );
  }

  function deleteWholeItem(productId: number) {
    dispatch(
      deleteCartItem({
        itemId: productId,
        deleteOption: "deleteAll",
      })
    );
  }
  function addToCart(productId: number) {
    dispatch(addToCart(productId));
  }
  function getProductCount(id: number) {
    return cart[id];
  }
  function getTotalPrice(id: number, price: number) {
    return (getProductCount(id) * price).toFixed(2);
  }
  function getTitle(title: string) {
    if (title.length > 50) return title.slice(0, 100) + "...";
    return title;
  }
  function getDescription(description: string) {
    if (description.length > 100) return description.slice(0, 100) + "...";
    return description;
  }
  function getAllProductsCost() {
    return productsInfo.products
      .reduce(
        (accum, product) =>
          accum + Number(getTotalPrice(product.id, Number(product.price))),
        0
      )
      .toFixed(2);
  }
  useEffect(() => {
    const promiseArray = [];
    for (const productId in cart) {
      promiseArray.push(
        fetch(BASE_SHOP_URL + "/" + productId).then((data) => data.json())
      );
    }
    Promise.all(promiseArray)
      .then((data) => {
        setProductsInfo((prevProductsInfo) => ({
          products: data as [],
          loading: false,
        }));
      })
      .catch((e) => console.log(e, "ERROR"));
  }, [cart]);
  return {
    getOrderMessage,
    handleOrder,
    deleteWholeItem,
    getProductCount,
    getTotalPrice,
    getTitle,
    getDescription,
    getAllProductsCost,
    productsInfo,
    addToCart,
    dispatch,
  };
}
