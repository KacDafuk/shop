import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectAuth } from "../../store/Store";
export function useNavbar() {
  const [hideNavSmallDevice, setHideNavSmallDevice] = useState(true); //handles displaying nav for small devices
  const { user } = useSelector(selectAuth);
  console.log(user, "USER");
  const dispatch = useDispatch<any>();
  function toogleNav() {
    setHideNavSmallDevice((display) => !display);
  }
  return {
    hideNavSmallDevice,
    user,
    dispatch,
    toogleNav,
  };
}
