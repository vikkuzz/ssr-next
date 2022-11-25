import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { translates } from '../../locales/locales';

import { namePaymentMethod } from '../../redux/actions/royalfutActions';

import styles from '../../styles/Payment.module.scss';
import PriceCoupon from '../PriceCoupon';

const Info = ({ color, text, textColor }) => {
    return (
        <div
            className={`${styles.method_info}`}
            style={{ backgroundColor: `${color}`, color: `${textColor}` }}
        >
            {text}
        </div>
    );
};

const Payment = ({ deliveryTime }) => {
    const card = React.createRef();
    const apple = React.createRef();
    const btc = React.createRef();
    const eth = React.createRef();
    const usdt = React.createRef();

    const dispatch = useDispatch();
    const router = useRouter();
    const t = translates[router.locale];

    const stateCrypto = useSelector(
        (state) => state.royalfutReducer.cryptoLimits
    );
    const stateCoins = useSelector((state) => state.royalfutReducer.coins);
    const stateOrder = useSelector((state) => state.royalfutReducer.order);

    let [methodPayment, setMethodPayment] = useState({
        card: true,
        apple: false,
        btc: false,
        eth: false,
        usdt: false,
    });

    let [crypto, setCrypto] = useState();

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
        setCrypto(cryptoData);
    }, [stateCrypto]);

    useEffect(() => {
        if (methodPayment.card) {
            card.current.style.borderColor = '#eab11f';
            dispatch(namePaymentMethod('acquiring'));
        } else {
            card.current.style.borderColor = 'rgba(255,255,255,0.2)';
        }
        if (methodPayment.apple) {
            apple.current.style.borderColor = '#eab11f';
            dispatch(namePaymentMethod('apple'));
        } else {
            apple.current.style.borderColor = 'rgba(255,255,255,0.2)';
        }
        if (methodPayment.btc) {
            btc.current.style.borderColor = '#eab11f';
            dispatch(namePaymentMethod('bitcoin'));
        } else {
            btc.current.style.borderColor = 'rgba(255,255,255,0.2)';
        }
        if (methodPayment.eth) {
            eth.current.style.borderColor = '#eab11f';
            dispatch(namePaymentMethod('etherium'));
        } else {
            eth.current.style.borderColor = 'rgba(255,255,255,0.2)';
        }
        if (methodPayment.usdt) {
            usdt.current.style.borderColor = '#eab11f';
            dispatch(namePaymentMethod('usdt'));
        } else {
            usdt.current.style.borderColor = 'rgba(255,255,255,0.2)';
        }
    }, [methodPayment]);

    const handleClickmethod = (e) => {
        let initState = {
            card: false,
            apple: false,
            btc: false,
            eth: false,
            usdt: false,
        };

        setMethodPayment({ ...initState, [`${e.target.dataset.id}`]: true });
        console.log({ ...initState, [`${e.target.dataset.id}`]: true });
    };

    return (
        <div className={`${styles.payment}`}>
            <div className={`${styles.payment_method__group}`}>
                <div
                    className={`${styles.payment_method__delivery} ${styles.payment_method}`}
                >
                    <div
                        className={`${styles.payment_time_svg} ${styles.payment_svg}`}
                    ></div>
                    <span className={`${styles.payment_method_set_delivery}`}>
                        {deliveryTime
                            ? `${
                                  deliveryTime.time[0] +
                                  '-' +
                                  deliveryTime.time[1]
                              }${
                                  deliveryTime.type === 'deliveryMinutes'
                                      ? 'm'
                                      : 'h'
                              } ${t.pageCoinsDelivery}`
                            : `3-5h ${t.pageCoinsDelivery}`}
                    </span>
                </div>
                <div
                    className={`${styles.payment_method__guarantee} ${styles.payment_method}`}
                >
                    <div
                        className={`${styles.payment_star_svg} ${styles.payment_svg}`}
                    ></div>
                    <span>{t.pagePaymentMethodGuarantee}</span>
                </div>
                <div
                    className={`${styles.payment_method__secure} ${styles.payment_method}`}
                >
                    <div
                        className={`${styles.payment_lock_svg} ${styles.payment_svg}`}
                    ></div>
                    <span>{t.pagePaymentMethodSafe}</span>
                </div>
            </div>
            <div className={`${styles.payment_price_wrapper} from-375-to-1024`}>
                <PriceCoupon />
            </div>
            <div className={`${styles.payment_all_methods}`}>
                <div className={`${styles.payment_method_wrapper}`}>
                    <div className={`${styles.payment_title}`}>
                        {t.pagePaymentMethodPay}
                    </div>
                    <div className={`${styles.payment_bycard}`}>
                        <div className={`${styles.payment_method_row}`}>
                            <fieldset
                                ref={card}
                                data-id={'card'}
                                className={`${styles.payment_fieldset}`}
                                onClick={handleClickmethod}
                            >
                                <label
                                    data-id={'card'}
                                    className={`${styles.payment_label}`}
                                >
                                    <input
                                        data-id={'card'}
                                        name="payment"
                                        className={`${styles.payment_input}`}
                                        type={'radio'}
                                        defaultChecked={methodPayment.card}
                                    ></input>
                                    <div
                                        data-id={'card'}
                                        className={`${styles.payment_fake_input}`}
                                    ></div>
                                    <div
                                        data-id={'card'}
                                        className={`${styles.payment_wrapper_logo}`}
                                    >
                                        <img
                                            className={`${styles.payment_method__card}`}
                                            src="/img/visa-white.svg"
                                            alt="visa"
                                        ></img>
                                        <img
                                            className={`${styles.payment_method__card_master}`}
                                            src="/img/mastercard.svg"
                                            alt="mastercard"
                                        ></img>
                                    </div>
                                </label>
                                <Info
                                    color="#eab11f"
                                    text="and more"
                                    textColor={'#303234'}
                                />
                            </fieldset>
                            <fieldset
                                ref={apple}
                                data-id={'apple'}
                                className={`${styles.payment_fieldset} ${styles.payment_fieldset_apple}`}
                                onClick={handleClickmethod}
                            >
                                <label
                                    data-id={'apple'}
                                    className={`${styles.payment_label_apple}`}
                                >
                                    <input
                                        data-id={'apple'}
                                        name="payment"
                                        className={`${styles.payment_input}`}
                                        type={'radio'}
                                    ></input>
                                    <div
                                        data-id={'apple'}
                                        className={`${styles.payment_fake_input} ${styles.payment_fake_input__apple}`}
                                    ></div>
                                    <div
                                        data-id={'apple'}
                                        className={`${styles.payment_wrapper_logo} ${styles.payment_wrapper_logo_apple}`}
                                    >
                                        <img
                                            className={`${styles.payment_method__card_apple}`}
                                            src="/img/applepay.svg"
                                            alt="apple"
                                        ></img>
                                    </div>
                                </label>
                            </fieldset>
                            <div
                                className={`${styles.payment_price} from-1025-to-1900`}
                            >
                                <PriceCoupon />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.payment_method_wrapper}`}>
                    <div className={`${styles.payment_title}`}>
                        {t.orWithCrypto}
                    </div>
                    <div className={`${styles.payment_bycard}`}>
                        <div className={`${styles.payment_method_row}`}>
                            <fieldset
                                ref={btc}
                                data-id={'btc'}
                                className={`${styles.payment_fieldset} ${
                                    crypto?.cryptoNameNok.btcSum &&
                                    styles.payment_disabled
                                }`}
                                onClick={handleClickmethod}
                            >
                                <label
                                    data-id={'btc'}
                                    className={`${styles.payment_label}`}
                                >
                                    <input
                                        data-id={'btc'}
                                        name="payment"
                                        className={`${styles.payment_input}`}
                                        type={'radio'}
                                    ></input>
                                    <div
                                        data-id={'btc'}
                                        className={`${styles.payment_fake_input}`}
                                    ></div>
                                    <div
                                        data-id={'btc'}
                                        className={`${styles.payment_wrapper_logo}`}
                                    >
                                        <img
                                            data-id={'btc'}
                                            className={`${styles.payment_method__card} ${styles.payment_method__crypto}`}
                                            src="/img/btc.svg"
                                            alt="btc"
                                        ></img>
                                    </div>
                                </label>
                                <Info
                                    color="#676977"
                                    text="BTC"
                                    textColor={'#fff'}
                                />
                            </fieldset>
                            <fieldset
                                ref={eth}
                                data-id={'eth'}
                                className={`${styles.payment_fieldset} ${
                                    crypto?.cryptoNameNok.ethSum &&
                                    styles.payment_disabled
                                }`}
                                onClick={handleClickmethod}
                            >
                                <label
                                    data-id={'eth'}
                                    className={`${styles.payment_label}`}
                                >
                                    <input
                                        data-id={'eth'}
                                        name="payment"
                                        className={`${styles.payment_input}`}
                                        type={'radio'}
                                    ></input>
                                    <div
                                        data-id={'eth'}
                                        className={`${styles.payment_fake_input}`}
                                    ></div>
                                    <div
                                        data-id={'eth'}
                                        className={`${styles.payment_wrapper_logo}`}
                                    >
                                        <img
                                            className={`${styles.payment_method__card} ${styles.payment_method__crypto}`}
                                            src="/img/eth.svg"
                                            alt="eth"
                                        ></img>
                                    </div>
                                </label>
                                <Info
                                    color="#676977"
                                    text="ETH"
                                    textColor={'#fff'}
                                />
                            </fieldset>
                            <fieldset
                                ref={usdt}
                                data-id={'usdt'}
                                className={`${styles.payment_fieldset} ${
                                    crypto?.cryptoNameNok.usdtSum &&
                                    styles.payment_disabled
                                }`}
                                onClick={handleClickmethod}
                            >
                                <label
                                    data-id={'usdt'}
                                    className={`${styles.payment_label}`}
                                >
                                    <input
                                        data-id={'usdt'}
                                        name="payment"
                                        className={`${styles.payment_input}`}
                                        type={'radio'}
                                    ></input>
                                    <div
                                        data-id={'usdt'}
                                        className={`${styles.payment_fake_input}`}
                                    ></div>
                                    <div
                                        data-id={'usdt'}
                                        className={`${styles.payment_wrapper_logo}`}
                                    >
                                        <img
                                            className={`${styles.payment_method__card} ${styles.payment_method__crypto}`}
                                            src="/img/usdt.svg"
                                            alt="usdt"
                                        ></img>
                                    </div>
                                </label>
                                <Info
                                    color="#676977"
                                    text="USDT"
                                    textColor={'#fff'}
                                />
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
