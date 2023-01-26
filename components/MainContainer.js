import A from './A';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { translates } from '../locales/locales';
import SecureLS from 'secure-ls';

import {
    loginModal,
    catcherror,
    stock,
    currentCurrency,
    user,
    getCriptoLimits,
    order,
    userCreateOrder,
    currentLang,
    modalCalc,
    showMessage,
} from '../redux/actions/royalfutActions';

import styles from '../styles/App.module.scss';

import Header from './Header';
import BurgerMenu from './BurgerMenu';
import Api from '../Api/Api';
import currency from '../data-elements/currency';
import Footer from './Footer';
import flagLangs from '../data-elements/countries';
import Aside from './Aside';
import Breadcrumbs from './Breadcrumbs/Breadcrumbs';
import ScrollToTop from './ScrollToTop/ScrollToTop';
import Cookie from './Cookie/Cookie';
import ModalCalc from './ModalCalc/ModalCalc';

const api = new Api();
let ls = null;

function MainContainer({
    children,
    keywords,
    description,
    title,
    customStyle,
    bodyBackgr = null,
}) {
    const wrapperModalRef = useRef();
    const shadowModalRef = useRef();
    const message = useRef();
    const scrolltop = useRef();
    const modal = useSelector((state) => state.royalfutReducer.loginModal);
    const error = useSelector((state) => state.royalfutReducer.errorMessage);

    const currentStock = useSelector((state) => state.royalfutReducer.stock);
    const t =
        useSelector((state) => state.royalfutReducer.locale.title) || 'en';
    const currentCurrencyState = useSelector(
        (state) => state.royalfutReducer.currency
    );
    const stateDir = useSelector((state) => state.royalfutReducer.direction);
    const stateModalCalc = useSelector(
        (state) => state.royalfutReducer.modalCalc
    );
    const stateUser = useSelector((state) => state.royalfutReducer.user);
    const stateShowMessage = useSelector(
        (state) => state.royalfutReducer.showMessage
    );
    const stateCoins = useSelector((state) => state.royalfutReducer.coins);
    const stateOrder = useSelector((state) => state.royalfutReducer.order);
    const stateLocale = useSelector((state) => state.royalfutReducer.locale);
    const statePlatform = useSelector(
        (state) => state.royalfutReducer.platform
    );
    const stateMethod = useSelector((state) => state.royalfutReducer.method);

    const dispatch = useDispatch();

    const router = useRouter();
    const { pathname, asPath, query } = router;

    const isOutsideClick = (event, ref) => {
        if (!ref.current.contains(event.target) && modal) {
            dispatch(loginModal(false));
        }
    };
    const isOutsideClickContains = (event, ref) => {
        if (ref?.current) {
            if (ref.current.contains(event.target) && modal) {
                dispatch(loginModal(false));
            }
        }
    };

    useEffect(() => {
        if (error != '') {
            setTimeout(() => dispatch(catcherror('')), 3000);
        }
    }, [error]);
    useEffect(() => {
        if (stateShowMessage) {
            setTimeout(() => dispatch(showMessage(false)), 5000);
        }
        if (!stateShowMessage && scrolltop.current) {
            message.current.style.opacity = '0';
            message.current.style.position = 'absolute';
            message.current.style.maxWidth = '343px';
            message.current.style.zIndex = '-2';
            message.current.style.top = '-16px';
            message.current.style.transition = 'all .3s';

            message.current.style.transform = 'translate(8px,-100%)';
        }
        if (stateShowMessage && scrolltop.current) {
            message.current.style.opacity = '1';
            message.current.style.transition = 'all .3s';

            message.current.style.zIndex = '2';
            message.current.style.transform = 'translate(16px,16px)';
            message.current.style.top = '130px';
            message.current.style.right = '32px';
            message.current.style.width = 'auto';

            message.current.style.maxWidth = '343px';
        }
    }, [stateShowMessage]);
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
        ls = new SecureLS();
        let _lsTotal = 0,
            _xLen,
            _x;
        for (_x in localStorage) {
            if (!localStorage.hasOwnProperty(_x)) {
                continue;
            }
            _xLen = (localStorage[_x].length + _x.length) * 2;
            _lsTotal += _xLen;
            console.log(
                _x.substr(0, 50) + ' = ' + (_xLen / 1024).toFixed(2) + ' KB'
            );
        }
        console.log('Total = ' + (_lsTotal / 1024).toFixed(2) + ' KB');
        if ((_lsTotal / 1024).toFixed(2) > 120) {
            // localStorage.clear();
            // localStorage.removeItem('localState');
            ls.removeAll();
            window.location.reload();
            //localStorage.setItem('localState', {});
            console.log(
                'Total after clear = ' + (_lsTotal / 1024).toFixed(2) + ' KB'
            );
        }

        const url = 'https://applepay.cdn-apple.com/jsapi/v1/apple-pay-sdk.js';
        const script = document.createElement('script');
        script.src = url;
        document.body.appendChild(script);
        setTimeout(() => {
            window.addEventListener('scroll', function () {
                if (scrollY < 800 && scrolltop.current) {
                    scrolltop.current.style.opacity = '0';
                    scrolltop.current.style.width = '0';
                } else if (scrollY > 800 && scrolltop.current) {
                    scrolltop.current.style.opacity = '1';
                    scrolltop.current.style.width = '48px';
                }
                // console.log(scrollY, scrolltop);
                // if (scrolltop.current != null) {
                //     console.log(scrolltop.current);
                // }
            });
        }, 1000);

        return () => {
            // window.removeEventListener('scroll', function () {
            //     if (scrollY < 800 && scrolltop.current) {
            //         scrolltop.current.style.display = 'none';
            //     } else if (scrollY >= 800 && scrolltop.current) {
            //         scrolltop.current.style.display = 'flex';
            //     }
            // });
        };
    }, []);

    useEffect(() => {
        console.log({ pathname, query }, asPath, {
            locale: stateLocale.title || 'en',
        });
        router.push({ pathname, query }, asPath, {
            locale: stateLocale.title || 'en',
        });
    }, [stateLocale]);

    useEffect(() => {
        api.getCriptorates(currentCurrencyState.title).then((res) =>
            dispatch(getCriptoLimits(res))
        );
    }, [currentCurrencyState.title]);

    return (
        <>
            <Head>
                <link rel="manifest" href="/manifest.json" />
                <link
                    rel="preload"
                    as="image"
                    href="/img/footballer_cover.png"
                ></link>
                <meta
                    keywords={
                        'royalfut, FIFA 23, FIFA 23 coins, FIFA 23 players' +
                        (keywords || '')
                    }
                ></meta>
                <meta
                    name="description"
                    content={
                        description ||
                        'Продажа монет ФИФА 22 для PS4, XBOX ONE, PS4, PS5 | Доставка монет FIFA 23 за 15 минут | Максимально низкие цены, быстрые и безопасные платежи, Онлайн поддержка 24/7 | ROYALFUT'
                    }
                ></meta>
                <meta
                    name="google-site-verification"
                    content="5E2v-HBKpEQQ-7RVK_addvB2xZb5kG3CqKM7KKu-5jE"
                />
                <link rel="favicon" href="/favicon.ico" />
                <title>{title || 'Главная страница Royalfut.com'}</title>
                <script
                    src="https://accounts.google.com/gsi/client"
                    async
                    defer
                ></script>
                <script
                    src="https://www.youtube.com/iframe_api"
                    async
                    defer
                ></script>
            </Head>
            {/* {bodyBackgr != '404' ? (
                <div dir={stateDir} className={'body__backgr'}></div>
            ) : (
                <div dir={stateDir} className="not-found__background">
                    <picture>
                        <source
                            srcSet="/img/404/404-bg-mobile.webp 1x, /img/404/404-bg-mobile@2x.webp 2x"
                            media="(max-width: 1024px)"
                            type="image/webp"
                        />
                        <source
                            srcSet="/img/404/404-bg-mobile.png 1x, /img/404/404-bg-mobile@2x.png 2x"
                            media="(max-width: 1024px)"
                            type="image/png"
                        />
                        <source
                            srcSet="/img/404/404-bg.webp 1x, /img/404/404-bg@2x.webp 2x"
                            media="(min-width: 1024px)"
                            type="image/webp"
                        />
                        <source
                            srcSet="/img/404/404-bg.png 1x, /img/404/404-bg@2x.png 2x"
                            media="(min-width: 1024px)"
                            type="image/png"
                        />
                        <img decoding="async" />
                    </picture>
                </div>
            )} */}
            <div
                className={`${stateModalCalc === true ? styles.blur : 'hide'}`}
            ></div>
            <div className={`error ${error == '' ? '' : styles.showError}`}>
                {error}
            </div>
            <div
                ref={message}
                className={`
               
                ${styles.login_message}`}
            >
                {/* ${
                    stateShowMessage ? styles.show_message : styles.hide_message
                }  */}
                <img
                    className={`${styles.info_pic}`}
                    src="../../img/info.svg"
                ></img>
                {'You are logged in as '}
                {stateUser.email}
                <button
                    onClick={() => dispatch(showMessage(false))}
                    className={`${styles.close_btn}`}
                >
                    <img
                        className={`${styles.close_btn_pic}`}
                        src="../../img/whitecross.svg"
                    ></img>
                </button>
            </div>
            <div
                className={`${styles.calc_page} ${
                    stateModalCalc === true && 'zindex'
                }`}
            >
                <div
                    className={`${styles.modal_calc_wrapper} ${
                        stateModalCalc === true
                            ? styles.modal_calc_true
                            : styles.modal_calc_false
                    }`}
                >
                    <div className={`${styles.btn_close_wrapper}`}>
                        <button
                            onClick={() => dispatch(modalCalc(false))}
                            className={`${styles.modal_calc_btn_close}`}
                        ></button>
                    </div>

                    <ModalCalc />
                    <div className={`${styles.buy_btn_wrapper}`}>
                        <button className={`${styles.buy_btn}`}>
                            buy coins
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={`${styles.App} ${styles.custom_style}`}
                onClick={(e) => {
                    isOutsideClick(e, wrapperModalRef);
                    isOutsideClickContains(e, shadowModalRef);
                }}
            >
                <Header />
                {/* <h1 className={styles.title}>
          {translates[t]?.title || translates.en.title}
          Next.js!
        </h1> */}
                <Breadcrumbs />
                <div
                    className={`${styles.app__burgerwrapper} ${
                        modal && styles.show_container
                    }`}
                    ref={wrapperModalRef}
                >
                    {/* <div
                        ref={shadowModalRef}
                        className={`${styles.app__burger_bckgr} ${
                            modal ? '' : 'hide'
                        }`}
                    ></div> */}

                    <BurgerMenu />
                </div>
                <div className={styles.app_container_content}>{children}</div>
                <div ref={scrolltop} className={`${styles.scroll_wrapper}`}>
                    <ScrollToTop />
                </div>
                <div className={`${styles.cookie_wrapper}`}>
                    <Cookie />
                </div>

                <Footer />
            </div>
        </>
    );
}

export default MainContainer;
