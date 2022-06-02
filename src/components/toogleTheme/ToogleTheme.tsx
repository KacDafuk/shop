import React from "react";
import { Theme } from "../../sharedTypes/theme";
import styles from "./toogleTheme.module.css";
import { useToggleTheme } from "./useToggleTheme";
type ToogleThemeProps = {
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  theme: Theme;
};
const ToogleTheme = ({ setTheme, theme }: ToogleThemeProps) => {
  const { toogleTheme, getCorrectIndicatorClass } = useToggleTheme({
    theme,
    setTheme,
  });
  return (
    <button onClick={toogleTheme} className={styles.toogleThemeContainer}>
      <i className="fa-solid fa-sun "></i>
      <i className="fa-solid fa-moon "></i>
      <div
        className={`${styles.wheelIndicator} ${getCorrectIndicatorClass()}`}
      ></div>
    </button>
  );
};

export default ToogleTheme;
