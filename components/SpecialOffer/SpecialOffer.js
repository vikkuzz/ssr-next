import React, { useRef, useState } from 'react';
import Countdown from 'react-countdown';
import styles from '../../styles/SpecialOffer.module.scss';

const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
        // Render a complete state
        return 'Offer off';
    } else {
        // Render a countdown
        return (
            <span className={`${styles.countdown}`}>
                <span className={`${styles.countdown_days}`}>{days}d</span>
                <span className={`${styles.countdown_timer}`}>
                    {String(hours).split('').length > 1 ? hours : '0' + hours}:
                    {String(minutes).split('').length > 1
                        ? minutes
                        : '0' + minutes}
                    :
                    {String(seconds).split('').length > 1
                        ? seconds
                        : '0' + seconds}
                </span>
            </span>
        );
    }
};

const SpecialOffer = () => {
    const promocode = useRef();
    const offer_img = '/img/cover_desc_offer.png';

    let [copyText, setCopyText] = useState(false);

    const copy = () => {
        let copyText = promocode.current;
        copyText.select();
        document.execCommand('copy');
        setCopyText(true);
    };
    return (
        <div className={`${styles.offer_container}`}>
            <h2 className={`${styles.offer_h}`}>
                Don't miss our special offer
            </h2>
            <div className={`${styles.offer_content}`}>
                <div className={`${styles.offer_timer}`}>
                    <img
                        className={`${styles.timer_icon}`}
                        src={'/img/Subtract.svg'}
                    />
                    <Countdown
                        date={Date.now() + 518400000}
                        renderer={renderer}
                    />
                </div>
                <div className={`${styles.offer_cover}`}>
                    <img src={offer_img} alt="cover" />
                </div>
                <div className={`${styles.offer_content_text}`}>
                    <h3 className={`${styles.offer_title}`}>
                        Christmas sale -10%
                    </h3>
                    <span className={`${styles.offer_text}`}>
                        Use this promocode to get discount when you will buy
                        coins
                    </span>
                    <div className={styles.wrapper_btns}>
                        <button
                            type="button"
                            className={`${styles.goto}` + ' violet_btn'}
                        >
                            go to shopping
                        </button>
                        <button
                            type="button"
                            className={`${styles.buy_btn} ${styles.calc_btn} ${
                                copyText && styles.green
                            }`}
                            onClick={copy}
                        >
                            <input
                                ref={promocode}
                                value={'XMAS'}
                                readOnly
                                className={`${styles.promocode_text}`}
                            ></input>
                            <img
                                src={`${
                                    !copyText
                                        ? `/img/content_copy.svg`
                                        : `/img/done_green.svg`
                                }`}
                                className={`${styles.copy_icon}`}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpecialOffer;
