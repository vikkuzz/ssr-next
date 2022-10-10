import A from "./A";
import Head from "next/head";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { translates } from "../locales/locales";

import {
  loginModal,
  catcherror,
  stock,
} from "../redux/actions/royalfutActions";

import styles from "../styles/App.module.scss";

import Header from "./Header";
import BurgerMenu from "./BurgerMenu";
import Api from "../Api/Api";

const api = new Api();

function MainContainer({ children, keywords, description, title }) {
  const wrapperModalRef = React.createRef();
  const modal = useSelector((state) => state.royalfutReducer.loginModal);
  const error = useSelector((state) => state.royalfutReducer.errorMessage);
  let currentstock = useSelector((state) => state.royalfutReducer.stock);
  const dispatch = useDispatch();

  const router = useRouter();
  const t = router.locale === "en" ? "en" : "ru";
  console.log(router);

  const isOutsideClick = (event, ref) => {
    if (!ref.current.contains(event.target) && modal) {
      dispatch(loginModal(false));
    }
  };
  useEffect(() => {
    if (error != "") {
      setTimeout(() => dispatch(catcherror("")), 3000);
    }
  }, [error]);
  useEffect(async () => {
    await api.getStock().then((result) => {
      if (result?.errors) {
        if (result.errors) {
          dispatch(catcherror(res.errors));
          return;
        }
      }
      dispatch(stock(result));
    });
  }, []);

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
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        ></script>
      </Head>
      <div className={`error ${error == "" ? "" : styles.showError}`}>
        {error}
      </div>

      <div
        className={styles.App}
        onClick={(e) => isOutsideClick(e, wrapperModalRef)}
      >
        <Header />
        <h1 className={styles.title}>
          {translates[t].title}
          <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <div className={styles.app__burgerwrapper} ref={wrapperModalRef}>
          <BurgerMenu />
        </div>
        <div className={styles.app_container_content}>{children}</div>
      </div>
    </>
  );
}

export default MainContainer;
