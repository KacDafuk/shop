import React from "react";
import styles from "./searchBar.module.css";
import { SearchCategory } from "../../../sharedTypes/fetchedTypes";
type SearchBarProps = {
  searchCategory: SearchCategory;
  handleCategoryChange: (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => void;
  handleFilterChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    key: "from" | "to"
  ) => void;
  categories: [
    "all",
    "jewelery",
    "men's clothing",
    "women's clothing",
    "electronics"
  ];
};
const SearchBar = ({
  searchCategory,
  handleCategoryChange,
  handleFilterChange,
  categories,
}: SearchBarProps) => {
  return (
    <>
      <h1 className={styles.clothesHeader}>Our products</h1>
      <section>
        <h2 className={styles.h2ClothesHeader}>Filter by category</h2>

        <section className={styles.categoriesBar}>
          {categories.map((category) => (
            <section className={styles.radioContainer}>
              <label
                htmlFor={category}
                className={`${category === searchCategory && styles.activeLabel}
                ${styles.labelBtn} 
                `}
              >
                {category}
              </label>
              <input
                type="radio"
                value={category}
                id={category}
                name="categories"
                onClick={handleCategoryChange}
                checked={category === searchCategory}
                className={styles.hiddenRadio}
              />
            </section>
          ))}
        </section>
      </section>
      <section className={styles.priceFilterContainer}>
        <h2 className={styles.h2ClothesHeader}>Filter by price</h2>
        <section className={styles.priceFilterInputs}>
          <input
            type="number"
            placeholder="from"
            onChange={(e) => handleFilterChange(e, "from")} //lower price bound
          />
          <input
            type="number"
            placeholder="to"
            onChange={(e) => handleFilterChange(e, "to")} //higher price bound
          />
        </section>
      </section>
    </>
  );
};

export default SearchBar;
