import React from 'react';
import styles from '../../styles/H1.module.scss';

const H1 = () => {
    return (
        <div className={`${styles.h1_container}`}>
            <h1 className={`${styles.h1}`}>
                <span className={`${styles.h1_white_text}`}>
                    Safest option to
                </span>
                buy FIFA 23 coins
            </h1>
            <span className={`${styles.under_h1}`}>
                Our system is fully automated,so we deliver coins at any time of
                day, 24/7
            </span>
        </div>
    );
};

export default H1;
