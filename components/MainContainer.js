import A from "./A";
import Head from "next/head";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { translates } from "../locales/locales";
import SecureLS from "secure-ls";

import {
  loginModal,
  catcherror,
  stock,
  currentCurrency,
  user,
} from "../redux/actions/royalfutActions";

import styles from "../styles/App.module.scss";

import Header from "./Header";
import BurgerMenu from "./BurgerMenu";
import Api from "../Api/Api";
import currency from "../data-elements/currency";

const api = new Api();

function MainContainer({ children, keywords, description, title }) {
  const wrapperModalRef = React.createRef();
  const modal = useSelector((state) => state.royalfutReducer.loginModal);
  const error = useSelector((state) => state.royalfutReducer.errorMessage);
  const currentStock = useSelector((state) => state.royalfutReducer.stock);
  const t = useSelector((state) => state.royalfutReducer.locale.title) || "en";
  const currentCurrencyState = useSelector(
    (state) => state.royalfutReducer.currency
  );
  const currentUserState = useSelector((state) => state.royalfutReducer.user);
  const dispatch = useDispatch();

  const router = useRouter();

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
  // useEffect(() => {
  //   if (Object.keys(currentStock).length != 0) {
  //     //если сток не пуст

  //     let ls = new SecureLS();
  //     console.log("mainContainer: ", ls.get("localState"));
  //     if (
  //       ls.get("localState").length != 0 &&
  //       Object.keys(ls.get("localState").currency).length != 0 &&
  //       Object.keys(currentCurrencyState).length == 0
  //     ) {
  //       // если локалстейт есть и он не пустой и пустой стор валюты
  //       console.log("если локалстейт есть и он не пустой и пустой стор валюты");
  //       dispatch(currentCurrency(ls.get("localState").currency)); // забираем данные из локалстейта и кладем в стор
  //     }
  //     if (
  //       ls.get("localState") &&
  //       Object.keys(ls.get("localState").user).length != 0 &&
  //       Object.keys(currentUserState).length == 0
  //     ) {
  //       // если локалстейт есть и он не пустой и пустой стор
  //       console.log("если локалстейт есть и он не пустой и пустой стор");
  //       dispatch(user(ls.get("localState").user)); // забираем данные из локалстейта и кладем в стор
  //     }
  //   }
  // }, [currentStock]);

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
