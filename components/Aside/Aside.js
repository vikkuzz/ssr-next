import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { reviews } from '../../data-elements/reviews';
import { translates } from '../../locales/locales';

import styles from '../../styles/Aside.module.scss';
import SvgRating from '../SvgRating';
let interval = null;

const Aside = () => {
    const stateStock = useSelector((state) => state.royalfutReducer.stock);
    const stateDir = useSelector((state) => state.royalfutReducer.direction);

    const router = useRouter();

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
    let [loop, setLoop] = useState([...reviews]);
    let [children, setChildren] = useState(0);
    const [down, setDown] = useState(false);
    const [move, setMove] = useState(false);
    const [up, setUp] = useState(false);
    const [downX, setDownX] = useState(null);
    const [moveX, setMoveX] = useState(null);

    const [touchStart, setTouchStart] = React.useState(0);
    const [touchEnd, setTouchEnd] = React.useState(0);

    function handleTouchStart(e) {
        console.log(e.targetTouches[0].clientX);
        setTouchStart(e.targetTouches[0].clientX);
    }

    function handleTouchMove(e) {
        console.log(e.targetTouches[0].clientX);
        setTouchEnd(e.targetTouches[0].clientX);
    }

    function handleTouchEnd() {
        console.log(touchStart, touchEnd);
        if (touchStart - touchEnd > 100) {
            setChildren((prev) => prev + 1);
            if (children <= 1) {
                slider.current.style.transition = 'all 0s linear';
                setChildren(16);
                setTimeout(
                    () => (slider.current.style.transition = 'all 0.5s linear'),
                    200
                );
                setTimeout(
                    () => setChildren((prevState) => prevState + 1),
                    200
                );
            }
        }

        if (touchStart - touchEnd < -100) {
            setChildren((prev) => prev - 1);
            if (children >= 16) {
                slider.current.style.transition = 'all 0s linear';
                setChildren(0);
                setTimeout(
                    () => (slider.current.style.transition = 'all 0.5s linear'),
                    200
                );
                setTimeout(
                    () => setChildren((prevState) => prevState - 1),
                    200
                );
            }
        }
    }

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
        slideWrapper.current.style.height = `${slider.current.children[children].scrollHeight}px`;
        slider.current.style.transform = `translateX(-${
            slider.current.children[1].scrollWidth * children
        }px)`;

        if (children === 0) {
            setTimeout(() => {
                slider.current.style.transition = 'all 0.5s linear';
                slider.current.style.transform = `translateX(-${
                    slider.current.children[1].scrollWidth * children
                }px)`;
            }, 500);
        }

        if (children === 17) {
            slider.current.style.transition = 'all 0s linear';
            setChildren(0);
        }

        console.log(slider);
        interval = setInterval(() => {
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
        }
        console.log('down:', down, 'move:', move);
    }, [down, move]);

    const isDown = (e) => {
        setDown(true);
        setDownX(e.clientX);
        console.log(downX);
    };
    const isMove = (e) => {
        if (!down) {
            setMove(false);
        }
        if (down) {
            setMove(true);
            console.log(e.clientX);
            setMoveX(e.clientX);
        }
    };
    const isUp = (e) => {
        setDown(false);
        setMove(false);
        console.log(downX, moveX);
        if (downX > moveX) {
            if (downX - moveX > 100) {
                setChildren((prev) => prev + 1);
                if (children <= 1) {
                    slider.current.style.transition = 'all 0s linear';
                    setChildren(16);
                    setTimeout(
                        () =>
                            (slider.current.style.transition =
                                'all 0.5s linear'),
                        200
                    );
                    setTimeout(
                        () => setChildren((prevState) => prevState + 1),
                        200
                    );
                }
            }
        } else if (downX < moveX) {
            if (moveX - downX > 100) {
                setChildren((prev) => prev - 1);
                if (children >= 16) {
                    slider.current.style.transition = 'all 0s linear';
                    setChildren(0);
                    setTimeout(
                        () =>
                            (slider.current.style.transition =
                                'all 0.5s linear'),
                        200
                    );
                    setTimeout(
                        () => setChildren((prevState) => prevState - 1),
                        200
                    );
                }
            }
        }
        console.log('up');
    };
    const isTouch = (e) => {
        console.log(e.touches[0].clientX);
    };

    return (
        <aside dir={stateDir} className={`${styles.aside}`}>
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
                                href={translates[router.locale].commentUrl}
                            >
                                <b className={`${styles.aside_ab}`}>
                                    {stateStock.reviews} reviews
                                </b>
                            </a>
                        </div>
                    </div>
                </div>
                <div ref={slideWrapper} className={`${styles.aside_slider}`}>
                    {/* <div
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
                    </div> */}
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
                                    style={{
                                        left: `${
                                            i *
                                            slider?.current?.children[children]
                                                .scrollWidth
                                        }px`,
                                    }}
                                    className={`${styles.aside_slide}`}
                                    onMouseDown={isDown}
                                    onMouseMove={isMove}
                                    onMouseUp={isUp}
                                    onTouchStart={(e) => {
                                        console.log('starts move');
                                        handleTouchStart(e);
                                    }}
                                    onTouchMove={(e) => handleTouchMove(e)}
                                    onTouchEnd={(e) => handleTouchEnd(e)}
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
                                setChildren((prevState) => prevState - 2);
                                if (children <= 1) {
                                    slider.current.style.transition =
                                        'all 0s linear';
                                    setChildren(16);
                                    setTimeout(
                                        () =>
                                            (slider.current.style.transition =
                                                'all 0.5s linear'),
                                        200
                                    );
                                    setTimeout(
                                        () =>
                                            setChildren(
                                                (prevState) => prevState - 2
                                            ),
                                        200
                                    );
                                }
                            }}
                        ></button>
                    </div>
                    <div className={`${styles.aside_bull_wrapper}`}>
                        <button
                            onClick={() => {
                                clearInterval(interval);
                                setChildren((prevState) => prevState - 1);
                                if (children <= 1) {
                                    slider.current.style.transition =
                                        'all 0s linear';
                                    setChildren(16);
                                    setTimeout(
                                        () =>
                                            (slider.current.style.transition =
                                                'all 0.5s linear'),
                                        200
                                    );
                                    setTimeout(
                                        () =>
                                            setChildren(
                                                (prevState) => prevState - 1
                                            ),
                                        200
                                    );
                                }
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
                                setChildren((prevState) => prevState + 1);
                                if (children >= 15) {
                                    slider.current.style.transition =
                                        'all 0s linear';
                                    setChildren(0);
                                    setTimeout(
                                        () =>
                                            (slider.current.style.transition =
                                                'all 0.5s linear'),
                                        200
                                    );
                                    setTimeout(
                                        () =>
                                            setChildren(
                                                (prevState) => prevState + 1
                                            ),
                                        200
                                    );
                                }
                            }}
                            className={`${styles.aside_bullet} `}
                            type={'button'}
                        ></button>
                    </div>
                    <div className={`${styles.aside_bull_wrapper}`}>
                        <button
                            onClick={() => {
                                clearInterval(interval);
                                setChildren((prevState) => prevState + 2);
                                if (children >= 15) {
                                    slider.current.style.transition =
                                        'all 0s linear';
                                    setChildren(0);
                                    setTimeout(
                                        () =>
                                            (slider.current.style.transition =
                                                'all 0.5s linear'),
                                        200
                                    );
                                    setTimeout(
                                        () =>
                                            setChildren(
                                                (prevState) => prevState + 2
                                            ),
                                        200
                                    );
                                }
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
                        src="/img/google-safe.svg"
                    ></img>
                </a>
            </div>
        </aside>
    );
};

export default Aside;
