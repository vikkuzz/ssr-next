import { Router, useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { translates } from '../../locales/locales';

import styles from '../../styles/Howdelivery.module.scss';

const YTPlayer = require('yt-player');

let player = null;
const Howdelivery = () => {
    const easy = useRef(null);
    const manual = useRef(null);
    let [howDelivery, setHowDelivery] = useState({ easy: true, manual: false });
    let [step, setStep] = useState(1);

    const router = useRouter();

    const a = () => {
        return (
            <div>
                <span>{translates[router.locale].pageCoinsToStart} </span>
                <a
                    href="https://myaccount.ea.com/cp-ui/security/index"
                    target="_blank"
                >
                    {' '}
                    myaccount.ea.com.{' '}
                </a>
                <span>{translates[router.locale].unused}</span>
            </div>
        );
    };

    let deliveryData = {
        easy: {
            1: {
                title: translates[router.locale].pageCoinsFill,
                text: translates[router.locale].pageCoinsAfter,
            },
            2: {
                title: translates[router.locale].pageCoinsFillBackup,
                text: (
                    <div className={`${styles.txt_block}`}>
                        <span className={`${styles.span}`}>
                            {translates[router.locale].pageCoinsToStart}{' '}
                        </span>
                        <a
                            className={`${styles.ahref}`}
                            href="https://myaccount.ea.com/cp-ui/security/index"
                            target="_blank"
                        >
                            {' '}
                            myaccount.ea.com.{' '}
                        </a>
                        <span className={`${styles.span}`}>
                            {translates[router.locale].unused}
                        </span>
                    </div>
                ),
            },
            3: {
                title: translates[router.locale].pageCoinsWaitCompletion,
                text: translates[router.locale].pageCoinsDoNotEnter,
            },
            4: {
                title: translates[router.locale].pageCoinsEnjoy,
                text: (
                    <div className={`${styles.txt_block}`}>
                        <span className={`${styles.span}`}>
                            {translates[router.locale].pageCoinsFeedback}{' '}
                        </span>
                        <a
                            className={`${styles.ahref}`}
                            href="https://trustpilot.com/evaluate/royalfut.com"
                            target="_blank"
                        >
                            {translates[router.locale].trustcom}
                        </a>
                        <span className={`${styles.span}`}>
                            {translates[router.locale].enjoy}
                        </span>
                    </div>
                ),
            },
        },
        manual: {
            1: {
                title: translates[router.locale].pageCoinsBuyPlayer,
                text: translates[router.locale].pageCoinsAfterSuccessfully,
            },
            2: {
                title: translates[router.locale].pageCoinsConfirmPlayer,
                text: translates[router.locale].pageCoinsThenConfirm,
            },
            3: {
                title: translates[router.locale].pageCoinsRepeatUntil,
                text: translates[router.locale].pageCoinsFirstPart,
            },
            4: {
                title: translates[router.locale].pageCoinsEnjoy,
                text: (
                    <div className={`${styles.txt_block}`}>
                        <span className={`${styles.span}`}>
                            {translates[router.locale].pageCoinsFeedback}{' '}
                        </span>
                        <a
                            className={`${styles.ahref}`}
                            href="https://trustpilot.com/evaluate/royalfut.com"
                            target="_blank"
                        >
                            {translates[router.locale].trustcom}
                        </a>
                        <span className={`${styles.span}`}>
                            {translates[router.locale].enjoy}
                        </span>
                    </div>
                ),
            },
        },
    };

    useEffect(() => {
        function onYouTubeIframeAPIReady() {
            if (typeof YT != 'undefined' && YT.Player) {
                player = new YT.Player('player', {
                    videoId: 'tYVjCOjLlZQ',
                    playerVars: {
                        playsinline: 1,
                        //autoplay: 1,
                    },
                });
            }
        }
        if (typeof YT != 'undefined' && YT.Player) {
            onYouTubeIframeAPIReady();
        } else {
            let interval = setInterval(() => {
                if (typeof YT != 'undefined' && YT.Player) {
                    clearInterval(interval);
                }
                onYouTubeIframeAPIReady();
            }, 300);
        }
    }, []);

    useEffect(() => {
        if (howDelivery.manual && player?.seekTo) {
            if (step == 1) {
                player.seekTo(0, true);
            } else if (step == 2) {
                player.seekTo(57, true);
            } else if (step == 3) {
                player.seekTo(105, true);
            } else if (step == 4) {
                player.seekTo(114, true);
            }
        } else if (howDelivery.easy && player?.seekTo) {
            if (step == 1) {
                player.seekTo(0, true);
            } else if (step == 2) {
                player.seekTo(19, true);
            } else if (step == 3) {
                player.seekTo(39, true);
            } else if (step == 4) {
                player.seekTo(42, true);
            }
        }
    }, [step]);

    useEffect(() => {
        setStep(1);
        if (player?.loadVideoById) {
            if (howDelivery.manual) {
                player.loadVideoById('5IxIFgx_src');
            } else if (howDelivery.easy) {
                player.loadVideoById('tYVjCOjLlZQ');
            }
        }
    }, [howDelivery]);

    const onHandleClickTab = (e) => {
        if (e.target.id === 'easy') {
            setHowDelivery({ easy: true, manual: false });
        } else {
            setHowDelivery({ easy: false, manual: true });
        }
    };
    const onHandleChangeStep = (e) => {
        let currStep = e.target.id == '-' ? step - 1 : step + 1;
        if (currStep === 5) {
            currStep = 1;
        }
        if (currStep === 0) {
            currStep = 4;
        }

        setStep(currStep);
    };
    return (
        <div id="deliveryMain" className={`${styles.how_container}`}>
            <div className={`${styles.how_title}`}>
                {translates[router.locale].hwd}
            </div>
            <div className={`${styles.wrapper}`}>
                <div
                    id="player"
                    ref={easy}
                    className={`${styles.how_yt_wrapper}`}
                    autoPlay={1}
                ></div>
                <div className={`${styles.how_container_content}`}>
                    <div className={`${styles.how_tabs_wrapper}`}>
                        <div className={`${styles.how_btn_wrapper}`}>
                            <button
                                onClick={onHandleClickTab}
                                id={'easy'}
                                type="button"
                                className={`${styles.how_tab} ${
                                    howDelivery.easy && styles.how_is_active
                                }`}
                            >
                                {translates[router.locale].comfortMethodName}
                            </button>
                        </div>
                        <div className={`${styles.how_btn_wrapper}`}>
                            <button
                                onClick={onHandleClickTab}
                                id={'manual'}
                                type="button"
                                className={`${styles.how_tab} ${
                                    !howDelivery.easy && styles.how_is_active
                                }`}
                            >
                                {translates[router.locale].marketMethodName}
                            </button>
                        </div>
                    </div>
                    <div className={`${styles.how_container_text}`}>
                        <h2 className={`${styles.how_subtitle}`}>
                            {
                                deliveryData[
                                    howDelivery.easy ? 'easy' : 'manual'
                                ][step].title
                            }
                        </h2>
                        <div className={`${styles.how_step_text}`}>
                            {
                                deliveryData[
                                    howDelivery.easy ? 'easy' : 'manual'
                                ][step].text
                            }
                        </div>
                        <div className={`${styles.how_btns_wrapper}`}>
                            <button
                                className={`${styles.how_step_btn}`}
                                id="-"
                                type="button"
                                onClick={onHandleChangeStep}
                            >
                                <img
                                    id="-"
                                    className={`${styles.how_step_img}`}
                                    alt="back"
                                    src="/img/arrow_circle_right.svg"
                                ></img>
                            </button>
                            <span
                                className={`${styles.how_step_num} ${styles.how_text}`}
                            >
                                {step}
                            </span>
                            <span
                                className={`${styles.how_step_slash} ${styles.how_text}`}
                            >
                                /
                            </span>
                            <span
                                className={`${styles.how_after_slash} ${styles.how_text}`}
                            >
                                4
                            </span>
                            <button
                                className={`${styles.how_step_btn}`}
                                id="+"
                                type="button"
                                onClick={onHandleChangeStep}
                            >
                                <img
                                    id="+"
                                    className={`${styles.how_step_img} ${styles.how_step_img_transform}`}
                                    alt="front"
                                    src="/img/arrow_circle_right.svg"
                                ></img>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Howdelivery;
