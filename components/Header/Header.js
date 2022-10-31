import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SecureLS from "secure-ls";
import Link from "next/link";

import { loginModal, userlogout } from "../../redux/actions/royalfutActions";

import styles from "../../styles/Header.module.scss";
import A from "../A";
import Dropdown from "../Dropdown";
import SvgContainer from "../SvgContainer";
import BuyCoinsDropdown from "../BuyCoinsDropdown";

import { twitter } from "../../data-svg/twitter";
import { whatsapp } from "../../data-svg/whatsapp";
import { insta } from "../../data-svg/insta";
import { youtube } from "../../data-svg/youtube";

function Header() {
  const modal = useSelector((state) => state.royalfutReducer.loginModal);
  const userData = useSelector((state) => state.royalfutReducer.user);
  const isAuth = useSelector((state) => state.royalfutReducer.isAuth);
  const locale = useSelector((state) => state.royalfutReducer.locale);

  const dispatch = useDispatch();

  const buycoinsRef = React.createRef();
  const buycoinsBtnRef = React.createRef();

  function hideContent(ref) {
    ref.current.classList.toggle("hide");
  }
  const onMouseEnterBlock = (e, ref) => {
    e.stopPropagation();
    console.log("enter");
    hideContent(ref);
  };

  const onMouseLeaveBlock = (e, ref) => {
    e.stopPropagation();
    hideContent(ref);
  };

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
        className={`${styles.header__header_top} ${styles.header__divider} ${styles.header__top_divider_x}`}
      ></div>
      <div
        className={`${styles.header__header_center} ${styles.header__divider} ${styles.header__center_divider_x}`}
      ></div>
      <div
        className={`${styles.header__header_bottom} ${styles.header__divider} ${styles.header__bottom_divider_x}`}
      ></div>
    </div>
  ) : (
    "Войти"
  );

  return (
    <div className={styles.header}>
      <div className={styles.header__left}>
        <Link href="/">
          <a className={styles.header__logo}>
            ROYALFUT
            <div className={styles.header__sublogo}>FIFA 23 Items</div>
          </a>
        </Link>
      </div>
      <div className={styles.header__center}>
        <Dropdown />
        <div className={`${styles.header_links_wrapper}`}>
          <div className={`${styles.header__preset_orders} from-1025-to-1900`}>
            <Link href={"/coins"} locale={locale.title}>
              <span
                className={`${styles.header_presetorders} ${styles.header__links}`}
              >
                Preset orders
              </span>
            </Link>
          </div>
          <div className={`${styles.header__buy_coins} from-1025-to-1900`}>
            <BuyCoinsDropdown />
            <div className={`dropdown__arrow`} />
          </div>
          <div
            className={`${styles.header__delivery_container} from-1025-to-1900`}
          >
            <Link href={"/delivery"} locale={locale.title}>
              <span
                className={`${styles.header_delivery} ${styles.header__links}`}
              >
                Delivery
              </span>
            </Link>
          </div>
          <div className={`${styles.header__faq_container} from-1025-to-1900`}>
            <Link href={"/faq"} locale={locale.title}>
              <span className={`${styles.header_faq} ${styles.header__links}`}>
                FAQ
              </span>
            </Link>
          </div>
          <div
            className={`${styles.header__social_container} from-1025-to-1900`}
          >
            <div className={styles.header_menu__icon_wrapper}>
              <SvgContainer
                item={whatsapp}
                color={"white"}
                hover={"gold"}
                classStyle={styles.header_menu__icon}
              />
            </div>
            <div className="divider"></div>
            <div className={styles.header_menu__icon_wrapper}>
              <SvgContainer
                item={twitter}
                color={"white"}
                hover={"gold"}
                classStyle={styles.header_menu__icon}
              />
            </div>
            <div className={styles.header_menu__icon_wrapper}>
              <SvgContainer
                item={insta}
                color={"white"}
                hover={"gold"}
                classStyle={styles.header_menu__icon}
              />
            </div>
            <div className={styles.header_menu__icon_wrapper}>
              <SvgContainer
                item={youtube}
                color={"white"}
                hover={"gold"}
                classStyle={styles.header_menu__icon}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.header__right}>
        <button
          onClick={burgerToX}
          className={`${styles.header__burger} from-375-to-1024`}
        >
          <div
            className={`${styles.header__header_top} ${
              styles.header__divider
            } ${modal && styles.header__top_divider_x}
            `}
          ></div>
          <div
            className={`${styles.header__header_center} ${
              styles.header__divider
            } ${modal && styles.header__center_divider_x}`}
          ></div>
          <div
            className={`${styles.header__header_bottom} ${
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
            <button
              onClick={burgerToX}
              className={`${styles.header__burger_login}`}
            >
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
