import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { changeMethod } from "../../redux/actions/royalfutActions";

import SvgContainer from "../SvgContainer";
import { what } from "../../data-svg/what";

import styles from "../../styles/MethodChanger.module.scss";

const MethodChanger = () => {
  const method = useSelector((state) => state.royalfutReducer.method);

  const dispatch = useDispatch();

  const userChangeMethod = (e) => {
    dispatch(changeMethod(e.target.dataset.id));
  };

  return (
    <div className={`${styles.method}`}>
      <div className={`${styles.wrapper_radiogroup}`}>
        <label data-id={"easy"} className={`${styles.method_label}`}>
          <input
            onChange={userChangeMethod}
            data-id={"easy"}
            className={`${styles.method_radio}`}
            type={"radio"}
            name="method"
            value="easy"
            checked={method.easy ? true : false}
          ></input>
          <div data-id={"easy"} className={`${styles.method_check}`}></div>
          <span data-id={"easy"}>комфортный</span>
        </label>
        <label data-id={"manual"} className={`${styles.method_label}`}>
          <input
            onChange={userChangeMethod}
            data-id={"manual"}
            className={`${styles.method_radio}`}
            type={"radio"}
            name="method"
            value="manual"
            checked={!method.easy ? true : false}
          ></input>
          <div data-id={"manual"} className={`${styles.method_check}`}></div>
          <span data-id={"manual"}>трансферный рынок</span>
        </label>
      </div>
      <div className={`${styles.info_method}`}>
        <a href="#deliveryMain" className={`${styles.method_info}`}>
          <span className={`${styles.info_text}`}>Как это работает?</span>
          <SvgContainer
            item={what}
            color="white"
            hover="#eab11f"
            classStyle={`${styles.info_svg}`}
            opacity="0.5"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </a>
      </div>
    </div>
  );
};

export default MethodChanger;
