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
import { useUSerCartItems } from "./useUserCartItems";
type ProductsInfo = {
  loading: boolean;
  products: ClothesFetch;
};
type UserCartProps = {
  cart: UserCart;
};
const UserCartItems = ({ cart }: UserCartProps) => {
  const {
    getOrderMessage,
    handleOrder,
    deleteWholeItem,
    getProductCount,
    getTotalPrice,
    getTitle,
    getDescription,
    getAllProductsCost,
    productsInfo,

    dispatch,
  } = useUSerCartItems(cart);
  return (
    <article className={styles.userCardContainer}>
      {productsInfo.loading ? (
        <LoadingTruck loadingText="Getting your cart items" />
      ) : (
        <>
          <button className={styles.orderButton} onClick={handleOrder}>
            {getOrderMessage()}
          </button>
          <p className={styles.totalCost}>
            Total cost : {getAllProductsCost()} $
          </p>
          {productsInfo.products.map((product) => {
            if (!getProductCount(product.id)) return "";
            return (
              <article className={styles.card}>
                <section
                  className={styles.cardImage}
                  style={{ backgroundImage: `url(${product.image})` }}
                ></section>
                <section className={styles.cardActions}>
                  <h3 className={styles.cardItemHeader}>
                    {getTitle(product.title)}
                  </h3>
                  <p>{getDescription(product.description)}</p>
                  <section>
                    <section className={styles.amountContainer}>
                      <i
                        className={`fa-solid fa-minus fa-2x" ${styles.actionIcon}`}
                        onClick={() =>
                          dispatch(deleteCartItem({ itemId: product.id }))
                        }
                      ></i>
                      {getProductCount(product.id)}
                      <i
                        className={`fa-solid fa-plus fa-2x" ${styles.actionIcon}`}
                        onClick={() => dispatch(addToCart(product.id))}
                      ></i>
                    </section>
                    <p className={styles.productPrice}>
                      total:
                      {getTotalPrice(product.id, Number(product.price)) + "$"}
                    </p>
                    <section className={styles.buttonsContainer}>
                      <button className={styles.readMoreButton}>
                        <Link to={`/product/${product.id}`}>
                          <i
                            className={`fa-solid fa-book-open fa-3x ${styles.tooltipParent}`}
                          >
                            <Tooltip text={"learn more"} />
                          </i>
                        </Link>
                      </button>
                      <button
                        className={styles.readMoreButton}
                        onClick={() => deleteWholeItem(product.id)}
                      >
                        <i
                          className={`fa-solid fa-trash-can fa-3x ${styles.tooltipParent}`}
                        >
                          <Tooltip text={"delete item"} />
                        </i>
                      </button>
                    </section>
                  </section>
                </section>
              </article>
            );
          })}
        </>
      )}
    </article>
  );
};

export default UserCartItems;
