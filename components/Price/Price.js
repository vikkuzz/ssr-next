import React from 'react';
import styles from '../../styles/Price.module.scss';

const Price = () => {
    return (
        <div className={`${styles.price_wrapper}`}>
            <div className={`${styles.h_wrapper}`}>
                <h4 className={`${styles.h}`}>Price</h4>
                <h4 className={`${styles.h}`}>Currency</h4>
            </div>
            <div className={`${styles.value_wrapper}`}>
                <input className={`${styles.coins_input}`} type={'tel'}></input>
            </div>
        </div>
    );
};

export default Price;
