import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { translates } from '../../locales/locales';

import styles from '../../styles/Delivery.module.scss';
import ButtonToOrder from '../ButtonToOrder';

const DeliveryContent = () => {
    const router = useRouter();
    const t = translates[router.locale];
    return (
        <div className={`${styles.delivery_content_wrapper}`}>
            <p>
                <Link href="/">
                    <a className={`${styles.delivery_link}`}>ROYALFUT.COM</a>
                </Link>{' '}
                {t.deliverytext}
            </p>
            <ul>
                <li>{t.li1}</li>
                <li>{t.li2}</li>
                <li>{t.li3}</li>
            </ul>
            <p>{t.p1}</p>
            <p>{t.p2}</p>

            <ButtonToOrder />
        </div>
    );
};

export default DeliveryContent;
