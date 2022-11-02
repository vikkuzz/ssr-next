import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    changeMethod,
    changePlatform,
    order,
} from '../../redux/actions/royalfutActions';

import styles from '../../styles/MainOrder.module.scss';

import PlatformChanger from '../PlatformChanger';
import MethodChanger from '../MethodChanger';
import CalcCoins from '../CalcCoins';
import Link from 'next/link';
import SvgContainer from '../SvgContainer';
import Payment from '../Payment';

import { getCoef, getDiscCoef, getDiscount } from '../../utils/functions';

import { whitearrow } from '../../data-svg/whitearrow';
import { ps4 } from '../../data-svg/ps4';
import { xbox } from '../../data-svg/xbox';
import { done } from '../../data-svg/done';

const MainOrder = () => {
    const data = useSelector(
        (state) => state.royalfutReducer.stock.deliveryMethods
    );
    const platform = useSelector((state) => state.royalfutReducer.platform);
    const coins = useSelector((state) => state.royalfutReducer.coins);
    const currency = useSelector((state) => state.royalfutReducer.currency);
    const method = useSelector((state) => state.royalfutReducer.method);

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
    let [currentOrder, setCurrentOrder] = useState();
    let [currentCoins, setCurrentCoins] = useState();

    useEffect(() => {
        let mainOrder = {
            coins: coins,
            currency: currency,
            platform: platform.ps ? 'ps' : 'xbox',
            method: method.easy ? 'easy' : 'manual',
        };
        setCurrentOrder(mainOrder);
    }, [platform, currency, method, currentCoins]);

    useEffect(() => {
        //dispatch(order({ ...currentOrder, currency: currency }));
    }, [currency]);

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
    return (
        <div className={`${styles.mainorder}`}>
            <div
                className={`${styles.mainorder_wrapper_options} ${
                    !hide.platform && styles.mainorder_open_property
                }`}
            >
                <button
                    className={`${styles.mainorder_option_btn} `}
                    onClick={() =>
                        onClickOption({
                            coins: true,
                            delivery: true,
                            platform: false,
                            payment: true,
                        })
                    }
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
                                XBOX ONE
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
                                XBOX XS
                            </button>
                        </div>
                    </div>
                    <div className={`${styles.mainorder_btn_wrapper} `}>
                        <button
                            onClick={() =>
                                onClickOption({ ...hide, platform: true })
                            }
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
                className={`${styles.mainorder_wrapper_options} ${
                    !hide.coins && styles.mainorder_open_property
                }`}
            >
                <button
                    className={`${styles.mainorder_option_btn} `}
                    onClick={() =>
                        onClickOption({
                            coins: false,
                            delivery: true,
                            platform: true,
                            payment: true,
                        })
                    }
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
                    className={`${styles.mainorder_container_content_coins} ${
                        hide.coins && styles.mainorder_content_hide
                    }`}
                >
                    <div className={`${styles.mainorder_platform_wrapper} `}>
                        <CalcCoins />
                    </div>
                    <div className={`${styles.mainorder_btn_wrapper} `}>
                        <button
                            onClick={() =>
                                onClickOption({ ...hide, coins: true })
                            }
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
                className={`${styles.mainorder_wrapper_options} ${
                    !hide.delivery && styles.mainorder_open_property
                }`}
            >
                <button
                    className={`${styles.mainorder_option_btn} `}
                    onClick={() =>
                        onClickOption({
                            coins: true,
                            delivery: false,
                            platform: true,
                            payment: true,
                        })
                    }
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
                            onClick={() =>
                                onClickOption({ ...hide, delivery: true })
                            }
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
                }`}
            >
                <button
                    className={`${styles.mainorder_option_btn} `}
                    onClick={() =>
                        onClickOption({
                            coins: true,
                            delivery: true,
                            platform: true,
                            payment: false,
                        })
                    }
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
                    className={`${styles.mainorder_container_content} ${
                        hide.payment && styles.mainorder_content_hide
                    }`}
                >
                    <div className={`${styles.mainorder_platform_wrapper} `}>
                        <Payment />
                    </div>
                    <div className={`${styles.mainorder_btn_wrapper} `}>
                        <button
                            onClick={() =>
                                onClickOption({ ...hide, payment: true })
                            }
                            className={`${styles.mainorder_continue_btn} `}
                        >
                            к оплате
                        </button>
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
