import React, { useRef, useState } from 'react';
import styles from '../../styles/SpecialOffer.module.scss';

const Product = ({ title, img, h3, text }) => {
    return (
        <div className={`${styles.offer_container} ${styles.product}`}>
            <h2 className={`${title ? styles.offer_h : 'hide'}`}>
                {title && title}
            </h2>
            <div className={`${styles.offer_content}`}>
                <div className={`${styles.offer_timer}`}></div>
                <div className={`${styles.offer_cover}`}>
                    <img
                        className={`${img && styles.cover}`}
                        src={img}
                        alt="cover"
                    />
                </div>
                <div className={`${styles.offer_content_text}`}>
                    <h3 className={`${styles.offer_title}`}>{h3}</h3>
                    <span className={`${styles.offer_text}`}>{text}</span>
                </div>
            </div>
        </div>
    );
};

export default Product;
