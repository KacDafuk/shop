import React from "react";
import styles from "./userData.module.css";
import { UserData as UserInfo } from "../../../sharedTypes/sharedAuth";
type UserDataProps = {
  userData: UserInfo;
};
const UserData = ({ userData }: UserDataProps) => {
  function getCorrectText(text: string) {
    function isCamelCase() {
      return text.toLowerCase() != text;
    }
    if (isCamelCase()) {
      const transformedText = text
        .split("")
        .reduce<string[]>((accum, letter) => {
          if (!accum[0]) return [letter];
          if (letter === letter.toUpperCase()) {
            return [...accum, letter];
          }
          accum[accum.length - 1] += letter;
          return accum;
        }, [])
        .join(" ");
      return transformedText.charAt(0).toUpperCase() + transformedText.slice(1);
    }
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  return (
    <article className={styles.dataContainer}>
      <h2 className={styles.userDataHeader}>Your address data</h2>
      {Object.entries(userData).map(([data, dataText]) => {
        if (data === "password" || data === "repeatPassword") return;
        return (
          <section className={styles.dataSection}>
            <h4 className={styles.dataHeader}>{getCorrectText(data)}</h4>
            <p className={styles.dataDescription}>{dataText}</p>
          </section>
        );
      })}
    </article>
  );
};

export default UserData;
