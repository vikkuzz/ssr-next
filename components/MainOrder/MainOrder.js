import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    changeMethod,
    changePlatform,
    order,
    userCreateOrder,
    coins,
    loginModal,
} from '../../redux/actions/royalfutActions';

import styles from '../../styles/MainOrder.module.scss';

import CalcCoins from '../CalcCoins';
import Link from 'next/link';
import SvgContainer from '../SvgContainer';
import Payment from '../Payment';

import {
    getCoef,
    getDeliveryTime,
    getDiscCoef,
    getDiscount,
} from '../../utils/functions';

import { whitearrow } from '../../data-svg/whitearrow';
import { ps4 } from '../../data-svg/ps4';
import { xbox } from '../../data-svg/xbox';
import { done } from '../../data-svg/done';
import Api from '../../Api/Api';

const api = new Api();

const MainOrder = () => {
    const deliveryOption = React.useRef();
    const paymentOption = React.useRef();
    const platformOption = React.useRef();
    const data = useSelector(
        (state) => state.royalfutReducer.stock.deliveryMethods
    );
    const platform = useSelector((state) => state.royalfutReducer.platform);
    const stateCoins = useSelector((state) => state.royalfutReducer.coins);
    const currency = useSelector((state) => state.royalfutReducer.currency);
    const method = useSelector((state) => state.royalfutReducer.method);
    const stateUser = useSelector((state) => state.royalfutReducer.user);
    const stateOrder = useSelector((state) => state.royalfutReducer.order);
    const stateLocale = useSelector((state) => state.royalfutReducer.locale);
    const stateIsAuth = useSelector((state) => state.royalfutReducer.isAuth);
    const namePaymentMethod = useSelector(
        (state) => state.royalfutReducer.paymentMethod
    );

    const stateCreateOrder = useSelector(
        (state) => state.royalfutReducer.createOrder
    );
    const stateCrypto = useSelector(
        (state) => state.royalfutReducer.cryptoLimits
    );

    let [hide, setHide] = useState({
        platform: true,
        coins: true,
        delivery: true,
        payment: true,
    });
    let [activePlatform, setActivePlatfom] = useState({
        ps4: platform.ps ? true : false,
        ps5: false,
        xboxone: platform.ps ? false : true,
        xboxxs: false,
    });
    let [manualPrice, setManualPrice] = useState();
    let [deliveryMethod, setDeliveryMethod] = useState();
    let [currentOrder, setCurrentOrder] = useState(stateOrder);
    let [crypto, setCrypto] = useState();
    let [allSteps, setAllSteps] = useState(
        stateOrder?.coins
            ? {
                  platform: true,
                  coins: true,
                  delivery: true,
                  payment: true,
              }
            : {
                  platform: true,
                  coins: false,
                  delivery: false,
                  payment: false,
              }
    );

    let [scrolltop, setScrolltop] = useState();

    useEffect(() => {
        if (stateOrder.coins) {
            setAllSteps({
                platform: true,
                coins: true,
                delivery: true,
                payment: true,
            });
        } else {
            setAllSteps({
                platform: true,
                coins: false,
                delivery: false,
                payment: false,
            });
        }
    }, []);

    useEffect(() => {
        console.log(allSteps);
        if (!allSteps?.platform || !allSteps?.delivery || !allSteps?.coins) {
            if (!allSteps?.platform) {
                setHide({
                    platform: false,
                    coins: true,
                    delivery: true,
                    payment: true,
                });
            } else if (!allSteps?.coins) {
                setHide({
                    platform: true,
                    coins: false,
                    delivery: true,
                    payment: true,
                });
            } else if (!allSteps?.delivery) {
                setHide({
                    platform: true,
                    coins: true,
                    delivery: false,
                    payment: true,
                });
            }
        } else if (
            allSteps?.platform &&
            allSteps?.delivery &&
            allSteps?.coins
        ) {
            //setAllSteps({ ...allSteps, payment: true });
            console.log('wtf');
            setHide({
                platform: true,
                coins: true,
                delivery: true,
                payment: false,
            });
        }
    }, [allSteps]);

    useEffect(() => {
        setAllSteps({
            platform: true,
            coins: false,
            delivery: false,
            payment: false,
        });
    }, [platform.ps]);

    useEffect(() => {
        let limits = Object.entries(stateCrypto);
        let filterLimitsOk = Object.fromEntries(
            limits.filter((el) => stateCoins?.price >= el[1])
        );
        let filterLimitsNok = Object.fromEntries(
            limits.filter((el) => stateCoins?.price <= el[1])
        );

        let cryptoData = {
            cryptoMin: [...limits].sort((a, b) => a[1] - b[1])[0],
            cryptoNameOk: filterLimitsOk,
            cryptoNameNok: filterLimitsNok,
        };
        console.log(cryptoData);
        setCrypto(cryptoData);
    }, [stateCrypto]);

    useEffect(() => {
        let mainOrder = {
            coins: stateCoins,
            currency: currency,
            platform: platform.ps ? 'ps' : 'xbox',
            method: method.easy ? 'easy' : 'manual',
            deliveryTime: getDeliveryTime(
                stateCoins.amount,
                method.easy ? 'easy' : 'manual',
                platform.ps ? 'ps4' : 'xbox'
            ),
        };
        setCurrentOrder(mainOrder);
    }, [platform, currency, method]);

    useEffect(() => {
        const currentPlatform =
            currentOrder?.platform === 'ps' ? 'ps4' : 'xbox';
        const coefManual = getCoef(
            currentOrder?.currency?.title,
            'manual',
            currentPlatform,
            data
        );
        const coefEasy = getCoef(
            currentOrder?.currency?.title,
            'easy',
            currentPlatform,
            data
        );
        setManualPrice(
            (
                (currentOrder?.coins?.amount * coefManual).toFixed(2) -
                (currentOrder?.coins?.amount * coefEasy).toFixed(2)
            ).toFixed(2)
        );
    }, [currentOrder]);

    useEffect(() => {
        let mobileScrolltop = {
            platform: 120,
            coins: 40,
            delivery: 240,
            payment: 346,
        };
        let descScrolltop = {
            platform: 260,
            coins: 312,
            delivery: 410,
            payment: 504,
        };
        document.addEventListener('scroll', (e) => {
            if (window.innerWidth < 1024) {
                setScrolltop(mobileScrolltop);
            } else if (window.innerWidth > 1024) {
                setScrolltop(descScrolltop);
            }
        });

        if (stateOrder.coins && window.innerWidth <= 1024) {
            setScrolltop(mobileScrolltop);
            window.scrollTo({
                top: 346,
                behavior: 'smooth',
            });
        } else if (stateOrder.coins && window.innerWidth > 1024) {
            setScrolltop(descScrolltop);
            window.scrollTo({
                top: 504,
                behavior: 'smooth',
            });
        } else if (!stateOrder.coins && window.innerWidth <= 1024) {
            setScrolltop(mobileScrolltop);
            window.scrollTo({
                top: 40,
                behavior: 'smooth',
            });
        } else if (!stateOrder.coins && window.innerWidth > 1024) {
            setScrolltop(descScrolltop);
            window.scrollTo({
                top: 312,
                behavior: 'smooth',
            });
        }
        return () => {
            document.addEventListener('scroll', (e) => {
                if (window.pageYOffset < 1024) {
                    setScrolltop(mobileScrolltop);
                } else if (window.pageYOffset > 1024) {
                    setScrolltop(descScrolltop);
                }
            });
        };
    }, []);

    const dispatch = useDispatch();

    const onClickOption = (obj) => {
        setHide(obj);
    };
    const handleClickActivePlatform = (obj) => {
        setActivePlatfom(obj);
    };

    let currentPlatform = platform.ps ? ps4 : xbox;

    let platformText = '';
    if (activePlatform.ps4) {
        platformText = 'Playstation 4';
    } else if (activePlatform.ps5) {
        platformText = 'Playstation 5';
    } else if (activePlatform.xboxone) {
        platformText = 'XBOX ONE';
    } else {
        platformText = 'XBOX XS';
    }

    const paymentOrder = async () => {
        console.log(namePaymentMethod);
        const currentOrder = await api.updateOrder(
            stateCreateOrder.order.id,
            stateUser.token,
            platform.ps ? 'ps4' : 'xbox',
            method.easy ? 'Easy' : 'Manual',
            stateCoins.amount,
            currency.title,
            stateCreateOrder.order.promoCode || null
        );
        dispatch(userCreateOrder(currentOrder));
        await api
            .prePay(
                namePaymentMethod,
                stateUser.token,
                stateCreateOrder?.order?.id,
                stateUser.userLocale,
                platform.ps ? 'ps4' : 'xbox',
                method.easy ? 'Easy' : 'Manual',
                data[platform === 'Easy' ? 0 : 1].data[1].pricePerCurrencyMap
                    .EUR,
                stateCoins.amount,
                stateCreateOrder?.order?.promoCode || null,
                stateUser.email
            )
            .then((res) => (document.location.href = res.acquiringLink));
    };

    const timeoutOption = async (
        openOption,
        scrollTo,
        checkedStep = allSteps
    ) => {
        onClickOption({
            coins: true,
            delivery: true,
            platform: true,
            payment: true,
        });

        setTimeout(() => {
            window.scrollTo({
                top: scrollTo,
                behavior: 'smooth',
            });
            onClickOption(openOption);
            setAllSteps(checkedStep);
        }, 200);
    };

    return (
        <div className={`${styles.mainorder}`}>
            <div
                id="platform"
                className={`${styles.mainorder_wrapper_options} ${
                    !hide.platform && styles.mainorder_open_property
                }`}
            >
                <button
                    ref={platformOption}
                    className={`${styles.mainorder_option_btn} `}
                    onClick={() => {
                        if (hide.platform) {
                            timeoutOption(
                                {
                                    coins: true,
                                    delivery: true,
                                    platform: false,
                                    payment: true,
                                },
                                scrolltop.platform
                            );
                        }
                    }}
                >
                    <div className={`${styles.mainorder_option_text}`}>
                        <span className={`${styles.mainorder_option_name}`}>
                            Platform
                        </span>
                        <SvgContainer
                            item={whitearrow}
                            color={'none'}
                            stroke="white"
                            classStyle={`${styles.mainorder_svg}`}
                        />
                    </div>
                    <div
                        className={`${styles.mainorder_option_props} ${
                            !hide.platform && 'hide'
                        }`}
                    >
                        <div className={`${styles.mainorder_current_info}`}>
                            {platformText}
                        </div>
                        <SvgContainer
                            item={currentPlatform}
                            //color="white"
                            classStyle={`${styles.mainorder_svg_platform}`}
                            stroke="transparent"
                        />
                        <div className={`${styles.mainorder_backgr_done} `}>
                            <SvgContainer
                                item={done}
                                stroke="white"
                                classStyle={`${styles.mainorder_svg_done}`}
                            />
                        </div>
                    </div>
                </button>
                <div
                    className={`${styles.mainorder_container_content} ${
                        hide.platform && styles.mainorder_content_hide
                    }`}
                >
                    <div className={`${styles.mainorder_wrapper_row}`}>
                        <div
                            className={`${styles.mainorder_platform_wrapper} `}
                        >
                            <button
                                onClick={() => {
                                    handleClickActivePlatform({
                                        ps4: true,
                                        ps5: false,
                                        xboxone: false,
                                        xboxxs: false,
                                    });
                                    dispatch(changePlatform('ps'));
                                }}
                                className={`${styles.mainorder_content} ${
                                    !activePlatform.ps4
                                        ? styles.mainorder__btn_notactive
                                        : styles.mainorder_btn_ps_active
                                }`}
                            >
                                <SvgContainer
                                    item={ps4}
                                    color="white"
                                    classStyle={`${styles.mainorder_svg_platform__btn}`}
                                    stroke="transparent"
                                />
                                Playstation 4
                            </button>
                            <button
                                onClick={() => {
                                    handleClickActivePlatform({
                                        ps4: false,
                                        ps5: true,
                                        xboxone: false,
                                        xboxxs: false,
                                    });
                                    dispatch(changePlatform('ps'));
                                }}
                                className={`${styles.mainorder_content} ${
                                    !activePlatform.ps5
                                        ? styles.mainorder__btn_notactive
                                        : styles.mainorder_btn_ps_active
                                }`}
                            >
                                <SvgContainer
                                    item={ps4}
                                    color="white"
                                    classStyle={`${styles.mainorder_svg_platform__btn}`}
                                    stroke="transparent"
                                />
                                Playstation 5
                            </button>
                        </div>
                        <div
                            className={`${styles.mainorder_platform_wrapper} `}
                        >
                            <button
                                onClick={() => {
                                    handleClickActivePlatform({
                                        ps4: false,
                                        ps5: false,
                                        xboxone: true,
                                        xboxxs: false,
                                    });
                                    dispatch(changePlatform('xbox'));
                                }}
                                className={`${styles.mainorder_content} ${
                                    !activePlatform.xboxone
                                        ? styles.mainorder__btn_notactive
                                        : styles.mainorder_btn_xbox_active
                                }`}
                            >
                                <SvgContainer
                                    item={xbox}
                                    color="white"
                                    classStyle={`${styles.mainorder_svg_platform__btn}`}
                                    stroke="transparent"
                                />
                                Xbox One
                            </button>
                            <button
                                onClick={() => {
                                    handleClickActivePlatform({
                                        ps4: false,
                                        ps5: false,
                                        xboxone: false,
                                        xboxxs: true,
                                    });
                                    dispatch(changePlatform('xbox'));
                                }}
                                className={`${styles.mainorder_content} ${
                                    !activePlatform.xboxxs
                                        ? styles.mainorder__btn_notactive
                                        : styles.mainorder_btn_xbox_active
                                }`}
                            >
                                <SvgContainer
                                    item={xbox}
                                    color="white"
                                    classStyle={`${styles.mainorder_svg_platform__btn}`}
                                    stroke="transparent"
                                />
                                Xbox Series X|S
                            </button>
                        </div>
                    </div>
                    <div className={`${styles.mainorder_btn_wrapper} `}>
                        <button
                            onClick={() => {
                                if (allSteps?.coins && allSteps?.delivery) {
                                    timeoutOption(
                                        {
                                            payment: false,
                                            coins: true,
                                            delivery: true,
                                            platform: true,
                                        },
                                        scrolltop.payment,
                                        { ...allSteps, platform: true }
                                    );
                                } else if (!allSteps?.coins) {
                                    timeoutOption(
                                        {
                                            payment: true,
                                            coins: false,
                                            delivery: true,
                                            platform: true,
                                        },
                                        scrolltop.coins,
                                        { ...allSteps, platform: true }
                                    );
                                } else if (!allSteps?.delivery) {
                                    timeoutOption(
                                        {
                                            payment: true,
                                            coins: true,
                                            delivery: false,
                                            platform: true,
                                        },
                                        scrolltop.coins,
                                        { ...allSteps, platform: true }
                                    );
                                }
                                //setAllSteps({ ...allSteps, platform: true });
                            }}
                            className={`${styles.mainorder_continue_btn} `}
                        >
                            continue
                        </button>
                    </div>
                </div>
                <div
                    className={`${styles.mainorder_divider} ${
                        !hide.platform || !hide.coins ? 'hide' : ''
                    }`}
                />
            </div>
            <div
                id="coins"
                className={`${styles.mainorder_wrapper_options} ${
                    !hide.coins && styles.mainorder_open_property
                }`}
            >
                <button
                    className={`${styles.mainorder_option_btn} `}
                    onClick={() => {
                        if (hide.coins) {
                            timeoutOption(
                                {
                                    coins: false,
                                    delivery: true,
                                    platform: true,
                                    payment: true,
                                },
                                scrolltop.platform
                            );
                        }
                    }}
                >
                    <div className={`${styles.mainorder_option_text}`}>
                        <span className={`${styles.mainorder_option_name}`}>
                            Coins amount
                        </span>
                        <SvgContainer
                            item={whitearrow}
                            color={'none'}
                            stroke="white"
                            classStyle={`${styles.mainorder_svg}`}
                        />
                    </div>
                    <div
                        className={`${styles.mainorder_option_props} ${
                            !hide.coins && 'hide'
                        }`}
                    >
                        <div className={`${styles.mainorder_current_info}`}>
                            {currentOrder?.coins?.amount.toLocaleString()} coins
                            for {currentOrder?.currency?.currency}{' '}
                            {currentOrder?.coins?.price}
                        </div>
                        <div
                            className={`${
                                allSteps?.coins
                                    ? styles.mainorder_backgr_done
                                    : styles.mainorder_nobackgr
                            } `}
                        >
                            <SvgContainer
                                item={done}
                                stroke="white"
                                classStyle={`${styles.mainorder_svg_done}`}
                            />
                        </div>
                    </div>
                </button>
                <div
                    className={`${styles.mainorder_container_content_coins} ${
                        hide.coins && styles.mainorder_content_hide
                    }`}
                >
                    <div className={`${styles.mainorder_platform_wrapper} `}>
                        <CalcCoins />
                    </div>
                    <div className={`${styles.mainorder_btn_wrapper} `}>
                        <button
                            onClick={() => {
                                if (allSteps?.delivery) {
                                    timeoutOption(
                                        {
                                            payment: false,
                                            coins: true,
                                            delivery: true,
                                            platform: true,
                                        },
                                        scrolltop.payment,
                                        { ...allSteps, coins: true }
                                    );
                                } else if (!allSteps?.delivery) {
                                    timeoutOption(
                                        {
                                            payment: true,
                                            coins: true,
                                            delivery: false,
                                            platform: true,
                                        },
                                        scrolltop.delivery,
                                        { ...allSteps, coins: true }
                                    );
                                }
                            }}
                            className={`${styles.mainorder_continue_btn} `}
                        >
                            continue
                        </button>
                    </div>
                </div>
                <div
                    className={`${styles.mainorder_divider} ${
                        !hide.coins || !hide.delivery ? 'hide' : ''
                    }`}
                />
            </div>
            <div
                id="delivery"
                className={`${styles.mainorder_wrapper_options} ${
                    !hide.delivery && styles.mainorder_open_property
                }`}
            >
                <button
                    ref={deliveryOption}
                    className={`${styles.mainorder_option_btn} `}
                    onClick={() => {
                        if (hide.delivery) {
                            timeoutOption(
                                {
                                    coins: true,
                                    delivery: false,
                                    platform: true,
                                    payment: true,
                                },
                                scrolltop.delivery
                            );
                        }
                    }}
                >
                    <div className={`${styles.mainorder_option_text}`}>
                        <span className={`${styles.mainorder_option_name}`}>
                            Delivery method
                        </span>
                        <SvgContainer
                            item={whitearrow}
                            color={'none'}
                            stroke="white"
                            classStyle={`${styles.mainorder_svg}`}
                        />
                    </div>
                    <div
                        className={`${styles.mainorder_option_props} ${
                            !hide.delivery && 'hide'
                        }`}
                    >
                        <div className={`${styles.mainorder_current_info}`}>
                            {currentOrder?.method === 'easy'
                                ? 'Comfort trade'
                                : 'Player auction'}
                        </div>
                        <div
                            className={`${
                                allSteps?.delivery
                                    ? styles.mainorder_backgr_done
                                    : styles.mainorder_nobackgr
                            } `}
                        >
                            <SvgContainer
                                item={done}
                                stroke="white"
                                classStyle={`${styles.mainorder_svg_done}`}
                            />
                        </div>
                    </div>
                </button>
                <div
                    className={`${
                        styles.mainorder_container_content_delivery
                    } ${hide.delivery && styles.mainorder_content_hide}`}
                >
                    <div className={`${styles.mainorder_method_container}`}>
                        <button
                            type="button"
                            className={`${styles.mainorder_method_btn} ${
                                styles.mainorder_method_btn_bcgr
                            } ${
                                deliveryMethod != 'easy'
                                    ? styles.mainorder__btn_notactive
                                    : styles.mainorder_btn_xbox_active
                            }`}
                            onClick={() => {
                                setDeliveryMethod('easy');
                                dispatch(changeMethod('easy'));
                            }}
                        >
                            <div className={`${styles.mainorder_recomend}`}>
                                recomended
                            </div>
                            <div
                                className={`${styles.mainorder_method_info_wrapper}`}
                            >
                                <div
                                    className={`${styles.mainorder_method_name}`}
                                >
                                    comfort trade
                                </div>
                                <div
                                    className={`${styles.mainorder_method_info}`}
                                >
                                    Only your FUT 22 account information is
                                    required. We do the rest for you.
                                </div>
                            </div>
                        </button>
                        <button
                            type="button"
                            className={`${styles.mainorder_method_btn} ${
                                deliveryMethod != 'manual'
                                    ? styles.mainorder__btn_notactive
                                    : styles.mainorder_btn_ps_active
                            }`}
                            onClick={() => {
                                setDeliveryMethod('manual');
                                dispatch(changeMethod('manual'));
                            }}
                        >
                            <div className={`${styles.mainorder_recomend}`}>
                                + {currentOrder?.currency?.currency}{' '}
                                {manualPrice || ''}
                            </div>
                            <div
                                className={`${styles.mainorder_method_info_wrapper}`}
                            >
                                <div
                                    className={`${styles.mainorder_method_name}`}
                                >
                                    player auction
                                </div>
                                <div
                                    className={`${styles.mainorder_method_info}`}
                                >
                                    You will need to follow the instructions we
                                    provide. Fast but manual.{' '}
                                    <span>
                                        Doesn't work with orders above 1m coins
                                    </span>
                                </div>
                            </div>
                        </button>
                    </div>
                    <div className={`${styles.mainorder_btn_wrapper} `}>
                        <button
                            onClick={async () => {
                                if (allSteps?.coins) {
                                    await timeoutOption(
                                        {
                                            payment: false,
                                            coins: true,
                                            delivery: true,
                                            platform: true,
                                        },
                                        scrolltop.payment,
                                        { ...allSteps, delivery: true }
                                    );
                                } else if (!allSteps?.coins) {
                                    await timeoutOption(
                                        {
                                            payment: true,
                                            coins: false,
                                            delivery: true,
                                            platform: true,
                                        },
                                        scrolltop.coins,
                                        { ...allSteps, delivery: true }
                                    );
                                }
                            }}
                            className={`${styles.mainorder_continue_btn} `}
                        >
                            continue
                        </button>
                    </div>
                </div>
                <div
                    className={`${styles.mainorder_divider} ${
                        !hide.delivery || !hide.payment ? 'hide' : ''
                    }`}
                />
            </div>
            <div
                className={`${styles.mainorder_wrapper_options} ${
                    !hide.payment && styles.mainorder_open_property
                } ${
                    (!allSteps?.platform ||
                        !allSteps?.delivery ||
                        !allSteps?.coins) &&
                    styles.mainorder_disabled
                }`}
            >
                <button
                    className={`${styles.mainorder_option_btn} `}
                    // onClick={() => {
                    //     onClickOption({
                    //         coins: true,
                    //         delivery: true,
                    //         platform: true,
                    //         payment: false,
                    //     });
                    //     window.scrollTo({
                    //         top: scrolltop.payment,
                    //         behavior: 'smooth',
                    //     });
                    // }}

                    onClick={() => {
                        if (hide.payment) {
                            timeoutOption(
                                {
                                    coins: true,
                                    delivery: true,
                                    platform: true,
                                    payment: false,
                                },
                                scrolltop.payment
                            );
                        }
                    }}
                >
                    <div className={`${styles.mainorder_option_text}`}>
                        <span className={`${styles.mainorder_option_name}`}>
                            Payment
                        </span>
                        <SvgContainer
                            item={whitearrow}
                            color={'none'}
                            stroke="white"
                            classStyle={`${styles.mainorder_svg}`}
                        />
                    </div>
                    <div
                        className={`${styles.mainorder_option_props} ${
                            !hide.payment && 'hide'
                        }`}
                    ></div>
                </button>
                <div
                    className={`${styles.mainorder_container_content_payment} ${
                        hide.payment && styles.mainorder_content_hide
                    }`}
                >
                    <div
                        ref={paymentOption}
                        id="order"
                        className={`${styles.mainorder_payment_wrapper} `}
                    >
                        <Payment deliveryTime={currentOrder.deliveryTime} />
                    </div>
                    <div className={`${styles.mainorder_submit_wrapper}`}>
                        <div className={`${styles.crypto_info_wrapper}`}>
                            <div className={`${styles.info_svg_wrapper}`}>
                                {crypto?.cryptoNameNok &&
                                    Object.entries(crypto?.cryptoNameNok)
                                        .length > 0 && (
                                        <img
                                            className={`${styles.crypto_message}`}
                                            src="/img/message.svg"
                                        ></img>
                                    )}
                            </div>
                            {crypto?.cryptoNameNok &&
                                Object.entries(crypto?.cryptoNameNok).length >
                                    0 && (
                                    <div
                                        className={`${styles.info_text_wrapper}`}
                                    >
                                        {stateLocale.title === 'en' ? (
                                            <span
                                                className={`${styles.info_text1} ${styles.info_text}`}
                                            >
                                                The minimum order amount to pay
                                                with{' '}
                                                <span
                                                    className={`${styles.info_text2} ${styles.info_text}`}
                                                >
                                                    {Object.keys(
                                                        crypto.cryptoNameNok
                                                    ).map((el, i) => (
                                                        <span
                                                            key={el[i]}
                                                            className={`${styles.info_text2} ${styles.info_text}`}
                                                        >
                                                            {el === 'btcSum' &&
                                                                'BTC'}
                                                            {el === 'ethSum' &&
                                                                'ETH'}
                                                            {el === 'usdtSum' &&
                                                                'USDT'}{' '}
                                                        </span>
                                                    ))}
                                                    {Object.entries(
                                                        crypto?.cryptoNameNok
                                                    ).length > 1
                                                        ? 'are '
                                                        : 'is '}
                                                </span>
                                                <span
                                                    className={`${styles.info_text3} ${styles.info_text}`}
                                                >
                                                    {' '}
                                                    {currency.currency}
                                                    {stateCrypto.btcSum &&
                                                        Object.entries(
                                                            stateCrypto
                                                        ).sort(
                                                            (a, b) =>
                                                                a[1] - b[1]
                                                        )[0][1]}
                                                </span>
                                            </span>
                                        ) : (
                                            <span
                                                className={`${styles.info_text1} ${styles.info_text}`}
                                            >
                                                The minimum order amount to pay
                                                with{' '}
                                                <span
                                                    className={`${styles.info_text2} ${styles.info_text}`}
                                                >
                                                    {/* BTC, ETH or USDT are{' '} */}
                                                    {Object.keys(
                                                        crypto.cryptoNameNok
                                                    ).map((el, i) => (
                                                        <span
                                                            key={el[i]}
                                                            className={`${styles.info_text2} ${styles.info_text}`}
                                                        >
                                                            {el === 'btcSum' &&
                                                                'BTC'}
                                                            {el === 'ethSum' &&
                                                                'ETH'}
                                                            {el === 'usdtSum' &&
                                                                'USDT'}{' '}
                                                        </span>
                                                    ))}
                                                </span>
                                                <span
                                                    className={`${styles.info_text3} ${styles.info_text}`}
                                                >
                                                    {' '}
                                                    {currency.currency}
                                                    {stateCrypto.btcSum &&
                                                        Object.entries(
                                                            stateCrypto
                                                        ).sort(
                                                            (a, b) =>
                                                                a[1] - b[1]
                                                        )[0][1]}
                                                </span>
                                            </span>
                                        )}
                                    </div>
                                )}
                        </div>
                        <div className={`${styles.mainorder_btn_wrapper} `}>
                            <button
                                onClick={() => {
                                    //onClickOption({ ...hide, payment: true })
                                    if (stateIsAuth) {
                                        paymentOrder();
                                    } else {
                                        dispatch(loginModal(true));
                                    }
                                }}
                                className={`${styles.mainorder_continue_btn} `}
                            >
                                к оплате
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    className={`${styles.mainorder_divider} ${
                        !hide.payment ? 'hide' : ''
                    }`}
                />
            </div>
        </div>
    );
};

export default MainOrder;
