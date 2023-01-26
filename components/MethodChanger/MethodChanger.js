import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeMethod } from '../../redux/actions/royalfutActions';

import SvgContainer from '../SvgContainer';
import { what } from '../../data-svg/what';

import styles from '../../styles/MethodChanger.module.scss';
import { translates } from '../../locales/locales';
import { Router, useRouter } from 'next/router';

const MethodChanger = () => {
    const method = useSelector((state) => state.royalfutReducer.method);

    const dispatch = useDispatch();
    const router = useRouter();

    const userChangeMethod = (e) => {
        dispatch(changeMethod(e.target.dataset.id));
    };

    return (
        <div className={`${styles.method}`}>
            <div className={`${styles.wrapper_radiogroup}`}>
                <label
                    data-id={'easy'}
                    className={`${styles.method_label} ${
                        method.easy
                            ? styles.label_checked
                            : styles.label_not_checked
                    }`}
                >
                    <input
                        onChange={userChangeMethod}
                        data-id={'easy'}
                        className={`${styles.method_radio}`}
                        type={'radio'}
                        name="method"
                        value="easy"
                        checked={method.easy ? true : false}
                    ></input>
                    <div data-id={'easy'} className={`${styles.method_check}`}>
                        <div
                            className={`${
                                method.manual
                                    ? styles.fake_input_false
                                    : styles.fake_input_true
                            }`}
                        ></div>
                    </div>
                    <span data-id={'easy'}>
                        {translates[router.locale].comfortMethodName}
                    </span>
                </label>
                <label
                    data-id={'manual'}
                    className={`${styles.method_label} ${
                        !method.easy
                            ? styles.label_checked
                            : styles.label_not_checked
                    }`}
                >
                    <input
                        onChange={userChangeMethod}
                        data-id={'manual'}
                        className={`${styles.method_radio}`}
                        type={'radio'}
                        name="method"
                        value="manual"
                        checked={!method.easy ? true : false}
                    ></input>
                    <div
                        data-id={'manual'}
                        className={`${styles.method_check}`}
                    >
                        <div
                            className={`${
                                !method.manual
                                    ? styles.fake_input_false
                                    : styles.fake_input_true
                            }`}
                        ></div>
                    </div>
                    <span data-id={'manual'}>
                        {translates[router.locale].marketMethodName}
                    </span>
                </label>
            </div>
            {/* <div className={`${styles.info_method}`}>
                <a href="#deliveryMain" className={`${styles.method_info}`}>
                    <span className={`${styles.info_text}`}>
                        {translates[router.locale].marketMethodWhat}
                    </span>
                    <img src="/img/what-question.svg" />
                </a>
            </div> */}
        </div>
    );
};

export default MethodChanger;
