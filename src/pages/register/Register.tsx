import React, { useRef, useState } from "react";
import FormIndicationBar from "../../components/formIndicationBar/FormIndicationBar";
import styles from "./register.module.css";
import { useSelector, useDispatch } from "react-redux";
import { login, register, logout } from "../../slices/authSlice";
import { selectAuth } from "../../store/Store";
import ErrorMessage from "../../components/errorMessage/ErrorMessage";
import { useRegister } from "./useRegister";
const titles = ["Account setup", "Personal info", "Address"];
type Directions = -1 | 1;
enum FORM_DIRECTION {
  NEXT = 1,
  PREV = -1,
}
const Register = () => {
  const {
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
  } = useRegister();
  return (
    <main>
      <FormIndicationBar titles={titles} curTitleIdx={curFormIdx} />

      <form>
        <section className={getFormClass(0)}>
          <h2 className={styles.formHeader}>ACCOUNT SETUP</h2>
          <label htmlFor="email">Email</label>
          <input type="email" required id="email" onChange={updateInputs} />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            required
            id="password"
            onChange={updateInputs}
          />
          <label htmlFor="repeatPassword">Repeat password</label>
          <input
            type="password"
            required
            id="repeatPassword"
            onChange={updateInputs}
          />
          <button
            onClick={() => getNextForm(FORM_DIRECTION.NEXT)}
            className={styles.formButton}
          >
            NEXT
          </button>
        </section>
        <section className={getFormClass(1)}>
          <h2 className={styles.formHeader}>PERSONAL INFO</h2>
          <label htmlFor="name">Name</label>
          <input type="text" required id="name" onChange={updateInputs} />
          <label htmlFor="lastName">Last name</label>
          <input type="text" required id="lastName" onChange={updateInputs} />
          <label htmlFor="phoneNumber">Phone number</label>
          <input
            type="tel"
            required
            id="phoneNumber"
            onChange={updateInputs}
            pattern="[0-9]{9}"
          />
          <button
            onClick={() => getNextForm(FORM_DIRECTION.PREV)}
            className={styles.formButton}
          >
            PREV
          </button>
          <button
            onClick={() => getNextForm(FORM_DIRECTION.NEXT)}
            className={styles.formButton}
          >
            NEXT
          </button>
        </section>
        <section className={getFormClass(2)}>
          <h2 className={styles.formHeader}>ADDRESS</h2>
          <label htmlFor="city">City</label>
          <input type="text" required id="city" onChange={updateInputs} />
          <label htmlFor="Address">Address</label>
          <input type="text" required id="address" onChange={updateInputs} />
          <label htmlFor="postalCode">Postal code</label>
          <input type="text" required id="postalCode" onChange={updateInputs} />
          <button
            onClick={() => getNextForm(FORM_DIRECTION.PREV)}
            className={styles.formButton}
          >
            PREV
          </button>
          <button
            type="submit"
            className={styles.formButton}
            onClick={handleSubmit}
          >
            REGISTER
          </button>
        </section>
        {error && <p className={styles.errorMessage}>Registration failed</p>}
      </form>
      {errorMessages.length > 0 && (
        <section className={styles.notAllFormsFilledMessage}>
          {errorMessages.map((message) => {
            return <p>{message}</p>;
          })}
        </section>
      )}
    </main>
  );
};

export default Register;
