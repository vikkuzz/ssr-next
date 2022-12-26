import Link from 'next/link';
import React from 'react';

import styles from '../../styles/NotFound.module.scss';

const NotFound = () => {
    return (
        <div className={`${styles.not_found_container}`}>
            <div className={`${styles.not_found__coins} from-1025-to-1900`}>
                <picture>
                    <source
                        srcSet="/img/404/404-coins.webp 1x, /img/404/404-coins@2x.webp 2x"
                        media="(min-width: 1024px)"
                        type="image/webp"
                    />
                    <source
                        srcSet="/img/404/404-coins.png 1x, /img/404/404-coins@2x.png 2x"
                        media="(min-width: 1024px)"
                        type="image/png"
                    />
                    <img className={`${styles.coins_img}`} decoding="async" />
                </picture>
            </div>
            <div className={`${styles.not_found__group}`}>
                <h1 className={`${styles.not_found__title}`}>404</h1>
                <div className={`${styles.not_found__text}`}>
                    Sorry, the page you’re
                    <br></br>
                    looking for doesn't exist
                </div>
                <div className={`${styles.not_found__coins} from-375-to-1024`}>
                    <picture>
                        <source
                            srcSet="/img/404/404-coins-mobile.webp 1x, /img/404/404-coins-mobile@2x.webp 2x"
                            media="(max-width: 1025px)"
                            type="image/webp"
                        />
                        <source
                            srcSet="/img/404/404-coins-mobile.png 1x, /img/404/404-coins-mobile@2x.png 2x"
                            media="(max-width: 1025px)"
                            type="image/png"
                        />
                        <img decoding="async" />
                    </picture>
                </div>
                <Link href="/">
                    <a className={`${styles.not_found__btn}`}>BACK TO HOME</a>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
