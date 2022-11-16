import React, { useEffect, useRef, useState } from 'react';

import styles from '../../styles/Howdelivery.module.scss';

const YTPlayer = require('yt-player');

let deliveryData = {
    easy: {
        1: {
            title: 'FILL THE REQUIRED DETAILS',
            text: "After successful payment of the order you'll be taken to page with two fields: e-mail and password. Please, fulfill these fields with your EA account details.",
        },
        2: {
            title: 'FILL THE BACKUP CODE FIELD',
            text: 'To start the delivery process fill the corresponding fields with your backup codes, that can be found here: https://myaccount.ea.com/cp-ui/security/index. We only need one unused code, to start delivering your order.',
        },
        3: {
            title: 'WAIT FOR THE COMPLETION OF YOUR ORDER',
            text: 'Do not enter the game during the delivery. When the process is complete you will be notified by email. Contact the support manager to check the time of the execution of your order.',
        },
        4: {
            title: 'ENJOY YOUR GAME!',
            text: 'When the order is complete please leave your feedback. Have a great game and we look forward to seeing you again:)',
        },
    },
    manual: {
        1: {
            title: 'BUY A PLAYER',
            text: "After your order is successfully paid you will be redirected to the page where we will ask you to specify your club's balance, then depending on that you will be offered a player to purchase. You will have to buy him for no more than the set price. And after that sell it to us for the price we offer.",
        },
        2: {
            title: 'CONFIRM A PLAYER',
            text: 'Then you confirm that the player is set to the auction and we ask you which of the player is yours. To understand which of the players is your, you can compare the time until the end of the auction.',
        },
        3: {
            title: 'REPEAT UNTIL THE TRANSFER IS COMPLETE',
            text: 'First part of the transfer is over and now you have to repeat the previous steps as many times as necessary until your order is complete.',
        },
        4: {
            title: 'ENJOY YOUR GAME!',
            text: 'When the order is complete please leave your feedback. Have a great game and we look forward to seeing you again:)',
        },
    },
};
let player = null;
const Howdelivery = () => {
    const easy = useRef(null);
    const manual = useRef(null);
    let [howDelivery, setHowDelivery] = useState({ easy: true, manual: false });
    let [step, setStep] = useState(1);

    useEffect(() => {
        function onYouTubeIframeAPIReady() {
            if (typeof YT != 'undefined' && YT.Player) {
                player = new YT.Player('player', {
                    videoId: 'tYVjCOjLlZQ',
                    playerVars: {
                        playsinline: 1,
                        autoplay: 1,
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
            <div className={`${styles.how_title}`}>HOW DOES DELIVERY WORK?</div>
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
                            comfort trade
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
                            player auction
                        </button>
                    </div>
                </div>
                <div className={`${styles.how_container_text}`}>
                    <h2 className={`${styles.how_subtitle}`}>
                        {
                            deliveryData[howDelivery.easy ? 'easy' : 'manual'][
                                step
                            ].title
                        }
                    </h2>
                    <div className={`${styles.how_step_text}`}>
                        {
                            deliveryData[howDelivery.easy ? 'easy' : 'manual'][
                                step
                            ].text
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
                                src="/img/arrow-left.svg"
                            ></img>
                        </button>
                        {step + '/' + 4}
                        <button
                            className={`${styles.how_step_btn}`}
                            id="+"
                            type="button"
                            onClick={onHandleChangeStep}
                        >
                            <img
                                id="+"
                                className={`${styles.how_step_img}`}
                                alt="front"
                                src="/img/arrow-right-white.svg"
                            ></img>
                        </button>
                    </div>
                </div>
                <div
                    id="player"
                    ref={easy}
                    className={`${styles.how_yt_wrapper}`}
                    autoPlay={1}
                ></div>
            </div>
        </div>
    );
};

export default Howdelivery;
