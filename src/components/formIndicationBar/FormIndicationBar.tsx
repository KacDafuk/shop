import React, { useEffect, useState } from "react";
import styles from "./formIndicationBar.module.css";
interface FormIndicationBarProps {
  titles: Array<string>;
  curTitleIdx: number;
}

const FormIndicationBar = ({ titles, curTitleIdx }: FormIndicationBarProps) => {
  const [displayIndicator, setDisplayIndicator] = useState(true);
  function setIndicatorDisplay() {
    console.log(window.innerWidth);
    if (window.innerWidth > 992) {
      setDisplayIndicator(true);
      return;
    }
    setDisplayIndicator(false);
  }
  useEffect(() => {
    setIndicatorDisplay();
    window.addEventListener("resize", setIndicatorDisplay);
    return () => window.removeEventListener("resize", setIndicatorDisplay);
  }, []);

  function getBarBody() {
    function getCircleClass(idx: number) {
      if (idx <= curTitleIdx) return styles.circleIndicatorActive;
      return styles.circleIndicator;
    }
    const barBody = [];
    for (let i = 0; i < titles.length; i++) {
      barBody.push(
        <div
          style={displayIndicator ? { display: "block" } : { display: "none" }}
        >
          <h4 className={styles.barHeader}>{titles[i]}</h4>
          <span className={getCircleClass(i)}></span>
        </div>
      );
    }
    return barBody;
  }
  return <section className={styles.barContainer}>{getBarBody()}</section>;
};

export default FormIndicationBar;
