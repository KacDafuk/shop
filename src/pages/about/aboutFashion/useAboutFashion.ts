import React, { useState } from "react";
import fashionWalk1 from "../../../assets/gifs/fashionWalk1.gif";
import fashionWalk2 from "../../../assets/gifs/fashionWalk2.gif";
import fashionWalk3 from "../../../assets/gifs/fashionWalk3.gif";
import styles from "./aboutFashion.module.css";
const fashionGifs = [fashionWalk1, fashionWalk2, fashionWalk3];
type FashionWalkIdx = 0 | 1 | 2; //possible fashion gifs indexes
type Directions = -1 | 1; //get previous image | get next image
export function useAboutFashion() {
  const [direction, setDirection] = useState<Directions>(1);
  const [currentGifDisplayIdx, setCurrentGifDisplayIdx] =
    useState<FashionWalkIdx>(1);
  function getModal3(numb: number) {
    if (numb < 0) return fashionGifs.length - 1;
    return numb % 3;
  }
  function changeImage(direction: Directions) {
    setDirection(direction);
    setCurrentGifDisplayIdx((prevIdx) => {
      return getModal3(prevIdx + direction) as FashionWalkIdx;
    });
  }

  function getSlideClassName(isCurrent = true) {
    function getCorrectCurrentClass() {
      switch (direction) {
        case 1:
          return styles.currentMoveLeft; //get next image
        case -1:
          return styles.currentMoveRight; //get previouse image
      }
    }
    function getCorrectLeaveClass() {
      switch (direction) {
        case 1: //get next image
          return styles.leaveMoveLeft;
        case -1:
          return styles.leaveMoveRight; //get previouse image
      }
    }
    switch (isCurrent) {
      case true:
        return getCorrectCurrentClass();
      case false:
        return getCorrectLeaveClass();
    }
  }
  return {
    direction,
    currentGifDisplayIdx,
    getModal3,
    changeImage,
    getSlideClassName,
  };
}
