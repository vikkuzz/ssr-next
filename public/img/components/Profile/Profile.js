import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { translates } from '../../locales/locales';

import styles from '../../styles/ProfileComponent.module.scss';
import TableOrders from '../TableOrders';

const ProfileComponent = () => {
    const eye = '/img/eye.svg';
    const eyeClosed = '/img/eye-close.svg';

    const stateUser = useSelector((state) => state.royalfutReducer.user);
    const password = useRef();
    let [tab, setTab] = useState({ acc: true, orders: false });
    const [svgEye, setSvgEye] = useState(eye);
    const [changed, setChanged] = useState(false);

    const dispatch = useDispatch();
    const router = useRouter();
    const t = translates[router.locale];

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
        <div
            className={`${styles.prof_comp_container} ${
                tab.acc && styles.prof_comp_max_width
            }`}
        >
            <div
                className={`${styles.prof_comp_wrapper_tabs} ${styles.prof_comp_max_width}`}
            >
                <button
                    onClick={() => setTab({ acc: true, orders: false })}
                    className={`${styles.prof_comp_tab} ${
                        tab.acc && styles.prof_comp_tab_active
                    }`}
                >
                    {t.account}
                </button>
                <button
                    onClick={() => setTab({ acc: false, orders: true })}
                    className={`${styles.prof_comp_tab} ${
                        tab.orders && styles.prof_comp_tab_active
                    }`}
                >
                    {t.orders}
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
                                {t.email}
                            </legend>
                            <input
                                className={styles.prof_comp_userdata}
                                type="email"
                                placeholder={'email@address.com'}
                                defaultValue={stateUser.email}
                                onChange={() => setChanged(true)}
                            ></input>
                        </fieldset>
                    </div>
                    <div className={`${styles.prof_comp_fieldset_wrapper}`}>
                        <fieldset
                            className={`${styles.prof_comp_fieldset} ${styles.fieldset_pass}`}
                        >
                            <legend className={styles.prof_comp_legend}>
                                {t.password}
                            </legend>
                            <input
                                ref={password}
                                className={styles.prof_comp_userdata}
                                type="password"
                                placeholder={t.password}
                                defaultValue={stateUser.password}
                                onChange={() => setChanged(true)}
                            ></input>
                            <button
                                onClick={onHandleClickViewPass}
                                className={styles.prof_comp_view_pass}
                                type="button"
                                title={t.seePassword}
                            >
                                <img src={svgEye} />
                            </button>
                        </fieldset>
                    </div>
                </div>
                <div
                    className={`${styles.prof_copm_update_wrapper} ${
                        !changed && 'hide'
                    } ${tab.orders && 'hide'}`}
                >
                    <button className={`${styles.prof_copm_update_btn}`}>
                        {t.update}
                    </button>
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
