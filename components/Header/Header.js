import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginModal } from "../../redux/actions/royalfutActions";

import styles from "../../styles/Header.module.scss";
import A from "../A";

function Header() {
  const modal = useSelector((state) => state.royalfutReducer.loginModal);
  const user = useSelector((state) => state.royalfutReducer.user);
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
  return (
    <div className={styles.header}>
      <div className={styles.header__left}>
        <a className={styles.header__logo} href="/">
          ROYALFUT
          <div className={styles.header__sublogo}>FIFA 22 coins</div>
        </a>
      </div>
      <div className={styles.header__center}></div>
      <div className={styles.header__right}>
        <div className={styles.login_mail}>
          {user.email ? (
            <div>
              {user.email}
              <button>выйти</button>
            </div>
          ) : null}
        </div>
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

        <button
          onClick={burgerToX}
          className={`${styles.header__login} from-1025-to-1900`}
        >
          {loginModalState ? (
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
            "Log in"
          )}
        </button>
      </div>
    </div>
  );
}

export default Header;
