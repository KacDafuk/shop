import React, { useState } from "react";
import styles from "./aboutFashion.module.css";
import { useAboutFashion } from "./useAboutFashion";
import fashionWalk1 from "../../../assets/gifs/fashionWalk1.gif";
import fashionWalk2 from "../../../assets/gifs/fashionWalk2.gif";
import fashionWalk3 from "../../../assets/gifs/fashionWalk3.gif";
const fashionGifs = [fashionWalk1, fashionWalk2, fashionWalk3];

const AboutFashion = () => {
  const {
    direction,
    currentGifDisplayIdx,
    getModal3,
    changeImage,
    getSlideClassName,
  } = useAboutFashion();
  return (
    <article className={styles.aboutContainer}>
      <section className={styles.textContainer}>
        <h2 className={styles.articleHeader}>Fashion all over the world</h2>
        <p className={styles.generalInfo}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
          adipisci accusantium amet sunt doloribus exercitationem corporis nemo
          quos temporibus aliquam porro aspernatur deserunt animi impedit, neque
          quidem dolorum autem nostrum itaque quas id, quo repudiandae quod?
          Quae soluta nisi, perspiciatis expedita dolor quasi nam dolorum porro
          labore quo minima incidunt harum voluptatum. Asperiores deserunt,
          temporibus non minus
        </p>
      </section>
      <section className={styles.slider}>
        <button className={styles.prevImageBtn} onClick={() => changeImage(-1)}>
          <i className="fa-solid fa-arrow-right fa-3x"></i>
        </button>
        <button className={styles.nextImageBtn} onClick={() => changeImage(1)}>
          <i className="fa-solid fa-arrow-left fa-3x"></i>
        </button>
        {fashionGifs.map((src, idx) => {
          if (idx === currentGifDisplayIdx)
            return (
              <img
                src={src}
                alt="no gif found"
                className={`${styles.sliderGif}  ${getSlideClassName()}`}
              />
            );
          else if (idx === getModal3(currentGifDisplayIdx - direction)) {
            return (
              <img
                src={src}
                alt="no gif found"
                className={`${styles.sliderGif}  ${getSlideClassName(false)}`}
              />
            );
          }
        })}
      </section>
    </article>
  );
};

export default AboutFashion;
