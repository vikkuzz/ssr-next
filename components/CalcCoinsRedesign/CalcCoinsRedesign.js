import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import styles from '../../styles/CalcCoinsRedesign.module.scss';

const CalcCoinsRedesign = () => {
    const discounts = useSelector(
        (state) => state.royalfutReducer.stock.discount
    );
    const stateDir = useSelector((state) => state.royalfutReducer.direction);
    let sortedDiscounts = [...discounts].sort(
        (a, b) => a.limitSumCoins - b.limitSumCoins
    );
    const stateCoins = useSelector((state) => state.royalfutReducer.coins);
    const minLimit = useSelector(
        (state) => state.royalfutReducer.stock.minLimitSumCoins
    );
    let [currentDisc, setCurrentDisc] = useState(sortedDiscounts);
    let [currentCoins, setCurrentCoins] = useState(
        stateCoins?.amount || minLimit
    );
    const onCoinsButtonClick = (e) => {
        setCurrentCoins(e.target.id);
    };
    return (
        <div className={`${styles.coins_wrapper}`}>
            <h4 className={`${styles.h}`}>Coins</h4>
            <div className={`${styles.input_wrapper}`}>
                <button className={`${styles.coins_btn}`}>-</button>
                <input
                    value={Math.round(+currentCoins).toLocaleString()}
                    className={`${styles.coins_input}`}
                    type={'tel'}
                ></input>
                <button className={`${styles.coins_btn} ${styles.plus}`}>
                    +
                </button>
            </div>
            <div dir={stateDir} className={`${styles.coins_pack}`}>
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
    );
};

export default CalcCoinsRedesign;
