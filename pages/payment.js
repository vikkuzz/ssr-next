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
import { seoTags } from '../data-elements/seoTags';
import PaymentContent from '../components/PaymentContent';

const Payment = () => {
    const router = useRouter();
    const seo = seoTags[router.locale];
    return (
        <MainContainer
            title={seo.payment.title}
            description={seo.payment.description}
        >
            <div className={`${styles.app_main}`}>
                <h1 className={`${styles.app_h1} ${styles.app_payment_h}`}>
                    {translates[router.locale].pagePaymentMethodName}
                </h1>
                <PaymentContent />
            </div>
        </MainContainer>
    );
};

export default Payment;
