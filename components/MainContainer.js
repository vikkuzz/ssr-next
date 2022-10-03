import A from "./A";
import Head from "next/head";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loginModal } from "../redux/actions/royalfutActions";

import styles from "../styles/App.module.scss";

import Header from "./Header";
import BurgerMenu from "./BurgerMenu";

function MainContainer({ children, keywords }) {
  const wrapperModalRef = React.createRef();
  const modal = useSelector((state) => state.royalfutReducer.loginModal);
  const dispatch = useDispatch();

  const isOutsideClick = (event, ref) => {
    console.log("click", ref.current, event.target);
    if (!ref.current.contains(event.target) && modal) {
      dispatch(loginModal(false));
    }
  };

  return (
    <>
      <Head>
        <meta keywords={"ulbi tv, nextjs" + keywords}></meta>
        <title>Главная страница</title>
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
