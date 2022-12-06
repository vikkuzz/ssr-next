import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';

import styles from '../../styles/TableOrders.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getCoords } from '../../utils/functions';
import Api from '../../Api/Api';
import { getAllOrders } from '../../redux/actions/royalfutActions';
import { useRouter } from 'next/router';
import { translates } from '../../locales/locales';

const api = new Api();

const TableItem = ({ item }) => {
    const stateUser = useSelector((state) => state.royalfutReducer.user);

    const eye = '/img/eye.svg';
    const eyeClosed = '/img/eye-close.svg';

    const password = useRef();
    const codes = useRef();
    const iframe = useRef();
    const iframeContainer = useRef();

    let [day, setDay] = useState();
    let [openIframe, setOpenIframe] = useState(false);
    let [orderOpen, setOrdeOpen] = useState(false);
    let [userCodes, setUserCodes] = useState([]);
    let [codeCount, setCodeCount] = useState(0);
    let [currentStatus, setCurrentStatus] = useState({
        text: 'created',
        color: 'white',
    });
    const stateCurrency = useSelector(
        (state) => state.royalfutReducer.currency
    );
    const [svgEye, setSvgEye] = useState(eye);
    const dispatch = useDispatch();
    const router = useRouter();
    const t = translates[router.locale];
    const tStatus = translates.getStatus[router.locale];

    function AddZero(num) {
        return num >= 0 && num < 10 ? `0${num}` : `${num}`;
    }

    useEffect(() => {
        setCodeCount((prev) => prev + 1);
    }, [userCodes]);

    useEffect(() => {
        const now = new Date();
        const date = [
            AddZero(now.getMonth() + 1),
            AddZero(now.getDate()),
            now.getFullYear(),
        ].join('/');
        const date2 = [
            AddZero(now.getMonth() + 1),
            AddZero(now.getDate() - 1),
            now.getFullYear(),
        ].join('/');
        let currentDay = moment(item.createdAt).format('L');
        if (currentDay === date) {
            currentDay = 'Today';
        }

        if (currentDay === date2) {
            currentDay = 'Yesterday';
        }
        setDay(currentDay);

        function profileTableHeadingStatus(status) {
            status = status.toLowerCase();

            if (status === 'created' || status === 'accepted') {
                setCurrentStatus({
                    text: tStatus[status],
                    color: 'white',
                });
                // } else if (status === 'issued_refund') {
                //     setCurrentStatus({
                //         text: tStatus[status],
                //         color: 'red',
                //     });
            } else if (
                status === 'out_of_stock' ||
                status === 'warning' ||
                status === 'wrong_credentials' ||
                status === 'wrong_backup' ||
                status === 'no_enough_stock' ||
                status === 'not_enough_stock' ||
                status === 'no_enough_coins_to_start' ||
                status === 'not_enough_coins_to_start' ||
                status === 'error_fut' ||
                status === 'waiting_payment' ||
                status === 'error_payment' ||
                status === 'no_access_to_fifa_21_webapp' ||
                status === 'fut_error' ||
                status === 'transfer-error' ||
                status === 'customer_online' ||
                status === 'locked' ||
                status === 'issued_refund'
            ) {
                setCurrentStatus({
                    text: tStatus[status] || 'Payment failed',
                    color: 'red',
                });
            } else if (
                status === 'success' ||
                status === 'finished' ||
                status === 'payed' ||
                status === 'transfer-payed'
            ) {
                setCurrentStatus({
                    text: tStatus[status] || 'success',
                    color: 'green',
                });
            }

            // if (status === 'locked') {
            //     return {
            //         text: t[status],
            //         status: 'warning',
            //     };
            // }
            else if (status === 'preorder') {
                return {
                    text: 'preorder paid',
                    status: 'green',
                };
            } else {
                setCurrentStatus({
                    text:
                        typeof t[status] === 'undefined'
                            ? tStatus.progress
                            : tStatus[status],
                    color: 'blue',
                });
            }
        }

        profileTableHeadingStatus(item.status);
    }, []);

    useEffect(() => console.log(currentStatus), [currentStatus.text]);

    const handleClickOrder = (e) => {
        setOrdeOpen(!orderOpen);

        console.log(getCoords(e.target));
        window.scrollTo(0, getCoords(e.target).top - 200);
    };

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
    const handleChangeCodes = (e) => {
        console.log(e.target.value);
        if (e.target.value.length === 8) {
            let tempCode = e.target.value;
            setUserCodes((prev) => [
                ...prev,
                { id: codeCount, text: tempCode },
            ]);
            e.target.value = '';
        }
    };
    const handleDeleteCode = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(e.target.id);
        let tempCodes = userCodes.filter((el) => el.id != e.target.id);
        console.log(tempCodes);
        setUserCodes(tempCodes);
    };

    const sendBackUpCodes = async (e) => {
        e.stopPropagation();
        let tempArr = [];
        userCodes.forEach((el, i) => {
            let field = `backupCode${i + 1}`;
            tempArr.push({ [field]: el.text });
        });
        let sendData = {
            mail: stateUser.email,
            password: stateUser.password,
        };
        tempArr.forEach((el, i) => {
            sendData = { ...sendData, ...el };
        });
        console.log(sendData);
        await api
            .place(item.id, sendData, stateUser.token)
            .then((res) => console.log(res));
        await api.getOrders(stateUser.token).then(
            (res) =>
                setTimeout(() => {
                    dispatch(getAllOrders(res.orders));
                }),
            300
        );
    };

    const sendRequest = (e) => {
        e.stopPropagation();
        setOpenIframe(true);
        if (e.target.link) {
            iframe.current.src = e.target.link;
        }
    };

    return (
        <div
            id={item.id}
            className={`${styles.tableorders_order} ${
                orderOpen && styles.tableorder_body_order_open
            }`}
            onClick={handleClickOrder}
        >
            <div className={`${styles.tableorder_header_date}`}>
                <div className={`${styles.tableorder_header_day}`}>{day}</div>
                <div
                    className={`${styles.tableorder_header_divider} ${
                        orderOpen && 'hide'
                    }`}
                ></div>
            </div>
            <div className={`${styles.tableorder_body}`}>
                <div
                    className={`${styles.tableorder_header_id} ${styles.tableorder_subheader_item}`}
                >
                    <div className={`${styles.tableorder_subheader}`}>#</div>
                    <div className={`${styles.tableorder_item_id}`}>
                        {item.id}{' '}
                        {item.deliveryMethod.toLowerCase() === 'easy'
                            ? 'CT'
                            : 'PA'}
                    </div>
                </div>
                <div
                    className={`${styles.tableorder_header_id} ${styles.tableorder_subheader_item}`}
                >
                    <div className={`${styles.tableorder_subheader}`}>
                        {t.platformLogin}
                    </div>
                    <div className={`${styles.tableorder_item_id}`}>
                        {item.platform === 'ps4' || item.platform === 'ps5'
                            ? 'PLAYSTATION'
                            : 'XBOX'}
                    </div>
                </div>
                <div
                    className={`${styles.tableorder_header_id} ${styles.tableorder_subheader_item}`}
                >
                    <div className={`${styles.tableorder_subheader}`}>
                        {t.amount}
                    </div>
                    <div className={`${styles.tableorder_item_id}`}>
                        {item.coinCount}
                    </div>
                </div>
                <div
                    className={`${styles.tableorder_header_id} ${styles.tableorder_subheader_item}`}
                >
                    <div className={`${styles.tableorder_subheader}`}>
                        {t.price}
                    </div>
                    <div className={`${styles.tableorder_item_id}`}>
                        {stateCurrency.currency + ' '}
                        {item.overallPrice.toFixed(2)}
                    </div>
                </div>
                <div
                    className={`${styles.tableorder_header_id} ${styles.tableorder_subheader_item} ${styles.tableorder_item_status}`}
                >
                    <div
                        className={`${styles.tableorder_subheader} ${styles.tableorder_subheader_status} `}
                    >
                        {t.status}
                    </div>
                    <div
                        className={`${styles.tableorder_item_id} ${currentStatus.color}`}
                    >
                        {currentStatus.text}
                        {currentStatus.color === 'red' && (
                            <img
                                className={`${styles.status_svg} ${styles.status_svg_warning}`}
                                src="/img/warning.svg"
                            ></img>
                        )}
                        {currentStatus.color === 'blue' && (
                            <img
                                className={`${styles.status_svg} ${styles.status_svg_progress}`}
                                src="/img/progress.svg"
                            ></img>
                        )}
                        {currentStatus.color === 'green' && (
                            <img
                                className={`${styles.status_svg} ${styles.status_svg_success}`}
                                src="/img/success.svg"
                            ></img>
                        )}
                    </div>
                </div>
                <div
                    className={`${styles.tableorder_arrow} ${
                        orderOpen && styles.tableorder_arrow_trasform
                    }`}
                ></div>
            </div>
            {item.status === 'ACCEPTED' &&
                item.status === 'FINISHED' &&
                item.deliveryMethod === 'Easy' && (
                    <div
                        className={`${styles.tableorder_content} ${
                            !orderOpen && 'hide'
                        }`}
                    >
                        <div className={`${styles.tableorder_content_title}`}>
                            {t.transferred}
                        </div>
                        <div
                            className={`${styles.tableorder_content_transfer}`}
                        >
                            {item.coinTransferred} / {item.coinCount}
                        </div>
                        <div
                            className={`${styles.tableorder_content_progress}`}
                        >
                            <div
                                className={`${styles.tableorder_content_percent}`}
                            >
                                {item.percentTransferred &&
                                toString(item.percentTransferred).indexOf('%') >
                                    -1
                                    ? item.percentTransferred
                                    : `${item.percentTransferred}%`}
                            </div>
                            <div
                                className={`${styles.tableorder_content_progressline}`}
                            >
                                <div
                                    className={`${styles.tableorder_line}`}
                                    style={{
                                        width: `${
                                            item.percentTransferred &&
                                            toString(
                                                item.percentTransferred
                                            ).indexOf('%') > -1
                                                ? item.percentTransferred
                                                : `${item.percentTransferred}%`
                                        }`,
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                )}
            {item.status != 'ACCEPTED' &&
                item.status != 'FINISHED' &&
                item.deliveryMethod === 'Easy' && (
                    <div
                        className={`${styles.tableorder_content} ${
                            !orderOpen && 'hide'
                        }`}
                    >
                        <div className={`${styles.tableorder_content_title}`}>
                            {t.transferred}
                        </div>
                        <div
                            className={`${styles.tableorder_content_transfer}`}
                        >
                            {item.coinTransferred} / {item.coinCount}
                        </div>
                        <div
                            className={`${styles.tableorder_content_progress}`}
                        >
                            <div
                                className={`${styles.tableorder_content_percent}`}
                            >
                                {item.percentTransferred &&
                                toString(item.percentTransferred).indexOf('%') >
                                    -1
                                    ? item.percentTransferred
                                    : `${item.percentTransferred}%`}
                            </div>
                            <div
                                className={`${styles.tableorder_content_progressline}`}
                            >
                                <div
                                    className={`${styles.tableorder_line}`}
                                    style={{
                                        width: `${
                                            item.percentTransferred &&
                                            toString(
                                                item.percentTransferred
                                            ).indexOf('%') > -1
                                                ? item.percentTransferred
                                                : `${item.percentTransferred}%`
                                        }`,
                                    }}
                                ></div>
                            </div>
                        </div>
                        <div className={`${styles.wrapper_inputs}`}>
                            <div className={`${styles.account_inputs}`}>
                                <div
                                    className={`${styles.prof_comp_fieldset_wrapper}`}
                                >
                                    <fieldset
                                        className={`${styles.prof_comp_fieldset} ${styles.email_fieldset}`}
                                    >
                                        <legend
                                            className={`${styles.prof_comp_legend}`}
                                        >
                                            {t.email}
                                        </legend>
                                        <input
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }}
                                            className={
                                                styles.prof_comp_userdata
                                            }
                                            type="email"
                                            placeholder={'email@address.com'}
                                            defaultValue={stateUser.email}
                                        ></input>
                                    </fieldset>
                                </div>
                                <div
                                    className={`${styles.prof_comp_fieldset_wrapper}`}
                                >
                                    <fieldset
                                        className={`${styles.prof_comp_fieldset} ${styles.fieldset_pass}`}
                                    >
                                        <legend
                                            className={styles.prof_comp_legend}
                                        >
                                            {t.password}
                                        </legend>
                                        <input
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }}
                                            ref={password}
                                            className={
                                                styles.prof_comp_userdata
                                            }
                                            defaultValue={stateUser.password}
                                            type="password"
                                            placeholder={t.password}
                                        ></input>
                                        <button
                                            onClick={onHandleClickViewPass}
                                            className={
                                                styles.prof_comp_view_pass
                                            }
                                            type="button"
                                            title={t.seePassword}
                                        >
                                            <img src={svgEye} />
                                        </button>
                                    </fieldset>
                                </div>
                            </div>
                            <div className={`${styles.tableorder_codes}`}>
                                <fieldset
                                    className={`${styles.prof_comp_fieldset} ${styles.codes_fieldset}`}
                                >
                                    <legend
                                        className={`${styles.prof_comp_legend} ${styles.codes_legend}`}
                                    >
                                        {t.backupCode}
                                    </legend>
                                    <div className={`${styles.wrapper_codes}`}>
                                        {userCodes.length > 0 &&
                                            userCodes.map((el) => (
                                                <div
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                    }}
                                                    id={el.id}
                                                    key={el.id}
                                                    className={`${styles.tableorder_code_item}`}
                                                >
                                                    <span
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                        }}
                                                        className={`${styles.code_text}`}
                                                    >
                                                        {el.text
                                                            .match(/.{1,4}/g)
                                                            .join(' ')}
                                                    </span>{' '}
                                                    <button
                                                        id={el.id}
                                                        onClick={
                                                            handleDeleteCode
                                                        }
                                                        className={`${styles.close_btn}`}
                                                    >
                                                        <img
                                                            id={el.id}
                                                            className={`${styles.close_img}`}
                                                            src={
                                                                '/img/close.svg'
                                                            }
                                                        ></img>
                                                    </button>
                                                </div>
                                            ))}
                                        <label
                                            className={`${styles.tableorder_code_label}`}
                                        >
                                            <input
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                }}
                                                onChange={handleChangeCodes}
                                                ref={codes}
                                                placeholder={t.enterCode}
                                                className={`${styles.codes_input} ${styles.prof_comp_userdata}`}
                                                type="text"
                                            ></input>
                                        </label>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        <div className={`${styles.code_helper}`}>
                            <span className={`${styles.code_helper_text}`}>
                                {t.backupCodes}
                            </span>
                            <a
                                className={`${styles.code_helper_link}`}
                                href="https://myaccount.ea.com/cp-ui/security/index"
                                target="_blank"
                            >
                                myaccount.ea.com/cp-ui/security/index
                            </a>
                        </div>
                        <div className={`${styles.form_group}`}>
                            <button
                                className={`${styles.code_post}`}
                                onClick={sendBackUpCodes}
                            >
                                <span className={`${styles.btn_content}`}>
                                    {t.saveChanges}
                                </span>
                            </button>
                        </div>
                    </div>
                )}
            {item.deliveryMethod === 'Manual' && (
                <div
                    className={`${styles.tableorder_content} ${
                        !orderOpen && 'hide'
                    }`}
                >
                    <div className={`${styles.tableorder_content_title}`}>
                        {t.transferred}
                    </div>
                    <div className={`${styles.tableorder_content_transfer}`}>
                        {item.coinTransferred} / {item.coinCount}
                    </div>
                    <div className={`${styles.tableorder_content_progress}`}>
                        <div className={`${styles.tableorder_content_percent}`}>
                            {item.percentTransferred &&
                            toString(item.percentTransferred).indexOf('%') > -1
                                ? item.percentTransferred
                                : `${item.percentTransferred}%`}
                        </div>
                        <div
                            className={`${styles.tableorder_content_progressline}`}
                        >
                            <div
                                className={`${styles.tableorder_line}`}
                                style={{
                                    width: `${
                                        item.percentTransferred &&
                                        toString(
                                            item.percentTransferred
                                        ).indexOf('%') > -1
                                            ? item.percentTransferred
                                            : `${item.percentTransferred}%`
                                    }`,
                                }}
                            ></div>
                        </div>
                        <div className={`${styles.form_group}`}>
                            <button
                                className={`${styles.code_post}`}
                                onClick={sendRequest}
                                data-id={item.link}
                            >
                                <span
                                    data-id={item.link}
                                    className={`${styles.btn_content}`}
                                >
                                    {t.continueTransfering}
                                </span>
                            </button>
                        </div>
                        <div
                            ref={iframeContainer}
                            className={`${styles.profile_orderable_frame} ${
                                !openIframe && 'hide'
                            }`}
                        >
                            <iframe
                                className={`${styles.tableorder_iframe}`}
                                ref={iframe}
                                src={openIframe && item.link}
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TableItem;
