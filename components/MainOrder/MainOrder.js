import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "../../styles/MainOrder.module.scss";

import PlatformChanger from "../PlatformChanger";
import MethodChanger from "../MethodChanger";
import CalcCoins from "../CalcCoins";
import Link from "next/link";
import SvgContainer from "../SvgContainer";

import { whitearrow } from "../../data-svg/whitearrow";
import { ps4 } from "../../data-svg/ps4";
import { xbox } from "../../data-svg/xbox";
import { done } from "../../data-svg/done";

const MainOrder = () => {
  const isAuth = useSelector((state) => state.royalfutReducer.isAuth);
  const platform = useSelector((state) => state.royalfutReducer.platform);

  let [hide, setHide] = useState({
    platform: true,
    coins: true,
    delivery: true,
  });

  let [color, setColor] = useState("white");

  const dispatch = useDispatch();

  const onClickOption = (obj) => {
    setHide(obj);
  };

  let currentPlatform = platform.ps ? ps4 : xbox;
  return (
    <div className={`${styles.mainorder}`}>
      <div
        className={`${styles.mainorder_wrapper_options} ${
          !hide.platform && styles.mainorder_open_property
        }`}
      >
        <button
          className={`${styles.mainorder_option_btn} ${
            !hide.platform && "hide"
          }`}
          onClick={() => onClickOption({ ...hide, platform: false })}
        >
          <div className={`${styles.mainorder_option_text}`}>
            <span className={`${styles.mainorder_option_name}`}>Platform</span>
            <SvgContainer
              item={whitearrow}
              color={"none"}
              stroke="white"
              classStyle={`${styles.mainorder_svg}`}
            />
          </div>
          <div className={`${styles.mainorder_option_props}`}>
            <SvgContainer
              item={currentPlatform}
              //color="white"
              classStyle={`${styles.mainorder_svg_platform}`}
              stroke="transparent"
            />
            <div className={`${styles.mainorder_backgr_done} `}>
              <SvgContainer
                item={done}
                stroke="white"
                classStyle={`${styles.mainorder_svg_done}`}
              />
            </div>
          </div>
        </button>
        <div
          className={`${styles.mainorder_container_content} ${
            hide.platform && "hide"
          }`}
        >
          content
          <button onClick={() => onClickOption({ ...hide, platform: true })} />
        </div>
      </div>
      <div className={`${styles.mainorder_wrapper_options}`}>
        <button onClick={() => onClickOption({ ...hide, coins: false })}>
          coins
        </button>
        <div
          className={`${styles.mainorder_container_content} ${
            hide.coins && "hide"
          }`}
        >
          content
        </div>
      </div>
      <div className={`${styles.mainorder_wrapper_options}`}>
        <button onClick={() => onClickOption({ ...hide, delivery: false })}>
          delivery
        </button>
        <div
          className={`${styles.mainorder_container_content} ${
            hide.delivery && "hide"
          }`}
        >
          content
        </div>
      </div>
    </div>
  );
};

export default MainOrder;
