import React, { useState } from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectAuth } from "../../store/Store";
import { useNavigate } from "react-router-dom";
export function useLogin() {
  const { error } = useSelector(selectAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
  });
  function updateInputs(e: React.ChangeEvent<HTMLInputElement>) {
    setFormInputs((formInputsValues) => ({
      ...formInputsValues,
      [e.target.id]: e.target.value,
    }));
  }
  return {
    error,
    navigate,
    dispatch,
    formInputs,
    updateInputs,
  };
}
