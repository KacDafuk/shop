import styles from "./clothesItems.module.css";
import LoadingTruck from "../../../components/loadingTruck/LoadingTruck";
import { Link } from "react-router-dom";
import Tooltip from "../../../components/tooltip/Tooltip";
import { ClothesFetch, Clothes } from "../../../sharedTypes/fetchedTypes";
import ErrorMessage from "../../../components/errorMessage/ErrorMessage";
import { useProducts } from "./useProducts";

type ClothesItemsProps = {
  priceInFilterRange: (price: number) => boolean;
  productInSearchCategory: (product: Clothes) => boolean;
  itemsCount: number;
  setItemsCount: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  data: ClothesFetch | null;
  error: boolean;
};
const ClothesItems = ({
  priceInFilterRange,
  itemsCount,
  setItemsCount,
  loading,
  data,
  productInSearchCategory,
  error,
}: ClothesItemsProps) => {
  const {
    lastItemRef,
    getItemCount,
    getCartMessage,
    handleAddToCart,
    allItemsFetches,
  } = useProducts({
    priceInFilterRange,
    itemsCount,
    setItemsCount,
    loading,
    data,
    productInSearchCategory,
    error,
  });
  return (
    <>
      <article className={styles.clothesContainer}>
        {data!
          .filter(
            (item) =>
              priceInFilterRange(Number(item.price)) &&
              productInSearchCategory(item)
          )
          .map((item, idx, arr) => (
            <article
              className={styles.clothesCard}
              ref={arr.length - 1 === idx ? lastItemRef : null}
            >
              <article
                className={styles.clothesCardImage}
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <section className={styles.clothesCardActions}>
                  <i
                    className={`fa-solid fa-cart-shopping fa-3x ${styles.tooltipParent}`}
                    onClick={() => handleAddToCart(item.id)}
                  >
                    <Tooltip text={getCartMessage()} />
                  </i>
                  <span className={styles.cartItemCount}>
                    {getItemCount(item.id)}
                  </span>
                  <Link to={`/product/${item.id}`}>
                    <i
                      className={`fa-solid fa-book-open fa-3x ${styles.tooltipParent}`}
                    >
                      <Tooltip text={"learn more"} />
                    </i>
                  </Link>
                </section>
              </article>
              <section className={styles.cardInfo}>
                <p>Price: {item.price} $</p>
              </section>
            </article>
          ))}
      </article>
      {error && <ErrorMessage errorText="We couldn't download your products" />}
      {loading && <LoadingTruck loadingText={"Getting more products"} />};
      {allItemsFetches() && (
        <p className={styles.noItemsMessage}>No more items found</p>
      )}
    </>
  );
};

export default ClothesItems;

//PREVIOUSE CODE FOR FETCH ON LAST ITEM
//decided to change to pagination instead
// useEffect(() => {
//   function getNewItems(entries: IntersectionObserverEntry[]) {
//     if (loading) return;
//     if (itemsCount >= MAX_SHOP_ITEMS_AMOUNT) return;
//     if (entries[0].isIntersecting)
//       setItemsCount((prevItemsCount) => prevItemsCount + 8); //fetch 8 additional items
//   }
//   const observer = new IntersectionObserver(getNewItems, options);
//   if (lastItemRef.current) observer.observe(lastItemRef.current);
//   return () => {
//     if (lastItemRef.current) observer.unobserve(lastItemRef.current);
//   };
// }, [lastItemRef, loading]);
