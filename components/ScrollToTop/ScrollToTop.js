import React from 'react';

import styles from '../../styles/ScrollToTop.module.scss';

const ScrollToTop = () => {
    return (
        <button
            onClick={() => window.scrollTo(0, 0)}
            className={`${styles.scrolltop}`}
        >
            <img
                className={`${styles.scrolltop_arrow}`}
                src="/img/whitearrow.svg"
            />
        </button>
    );
};

export default ScrollToTop;
