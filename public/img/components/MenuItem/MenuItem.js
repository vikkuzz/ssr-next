import React from "react";

import styles from "../../styles/MenuItem.module.scss";

const MenuItem = ({ image = null, text = null, color = "" }) => {
  return (
    <div className={`${styles[`${color}menu_item`]} ${styles.menu_item}`}>
      {image && (
        <div
          className={`${styles[`${color}menu_item__image_wrapper`]} ${
            styles.menu_item__text
          }`}
        >
          {image}
        </div>
      )}
      {text && (
        <div
          className={`${styles[`${color}menu_item__text_wrapper`]} ${
            styles.menu_item__text
          }`}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default MenuItem;
