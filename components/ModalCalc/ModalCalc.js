import React from 'react';

import styles from '../../styles/ModalCalc.module.scss';
import CalcCoinsRedesign from '../CalcCoinsRedesign/CalcCoinsRedesign';
import MethodChanger from '../MethodChanger';
import Price from '../Price/Price';

const ModalCalc = () => {
    return (
        <div className={`${styles.modal_calc}`}>
            <h3 className={`${styles.h}`}>
                Buy FIFA 23 coins for PlayStation and Xbox
            </h3>
            <MethodChanger />
            <div className={`${styles.calc_coins_wrapper}`}>
                <CalcCoinsRedesign />
            </div>
            <Price />
        </div>
    );
};

export default ModalCalc;
