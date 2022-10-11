import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SecureLS from "secure-ls";
import Link from "next/link";

import {
  loginModal,
  loginClick,
  registrationClick,
  user,
  userlogout,
} from "../../redux/actions/royalfutActions";

import styles from "../../styles/Header.module.scss";
import A from "../A";
import Dropdown from "../Dropdown";

function Header() {
  const modal = useSelector((state) => state.royalfutReducer.loginModal);
  const userData = useSelector((state) => state.royalfutReducer.user);
  const isAuth = useSelector((state) => state.royalfutReducer.isAuth);
  const currentStock = useSelector((state) => state.royalfutReducer.stock);

  // const topDivider = React.createRef();
  // const centerDivider = React.createRef();
  // const bottomDivider = React.createRef();

  const dispatch = useDispatch();

  const loginModalState = useSelector(
    (state) => state.royalfutReducer.loginModal
  );

  const burgerToX = () => {
    dispatch(loginModal(!loginModalState));
  };

  let ls = null;

  const logout = () => {
    ls = new SecureLS();
    ls.removeAll();
    dispatch(userlogout());
    localStorage.clear();
  };

  const enter = isAuth ? (
    <div>
      <div
        className={`${styles.header__burger_top} ${styles.header__divider} ${styles.header__top_divider_x}`}
      ></div>
      <div
        className={`${styles.header__burger_center} ${styles.header__divider} ${styles.header__center_divider_x}`}
      ></div>
      <div
        className={`${styles.header__burger_bottom} ${styles.header__divider} ${styles.header__bottom_divider_x}`}
      ></div>
    </div>
  ) : (
    "Войти"
  );

  return (
    <div className={styles.header}>
      <div className={styles.header__left}>
        <a className={styles.header__logo} href="/">
          ROYALFUT
          <div className={styles.header__sublogo}>FIFA 22 coins</div>
        </a>
      </div>
      <div className={styles.header__center}>
        <Dropdown />
      </div>
      <div className={styles.header__right}>
        {/* <div className={styles.login_mail}>
          {isAuth && (
            <div>
              {userData.email}
              <button>выйти</button>
            </div>
          )}
        </div> */}
        <button
          onClick={burgerToX}
          className={`${styles.header__burger} from-375-to-1024`}
        >
          <div
            //ref={topDivider}
            className={`${styles.header__burger_top} ${
              styles.header__divider
            } ${modal && styles.header__top_divider_x}
            `}
          ></div>
          <div
            //ref={centerDivider}
            className={`${styles.header__burger_center} ${
              styles.header__divider
            } ${modal && styles.header__center_divider_x}`}
          ></div>
          <div
            //ref={bottomDivider}
            className={`${styles.header__burger_bottom} ${
              styles.header__divider
            } ${modal && styles.header__bottom_divider_x}`}
          ></div>
        </button>

        <div className={`from-1025-to-1900`}>
          {isAuth ? (
            <Link href="/profile">
              <a className={styles.header_mail}>{userData.email}</a>
            </Link>
          ) : (
            <button onClick={burgerToX} className={`${styles.header__burger}`}>
              Войти
            </button>
          )}
        </div>
        {isAuth && (
          <button onClick={logout} className={`logout from-1025-to-1900`}>
            Выйти
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
