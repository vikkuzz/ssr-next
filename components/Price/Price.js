import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../../styles/Price.module.scss';
import DropdownList from '../DropdownList/DropdownList';
import currency from '../../data-elements/currency';

const Price = () => {
    const stateCurrency = useSelector(
        (state) => state.royalfutReducer.currency
    );
    return (
        <div className={`${styles.price_wrapper}`}>
            <div className={`${styles.h_wrapper}`}>
                <h4 className={`${styles.h}`}>Price</h4>
                <h4 className={`${styles.h}`}>Currency</h4>
            </div>
            <div className={`${styles.value_wrapper}`}>
                <input className={`${styles.coins_input}`} type={'tel'}></input>
                <DropdownList title={stateCurrency.title} value={currency} />
            </div>
        </div>
    );
};

export default Price;
