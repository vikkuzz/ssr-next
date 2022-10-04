import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import {
  loginClick,
  registrationClick,
} from "../../redux/actions/royalfutActions";

import MenuItem from "../MenuItem";
import SvgContainer from "../SvgContainer";
import A from "../A";

import styles from "../../styles/BurgerMenu.module.scss";

import { twitter } from "../../data-svg/twitter";
import { whatsapp } from "../../data-svg/whatsapp";
import { insta } from "../../data-svg/insta";
import { youtube } from "../../data-svg/youtube";
import Auth from "../Auth";

const BurgerMenu = () => {
  const modal = useSelector((state) => state.royalfutReducer.loginModal);
  const auth = useSelector((state) => state.royalfutReducer.isAuth);
  const loginMenu = useSelector((state) => state.royalfutReducer.loginMenu);

  const dispatch = useDispatch();

  const onHandleClickLogin = () => {
    dispatch(loginClick());
  };
  const onHandleClickRegistration = () => {
    dispatch(registrationClick());
  };

  let menu = null;
  if (modal === true && auth === true) {
    menu = (
      <div className={styles.burger_menu}>
        <div className={styles.burger_menu__wrapper}>
          <Link href={"/login"}>
            <a>
              <MenuItem text={"LOG IN"} />
            </a>
          </Link>
          <MenuItem text={"PRESET ORDERS"} color={"burger_orange_"} />
          <MenuItem text={"BUY COINS"} color={"burger_yellow_"} />
          <MenuItem text={"DELIVERY"} />
          <MenuItem text={"FAQ"} />
        </div>
        <div className={styles.burger_menu__footer}>
          <div className={styles.burger_menu__icon_wrapper}>
            <SvgContainer
              item={twitter}
              color={"white"}
              hover={"gold"}
              classStyle={styles.burger_menu__icon}
            />
          </div>
          <div className={styles.burger_menu__icon_wrapper}>
            <SvgContainer
              item={whatsapp}
              color={"white"}
              hover={"gold"}
              classStyle={styles.burger_menu__icon}
            />
          </div>
          <div className={styles.burger_menu__icon_wrapper}>
            <SvgContainer
              item={insta}
              color={"white"}
              hover={"gold"}
              classStyle={styles.burger_menu__icon}
            />
          </div>
          <div className={styles.burger_menu__icon_wrapper}>
            <SvgContainer
              item={youtube}
              color={"white"}
              hover={"gold"}
              classStyle={styles.burger_menu__icon}
            />
          </div>
        </div>
      </div>
    );
  } else if (modal === true && auth !== true) {
    menu = (
      <div className={styles.burger_menu}>
        <div className={styles.burger_menu__wrapper}>
          <div className={styles.auth_container}>
            <div className={styles.burger_auth_wrapper}>
              <div className={styles.burger_btn_wrapper}>
                <button
                  onClick={onHandleClickRegistration}
                  className={`${styles.auth_tab} ${
                    loginMenu.registration ? "" : "color_gray"
                  }`}
                  type="button"
                >
                  Регистрация
                </button>
              </div>
              <div className={styles.burger_btn_wrapper}>
                <button
                  onClick={onHandleClickLogin}
                  className={`${styles.auth_tab} ${
                    !loginMenu.registration ? "" : "color_gray"
                  }`}
                  type="button"
                >
                  Вход
                </button>
              </div>
            </div>
            <div className={styles.auth_content_wrapper}>
              {loginMenu.registration ? <Auth /> : "login"}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return menu;
};

export default BurgerMenu;
