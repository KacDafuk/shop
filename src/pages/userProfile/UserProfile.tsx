import React from "react";
import UserCart from "./userCartItems/UserCartItems";
import UserData from "./userData/UserData";
import { useSelector } from "react-redux";
import { selectAuth } from "../../store/Store";
import styles from "./userProfile.module.css";
import ErrorMessage from "../../components/errorMessage/ErrorMessage";
const UserProfile = () => {
  const { userData, cart, error } = useSelector(selectAuth);
  return (
    <main className={styles.UserPageContainer}>
      <UserCart cart={cart} />
      <UserData userData={userData} />
      {error && <ErrorMessage errorText="Error, something went wrong" />}
    </main>
  );
};

export default UserProfile;
