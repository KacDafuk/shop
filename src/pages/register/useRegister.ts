import React, { useRef, useState } from "react";
import FormIndicationBar from "../../components/formIndicationBar/FormIndicationBar";
import styles from "./register.module.css";
import { useSelector, useDispatch } from "react-redux";
import { login, register, logout } from "../../slices/authSlice";
import { selectAuth } from "../../store/Store";
import ErrorMessage from "../../components/errorMessage/ErrorMessage";
const titles = ["Account setup", "Personal info", "Address"];
type Directions = -1 | 1;
enum FORM_DIRECTION {
  NEXT = 1,
  PREV = -1,
}
export function useRegister() {
  const dispatch = useDispatch<any>();
  const { error } = useSelector(selectAuth);
  const [curFormIdx, setCurFormIdx] = useState(0);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    name: "",
    lastName: "",
    phoneNumber: "",
    city: "",
    address: "",
    postalCode: "",
  });
  function invalidInput() {
    const { password, repeatPassword, email, phoneNumber } = formInputs;
    setErrorMessages([]);
    if (password !== repeatPassword) {
      setErrorMessages((errorMessages) => [
        ...errorMessages,
        "passwords od not match",
      ]);
    }
    if (!email.includes(".")) {
      setErrorMessages((errorMessages) => [
        ...errorMessages,
        "email requires a dot",
      ]);
    }
    if (!email.includes("@")) {
      setErrorMessages((errorMessages) => [
        ...errorMessages,
        "email requires @",
      ]);
    }
    const reg = new RegExp("[0-9]{9}");
    if (!phoneNumber.match(reg)) {
      setErrorMessages((errorMessages) => [
        ...errorMessages,
        "wrong phone number",
      ]);
    }
    if (Object.values(formInputs).includes("")) {
      setErrorMessages((errorMessages) => [
        ...errorMessages,
        "not all fields filled",
      ]);
    }
    return (
      password != repeatPassword ||
      !email.includes(".") ||
      !email.includes("@") ||
      Object.values(formInputs).includes("") ||
      !phoneNumber.match(reg)
    );
  }
  function updateInputs(e: React.ChangeEvent<HTMLInputElement>) {
    setFormInputs((formInputsValues) => ({
      ...formInputsValues,
      [e.target.id]: e.target.value,
    }));
  }
  const getFormClass = (idx: number) => {
    if (idx === curFormIdx) {
      return styles.userFormDisplay;
    }
    return styles.userFormHide;
  };
  function getNextForm(direction: Directions) {
    setCurFormIdx(curFormIdx + direction);
  }
  function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (invalidInput()) return;
    dispatch(register(formInputs));
  }
  return {
    dispatch,
    error,
    curFormIdx,
    errorMessages,
    formInputs,
    invalidInput,
    updateInputs,
    getFormClass,
    getNextForm,
    handleSubmit,
  };
}
