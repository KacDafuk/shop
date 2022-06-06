import { Link } from "react-router-dom";
import { logout } from "../../slices/authSlice";
import styles from "./navbar.module.css";
import { useNavbar } from "./useNavbar";
const Navbar = () => {
  const { hideNavSmallDevice, user, dispatch, toogleNav } = useNavbar();

  return (
    <>
      <nav className={`${styles.nav}`}>
        <ul
          className={`${styles.linksContainer} ${
            hideNavSmallDevice ? styles.navHidden : styles.navAnimate
          }`}
        >
          <li>
            <Link to="/about" className={styles.navLink}>
              <i className={`fa-solid fa-address-card ${styles.linkIcon}`}></i>
              About
            </Link>
          </li>
          <li>
            <Link to="/customerservice" className={styles.navLink}>
              <i className={`fa-solid fa-phone ${styles.linkIcon}`}></i>
              Customer service
            </Link>
          </li>
          <li>
            <Link to="/products" className={styles.navLink}>
              <i className={`fa-solid fa-shirt ${styles.linkIcon}`}></i>
              Products
            </Link>
          </li>
        </ul>
        <ul
          className={`${styles.linksContainer} ${
            hideNavSmallDevice ? styles.navHidden : styles.navAnimate
          }`}
        >
          <li></li>

          {user ? (
            <>
              <li>
                <Link to="/userprofile" className={styles.navLink}>
                  <i className={`fa-solid fa-person ${styles.linkIcon}`}></i>
                  My Profile
                  <i
                    className={`fa-solid fa-cart-shopping ${styles.shoppingCartIcon}`}
                  ></i>
                </Link>
              </li>
              <li onClick={() => dispatch(logout())}>
                <Link to="/login" className={styles.navLink}>
                  <i className={`fa-solid fa-door-open ${styles.linkIcon}`}></i>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className={styles.navLink}>
                  <i
                    className={`fa-solid fa-arrow-right-to-bracket ${styles.linkIcon}`}
                  ></i>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className={styles.navLink}>
                  <i className={`fa-solid fa-pen ${styles.linkIcon}`}></i>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className={styles.hamburgerMenu} onClick={toogleNav}>
        <div
          className={
            hideNavSmallDevice
              ? styles.hamburgerMenuBar
              : styles.hamburgerMenuBarNavVisible
          }
        ></div>
        <div
          className={
            hideNavSmallDevice
              ? styles.hamburgerMenuBar
              : styles.hamburgerMenuBarNavVisible
          }
        ></div>
        <div
          className={
            hideNavSmallDevice
              ? styles.hamburgerMenuBar
              : styles.hamburgerMenuBarNavVisible
          }
        ></div>
      </div>
    </>
  );
};

export default Navbar;
