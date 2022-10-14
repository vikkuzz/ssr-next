import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

import styles from "../../styles/Footer.module.scss";

const Footer = () => {
  const locale = useSelector((state) => state.royalfutReducer.locale);

  return (
    <div className={`${styles.footer}`}>
      <div className={`${styles.footer_firstcolumn}`}>
        <div className={`${styles.footer_header}`}>ОБЩАЯ ИНФОРМАЦИЯ</div>
        <div className={`${styles.footer_infowrapper}`}>
          <div
            className={`${styles.footer_info_item} ${styles.footer_info_font}`}
          >
            Yasha Limited, Office 908H Nicolaou Pentadromos Center, Limassol,
            Cyprus
          </div>
        </div>
      </div>
      <div className={`${styles.footer_secondcolumn}`}>
        <div className={`${styles.footer_header}`}>ПЛАТФОРМЫ</div>
        <div className={`${styles.footer_infowrapper}`}></div>
      </div>
      <div className={`${styles.footer_thirdcolumn}`}>
        <div className={`${styles.footer_header}`}>ЮРИДИЧЕСКАЯ ИНФОРМАЦИЯ</div>
        <div className={`${styles.footer_infowrapper}`}></div>
      </div>
    </div>
  );
};

export default Footer;
