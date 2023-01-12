import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../styles/Price.module.scss';
import DropdownList from '../DropdownList/DropdownList';
import currency from '../../data-elements/currency';
import { getCoef, getDiscount } from '../../utils/functions';
import { calcCoins } from '../../redux/actions/royalfutActions';

const Price = () => {
    const price = useRef();
    const stateCurrency = useSelector(
        (state) => state.royalfutReducer.currency
    );
    const statePlatform = useSelector(
        (state) => state.royalfutReducer.platform
    );
    const stateMethod = useSelector((state) => state.royalfutReducer.method);
    const stateCalcCoins = useSelector(
        (state) => state.royalfutReducer.calcCoins
    );
    const data = useSelector(
        (state) => state.royalfutReducer.stock.deliveryMethods
    );
    const discounts = useSelector(
        (state) => state.royalfutReducer.stock.discount
    );

    let sortedDiscounts = [...discounts].sort(
        (a, b) => a.limitSumCoins - b.limitSumCoins
    );

    let [currentPrice, setCurrentPrice] = useState(11.2);
    let [currentDiscounts, setCurrentDiscounts] = useState(sortedDiscounts);
    const percentDisc = getDiscount(currentDiscounts, stateCalcCoins);
    const dispatch = useDispatch();

    function getPrice(platform, method, coins, currency, data) {
        let currentPlatform = platform.ps === true ? 'ps4' : 'xbox';
        let currentMethod = method.easy === true ? 'easy' : 'manual';
        let currentCurrency = currency.title;

        let currentCoef = getCoef(
            currentCurrency,
            currentMethod,
            currentPlatform,
            data
        );
        let currentPrice = stateCalcCoins * currentCoef;
        let priceWithD =
            (currentCoef - (currentCoef / 100) * percentDisc) * stateCalcCoins;
        console.log(priceWithD);

        return currentPrice;
    }

    useEffect(() => {
        let price = getPrice(
            statePlatform,
            stateMethod,
            stateCalcCoins,
            stateCurrency,
            data
        ).toFixed(2);
        //setCurrentPrice(price);
        percentDisc = getDiscount(currentDiscounts, stateCalcCoins);
        let inputPrice = document.querySelector('#price');
        if (document.activeElement) {
            if (document.activeElement != inputPrice) {
                if (percentDisc > 1) {
                    setCurrentPrice(
                        (price - (price / 100) * percentDisc).toFixed(2)
                    );
                } else {
                    setCurrentPrice((+price).toFixed(2));
                }
            }
        }
    }, [stateCurrency.title, stateCalcCoins, stateMethod, statePlatform]);

    const onChangePrice = (e) => {
        let text = e.target.value.split('').reverse();
        let temp = e.target.value.split('.').length;
        console.log(temp);

        if (text[0] === '.' && temp <= 2) {
            setCurrentPrice(e.target.value);
        } else if (temp > 2) {
            return;
        } else {
            let re = /[0-9/.]+/;

            let found =
                e.target.value.length > 0 ? +e.target.value.match(re)[0] : 0;
            let currentPlatform = statePlatform.ps === true ? 'ps4' : 'xbox';
            let currentMethod = stateMethod.easy === true ? 'easy' : 'manual';
            let currentCurrency = stateCurrency.title;
            let currentCoef = getCoef(
                currentCurrency,
                currentMethod,
                currentPlatform,
                data
            );

            let price = getPrice(
                statePlatform,
                stateMethod,
                stateCalcCoins,
                stateCurrency,
                data
            );
            let discount = getDiscount(sortedDiscounts, stateCalcCoins);
            let fullPrice = ((found / (100 - discount)) * 100).toFixed(2);
            if (discount < 3) {
                fullPrice = found;
            }

            let coins = fullPrice / currentCoef;
            console.log(coins);

            // console.log(
            //     fullPrice,
            //     fullPrice -
            //         (fullPrice / 100) * getDiscount(sortedDiscounts, stateCalcCoins)
            // );
            dispatch(calcCoins(coins));

            setCurrentPrice(found);
        }
    };

    return (
        <div className={`${styles.price_wrapper}`}>
            <div className={`${styles.h_wrapper}`}>
                <h4 className={`${styles.h}`}>Price</h4>
                <h4 className={`${styles.h}`}>Currency</h4>
            </div>
            <div className={`${styles.value_wrapper}`}>
                <div className={`${styles.input_price_wrapper}`}>
                    <input
                        ref={price}
                        id="price"
                        onChange={onChangePrice}
                        value={`${currentPrice}`}
                        // value={`${stateCurrency.currency}${
                        //     currentPrice
                        //     // .toFixed(2)
                        //     // .toLocaleString()
                        // }
                        //     `}
                        className={`${styles.coins_input}`}
                        type={'text'}
                        step="any"
                    ></input>
                    <div
                        className={`${styles.discount} ${
                            percentDisc < 3 && 'hide'
                        }`}
                    >
                        -{percentDisc}%
                    </div>
                    <span
                        className={`${styles.price_line_through} ${
                            percentDisc < 3 && 'hide'
                        }`}
                    >
                        {getPrice(
                            statePlatform,
                            stateMethod,
                            stateCalcCoins,
                            stateCurrency,
                            data
                        )
                            .toFixed(2)
                            .toLocaleString()}
                    </span>
                </div>
                <DropdownList title={stateCurrency.title} value={currency} />
            </div>
        </div>
    );
};

export default Price;
