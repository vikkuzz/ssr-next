import A from './A';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
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
} from '../redux/actions/royalfutActions';

import styles from '../styles/App.module.scss';

import Header from './Header';
import BurgerMenu from './BurgerMenu';
import Api from '../Api/Api';
import currency from '../data-elements/currency';
import Footer from './Footer';
import flagLangs from '../data-elements/countries';
import Aside from './Aside';

const api = new Api();

function MainContainer({
    children,
    keywords,
    description,
    title,
    customStyle,
}) {
    const wrapperModalRef = React.createRef();
    const shadowModalRef = React.createRef();
    const modal = useSelector((state) => state.royalfutReducer.loginModal);
    const error = useSelector((state) => state.royalfutReducer.errorMessage);
    const currentStock = useSelector((state) => state.royalfutReducer.stock);
    const t =
        useSelector((state) => state.royalfutReducer.locale.title) || 'en';
    const currentCurrencyState = useSelector(
        (state) => state.royalfutReducer.currency
    );
    const stateDir = useSelector((state) => state.royalfutReducer.direction);
    const stateUser = useSelector((state) => state.royalfutReducer.user);
    const stateCoins = useSelector((state) => state.royalfutReducer.coins);
    const stateOrder = useSelector((state) => state.royalfutReducer.order);
    const stateLocale = useSelector((state) => state.royalfutReducer.locale);
    const statePlatform = useSelector(
        (state) => state.royalfutReducer.platform
    );
    const stateMethod = useSelector((state) => state.royalfutReducer.method);

    const dispatch = useDispatch();

    const router = useRouter();

    const isOutsideClick = (event, ref) => {
        if (!ref.current.contains(event.target) && modal) {
            dispatch(loginModal(false));
        }
    };
    const isOutsideClickContains = (event, ref) => {
        if (ref.current.contains(event.target) && modal) {
            dispatch(loginModal(false));
        }
    };
    useEffect(() => {
        if (error != '') {
            setTimeout(() => dispatch(catcherror('')), 3000);
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
        console.log(router);
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
            localStorage.clear();
        }
    }, []);

    useEffect(() => {
        api.getCriptorates(currentCurrencyState.title).then((res) =>
            dispatch(getCriptoLimits(res))
        );
    }, [currentCurrencyState.title]);

    return (
        <>
            <Head>
                <meta
                    keywords={
                        'royalfut, FIFA 23, FIFA 23 монеты, FIFA 23 игроки' +
                        keywords
                    }
                ></meta>
                <meta
                    name="description"
                    content={
                        description ||
                        'Продажа монет ФИФА 22 для PS4, XBOX ONE, PS4, PS5 | Доставка монет FIFA 23 за 15 минут | Максимально низкие цены, быстрые и безопасные платежи, Онлайн поддержка 24/7 | ROYALFUT'
                    }
                ></meta>
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
            <div dir={stateDir} className="body__backgr"></div>
            <div className={`error ${error == '' ? '' : styles.showError}`}>
                {error}
            </div>

            <div
                className={`${styles.App} ${customStyle}`}
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
                <div
                    className={styles.app__burgerwrapper}
                    ref={wrapperModalRef}
                >
                    <div
                        ref={shadowModalRef}
                        className={`${styles.app__burger_bckgr} ${
                            modal ? '' : 'hide'
                        }`}
                    ></div>
                    <BurgerMenu />
                </div>
                <div className={styles.app_container_content}>{children}</div>

                <Footer />
            </div>
        </>
    );
}

export default MainContainer;
