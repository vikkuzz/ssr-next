import A from "./A";
import Head from "next/head";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loginModal } from "../redux/actions/royalfutActions";

import styles from "../styles/App.module.scss";

import Header from "./Header";
import BurgerMenu from "./BurgerMenu";

function MainContainer({ children, keywords, description, title }) {
  const wrapperModalRef = React.createRef();
  const modal = useSelector((state) => state.royalfutReducer.loginModal);
  const dispatch = useDispatch();

  const isOutsideClick = (event, ref) => {
    if (!ref.current.contains(event.target) && modal) {
      dispatch(loginModal(false));
    }
  };

  return (
    <>
      <Head>
        <meta
          keywords={
            "royalfut, FIFA 23, FIFA 23 монеты, FIFA 23 игроки" + keywords
          }
        ></meta>
        <meta
          name="description"
          content={
            description ||
            "Продажа монет ФИФА 22 для PS4, XBOX ONE, PS4, PS5 | Доставка монет FIFA 23 за 15 минут | Максимально низкие цены, быстрые и безопасные платежи, Онлайн поддержка 24/7 | ROYALFUT"
          }
        ></meta>
        <title>{title || "Главная страница Royalfut.com"}</title>
      </Head>

      <div
        className={styles.App}
        onClick={(e) => isOutsideClick(e, wrapperModalRef)}
      >
        <Header />
        <div className={styles.app__burgerwrapper} ref={wrapperModalRef}>
          <BurgerMenu />
        </div>
        <div className={styles.app_container_content}>{children}</div>
      </div>
    </>
  );
}

export default MainContainer;
