import React from "react";
import { useSelector } from "react-redux";

import styles from "../../styles/CalcCoins.module.scss";

const CalcCoins = () => {
  let discounts = useSelector((state) => state.royalfutReducer.stock.discount);

  discounts = [...discounts].sort((a, b) => a.limitSumCoins - b.limitSumCoins);
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
          {discounts.map((elem) => {
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
