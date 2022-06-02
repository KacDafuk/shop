import styles from "./toogleTheme.module.css";
import { Theme } from "../../sharedTypes/theme";
type UseThemeArgs = {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};
export function useToggleTheme({ theme, setTheme }: UseThemeArgs) {
  function getCorrectIndicatorClass() {
    if (theme === "light") return styles.wheelIndicatorDarkMode;
    return styles.wheelIndicatorLightMode;
  }
  function toogleTheme() {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }
  return {
    getCorrectIndicatorClass,
    toogleTheme,
  };
}
