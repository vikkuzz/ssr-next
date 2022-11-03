import React from 'react';

import styles from '../../styles/Payment.module.scss';
import PriceCoupon from '../PriceCoupon';

const Payment = () => {
    return (
        <div className={`${styles.payment}`}>
            <div className={`${styles.payment_method__group}`}>
                <div
                    className={`${styles.payment_method__delivery} ${styles.payment_method}`}
                >
                    <div
                        className={`${styles.payment_time_svg} ${styles.payment_svg}`}
                    ></div>
                    <span className={`${styles.payment_method_set_delivery}`}>
                        3-5h Delivery Time
                    </span>
                </div>
                <div
                    className={`${styles.payment_method__guarantee} ${styles.payment_method}`}
                >
                    <div
                        className={`${styles.payment_star_svg} ${styles.payment_svg}`}
                    ></div>
                    <span>3 Days Guarantee</span>
                </div>
                <div
                    className={`${styles.payment_method__secure} ${styles.payment_method}`}
                >
                    <div
                        className={`${styles.payment_lock_svg} ${styles.payment_svg}`}
                    ></div>
                    <span>100% secure payments</span>
                </div>
            </div>
            <div className={`${styles.payment_price_wrapper} from-375-to-1024`}><PriceCoupon/></div>
            
        </div>
    );
};

export default Payment;
