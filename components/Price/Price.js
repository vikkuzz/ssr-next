import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../../styles/Price.module.scss';
import DropdownList from '../DropdownList/DropdownList';
import currency from '../../data-elements/currency';
import { getCoef } from '../../utils/functions';

const Price = () => {
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

    let [currentPrice, setCurrentPrice] = useState(11.2);

    function getPrice(platform, method, coins, currency) {
        let currentPlatform = platform.ps === true ? 'ps4' : 'xbox';
        let currentMethod = method.easy === true ? 'easy' : 'manual';
        let currentCurrency = currency.title;

        let currentDisc = getCoef(
            currentCurrency,
            currentMethod,
            currentPlatform,
            data
        );
        let currentPrice = stateCalcCoins * currentDisc;

        return currentPrice;
    }

    useEffect(() => {
        let price = getPrice(
            statePlatform,
            stateMethod,
            stateCalcCoins,
            stateCurrency
        );
        setCurrentPrice(price);
    }, [stateCurrency.title, stateCalcCoins, stateMethod, statePlatform]);

    return (
        <div className={`${styles.price_wrapper}`}>
            <div className={`${styles.h_wrapper}`}>
                <h4 className={`${styles.h}`}>Price</h4>
                <h4 className={`${styles.h}`}>Currency</h4>
            </div>
            <div className={`${styles.value_wrapper}`}>
                <input
                    value={(+currentPrice).toFixed(2).toLocaleString()}
                    className={`${styles.coins_input}`}
                    type={'tel'}
                ></input>
                <DropdownList title={stateCurrency.title} value={currency} />
            </div>
        </div>
    );
};

export default Price;
