import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calcCoins } from '../../redux/actions/royalfutActions';

import styles from '../../styles/CalcCoinsRedesign.module.scss';

const CalcCoinsRedesign = () => {
    const intervalRef = useRef(null);
    const inputCoins = useRef(null);
    const discounts = useSelector(
        (state) => state.royalfutReducer.stock.discount
    );
    const stateDir = useSelector((state) => state.royalfutReducer.direction);
    const stateCalcCoins = useSelector(
        (state) => state.royalfutReducer.calcCoins
    );
    let sortedDiscounts = [...discounts].sort(
        (a, b) => a.limitSumCoins - b.limitSumCoins
    );
    const stateCoins = useSelector((state) => state.royalfutReducer.coins);
    const minLimit = useSelector(
        (state) => state.royalfutReducer.stock.minLimitSumCoins
    );
    let [currentDisc, setCurrentDisc] = useState(sortedDiscounts);
    let [currentCoins, setCurrentCoins] = useState(stateCalcCoins || minLimit);
    const dispatch = useDispatch();
    const onCoinsButtonClick = (e) => {
        // setCurrentCoins(e.target.id);

        dispatch(calcCoins(e.target.id));
    };

    function changeCoinsFromBtn(sum, action) {
        let pr = null;
        setCurrentCoins((prev) => {
            pr = prev;
            return prev;
        });
        if (sum < 0) {
            if (action == '+') {
                dispatch(calcCoins(0));
            }
            if (action == '-') {
                dispatch(calcCoins(0));
            }
        }
        if (sum == 0) {
            if (action == '+') {
                dispatch(calcCoins(pr + 1000));
            }
            if (action == '-') {
                dispatch(calcCoins(0));
            }
        }
        if (sum >= 1000 && sum <= 99999) {
            if (action == '+') {
                dispatch(calcCoins(pr + 1000));
            }
            if (action == '-') {
                dispatch(calcCoins(pr - 1000));
            }
        }
        if (sum >= 100000 && sum <= 299999) {
            if (action == '+') {
                dispatch(calcCoins(pr + 10000));
            }
            if (action == '-') {
                dispatch(calcCoins(pr - 10000));
            }
        }
        if (sum >= 300000 && sum <= 499999) {
            if (action == '+') {
                dispatch(calcCoins(pr + 20000));
            }
            if (action == '-') {
                dispatch(calcCoins(pr - 20000));
            }
        }
        if (sum >= 500000 && sum <= 999999) {
            if (action == '+') {
                dispatch(calcCoins(pr + 50000));
            }
            if (action == '-') {
                dispatch(calcCoins(pr - 50000));
            }
        }
        if (sum >= 1000000 && sum <= 2999999) {
            if (action == '+') {
                dispatch(calcCoins(pr + 100000));
            }
            if (action == '-') {
                dispatch(calcCoins(pr - 100000));
            }
        }
        if (sum >= 3000000 && sum <= 5999999) {
            if (action == '+') {
                dispatch(calcCoins(pr + 500000));
            }
            if (action == '-') {
                dispatch(calcCoins(pr - 500000));
            }
        }
        if (sum >= 6000000 && sum <= 999999999) {
            if (action == '+') {
                dispatch(calcCoins(pr + 1000000));
            }
            if (action == '-') {
                dispatch(calcCoins(pr - 1000000));
            }
        }
    }

    const startCounter = (e) => {
        if (intervalRef.current) return;

        if (e.target.id === '-') {
            intervalRef.current = setInterval(() => {
                let currSum = +inputCoins.current.value
                    .split('')
                    .map((val) => val.trim())
                    .filter((val) => val !== '')
                    .join('');
                changeCoinsFromBtn(currSum, '-');
            }, 200);
        }
        if (e.target.id === '+') {
            intervalRef.current = setInterval(() => {
                let currSum = +inputCoins.current.value
                    .split('')
                    .map((val) => val.trim())
                    .filter((val) => val !== '')
                    .join('');
                changeCoinsFromBtn(currSum, '+');
            }, 200);
        }
    };

    const stopCounter = (e) => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const onPlus = () => {
        changeCoinsFromBtn(stateCalcCoins, '+');
    };
    const onMinus = () => {
        changeCoinsFromBtn(stateCalcCoins, '-');
    };

    useEffect(() => {
        return () => stopCounter(); // when App is unmounted we should stop counter
    }, []);

    useEffect(() => {
        setCurrentCoins(Number(stateCalcCoins));
        if (stateCalcCoins < 0) {
            dispatch(calcCoins(0));
        }
    }, [stateCalcCoins]);

    const handleChangeCoins = (e) => {
        const result = e.target.value.replace(/[^0-9]/g, '');
        console.log(result);

        dispatch(calcCoins(result));
    };

    return (
        <div className={`${styles.coins_wrapper}`}>
            <h4 className={`${styles.h}`}>Coins</h4>
            <div className={`${styles.input_wrapper}`}>
                <button
                    id={'-'}
                    onMouseDown={startCounter}
                    onMouseUp={stopCounter}
                    onTouchStart={startCounter}
                    onTouchEnd={stopCounter}
                    onMouseLeave={stopCounter}
                    onClick={onMinus}
                    className={`${styles.coins_btn}`}
                >
                    -
                </button>
                <input
                    onChange={handleChangeCoins}
                    ref={inputCoins}
                    value={Math.round(+currentCoins).toLocaleString()}
                    className={`${styles.coins_input}`}
                    type={'text'}
                ></input>
                <button
                    id={'+'}
                    onMouseDown={startCounter}
                    onMouseUp={stopCounter}
                    onMouseLeave={stopCounter}
                    onTouchStart={startCounter}
                    onTouchEnd={stopCounter}
                    onClick={onPlus}
                    className={`${styles.coins_btn} ${styles.plus}`}
                >
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
