import styles from "./product.module.css";

import LoadingTruck from "../../components/loadingTruck/LoadingTruck";
import Tooltip from "../../components/tooltip/Tooltip";

import ErrorMessage from "../../components/errorMessage/ErrorMessage";
import { useProduct } from "./useProduct";
const ProductPage = () => {
  const {
    getTooltipMessage,
    getItemCount,
    addToCartPageItem,
    data,
    loading,
    error,
  } = useProduct();

  return (
    <main className={!loading && styles.container}>
      {loading ? (
        <LoadingTruck loadingText="getting your product" />
      ) : (
        <>
          <section
            className={styles.productPhoto}
            style={{ backgroundImage: `url(${data?.image})` }}
          ></section>
          <section className={styles.productInfo}>
            <section className={styles.productInfoInner}>
              <h2 className={styles.productTitle}>{data?.title}</h2>
              <p className={styles.productDescription}>{data?.description}</p>
              <p className={styles.priceInfo}>
                <button
                  className={`${styles.tooltipParent}`}
                  onClick={addToCartPageItem}
                >
                  <Tooltip text={getTooltipMessage()} />
                  ADD TO CART {getItemCount()}
                  {/*add counter of how many items user have*/}
                </button>
                <span className={styles.productPrice}>$ {data!.price}</span>
              </p>
            </section>
          </section>
          {error && <ErrorMessage errorText={"we couldn't get your product"} />}
        </>
      )}
    </main>
  );
};

export default ProductPage;
