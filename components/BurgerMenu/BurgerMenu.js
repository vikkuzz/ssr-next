import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import MenuItem from "../MenuItem";
import SvgContainer from "../SvgContainer";

import styles from "../../styles/BurgerMenu.module.scss";

import { twitter } from "../../data-svg/twitter";
import { whatsapp } from "../../data-svg/whatsapp";
import { insta } from "../../data-svg/insta";
import { youtube } from "../../data-svg/youtube";

const BurgerMenu = () => {
  const modal = useSelector((state) => state.royalfutReducer.loginModal);

  let menu =
    modal === true ? (
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
    ) : null;
  return menu;
};

export default BurgerMenu;
