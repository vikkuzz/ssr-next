import { Router, useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { translates } from '../../locales/locales';

import { coins } from '../../redux/actions/royalfutActions';

import styles from '../../styles/CalcCoins.module.scss';

import { getCoef, getDiscCoef, getDiscount } from '../../utils/functions';

const CalcCoins = () => {
    const border1 = React.createRef();
    const border2 = React.createRef();
    const calcCoins = React.createRef();

    const dispatch = useDispatch();
    const router = useRouter();

    const method = useSelector((state) => state.royalfutReducer.method);
    const minLimit = useSelector(
        (state) => state.royalfutReducer.stock.minLimitSumCoins
    );
    const discounts = useSelector(
        (state) => state.royalfutReducer.stock.discount
    );
    const currency = useSelector(
        (state) => state.royalfutReducer.currency.title
    );
    const currencyLabel = useSelector(
        (state) => state.royalfutReducer.currency.currency
    );
    const currentMethod = useSelector((state) =>
        state.royalfutReducer.method.easy ? 'easy' : 'manual'
    );
    const platform = useSelector((state) =>
        state.royalfutReducer.platform.ps ? 'ps4' : 'xbox'
    );
    const data = useSelector(
        (state) => state.royalfutReducer.stock.deliveryMethods
    );
    const stateCoins = useSelector((state) => state.royalfutReducer.coins);

    let sortedDiscounts = [...discounts].sort(
        (a, b) => a.limitSumCoins - b.limitSumCoins
    );
    let [currentDisc, setCurrentDisc] = useState(sortedDiscounts);
    const coef = getCoef(currency, currentMethod, platform, data);

    let [currentCoins, setCurrentCoins] = useState(
        stateCoins?.amount || minLimit
    );
    const percentDisc = getDiscount(currentDisc, currentCoins);
    let [currentPrice, setCurrentPrice] = useState(
        stateCoins?.price || percentDisc > 1
            ? getDiscCoef(coef, percentDisc) * currentCoins
            : getCoef(currency, currentMethod, platform, data) * currentCoins
    );

    let [disc, setDisc] = useState('');

    useEffect(() => {
        const coef = getCoef(currency, currentMethod, platform, data);
        const percentDisc = getDiscount(currentDisc, currentCoins);

        if (percentDisc > 1) {
            setCurrentPrice(getDiscCoef(coef, percentDisc) * currentCoins);
            setDisc(coef * currentCoins);
        } else {
            setCurrentPrice(coef * currentCoins);
            setDisc('');
        }
        dispatch(
            coins({
                coef: coef,
                price: Number(currentPrice).toFixed(2),
                fullprice: Number(disc).toFixed(2),
                amount: Math.round(currentCoins),
            })
        );
    }, [currency, currentMethod, platform, currentCoins]);

    useEffect(() => {
        if (method.manual) {
            setCurrentDisc(
                sortedDiscounts.filter((elem) => elem.limitSumCoins <= 1000000)
            );
        } else {
            setCurrentDisc(
                sortedDiscounts.filter((elem) => elem.limitSumCoins <= 20000000)
            );
        }
    }, [method]);

    useEffect(() => {
        if (calcCoins.current) {
            if (
                window
                    .getComputedStyle(calcCoins.current)
                    .getPropertyValue('flex-direction') === 'row'
            ) {
                border1.current.style.borderRadius = '4px 0 0 4px';
                border2.current.style.borderRadius = '0px 4px 4px 0';
            } else {
                border1.current.style.borderRadius = '4px 4px 4px 4px';
                border2.current.style.borderRadius = '4px 4px 4px 4px';
            }
        }
    }, [calcCoins]);

    useEffect(() => {
        const coef = getCoef(currency, currentMethod, platform, data);
        const percentDisc = getDiscount(currentDisc, currentCoins);

        setCurrentCoins(currentPrice / getDiscCoef(coef, percentDisc));
        dispatch(
            coins({
                coef: coef,
                price: Number(currentPrice).toFixed(2),
                fullprice: Number(disc).toFixed(2),
                amount: Math.round(currentCoins),
            })
        );
    }, [currentPrice]);

    const handleChangeCoins = (e) => {
        const result = e.target.value.replace(/[^0-9]/g, '');
        console.log(result);
        setCurrentCoins(result);
    };

    const onCoinsButtonClick = (e) => {
        setCurrentCoins(e.target.id);
    };

    const handleChangePrice = (e) => {
        setCurrentPrice(e.target.value);
    };

    return (
        <div ref={calcCoins} className={`${styles.calccoins}`}>
            <div className={`${styles.coins_wrapper}`}>
                <fieldset
                    ref={border1}
                    className={`${styles.coins_fieldset} ${styles.calc_coins__border}`}
                >
                    <legend className={`${styles.coins_legend}`}>
                        {translates[router.locale].pageAmountCoinsLabel}
                    </legend>

                    <input
                        onChange={handleChangeCoins}
                        value={Math.round(+currentCoins).toLocaleString()}
                        className={`${styles.coins_input}`}
                        type={'tel'}
                        maxLength={10}
                    ></input>
                </fieldset>
                <div className={`${styles.coins_pack}`}>
                    <button
                        onClick={onCoinsButtonClick}
                        id={100000}
                        className={`${styles.pack}`}
                    >
                        100k
                    </button>
                    <button
                        onClick={onCoinsButtonClick}
                        id={300000}
                        className={`${styles.pack}`}
                    >
                        300k
                    </button>
                    <button
                        onClick={onCoinsButtonClick}
                        id={500000}
                        className={`${styles.pack}`}
                    >
                        500k
                    </button>
                    {currentDisc.map((elem) => {
                        return (
                            <button
                                onClick={onCoinsButtonClick}
                                key={elem.limitSumCoins}
                                id={elem.limitSumCoins}
                                className={`${styles.pack}`}
                            >
                                {elem.limitSumView}
                                <div
                                    id={elem.limitSumCoins}
                                    className={`${styles.discount}`}
                                >
                                    -{elem.discountPercent}%
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
            <fieldset
                ref={border2}
                className={`${styles.coins_fieldset} ${styles.calc_coins__border2}`}
            >
                <legend className={`${styles.coins_legend}`}>
                    {translates[router.locale].pageCoinsPrice}
                </legend>
                <label className={`${styles.coins_input_wrapper}`}>
                    <span className={`${styles.currency_label}`}>
                        {currencyLabel}
                    </span>
                    <input
                        value={(+currentPrice).toFixed(2).toLocaleString()}
                        className={`${styles.coins_input} ${styles.coins_input__currency}`}
                        onChange={handleChangePrice}
                        type={'text'}
                        size={(+currentPrice).toFixed(2).length - 1.5}
                        maxLength={8}
                    ></input>
                    <span className={`${styles.coins_input__disc}`}>
                        {disc && `${currencyLabel} ${Number(disc).toFixed(2)}`}
                    </span>
                </label>
            </fieldset>
        </div>
    );
};

export default CalcCoins;
