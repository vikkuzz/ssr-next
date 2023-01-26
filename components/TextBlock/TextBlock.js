import React from 'react';

import styles from '../../styles/TextBlock.module.scss';

const TextBlock = ({ img, title, text }) => {
    let currTitle = title.toLowerCase().split('');
    currTitle[0] = currTitle[0].toUpperCase();
    let resultTitle = currTitle.join('');
    return (
        <div className={`${styles.textblock}`}>
            {/* <img className={`${styles.textblock_decor}`} src={img}></img> */}

            <h3 className={`${styles.textblock_title}`}>
                <img className={`${styles.textblock_decor}`} src={img}></img>
                {resultTitle}
            </h3>
            <p className={`${styles.textblock_text}`}>{text}</p>
        </div>
    );
};

export default TextBlock;
