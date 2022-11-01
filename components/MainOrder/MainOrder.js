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
  let [activePlatform, setActivePlatfom] = useState({
    ps4: platform.ps ? true : false,
    ps5: false,
    xboxone: platform.ps ? false : true,
    xboxxs: false,
  });

  const dispatch = useDispatch();

  const onClickOption = (obj) => {
    setHide(obj);
  };
  const handleClickActivePlatform = (obj) => {
    setActivePlatfom({ obj });
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
          className={`${styles.mainorder_option_btn} `}
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
          <div
            className={`${styles.mainorder_option_props} ${
              !hide.platform && "hide"
            }`}
          >
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
            hide.platform && styles.mainorder_padding_0
          }`}
        >
          <div
            className={`${styles.mainorder_platform_wrapper} ${
              hide.platform && styles.mainorder_padding_0
            }`}
          >
            <button
              onClick={() =>
                handleClickActivePlatform({
                  ps4: true,
                  ps5: false,
                  xboxone: false,
                  xboxxs: false,
                })
              }
              className={`${styles.mainorder_content_hide} ${
                !hide.platform && styles.mainorder_content
              } ${
                !activePlatform.ps4
                  ? styles.mainorder__btn_notactive
                  : styles.mainorder_btn_ps_active
              }`}
            >
              <SvgContainer
                item={ps4}
                color="white"
                classStyle={`${styles.mainorder_svg_platform__btn}`}
                stroke="transparent"
              />
              Playstation 4
            </button>
            <button
              onClick={() =>
                handleClickActivePlatform({
                  ps4: false,
                  ps5: true,
                  xboxone: false,
                  xboxxs: false,
                })
              }
              className={`${styles.mainorder_content_hide} ${
                !hide.platform && styles.mainorder_content
              } ${
                !activePlatform.ps5
                  ? styles.mainorder__btn_notactive
                  : styles.mainorder_btn_ps_active
              }`}
            >
              <SvgContainer
                item={ps4}
                color="white"
                classStyle={`${styles.mainorder_svg_platform__btn}`}
                stroke="transparent"
              />
              Playstation 5
            </button>
          </div>
          <div
            className={`${styles.mainorder_platform_wrapper} ${
              hide.platform && styles.mainorder_padding_0
            }`}
          >
            <button
              onClick={() =>
                handleClickActivePlatform({
                  ps4: false,
                  ps5: false,
                  xboxone: true,
                  xboxxs: false,
                })
              }
              className={`${styles.mainorder_content_hide} ${
                !hide.platform && styles.mainorder_content
              } ${
                !activePlatform.xboxone
                  ? styles.mainorder__btn_notactive
                  : styles.mainorder_btn_xbox_active
              }`}
            >
              <SvgContainer
                item={xbox}
                color="white"
                classStyle={`${styles.mainorder_svg_platform__btn}`}
                stroke="transparent"
              />
              XBOX ONE
            </button>
            <button
              onClick={() =>
                handleClickActivePlatform({
                  ps4: false,
                  ps5: false,
                  xboxone: false,
                  xboxxs: true,
                })
              }
              className={`${styles.mainorder_content_hide} ${
                !hide.platform && styles.mainorder_content
              } ${
                !activePlatform.xboxxs
                  ? styles.mainorder__btn_notactive
                  : styles.mainorder_btn_xbox_active
              }`}
            >
              <SvgContainer
                item={xbox}
                color="white"
                classStyle={`${styles.mainorder_svg_platform__btn}`}
                stroke="transparent"
              />
              XBOX XS
            </button>
          </div>
          <div
            className={`${styles.mainorder_btn_wrapper} ${
              hide.platform && styles.mainorder_padding_0
            }`}
          >
            <button
              onClick={() => onClickOption({ ...hide, platform: true })}
              className={`${styles.mainorder_continue_btn} ${
                hide.platform && "hide"
              }`}
            >
              continue
            </button>
          </div>
        </div>
        <div className={`${styles.mainorder_divider}`} />
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
