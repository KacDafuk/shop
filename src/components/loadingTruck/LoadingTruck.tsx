import styles from "./loadingTruck.module.css";
import { useLoadingTruck } from "./useLoadingTruck";
const PACKAGES_COUNT = 5;
type TruckProps = { loadingText: string };
const LoadingTruck = ({ loadingText }: TruckProps) => {
  const { packagesDistance } = useLoadingTruck();
  return (
    <article className={styles.loadingContainer}>
      <h4 className={styles.loadingHeader}>{loadingText}</h4>
      {packagesDistance.map((distance) => (
        <i
          className={`fa-solid fa-cube ${styles.loadingTruckAnimation}`}
          style={{
            left: 100 + distance + "px", //add fixed distance 100 so that boxes seem to go inside the truck
          }}
        ></i>
      ))}
      <i className={`fa-solid fa-truck fa-3x ${styles.loadingTruck}`}></i>
    </article>
  );
};
//* * * * * O
export default LoadingTruck;
