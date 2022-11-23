import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from '../../styles/Calculator.module.scss';

import PlatformChanger from '../PlatformChanger';
import MethodChanger from '../MethodChanger';
import CalcCoins from '../CalcCoins';
import SvgContainer from '../SvgContainer';
import {
    loginModal,
    order,
    loginModalFromMain,
} from '../../redux/actions/royalfutActions';
import Link from 'next/link';
import { getDeliveryTime } from '../../utils/functions';
import { translates } from '../../locales/locales';
import { Router, useRouter } from 'next/router';

const Calculator = () => {
    const isAuth = useSelector((state) => state.royalfutReducer.isAuth);
    const coins = useSelector((state) => state.royalfutReducer.coins);
    const currency = useSelector((state) => state.royalfutReducer.currency);
    const platform = useSelector((state) => state.royalfutReducer.currency);
    const method = useSelector((state) => state.royalfutReducer.method);

    const dispatch = useDispatch();
    const router = useRouter();

    const submitBuyCoins = (e) => {
        if (isAuth) {
            let currentOrder = {
                coins: coins,
                currency: currency,
                platform: platform.ps ? 'ps' : 'xbox',
                method: method.easy ? 'easy' : 'manual',
                deliveryTime: getDeliveryTime(
                    coins.amount,
                    method.easy ? 'easy' : 'manual',
                    platform.ps ? 'ps4' : 'xbox'
                ),
            };
            dispatch(order(currentOrder));
        } else {
            let currentOrder = {
                coins: coins,
                currency: currency,
                platform: platform.ps ? 'ps' : 'xbox',
                method: method.easy ? 'easy' : 'manual',
                deliveryTime: getDeliveryTime(
                    coins.amount,
                    method.easy ? 'easy' : 'manual',
                    platform.ps ? 'ps4' : 'xbox'
                ),
            };
            dispatch(order(currentOrder));
            dispatch(loginModal(true));
            dispatch(loginModalFromMain(true));
        }
    };
    return (
        <div className={`${styles.calculator}`}>
            <PlatformChanger />
            <MethodChanger />
            <CalcCoins />
            <div className={`${styles.calc_wrapper_submit}`}>
                <div className={`${styles.calc_submit}`}>
                    <Link href={isAuth ? '/order' : ''}>
                        <a
                            className={`${styles.calc__buy_coins_btn}`}
                            onClick={submitBuyCoins}
                        >
                            {translates[router.locale].menuLinkOrder}
                        </a>
                    </Link>
                </div>
                <div className={`${styles.calc_information_wrapper}`}>
                    <img
                        className={`${styles.arrow_info} from-1025-to-1900`}
                        src={'/img/arrowinfogold.svg'}
                        alt="arrow"
                    />
                    <img
                        className={`${styles.circlearrow_info} from-375-to-1024`}
                        src={'/img/circlearrow.svg'}
                        alt="arrow"
                    />
                    <div className={`${styles.info_text_wrapper}`}>
                        <span className={`${styles.calc_info__text}`}>
                            {translates[router.locale].menuLinkDesc}
                        </span>
                        <span className={`${styles.calc_info__text}`}>
                            {translates[router.locale].menuLinkDesc2}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calculator;
