import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { translates } from '../../locales/locales';

import styles from '../../styles/PaymentContent.module.scss';
import ButtonToOrder from '../ButtonToOrder';

const PaymentContent = () => {
    const router = useRouter();
    const t = translates[router.locale];
    return (
        <div className={`${styles.payment_container}`}>
            <p>
                <Link href="/" target="_blank">
                    <a className={`${styles.payment_link}`}>ROYALFUT.COM</a>
                </Link>
                {t.payment_p1}
            </p>
            <p>
                {t.payment_p2_1}
                <Link href="https://payver.eu/" target={'_blank'}>
                    <a className={`${styles.payment_link}`}>payver</a>
                </Link>
                {t.payment_p2_2}
                <Link href="https://paypal.com/" target={'_blank'}>
                    <a className={`${styles.payment_link}`}>paypal</a>
                </Link>
                {t.payment_p2_3}
            </p>
            <p>{t.p3}</p>
            <p>{t.p4}</p>
            <ButtonToOrder />
        </div>
    );
};

export default PaymentContent;
