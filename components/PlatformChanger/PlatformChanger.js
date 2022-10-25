import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { changePlatform } from "../../redux/actions/royalfutActions";

import styles from "../../styles/PlatformChanger.module.scss";

const ps = "/img/ps_icon.svg";
const xb = "/img/xbox_icon.svg";

const PlatformChanger = () => {
  const platform = useSelector((state) => state.royalfutReducer.platform);

  const dispatch = useDispatch();

  const userChangePlatform = (e) => {
    dispatch(changePlatform(e.target.dataset.id));
  };

  return (
    <div className={`${styles.platform_changer__wrapper}`}>
      <div className={`${styles.platform_changer__buttons_wrapper}`}>
        <button
          data-id={"ps"}
          onClick={userChangePlatform}
          type="button"
          className={`${styles.platform_changer__btn} ${
            platform.ps
              ? styles.platform_changer__btn_ps_active
              : styles.platform_changer__btn_notactive
          }`}
        >
          <img
            data-id={"ps"}
            className={`${styles.platform_changer__img_ps} ${styles.platform_changer__img}`}
            src={ps}
            alt="ps"
          ></img>
          PLAYSTATION
        </button>
        <button
          id={"xbox"}
          onClick={userChangePlatform}
          type="button"
          className={`${styles.platform_changer__btn} ${
            !platform.ps
              ? styles.platform_changer__btn_xbox_active
              : styles.platform_changer__btn_notactive
          }`}
        >
          <img
            id={"xbox"}
            className={`${styles.platform_changer__img_xbox} ${styles.platform_changer__img}`}
            src={xb}
            alt="xbox"
          ></img>
          XBOX
        </button>
      </div>
    </div>
  );
};

export default PlatformChanger;
