import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { reviews } from '../../data-elements/reviews';

import styles from '../../styles/Aside.module.scss';
import SvgRating from '../SvgRating';

const Aside = () => {
    const stateStock = useSelector((state) => state.royalfutReducer.stock);

    const slideWrapper = useRef();
    const slider = useRef();
    const slide = useRef();
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
    let [scroll, setScroll] = useState();
    let [loop, setLoop] = useState([...reviews]);
    //let [loop, setLoop] = useState([...reviews]);

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
                //color2: 100 - stateStock.rate.split('.')[1] * 10,
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
        slideWrapper.current.style.height = `${
            slide.current.scrollHeight + 24
        }px`;
    }, [slide?.current?.scrollHeight]);

    useEffect(() => {
        console.log(loop);
    }, [loop]);
    let count = 0;

    const clickLeft = () => {
        //slideWrapper.current.scrollLeft = slideWrapper.current.scrollLeft + 428;
        setTimeout(() => {
            //slideWrapper.current.scrollLeft = 0;
            setLoop((prevState) => [
                ...prevState.slice(1),
                ...prevState.slice(0, 1),
            ]);
        }, 0);

        //slideWrapper.current.style.maxHeight = 'auto';
    };
    const clickRight = () => {
        let currLoop = loop;
        setLoop((prevState) => [
            ...prevState.slice(loop.length - 1),
            ...prevState.slice(0, loop.length - 1),
        ]);
        //slideWrapper.current.style.maxHeight = 'auto';
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
                            TrustScore {stateStock.rate} |{' '}
                            <a className={`${styles.aside_reviews}`}>
                                {stateStock.reviews} reviews
                            </a>
                        </div>
                    </div>
                </div>
                <div
                    ref={slideWrapper}
                    onScroll={(e) => setScroll(e.target.scrollLeft)}
                    className={`${styles.aside_slider}`}
                >
                    <div
                        ref={slider}
                        className={`${styles.aside_slide_wrapper}`}
                    >
                        {loop?.map((el, i) => {
                            return (
                                <div
                                    ref={i == 0 ? slide : null}
                                    key={(count += 1)}
                                    style={{ left: `${i * 428}px` }}
                                    className={`${styles.aside_slide} ${
                                        i == 0 && styles.aside_static
                                    }`}
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
                <div>
                    <button onClick={clickLeft}>left</button>
                    <button onClick={clickRight}>right</button>
                </div>
            </div>
        </aside>
    );
};

export default Aside;
