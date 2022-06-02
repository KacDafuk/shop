import styles from "./login.module.css";
import { login } from "../../slices/authSlice";

import { useLogin } from "./useLogin";
const Login = () => {
  const { error, navigate, dispatch, formInputs, updateInputs } = useLogin();
  return (
    <form className={styles.loginForm}>
      <label htmlFor="email" className={styles.emailLabel}>
        Enter your email
      </label>
      <input onChange={updateInputs} type="mail" id="email" required />
      <label htmlFor="password" className={styles.passwordLabel}>
        Enter your password
      </label>
      <input onChange={updateInputs} type="password" id="password" required />
      <button
        type="submit"
        className={styles.loginButton}
        onClick={(e) => {
          e.preventDefault();
          dispatch(login({ ...formInputs })).then(() =>
            navigate("/userprofile")
          );
        }}
      >
        L O G I N
      </button>
      {error && <p className={styles.errorMessage}>Login failed</p>}
    </form>
  );
};

export default Login;
