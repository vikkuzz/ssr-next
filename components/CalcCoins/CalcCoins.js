import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import styles from "../../styles/CalcCoins.module.scss";

import { getCoef } from "../../utils/functions";

const CalcCoins = () => {
  const border1 = React.createRef();
  const border2 = React.createRef();
  const calcCoins = React.createRef();

  const method = useSelector((state) => state.royalfutReducer.method);
  const minLimit = useSelector(
    (state) => state.royalfutReducer.stock.minLimitSumCoins
  );
  const discounts = useSelector(
    (state) => state.royalfutReducer.stock.discount
  );
  const currency = useSelector((state) => state.royalfutReducer.currency.title);
  const currentMethod = useSelector((state) =>
    state.royalfutReducer.method.easy ? "easy" : "manual"
  );
  const platform = useSelector((state) =>
    state.royalfutReducer.platform.ps ? "ps4" : "xbox"
  );
  const data = useSelector(
    (state) => state.royalfutReducer.stock.deliveryMethods
  );

  let sortedDiscounts = [...discounts].sort(
    (a, b) => a.limitSumCoins - b.limitSumCoins
  );

  let [currentDisc, setCurrentDisc] = useState(sortedDiscounts);
  let [currentPrice, setCurrentPrice] = useState(
    getCoef(currency, currentMethod, platform, data) * minLimit
  );
  let [currentCoins, setCurrentCoins] = useState(minLimit);

  useEffect(() => {
    console.log(
      getCoef(currency, currentMethod, platform, data) * minLimit,
      currency,
      currentMethod,
      platform,
      data
    );
  }, []);

  useEffect(() => {
    setCurrentPrice(
      getCoef(currency, currentMethod, platform, data) * currentCoins
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
          .getPropertyValue("flex-direction") === "row"
      ) {
        border1.current.style.borderRadius = "4px 0 0 4px";
        border2.current.style.borderRadius = "0px 4px 4px 0";
      } else {
        border1.current.style.borderRadius = "4px 4px 4px 4px";
        border2.current.style.borderRadius = "4px 4px 4px 4px";
      }
    }
  }, [calcCoins]);

  useEffect(() => {
    setCurrentCoins(
      currentPrice / getCoef(currency, currentMethod, platform, data)
    );
  }, [currentPrice]);

  const handleChangeCoins = (e) => {
    const result = e.target.value.replace(/[^0-9]/g, "");
    console.log(result);
    setCurrentCoins(result);
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
          <legend className={`${styles.coins_legend}`}>Монеты</legend>

          <input
            onChange={handleChangeCoins}
            value={Math.round(+currentCoins)}
            className={`${styles.coins_input}`}
            type={"tel"}
          ></input>
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
        ref={border2}
        className={`${styles.coins_fieldset} ${styles.calc_coins__border2}`}
      >
        <legend className={`${styles.coins_legend}`}>Цена</legend>
        <input
          value={Math.round(+currentPrice)}
          className={`${styles.coins_input}`}
          onChange={handleChangePrice}
          type={"text"}
        ></input>
      </fieldset>
    </div>
  );
};

export default CalcCoins;
