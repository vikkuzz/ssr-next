import React, { useEffect, useState } from 'react';
import moment from 'moment';

import styles from '../../styles/TableOrders.module.scss';
import { useSelector } from 'react-redux';

const TableItem = ({ item }) => {
    let [day, setDay] = useState();
    let [orderOpen, setOrdeOpen] = useState(false);
    const stateCurrency = useSelector(
        (state) => state.royalfutReducer.currency
    );
    function AddZero(num) {
        return num >= 0 && num < 10 ? `0${num}` : `${num}`;
    }

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
    }, []);

    const handleClickOrder = () => {
        setOrdeOpen(!orderOpen);
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
                        Platform / E-mail
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
                        Amount
                    </div>
                    <div className={`${styles.tableorder_item_id}`}>
                        {item.coinCount}
                    </div>
                </div>
                <div
                    className={`${styles.tableorder_header_id} ${styles.tableorder_subheader_item}`}
                >
                    <div className={`${styles.tableorder_subheader}`}>
                        Price
                    </div>
                    <div className={`${styles.tableorder_item_id}`}>
                        {stateCurrency.currency + ' '}
                        {item.overallPrice.toFixed(2)}
                    </div>
                </div>
                <div
                    className={`${styles.tableorder_header_id} ${styles.tableorder_subheader_item}`}
                >
                    <div className={`${styles.tableorder_subheader}`}>
                        Status
                    </div>
                    <div className={`${styles.tableorder_item_id}`}>
                        {item.status}
                    </div>
                </div>
            </div>
            <div
                className={`${styles.tableorder_content} ${
                    !orderOpen && 'hide'
                }`}
            >
                <div className={`${styles.tableorder_content_title}`}>
                    Coins transferred
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
                                    toString(item.percentTransferred).indexOf(
                                        '%'
                                    ) > -1
                                        ? item.percentTransferred
                                        : `${item.percentTransferred}%`
                                }`,
                            }}
                        ></div>
                    </div>
                </div>
            </div>
            {/* <div className={`${styles.tableorder_status}`}>
                <div
                    className={`${styles.tableorder_header_id} ${styles.tableorder_subheader_item}`}
                >
                    <div className={`${styles.tableorder_subheader}`}>
                        Status
                    </div>
                    <div className={`${styles.tableorder_item_id}`}>
                        {item.status}
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default TableItem;
