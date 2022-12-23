import React from 'react';
import styles from '../../styles/SpecialOffer.module.scss';

const SpecialOffer = () => {
    const offer_img = '/img/offer.png';
    return (
        <div className={`${styles.offer_container}`}>
            <h2 className={`${styles.offer_h}`}>
                Don't miss our special offer
            </h2>
            <div className={`${styles.offer_content}`}>
                <div className={`${styles.offer_timer}`}></div>
                <div className={`${styles.offer_cover}`}>
                    <img src={offer_img} alt="cover" />
                </div>
                <div className={`${styles.offer_content_text}`}>
                    <h3 className={`${styles.offer_title}`}>
                        Christmas sale -10%
                    </h3>
                    <span className={`${styles.offer_text}`}>
                        Use this promocode to get discount when you will buy
                        coins
                    </span>
                    <button
                        type="button"
                        className={`${styles.goto}` + ' violet_btn'}
                    >
                        go to shopping
                    </button>
                    <button
                        type="button"
                        className={`${styles.buy_btn} ${styles.calc_btn}`}
                    >
                        <span className={`${styles.promocode_text}`}>XMAS</span>
                        <img
                            src="/img/content_copy.svg"
                            className={`${styles.copy_icon}`}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SpecialOffer;
