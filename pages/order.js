import { useState, useEffect } from 'react';
import Link from 'next/link';

import MainContainer from '../components/MainContainer';

import styles from '../styles/App.module.scss';
import MainOrder from '../components/MainOrder';
import Howdelivery from '../components/HowDelivery';
import TextBlockContainer from '../components/TextBlockContainer';
import { useRouter } from 'next/router';
import { translates } from '../locales/locales';
import Aside from '../components/Aside';

const Order = () => {
    const router = useRouter();

    return (
        <MainContainer>
            <div className={`${styles.app_main}`}>
                <h1 className={`${styles.app_h1}`}>
                    {translates[router.locale].h1_1} <br />
                    {translates[router.locale].h1_2}
                </h1>
                <MainOrder />
                <Howdelivery />
                <TextBlockContainer />
            </div>
            <Aside />
        </MainContainer>
    );
};

export default Order;
