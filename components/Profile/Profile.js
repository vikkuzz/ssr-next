import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from '../../styles/ProfileComponent.module.scss';
import TableOrders from '../TableOrders';

const ProfileComponent = () => {
    const eye = '/img/eye.svg';
    const eyeClosed = '/img/eye-close.svg';

    const stateUser = useSelector((state) => state.royalfutReducer.user);
    const password = useRef();
    let [tab, setTab] = useState({ acc: true, orders: false });
    const [svgEye, setSvgEye] = useState(eye);

    const dispatch = useDispatch();
    const router = useRouter();

    const onHandleClickViewPass = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (password.current.type == 'text') {
            password.current.type = 'password';
            setSvgEye(eye);
        } else {
            password.current.type = 'text';
            setSvgEye(eyeClosed);
        }
    };
    return (
        <div className={`${styles.prof_comp_container}`}>
            <div className={`${styles.prof_comp_wrapper_tabs}`}>
                <button
                    onClick={() => setTab({ acc: true, orders: false })}
                    className={`${styles.prof_comp_tab} ${
                        tab.acc && styles.prof_comp_tab_active
                    }`}
                >
                    Account
                </button>
                <button
                    onClick={() => setTab({ acc: false, orders: true })}
                    className={`${styles.prof_comp_tab} ${
                        tab.orders && styles.prof_comp_tab_active
                    }`}
                >
                    Orders
                </button>
            </div>
            <div className={`${styles.prof_comp_container_content}`}>
                <div
                    className={`${styles.prof_acc_container} ${
                        !tab.acc && 'hide'
                    }`}
                >
                    <div className={`${styles.prof_comp_fieldset_wrapper}`}>
                        <fieldset
                            className={`${styles.prof_comp_fieldset} ${styles.email_fieldset}`}
                        >
                            <legend className={`${styles.prof_comp_legend}`}>
                                E-mail
                            </legend>
                            <input
                                className={styles.prof_comp_userdata}
                                type="email"
                                placeholder={'email@address.com'}
                                value={stateUser.email}
                            ></input>
                        </fieldset>
                    </div>
                    <div className={`${styles.prof_comp_fieldset_wrapper}`}>
                        <fieldset
                            className={`${styles.prof_comp_fieldset} ${styles.fieldset_pass}`}
                        >
                            <legend className={styles.prof_comp_legend}>
                                Password
                            </legend>
                            <input
                                ref={password}
                                className={styles.prof_comp_userdata}
                                type="password"
                                placeholder={'password'}
                            ></input>
                            <button
                                onClick={onHandleClickViewPass}
                                className={styles.prof_comp_view_pass}
                                type="button"
                                title={'see password'}
                            >
                                <img src={svgEye} />
                            </button>
                        </fieldset>
                    </div>
                </div>
                <div
                    className={`${styles.prof_comp_orders_container} ${
                        tab.acc && 'hide'
                    }`}
                >
                    <TableOrders />
                </div>
            </div>
        </div>
    );
};

export default ProfileComponent;
