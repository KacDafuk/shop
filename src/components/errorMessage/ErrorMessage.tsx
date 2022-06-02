import React from "react";
import styles from "./errorMessage.module.css";
import { closeError } from "../../slices/authSlice";
import { useDispatch } from "react-redux";
type ErrorMessageProps = {
  errorText: string;
};
const ErrorMessage = ({ errorText }: ErrorMessageProps) => {
  const dispatch = useDispatch();
  return (
    <article className={styles.errorMessage}>
      <section
        className={styles.closeErrorBar}
        onClick={() => dispatch(closeError(""))}
      >
        CLOSE <i className="fa-solid fa-x"></i>
      </section>
      <p>{errorText}</p>
    </article>
  );
};

export default ErrorMessage;
