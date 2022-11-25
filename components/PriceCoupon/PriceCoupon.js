import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Api from '../../Api/Api';
import { translates } from '../../locales/locales';
import { userCreateOrder } from '../../redux/actions/royalfutActions';

import styles from '../../styles/PriceCoupon.module.scss';

const api = new Api();

const PriceCoupon = () => {
    const stateCoins = useSelector((state) => state.royalfutReducer.coins);
    const stateCurrency = useSelector(
        (state) => state.royalfutReducer.currency
    );
    const stateUser = useSelector((state) => state.royalfutReducer.user);
    const statePlatform = useSelector(
        (state) => state.royalfutReducer.platform
    );
    const stateMethod = useSelector((state) => state.royalfutReducer.method);
    const stateOrder = useSelector(
        (state) => state.royalfutReducer.createOrder.order
    );

    let [textError, setTextError] = useState('');

    const promoCodeTemplate = (callback) => {
        const data = {
            promoCode: stateOrder?.promoCode, // промокод
            price: stateCoins?.price, // цена без скидки
            overallPrice: stateOrder?.overallPrice, // новая цена
            discount:
                100 -
                (
                    stateOrder?.overallPrice /
                    (stateCoins?.coef * stateCoins?.amount)
                ).toFixed(2) *
                    100, // размер скидки
        };

        return (
            <>
                <div className={`${styles.payment_method__total_coupon_title}`}>
                    {data.promoCode}
                </div>
                <div className={`${styles.payment_method__total_coupon_addon}`}>
                    <span>
                        - {stateCurrency.currency}
                        {(
                            Number(stateCoins.coef * stateCoins.amount) -
                            Number(data.overallPrice)
                        ).toFixed(2)}{' '}
                        (-{data.discount.toFixed(2)}%)
                    </span>
                    <button
                        className={`${styles.close_coupon}`}
                        onClick={() => callback()}
                    ></button>
                </div>
            </>
        );
    };

    useEffect(() => {
        if (stateOrder?.labels) {
            for (let i = 0; i < stateOrder.labels.length; i++) {
                const label = stateOrder.labels[i];

                if (label.toLowerCase() === 'promo_out_of_date') {
                    setTextError(`"Срок действия купона истек"`);
                } else if (label.toLowerCase() === 'limit_exceeded') {
                    setTextError(
                        `"Промокод использован максимальное кол-во раз"`
                    );
                } else if (label.toLowerCase() === 'condition_not_met') {
                    setTextError(
                        `"Сумма заказа не удовлетворяет минимальной для использования промокода"`
                    );
                }
            }
        }

        setTimeout(() => setTextError(''), 5000);
    }, [stateOrder]);

    let [hide, setHide] = useState(true);
    let [promocode, setPromocode] = useState('');

    const dispatch = useDispatch();
    const router = useRouter();
    const t = translates[router.locale];

    const sendPromo = async () => {
        const currentOrder = await api.updateOrder(
            stateOrder.id,
            stateUser.token,
            statePlatform == 'ps' ? 'ps4' : 'xbox',
            stateMethod.easy ? 'Easy' : 'Manual',
            stateCoins.amount,
            stateCurrency.title,
            promocode
        );
        dispatch(userCreateOrder({ order: currentOrder }));
        setHide(true);
    };
    const handleChangePromo = (e) => {
        setPromocode(e.target.value);
        console.log(e.target.value);
    };

    const resetCoupon = async () => {
        const currentOrder = await api.updateOrder(
            stateOrder.id,
            stateUser.token,
            statePlatform == 'ps' ? 'ps4' : 'xbox',
            stateMethod.easy ? 'Easy' : 'Manual',
            stateCoins.amount,
            stateCurrency.title
        );
        dispatch(userCreateOrder({ order: currentOrder }));
    };

    return (
        <div className={`${styles.price}`}>
            <div className={`${styles.price_payment_wrapper}`}>
                <div className={`${styles.price_wrapper}`}>
                    {stateCurrency.currency}{' '}
                    {stateOrder?.promoCode
                        ? stateOrder.overallPrice
                        : stateCoins?.price}
                </div>
                <button
                    className={`${styles.coupon} ${
                        stateOrder?.promoCode && 'hide'
                    }`}
                    onClick={() => setHide(!hide)}
                >
                    {t.pageCoinsCoupon}
                </button>
            </div>
            <div
                className={`${styles.coupon_container_content} ${
                    hide && styles.coupon_content_hide
                } from-375-to-1024`}
            >
                <fieldset className={`${styles.coupon_fieldset}`}>
                    <legend className={`${styles.coupon_legend}`}>
                        {t.pagePaymentMethodCoupon}
                    </legend>
                    <input
                        className={`${styles.coupon_input}`}
                        type={'text'}
                        onChange={handleChangePromo}
                    ></input>
                    <button
                        onClick={sendPromo}
                        className={`${styles.coupon_btn}`}
                        type="button"
                    >
                        {t.pagePaymentMethodCouponApply}
                    </button>
                </fieldset>
            </div>
            <div
                className={`${styles.coupon_container_content} ${
                    hide && styles.coupon_content_hide
                } from-1025-to-1900`}
            >
                <fieldset className={`${styles.coupon_fieldset}`}>
                    <legend className={`${styles.coupon_legend}`}>
                        {t.pagePaymentMethodCoupon}
                    </legend>
                    <input
                        className={`${styles.coupon_input}`}
                        type={'text'}
                        onChange={handleChangePromo}
                    ></input>
                    <button
                        onClick={sendPromo}
                        className={`${styles.coupon_btn}`}
                        type="button"
                    >
                        {t.pagePaymentMethodCouponApply}
                    </button>
                </fieldset>
            </div>
            <div
                className={`${!stateOrder?.promoCode && 'hide'} ${
                    styles.promo_wrapper
                }`}
            >
                {promoCodeTemplate(resetCoupon)}
            </div>
            <span className={`${!textError && 'hide'}`}>{textError}</span>
        </div>
    );
};

export default PriceCoupon;
