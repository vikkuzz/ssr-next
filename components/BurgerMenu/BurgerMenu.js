import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import {
  loginClick,
  registrationClick,
  user,
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
import Api from "../../Api/Api";
const api = new Api();

const BurgerMenu = () => {
  const modal = useSelector((state) => state.royalfutReducer.loginModal);
  const auth = useSelector((state) => state.royalfutReducer.isAuth);
  const loginMenu = useSelector((state) => state.royalfutReducer.loginMenu);

  const viewPassBtn = React.createRef();
  const password = React.createRef();
  const email = React.createRef();
  const submit = React.createRef();
  const eye = "/img/eye.svg";
  const eyeClosed = "/img/eye-close.svg";

  const dispatch = useDispatch();

  const [svgEye, setSvgEye] = useState(eye);
  const [passLength, setPassLength] = useState("");

  useEffect(() => {
    if (modal) {
      console.log(password);
      setPassLength(password.current.value.length);
    }
  }, [modal]);
  useEffect(() => {
    console.log(passLength);
    if (modal) {
      passLength <= 7
        ? (submit.current.disabled = true)
        : (submit.current.disabled = false);
    }
  }, [passLength]);

  const onHandleClickLogin = () => {
    dispatch(loginClick());
  };
  const onHandleClickRegistration = () => {
    dispatch(registrationClick());
  };
  const onHandleClickViewPass = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (password.current.type == "text") {
      password.current.type = "password";
      setSvgEye(eyeClosed);
    } else {
      password.current.type = "text";
      setSvgEye(eye);
    }
  };
  const onHandleChangePass = () => {
    setPassLength(password.current.value.length);
  };

  function registration(e) {
    e.stopPropagation();
    e.preventDefault();
    console.log("apireg");
    api
      .registration(email.current.value, password.current.value)
      .then((res) => dispatch(user(res.user)));
  }

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
              {loginMenu.registration && <Auth />}
            </div>
            {loginMenu.registration && (
              <div className={styles.auth_or}>Или</div>
            )}
            <div className={styles.fieldset_wrapper}>
              <form className={styles.auth_form}>
                <fieldset
                  className={`${styles.auth_fieldset} ${styles.email_fieldset}`}
                >
                  <legend className={styles.auth_legend}>Почта</legend>
                  <input
                    ref={email}
                    className={styles.auth_userdata}
                    type="email"
                    placeholder={"почта"}
                  ></input>
                </fieldset>
                <fieldset className={styles.auth_fieldset}>
                  <legend className={styles.auth_legend}>Пароль</legend>
                  <input
                    onChange={onHandleChangePass}
                    ref={password}
                    className={styles.auth_userdata}
                    type="password"
                    placeholder={"пароль"}
                  ></input>
                  <button
                    ref={viewPassBtn}
                    onClick={onHandleClickViewPass}
                    className={styles.auth_view_pass}
                    type="button"
                    title={"посмотреть пароль"}
                  >
                    <img src={svgEye} />
                  </button>
                </fieldset>
                <div className={styles.num_simbols_wrapper}>
                  <div
                    className={`${styles.ok_pic} ${
                      passLength <= 7 ? styles.cancel : styles.ok
                    }`}
                  ></div>
                  <span className={styles.simbols_text}>
                    не менее 8 символов!
                  </span>
                </div>
                <div className={styles.submit_wrapper}>
                  <button
                    ref={submit}
                    onClick={(e) => registration(e)}
                    className={`${styles.submit_btn} ${
                      passLength <= 7 ? styles.disabled : ""
                    }`}
                    type="button"
                  >
                    {loginMenu.login ? "Войти" : "Зарегистрироваться"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return menu;
};

export default BurgerMenu;
