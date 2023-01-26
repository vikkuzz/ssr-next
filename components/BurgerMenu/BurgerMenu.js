import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import Router, { useRouter } from 'next/router';

import {
    loginClick,
    registrationClick,
    user,
    userlogout,
    loginModal,
    catcherror,
    loginModalFromMain,
    getAllOrders,
    showMessage,
} from '../../redux/actions/royalfutActions';

import MenuItem from '../MenuItem';
import SvgContainer from '../SvgContainer';
import A from '../A';

import styles from '../../styles/BurgerMenu.module.scss';

import { twitter } from '../../data-svg/twitter';
import { whatsapp } from '../../data-svg/whatsapp';
import { insta } from '../../data-svg/insta';
import { youtube } from '../../data-svg/youtube';
import Auth from '../Auth';
import Api from '../../Api/Api';
import { translates } from '../../locales/locales';
import Dropdown from '../Dropdown';
import Menu from '../Menu/Menu';
import { menuItems, profileItems } from '../../data-elements/menuItems';
import OptionWithItems from '../OptionWithItems/OptionWithItems';
const api = new Api();

const BurgerMenu = () => {
    const modal = useSelector((state) => state.royalfutReducer.loginModal);
    const modalFromMain = useSelector(
        (state) => state.royalfutReducer.loginModalFromMain
    );
    const auth = useSelector((state) => state.royalfutReducer.isAuth);
    const loginMenu = useSelector((state) => state.royalfutReducer.loginMenu);
    const userData = useSelector((state) => state.royalfutReducer.user);
    const locale = useSelector((state) => state.royalfutReducer.locale);

    const viewPassBtn = React.createRef();
    const password = React.createRef();
    const email = React.createRef();
    const submit = React.createRef();
    const signUpCheck = React.createRef();
    const authpass = useRef(null);
    const message = useRef(null);

    const eye = '/img/eye.svg';
    const eyeClosed = '/img/eye-close.svg';
    let eyeRd = '/img/eyeRd.svg';
    let eyeClosedRd = '/img/eye-closedRd.svg';

    const dispatch = useDispatch();
    const router = useRouter();

    const [svgEye, setSvgEye] = useState(eyeRd);
    const [passLength, setPassLength] = useState('');
    const [menuContent, setMenuContent] = useState('mobile');
    const [isChecked, setIsChecked] = useState(false);
    const [validate, setValidate] = useState(false);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if ((modal && loginMenu.login) || (modal && loginMenu.registration)) {
            if (typeof password.current != 'object') {
                setPassLength(password.current.value.length);
            }
        }
        if (modal) {
            setTimeout(() => setAnimate(true), 0);
        } else {
            setAnimate(false);
        }
        window.innerWidth > 1025
            ? setMenuContent('desktop')
            : setMenuContent('mobile');
        modalFromMain === true && setMenuContent('desktop');
        !modal && dispatch(loginModalFromMain(false));
    }, [modal, modalFromMain]);

    useEffect(() => {
        if (submit?.current != null) {
            if (
                (modal && loginMenu.login) ||
                (modal && loginMenu.registration)
            ) {
                passLength <= 7
                    ? (submit.current.disabled = true)
                    : (submit.current.disabled = false);

                if (passLength <= 7) {
                    authpass.current.style.border = '1px solid #E84545';
                    message.current.style.color = '#E84545';

                    setSvgEye('/img/warning-circle.svg');
                } else {
                    authpass.current.style.border = '1px solid white';
                    setSvgEye(eyeRd);
                    message.current.style.color = 'rgba(255, 255, 255, 0.4)';
                }
            }
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
        if (password.current.type == 'text') {
            password.current.type = 'password';
            setSvgEye(eyeRd);
        } else {
            password.current.type = 'text';
            setSvgEye(eyeClosedRd);
        }
    };
    const onHandleChangePass = () => {
        setPassLength(password.current.value.length);
    };

    async function registration(e) {
        e.stopPropagation();
        e.preventDefault();
        await api
            .registration(email.current.value, password.current.value)
            .then((res) => {
                if (res?.errors) {
                    if (res.errors.email) {
                        dispatch(catcherror(res.errors.email[0]));
                        return;
                    }
                } else {
                    res.user.password = password.current.value;
                    dispatch(user(res.user));
                    setTimeout(() => dispatch(showMessage(true)), 500);
                }
            });
    }
    async function login(e) {
        e.stopPropagation();
        e.preventDefault();
        await api
            .login(email.current.value, password.current.value)
            .then((res) => {
                if (res?.errors) {
                    if (res.errors.email) {
                        dispatch(catcherror(res.errors.email[0]));
                        return;
                    }
                } else {
                    res.user.password = password.current.value;
                    dispatch(user(res.user));
                    setTimeout(() => dispatch(showMessage(true)), 500);
                }

                if (modalFromMain == true) {
                    router.push('/order');
                }
            });
    }
    const logout = () => {
        dispatch(userlogout());
    };
    function validateEmail(email) {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }

    let menu = null;
    if (modal === true && auth === true) {
        menu = (
            <div className={`${styles.burger_menu}`} ref={menu}>
                <div
                    className={`${styles.burger_drop_container} ${
                        window.innerWidth > 1024 && 'hide'
                    }`}
                >
                    <Dropdown burger={true} />
                </div>

                <button
                    onClick={() => dispatch(loginModal(false))}
                    className={`${styles.close_menu}`}
                ></button>
                <div
                    className={`${styles.burger_menu__wrapper} ${styles.burger_menu_mobile}`}
                >
                    {auth ? (
                        <div className={styles.login_mobile}>
                            <div className={`${styles.user_ava_wrapper}`}>
                                <img
                                    className={`${styles.user_ava}`}
                                    src="/img/Mbappe.png"
                                />
                            </div>
                            <Link href="/profile">
                                <a
                                    onClick={() => {
                                        dispatch(getAllOrders([]));
                                        dispatch(loginModal(false));
                                    }}
                                    className={`${styles.header_mail} ${styles.burger_mail}`}
                                >
                                    {userData.email}
                                </a>
                            </Link>
                            {/* <button
                                onClick={logout}
                                className={`logout ${styles.logout_menu}`}
                            >
                                {translates[router.locale].logOut}
                            </button> */}
                            <button
                                onClick={logout}
                                className={`${styles.logout_btn} calc_btn buy_btn`}
                            >
                                Log Out
                                <img
                                    class={`${styles.logout_icon} calc_icon`}
                                    src="/img/logout.svg"
                                />
                            </button>
                        </div>
                    ) : (
                        <Link href={'/login'}>
                            <a>
                                <MenuItem
                                    text={translates[router.locale].menuSignIn}
                                />
                            </a>
                        </Link>
                    )}
                    <Menu title={'Profile'} menuItems={profileItems}></Menu>
                    <div className={`${window.innerWidth > 1024 && 'hide'}`}>
                        <Menu title={'Menu'} menuItems={menuItems}>
                            <OptionWithItems />
                        </Menu>
                    </div>

                    {/* <MenuItem
                        text={translates[router.locale].pageCoinsOffers}
                        color={'burger_orange_'}
                    />
                    <MenuItem
                        text={translates[router.locale].menuLinkOrder}
                        color={'burger_yellow_'}
                    />
                    <MenuItem
                        text={translates[router.locale].menuLinkDelivery}
                    />
                    <MenuItem text={translates[router.locale].menuLinkFaq} /> */}
                </div>
                {/* <div className={styles.burger_menu__footer}>
                    <div className={styles.burger_menu__icon_wrapper}>
                        <SvgContainer
                            item={twitter}
                            color={'white'}
                            hover={'gold'}
                            classStyle={styles.burger_menu__icon}
                        />
                    </div>
                    <div className={styles.burger_menu__icon_wrapper}>
                        <SvgContainer
                            item={whatsapp}
                            color={'white'}
                            hover={'gold'}
                            classStyle={styles.burger_menu__icon}
                        />
                    </div>
                    <div className={styles.burger_menu__icon_wrapper}>
                        <SvgContainer
                            item={insta}
                            color={'white'}
                            hover={'gold'}
                            classStyle={styles.burger_menu__icon}
                        />
                    </div>
                    <div className={styles.burger_menu__icon_wrapper}>
                        <SvgContainer
                            item={youtube}
                            color={'white'}
                            hover={'gold'}
                            classStyle={styles.burger_menu__icon}
                        />
                    </div>
                </div> */}
            </div>
        );
        // } else if (modal === true && auth !== true && menuContent == 'mobile') {
        //     menu = (
        //         <div className={styles.burger_menu}>
        //             <div className={`${styles.burger_drop_container}`}>
        //                 <Dropdown burger={true} />
        //             </div>
        //             <button
        //                 onClick={() => dispatch(loginModal(false))}
        //                 className={`${styles.close_menu}`}
        //             ></button>
        //             <div
        //                 className={`${styles.burger_menu__wrapper} ${styles.burger_menu_mobile}`}
        //             >
        //                 <div onClick={() => setMenuContent('desktop')}>
        //                     <MenuItem text={translates[router.locale].menuSignIn} />
        //                 </div>
        //                 <MenuItem
        //                     text={translates[router.locale].pageCoinsOffers}
        //                     color={'burger_orange_'}
        //                 />
        //                 <MenuItem
        //                     text={translates[router.locale].menuLinkOrder}
        //                     color={'burger_yellow_'}
        //                 />
        //                 <MenuItem
        //                     text={translates[router.locale].menuLinkDelivery}
        //                 />
        //                 <MenuItem text={translates[router.locale].menuLinkFaq} />
        //             </div>
        //             <div className={styles.burger_menu__footer}>
        //                 <div className={styles.burger_menu__icon_wrapper}>
        //                     <SvgContainer
        //                         item={twitter}
        //                         color={'white'}
        //                         hover={'gold'}
        //                         classStyle={styles.burger_menu__icon}
        //                     />
        //                 </div>
        //                 <div className={styles.burger_menu__icon_wrapper}>
        //                     <SvgContainer
        //                         item={whatsapp}
        //                         color={'white'}
        //                         hover={'gold'}
        //                         classStyle={styles.burger_menu__icon}
        //                     />
        //                 </div>
        //                 <div className={styles.burger_menu__icon_wrapper}>
        //                     <SvgContainer
        //                         item={insta}
        //                         color={'white'}
        //                         hover={'gold'}
        //                         classStyle={styles.burger_menu__icon}
        //                     />
        //                 </div>
        //                 <div className={styles.burger_menu__icon_wrapper}>
        //                     <SvgContainer
        //                         item={youtube}
        //                         color={'white'}
        //                         hover={'gold'}
        //                         classStyle={styles.burger_menu__icon}
        //                     />
        //                 </div>
        //             </div>
        //         </div>
        //     );
    } else if (modal === true && auth !== true) {
        // } else if (modal === true && auth !== true && menuContent == 'desktop') {
        menu = (
            <div className={`${styles.burger_menu_desk}`}>
                <div
                    className={`${styles.burger_drop_container} ${
                        window.innerWidth > 1024 && 'hide'
                    }`}
                >
                    <Dropdown burger={true} />
                </div>
                <button
                    onClick={() => dispatch(loginModal(false))}
                    className={`${styles.close_menu}`}
                ></button>
                <div className={styles.burger_menu__wrapper}>
                    <div className={styles.auth_container}>
                        <div className={styles.burger_auth_wrapper}>
                            <div
                                className={`${styles.burger_auth_btns_wrapper}`}
                            >
                                <div className={styles.burger_btn_wrapper}>
                                    <button
                                        onClick={onHandleClickLogin}
                                        className={`${styles.auth_tab} ${
                                            loginMenu.registration &&
                                            'color_gray'
                                        } ${
                                            !loginMenu.registration &&
                                            styles.psevdo
                                        }`}
                                        type="button"
                                    >
                                        {
                                            translates[router.locale]
                                                .modalTabSignIn
                                        }
                                    </button>
                                </div>
                                <div className={styles.burger_btn_wrapper}>
                                    <button
                                        onClick={onHandleClickRegistration}
                                        className={`${styles.auth_tab} ${
                                            !loginMenu.registration &&
                                            'color_gray'
                                        } ${
                                            loginMenu.registration &&
                                            styles.psevdo
                                        }`}
                                        type="button"
                                    >
                                        {
                                            translates[router.locale]
                                                .modalTabSignUp
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={styles.fieldset_wrapper}>
                            <form className={styles.auth_form}>
                                <fieldset
                                    className={`${styles.auth_fieldset} ${styles.email_fieldset}`}
                                >
                                    {/* <legend className={styles.auth_legend}>
                                        {
                                            translates[router.locale]
                                                .modalSignEmail
                                        }
                                    </legend> */}
                                    <input
                                        ref={email}
                                        className={styles.auth_userdata}
                                        type="email"
                                        placeholder={'Email'}
                                        onChange={() =>
                                            setValidate(
                                                validateEmail(
                                                    email.current.value
                                                )
                                            )
                                        }
                                    ></input>
                                </fieldset>
                                <fieldset
                                    className={`${styles.auth_fieldset} ${styles.fieldset_pass}`}
                                    ref={authpass}
                                >
                                    {/* <legend className={styles.auth_legend}>
                                        {
                                            translates[router.locale]
                                                .modalSignPassword
                                        }
                                    </legend> */}
                                    <input
                                        onChange={onHandleChangePass}
                                        ref={password}
                                        className={styles.auth_userdata}
                                        type="password"
                                        placeholder={
                                            translates[router.locale]
                                                .modalSignPassword
                                        }
                                    ></input>
                                    <button
                                        ref={viewPassBtn}
                                        onClick={onHandleClickViewPass}
                                        className={styles.auth_view_pass}
                                        type="button"
                                        title={
                                            translates[router.locale]
                                                .seePassword
                                        }
                                    >
                                        <img src={svgEye} />
                                    </button>
                                </fieldset>
                                <div className={styles.num_simbols_wrapper}>
                                    {/* <div className={`${styles.ok_pic}`}>
                                        {' '}
                                        {
                                            passLength <= 7 ? (
                                                <img
                                                    className="bcgr-transparent"
                                                    src="/img/cancel.svg"
                                                />
                                            ) : (
                                                <img
                                                    className="bcgr-transparent"
                                                    src="/img/okay.svg"
                                                />
                                            )
                                            // passLength <= 7
                                            //     ? styles.cancel
                                            //     : styles.ok
                                        }
                                    </div> */}
                                    <span
                                        className={styles.simbols_text}
                                        ref={message}
                                    >
                                        {
                                            translates[router.locale]
                                                .modalSignSymbols8
                                        }
                                    </span>
                                </div>
                                {loginMenu.registration && (
                                    <fieldset className="social-login__forgot">
                                        <div
                                            id="signUpCheck"
                                            onClick={() =>
                                                setIsChecked(!isChecked)
                                            }
                                            className={`checkbox_area ${
                                                isChecked ? 'approove' : ''
                                            }`}
                                        ></div>
                                        <label
                                            onClick={() =>
                                                setIsChecked(!isChecked)
                                            }
                                            className={`social-login__label 
                                            
                                            `}
                                            htmlFor="signUpCheck"
                                        >
                                            {
                                                translates[router.locale]
                                                    .modalSocialForgot
                                            }
                                        </label>
                                        <Link
                                            className={`social-login__link-check `}
                                            href="/terms/"
                                            locale={locale.title}
                                        >
                                            <a
                                                className={`social-login__link-check `}
                                                onClick={() =>
                                                    dispatch(loginModal(false))
                                                }
                                            >
                                                {
                                                    translates[router.locale]
                                                        .modalSocialLoginCheck
                                                }
                                            </a>
                                        </Link>
                                    </fieldset>
                                )}
                                <div className={styles.submit_wrapper}>
                                    {loginMenu.login ? (
                                        <button
                                            ref={submit}
                                            onClick={(e) => {
                                                login(e);
                                            }}
                                            className={`${styles.submit_btn}`}
                                            type="button"
                                        >
                                            {
                                                translates[router.locale]
                                                    .menuSignIn
                                            }
                                        </button>
                                    ) : (
                                        <button
                                            ref={submit}
                                            onClick={(e) => {
                                                registration(e);
                                            }}
                                            className={`${styles.submit_btn} ${
                                                passLength <= 7 ||
                                                !isChecked ||
                                                !validate
                                                    ? styles.disabled
                                                    : ''
                                            }`}
                                            type="button"
                                        >
                                            {
                                                translates[router.locale]
                                                    .modalSignBtnUp
                                            }
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                        {loginMenu.login && (
                            <div>
                                <div>
                                    <Auth login={true} />
                                </div>
                            </div>
                        )}
                        {loginMenu.registration && (
                            <div className={styles.auth_content_wrapper}>
                                <Auth />
                            </div>
                        )}
                        <div
                            className={`${styles.menu_wrapper} ${
                                window.innerWidth > 1024 && 'hide'
                            }`}
                        >
                            <Menu title={'Menu'} menuItems={menuItems}>
                                <OptionWithItems />
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return menu;
};

export default BurgerMenu;
