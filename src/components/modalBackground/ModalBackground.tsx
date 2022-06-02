import React from "react";
import styles from "./modalBackground.module.css";
interface ModalBackgroundProps {
  isOpen: boolean;
}
const ModalBackground = ({ isOpen }: ModalBackgroundProps) => {
  return (
    <div
      className={styles.modalBackground}
      style={isOpen ? { position: "fixed" } : { display: "none" }}
    ></div>
  );
};

export default ModalBackground;
