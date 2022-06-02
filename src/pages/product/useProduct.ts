import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { BASE_SHOP_URL } from "../../constants";
import { Clothes } from "../../sharedTypes/fetchedTypes";

import { selectAuth } from "../../store/Store";
import { useSelector } from "react-redux";
import { addToCart } from "../../slices/authSlice";
import { useDispatch } from "react-redux";
export function useProduct() {
  const dispatch = useDispatch<any>();
  const { productId } = useParams();
  const { cart, user } = useSelector(selectAuth);
  function getTooltipMessage() {
    if (user) return "";
    return "login to use";
  }
  function getItemCount() {
    if (!user) return "";
    if (!cart[Number(productId)]) return "(0)";
    return `(${cart[Number(productId)]})`;
  }
  function addToCartPageItem() {
    if (!user) return;
    dispatch(addToCart(Number(productId)));
  }
  const { data, loading, error } = useFetch<Clothes>(
    `${BASE_SHOP_URL}/${productId}`
  );
  return {
    dispatch,
    productId,
    cart,
    user,
    getTooltipMessage,
    getItemCount,
    addToCartPageItem,
    data,
    loading,
    error,
  };
}
