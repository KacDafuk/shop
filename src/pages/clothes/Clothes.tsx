import LoadingTruck from "../../components/loadingTruck/LoadingTruck";
import Products from "./products/Products";
import SearchBar from "./searchBar/SearchBar";
import ErrorMessage from "../../components/errorMessage/ErrorMessage";
import { useClothes } from "./useClothes";

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
const Clothes = () => {
  const {
    itemsCount,
    searchCategory,
    priceInFilterRange,
    productInSearchCategory,
    handleCategoryChange,
    handleFilterChange,
    loading,
    data,
    error,
    setItemsCount,
  } = useClothes();
  return (
    <>
      {loading && data === null ? (
        <LoadingTruck loadingText={"Getting your products"} />
      ) : error ? (
        <ErrorMessage errorText="Something went wrong" />
      ) : (
        <main>
          <SearchBar
            handleCategoryChange={handleCategoryChange}
            handleFilterChange={handleFilterChange}
            categories={categories}
            searchCategory={searchCategory}
          />
          <Products
            priceInFilterRange={priceInFilterRange}
            productInSearchCategory={productInSearchCategory}
            itemsCount={itemsCount}
            setItemsCount={setItemsCount}
            data={data}
            loading={loading}
            error={error}
          />
        </main>
      )}
    </>
  );
};

export default Clothes;
