import React from 'react';

import styles from '../../styles/MainCover.module.scss';

const MainCover = () => {
    const footballer = '/img/footballer_cover.png';
    return (
        <div className={`${styles.maincover_container}`}>
            <img
                src={footballer}
                alt="cover"
                className={`${styles.cover_img}`}
            />
        </div>
    );
};

export default MainCover;
