import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { reviews } from '../../data-elements/reviews';

import styles from '../../styles/Aside.module.scss';
import SvgRating from '../SvgRating';
let interval = null;

const Aside = () => {
    const stateStock = useSelector((state) => state.royalfutReducer.stock);

    const slideWrapper = useRef();
    const slider = useRef();
    const slide = useRef();
    const mask = useRef();
    let [rate, setRate] = useState([
        {
            color1: 100,
            color2: 0,
        },
        {
            color1: 100,
            color2: 0,
        },
        {
            color1: 100,
            color2: 0,
        },
        {
            color1: 100,
            color2: 0,
        },
        {
            color1: 50,
            color2: 50,
        },
    ]);
    //let [scroll, setScroll] = useState();
    let [loop, setLoop] = useState([...reviews]);
    let [children, setChildren] = useState(0);
    const [down, setDown] = useState(false);
    const [move, setMove] = useState(false);
    const [up, setUp] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            slideWrapper.current.style.height = `${
                slider.current.children[0].scrollHeight + 24
            }px`;
        }, 500);
    }, []);

    useEffect(() => {
        let result = [];
        let rateLength = stateStock.rate.split('.')[0];
        let rateLengthEmpty = (5 - stateStock.rate).toFixed(1);
        for (let i = 1; i <= rateLength; i++) {
            result.push({
                color1: 100,
                color2: 0,
            });
        }
        if (rateLength < 5) {
            result.push({
                color1: stateStock.rate.split('.')[1] * 10,
                color2: 0,
            });
        }
        if (rateLengthEmpty > 1) {
            let empty = rateLengthEmpty.split('.')[0];
            for (let i = 1; i <= empty; i++) {
                result.push({
                    color1: 0,
                    color2: 0,
                });
            }
        }

        setRate(result);
    }, [stateStock.rate]);

    useEffect(() => {
        console.log(slide.current.scrollLeft);
    }, [slideWrapper?.current?.scrollLeft]);

    useEffect(() => {
        console.log(slide.current, slide.current.scrollHeight);
        slideWrapper.current.style.height = `${slider.current.children[1].scrollHeight}px`;
        mask.current.style.display = 'none';
        interval = setInterval(() => {
            slider.current.style.transform = 'translateX(-420px)';

            setTimeout(() => {
                mask.current.style.left = `${slideWrapper.current.scrollLeft}px`;
                mask.current.style.display = 'flex';
                slider.current.style.transform = 'translateX(0px)';
                setLoop((prevState) => [
                    ...prevState.slice(1),
                    ...prevState.slice(0, 1),
                ]);
            }, 500);

            setChildren((prevState) => prevState + 1);
        }, 5000);
        return () => {
            clearInterval(interval);
        };
    }, [children]);

    useEffect(() => {
        console.log(loop);

        console.log(slider.current.children[0].scrollHeight);
    }, [loop]);
    let count = 0;

    const clickLeft = () => {
        slideWrapper.current.scrollLeft = slideWrapper.current.scrollLeft + 428;
        setChildren((prevState) => prevState + 1);
    };

    const clickRight = () => {
        setLoop((prevState) => [
            ...prevState.slice(loop.length - 1),
            ...prevState.slice(0, loop.length - 1),
        ]);
    };
    useEffect(() => {
        if (down == true && move == true) {
            clearInterval(interval);
            slideWrapper.current.style.height = `${slider.current.children[1].scrollHeight}px`;
            mask.current.style.display = 'none';
            slider.current.style.transform = 'translateX(-428px)';

            setTimeout(() => {
                mask.current.style.left = `${slideWrapper.current.scrollLeft}px`;
                mask.current.style.display = 'flex';
                slider.current.style.transform = 'translateX(0px)';
                setLoop((prevState) => [
                    ...prevState.slice(1),
                    ...prevState.slice(0, 1),
                ]);
            }, 500);
            setDown(false);
            setMove(false);
        }
        console.log('down:', down, 'move:', move);
    }, [down, move]);

    const isDown = () => {
        setDown(true);
    };
    const isMove = () => {
        if (!down) {
            setMove(false);
        }
        if (down) {
            setMove(true);
        }
    };
    const isUp = () => {
        setDown(false);
        setMove(false);
    };
    const isTouch = (e) => {
        console.log(e.touches[0].clientX);
    };

    return (
        <aside className={`${styles.aside}`}>
            <div className={`${styles.aside_wrapper}`}>
                <div className={`${styles.aside_header_wrapper}`}>
                    <div className={`${styles.aside_content}`}>
                        <div className={`${styles.aside_title}`}>
                            <img
                                className={`${styles.aside_logo}`}
                                src={'/img/trustpilot-logo.svg'}
                            ></img>
                        </div>
                        <div className={`${styles.aside_rate}`}>
                            {rate.map((el) => {
                                return (
                                    <SvgRating
                                        classStyle={`${styles.aside_rate_svg}`}
                                        key={(count += 1)}
                                        colorPercent1={el.color1}
                                        colorPercent2={el.color2}
                                        id={`grad${(count += 1)}`}
                                    />
                                );
                            })}
                        </div>
                        <div className={`${styles.aside_rate_text}`}>
                            TrustScore <b>{stateStock.rate}</b> |{' '}
                            <a
                                className={`${styles.aside_reviews}`}
                                href="https://uk.trustpilot.com/review/royalfut.com"
                            >
                                <b className={`${styles.aside_ab}`}>
                                    {stateStock.reviews} reviews
                                </b>
                            </a>
                        </div>
                    </div>
                </div>
                <div ref={slideWrapper} className={`${styles.aside_slider}`}>
                    <div
                        onMouseDown={isDown}
                        onMouseMove={isMove}
                        onMouseUp={isUp}
                        // onTouchStart={isTouch}
                        // onTouchMove={isTouch}
                        // onTouchEnd={isTouch}
                        ref={mask}
                        className={`${styles.mask}`}
                    >
                        {[loop[0]].map((el) => {
                            return (
                                <div
                                    key={99}
                                    className={`${styles.aside_slide} 
                                       
                                        `}
                                >
                                    <span
                                        className={`${styles.aside_slide_title}`}
                                    >
                                        {el.title}
                                    </span>
                                    <span
                                        className={`${styles.aside_slide_text}`}
                                    >
                                        {el.text}
                                    </span>
                                    <div
                                        className={`${styles.aside_slide_name}`}
                                    >
                                        <span className={`${styles.rated}`}>
                                            Rated 5{' '}
                                            <span className={`${styles.out5}`}>
                                                out 5
                                            </span>
                                        </span>

                                        {el.name}
                                        <div
                                            className={`${styles.aside_avatar}`}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div
                        ref={slider}
                        id={'slider'}
                        className={`${styles.aside_slide_wrapper}`}
                    >
                        {loop?.map((el, i) => {
                            return (
                                <div
                                    ref={i == 0 ? slide : null}
                                    key={(count += 1)}
                                    style={{ left: `${i * 428}px` }}
                                    className={`${styles.aside_slide} 
                                   
                                    `}
                                >
                                    <span
                                        className={`${styles.aside_slide_title}`}
                                    >
                                        {el.title}
                                    </span>
                                    <span
                                        className={`${styles.aside_slide_text}`}
                                    >
                                        {el.text}
                                    </span>
                                    <div
                                        className={`${styles.aside_slide_name}`}
                                    >
                                        <span className={`${styles.rated}`}>
                                            Rated 5{' '}
                                            <span className={`${styles.out5}`}>
                                                out 5
                                            </span>
                                        </span>

                                        {el.name}
                                        <div
                                            className={`${styles.aside_avatar}`}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={`${styles.aside_pagination}`}>
                    <div className={`${styles.aside_bull_wrapper}`}>
                        <button
                            className={`${styles.aside_bullet} `}
                            type={'button'}
                            onClick={() => {
                                clearInterval(interval);
                                slideWrapper.current.style.height = `${slider.current.children[2].scrollHeight}px`;
                                mask.current.style.display = 'none';
                                slider.current.style.transform =
                                    'translateX(-856px)';

                                setTimeout(() => {
                                    mask.current.style.left = `${slideWrapper.current.scrollLeft}px`;
                                    mask.current.style.display = 'flex';
                                    slider.current.style.transform =
                                        'translateX(0px)';
                                    setLoop((prevState) => [
                                        ...prevState.slice(2),
                                        ...prevState.slice(0, 2),
                                    ]);
                                }, 500);
                            }}
                        ></button>
                    </div>
                    <div className={`${styles.aside_bull_wrapper}`}>
                        <button
                            // onClick={() => {
                            //     clearInterval(interval);
                            //     mask.current.style.display = 'flex';
                            //     setLoop((prevState) => [
                            //         ...prevState.slice(0, 1),
                            //         ...prevState.slice(1),
                            //     ]);
                            //     slideWrapper.current.style.height = `${slider.current.children[17].scrollHeight}px`;
                            //     slider.current.style.transform =
                            //         'translateX(-7276px)';
                            //     setTimeout(() => {
                            //         mask.current.style.display = 'none';
                            //         slider.current.style.transform =
                            //             'translateX(428px)';
                            //     }, 500);

                            //     setTimeout(() => {
                            //         mask.current.style.left = `${slideWrapper.current.scrollLeft}px`;
                            //         mask.current.style.display = 'flex';
                            //         slider.current.style.transform =
                            //             'translateX(0px)';
                            //         setLoop((prevState) => [
                            //             ...prevState.slice(
                            //                 prevState.length - 1
                            //             ),
                            //             ...prevState.slice(
                            //                 0,
                            //                 prevState.length - 1
                            //             ),
                            //         ]);
                            //     }, 1000);
                            // }}
                            onClick={() => {
                                clearInterval(interval);
                                slideWrapper.current.style.height = `${slider.current.children[1].scrollHeight}px`;
                                mask.current.style.display = 'none';
                                slider.current.style.transform =
                                    'translateX(-428px)';

                                setTimeout(() => {
                                    mask.current.style.left = `${slideWrapper.current.scrollLeft}px`;
                                    mask.current.style.display = 'flex';
                                    slider.current.style.transform =
                                        'translateX(0px)';
                                    setLoop((prevState) => [
                                        ...prevState.slice(1),
                                        ...prevState.slice(0, 1),
                                    ]);
                                }, 500);
                            }}
                            className={`${styles.aside_bullet}`}
                            type={'button'}
                        ></button>
                    </div>
                    <div className={`${styles.aside_bull_wrapper}`}>
                        <button
                            className={`${styles.aside_bullet} ${styles.aside_bullet_active}`}
                            type={'button'}
                        ></button>
                    </div>
                    <div className={`${styles.aside_bull_wrapper}`}>
                        <button
                            onClick={() => {
                                clearInterval(interval);
                                slideWrapper.current.style.height = `${slider.current.children[1].scrollHeight}px`;
                                mask.current.style.display = 'none';
                                slider.current.style.transform =
                                    'translateX(-428px)';

                                setTimeout(() => {
                                    mask.current.style.left = `${slideWrapper.current.scrollLeft}px`;
                                    mask.current.style.display = 'flex';
                                    slider.current.style.transform =
                                        'translateX(0px)';
                                    setLoop((prevState) => [
                                        ...prevState.slice(1),
                                        ...prevState.slice(0, 1),
                                    ]);
                                }, 500);
                            }}
                            className={`${styles.aside_bullet} `}
                            type={'button'}
                        ></button>
                    </div>
                    <div className={`${styles.aside_bull_wrapper}`}>
                        <button
                            onClick={() => {
                                clearInterval(interval);
                                slideWrapper.current.style.height = `${slider.current.children[2].scrollHeight}px`;
                                mask.current.style.display = 'none';
                                slider.current.style.transform =
                                    'translateX(-856px)';

                                setTimeout(() => {
                                    mask.current.style.left = `${slideWrapper.current.scrollLeft}px`;
                                    mask.current.style.display = 'flex';
                                    slider.current.style.transform =
                                        'translateX(0px)';
                                    setLoop((prevState) => [
                                        ...prevState.slice(2),
                                        ...prevState.slice(0, 2),
                                    ]);
                                }, 500);
                            }}
                            className={`${styles.aside_bullet} `}
                            type={'button'}
                        ></button>
                    </div>
                </div>
            </div>
            <div className={`${styles.aside_protect}`}>
                <a href="https://transparencyreport.google.com/safe-browsing/search?url=https:%2F%2Fwww.royalfut.com">
                    <img
                        className={`${styles.aside_protect_img}`}
                        alt="google safe"
                        src="/img/google-safe.png"
                    ></img>
                </a>
            </div>
        </aside>
    );
};

export default Aside;
