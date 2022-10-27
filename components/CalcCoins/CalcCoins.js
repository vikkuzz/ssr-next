import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import styles from "../../styles/CalcCoins.module.scss";

const CalcCoins = () => {
  const discounts = useSelector(
    (state) => state.royalfutReducer.stock.discount
  );
  const method = useSelector((state) => state.royalfutReducer.method);
  let sortedDiscounts = [...discounts].sort(
    (a, b) => a.limitSumCoins - b.limitSumCoins
  );

  let [currentDisc, setCurrentDisc] = useState(sortedDiscounts);

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

  return (
    <div className={`${styles.calccoins}`}>
      <div className={`${styles.coins_wrapper}`}>
        <fieldset
          className={`${styles.coins_fieldset} ${styles.calc_coins__border}`}
        >
          <legend className={`${styles.coins_legend}`}>Монеты</legend>

          <input className={`${styles.coins_input}`} type={"text"}></input>
        </fieldset>
        <div className={`${styles.coins_pack}`}>
          <button id={100000} className={`${styles.pack}`}>
            100k
          </button>
          <button id={300000} className={`${styles.pack}`}>
            300k
          </button>
          <button id={500000} className={`${styles.pack}`}>
            500k
          </button>
          {currentDisc.map((elem) => {
            return (
              <button
                key={elem.limitSumCoins}
                id={elem.limitSumCoins}
                className={`${styles.pack}`}
              >
                {elem.limitSumView}
                <div id={elem.limitSumCoins} className={`${styles.discount}`}>
                  -{elem.discountPercent}%
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <fieldset
        className={`${styles.coins_fieldset} ${styles.calc_coins__border2}`}
      >
        <legend className={`${styles.coins_legend}`}>Цена</legend>
        <input className={`${styles.coins_input}`} type={"text"}></input>
      </fieldset>
    </div>
  );
};

export default CalcCoins;
