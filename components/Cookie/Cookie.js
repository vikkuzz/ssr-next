import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import styles from '../../styles/Cookie.module.scss';

const Cookie = () => {
    const cookie = useRef();
    const stateUser = useSelector((state) => state.royalfutReducer.user);
    useEffect(() => {
        if (stateUser.token) {
            cookie.current.style.display = 'none';
        }
    }, [stateUser]);
    return (
        <div className={styles.cookie} ref={cookie}>
            <picture className={`${styles.img_wrapper}`}>
                <img className={`${styles.img}`} src="/img/cookie.svg" />
            </picture>
            <div className={`${styles.cookie_text_wrapper}`}>
                <span className={`${styles.cookie_text_title}`}>
                    We are using cookie
                </span>
                <span className={`${styles.cookie_text}`}>
                    To give your consent to comply with our cookie usage terms,
                    simply continue your browsing.
                </span>
            </div>
            <button
                className={`${styles.cookie_close}`}
                onClick={() => (cookie.current.style.display = 'none')}
            >
                <img
                    className={`${styles.cookie_close_img}`}
                    src="/img/cross_white.svg"
                />
            </button>
        </div>
    );
};

export default Cookie;
