import React from "react";

import styles from "../../styles/Calculator.module.scss";

import PlatformChanger from "../PlatformChanger";
import MethodChanger from "../MethodChanger";
import CalcCoins from "../CalcCoins";
import SvgContainer from "../SvgContainer";

const Calculator = () => {
  return (
    <div className={`${styles.calculator}`}>
      <PlatformChanger />
      <MethodChanger />
      <CalcCoins />
      <div className={`${styles.calc_wrapper_submit}`}>
        <div className={`${styles.calc_submit}`}>
          <button className={`${styles.calc__buy_coins_btn}`} type="button">
            купить монеты
          </button>
        </div>
        <div className={`${styles.calc_information_wrapper}`}>
          <img
            className={`${styles.arrow_info} from-1025-to-1900`}
            src={"/img/arrowinfogold.svg"}
            alt="arrow"
          />
          <img
            className={`${styles.circlearrow_info} from-375-to-1024`}
            src={"/img/circlearrow.svg"}
            alt="arrow"
          />
          <div className={`${styles.info_text_wrapper}`}>
            <span className={`${styles.calc_info__text}`}>
              Наша система полностью автоматизирована,{" "}
            </span>
            <span className={`${styles.calc_info__text}`}>
              поэтому мы доставляем монеты в любое время, 24/7
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
