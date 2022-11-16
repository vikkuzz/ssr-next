import { useState, useEffect } from 'react';
import Link from 'next/link';

import MainContainer from '../components/MainContainer';

import styles from '../styles/App.module.scss';
import MainOrder from '../components/MainOrder';
import Howdelivery from '../components/HowDelivery';

const Order = () => {
    return (
        <MainContainer>
            <div className={`${styles.app_main}`}>
                <h1 className={`${styles.app_h1}`}>
                    Самые безопасные <br />
                    монеты FIFA 23 тут!
                </h1>
                <MainOrder />
                <Howdelivery />
            </div>
        </MainContainer>
    );
};

export default Order;
