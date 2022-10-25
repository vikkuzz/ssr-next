import React from "react";

import styles from "../../styles/Calculator.module.scss";

import PlatformChanger from "../PlatformChanger";
import MethodChanger from "../MethodChanger";

const Calculator = () => {
  return (
    <div className={`${styles.calculator}`}>
      <PlatformChanger />
      <MethodChanger />
    </div>
  );
};

export default Calculator;
