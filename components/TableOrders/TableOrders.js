import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Api from '../../Api/Api';
import { translates } from '../../locales/locales';

import { getAllOrders } from '../../redux/actions/royalfutActions';

import styles from '../../styles/TableOrders.module.scss';
import TableItem from './TableItem';

const api = new Api();

const Loader = () => {
    return (
        //<svg viewBox="0 0 866 866" xmlns="http://www.w3.org/2000/svg">
        <svg
            className="svg-loader"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 164.83 151.5"
        >
            <path
                className="path-0"
                d="M117.24 69.24a8 8 0 00-1.57-2.24c-4.88-4-9.8-7.89-14.86-11.62a4.93 4.93 0 00-3.88-.38c-5.76 1.89-11.4 4.17-17.18 6a4.36 4.36 0 00-3.42 4.12c-1 6.89-2.1 13.76-3 20.66a4 4 0 001 3.07c5.12 4.36 10.39 8.61 15.68 12.76a3.62 3.62 0 002.92.75c6.29-2.66 12.52-5.47 18.71-8.36a3.49 3.49 0 001.68-2.19c1.34-7.25 2.54-14.55 3.9-22.58z"
            ></path>
            <path
                className="path-1"
                d="M97.55 38.68a43.76 43.76 0 01.45-5.24c.41-2.36-.5-3.57-2.57-4.64C91.1 26.59 87 24 82.66 21.82a6.18 6.18 0 00-4-.71c-5.21 1.44-10.34 3.14-15.44 4.89-3.63 1.21-6.08 3.35-5.76 7.69a26.67 26.67 0 01-.6 4.92c-1.08 8.06-1.08 8.08 5.86 11.92 3.95 2.19 7.82 5.75 11.94 6.08s8.76-2.41 13.12-3.93c9.33-3.29 9.33-3.3 9.78-14z"
            ></path>
            <path
                className="path-2"
                d="M66.11 126.56c5.91-.91 11.37-1.7 16.81-2.71a3.3 3.3 0 001.87-2.17c1-4.06 1.73-8.19 2.84-12.24.54-2-.11-3-1.55-4.15-5-4-9.9-8.12-15-12a6.19 6.19 0 00-4.15-1.1c-5.35.66-10.7 1.54-16 2.54A4 4 0 0048.34 97a109.13 109.13 0 00-3 12.19 4.47 4.47 0 001.34 3.6c5.54 4.36 11.23 8.53 16.91 12.69a10.84 10.84 0 002.57 1.11z"
            ></path>
            <path
                className="path-3"
                d="M127.42 104.12c4.1-2.1 8-3.93 11.72-6a6 6 0 002.27-3 58.22 58.22 0 003.18-29.92c-.26-1.7-8-7.28-9.71-6.85a5 5 0 00-1.88 1.3c-2.81 2.49-5.71 4.88-8.33 7.56a9.46 9.46 0 00-2.47 4.4c-1.29 6.49-2.38 13-3.35 19.55a5.73 5.73 0 00.83 3.91c2.31 3.08 5 5.88 7.7 9z"
            ></path>
            <path
                className="path-4"
                d="M52.58 29.89c-2.15-.36-3.78-.54-5.39-.9-2.83-.64-4.92.1-7 2.32a64.1 64.1 0 00-14.1 23.33c-2.64 7.92-2.62 7.84 5.15 10.87 1.76.69 2.73.45 3.93-1C39.79 59 44.54 53.65 49.22 48.2a4.2 4.2 0 001.13-2c.8-5.32 1.49-10.68 2.24-16.34z"
            ></path>
            <path
                className="path-5"
                d="M23 68.13V75a60.49 60.49 0 009.75 32.15c1.37 2.13 6.4 3 7 1.2 1.55-5 2.68-10.2 3.82-15.34.13-.58-.58-1.38-.94-2.06-2.51-4.77-5.47-9.38-7.45-14.37C32.94 71 28.22 69.84 23 68.13z"
            ></path>
            <path
                className="path-6"
                d="M83.91 12.86c-.32.36-.66.71-1 1.07.9 1.13 1.57 2.62 2.73 3.33 4.71 2.84 9.56 5.48 14.39 8.1a9.29 9.29 0 003.13.83c5.45.69 10.89 1.38 16.35 1.94a10.41 10.41 0 003.07-.71c-11.48-9.9-24.26-14.61-38.71-14.56z"
            ></path>
            <path
                className="path-7"
                d="M66.28 132.51c13.36 3.78 25.62 3.5 38-.9-12.6-2.02-24.92-3.61-38 .9z"
            ></path>
            <path
                className="path-8"
                d="M127.2 30.66l-1.27.37a18.58 18.58 0 001 3.08c3 5.52 6.21 10.89 8.89 16.54 1.34 2.83 3.41 3.82 6.49 4.9a60.38 60.38 0 00-15.12-24.9z"
            ></path>
            <path
                className="bb-9"
                d="M117.35 125c5.58-2.32 16.9-13.84 18.1-19.2-2.41 1.46-5.18 2.36-6.78 4.23-4.21 5-7.89 10.37-11.32 15z"
            ></path>
        </svg>
        //</svg>
    );
};

const TableOrders = () => {
    const stateUser = useSelector((state) => state.royalfutReducer.user);
    const stateAllOrders =
        useSelector((state) => state.royalfutReducer.allOrders) || [];
    let [orders, setOrders] = useState([]);
    const dispatch = useDispatch();
    const router = useRouter();
    const t = translates[router.locale];
    useEffect(() => {
        if (stateUser.token) {
            api.getOrders(stateUser.token).then(
                (res) =>
                    setTimeout(() => {
                        //setOrders(res.orders);
                        dispatch(getAllOrders(res.orders));
                    }),
                300
            );
        }
    }, [stateUser]);

    useEffect(() => {
        if (stateUser.token) {
            api.getOrders(stateUser.token).then((res) => {
                dispatch(getAllOrders([]));
                setTimeout(() => {
                    //setOrders(res.orders);
                    dispatch(getAllOrders(res.orders));
                }, 300);
            });
        }
    }, [router.locale]);

    useEffect(() => {
        //setOrders(stateAllOrders);
    }, [stateAllOrders]);

    useEffect(() => {
        console.log(orders);
    }, [orders]);

    return (
        <div className={`${styles.table}`}>
            <div className={`${stateAllOrders.length > 0 ? 'hide' : ''}`}>
                <Loader />
            </div>
            <div
                className={`${
                    stateAllOrders.length < 0
                        ? 'hide'
                        : styles.tableorders_container
                }`}
            >
                <div
                    className={`${styles.tableorders_header} from-1025-to-1900`}
                >
                    <div
                        className={`${styles.tableorders_header_item} ${styles.tableorders_header_item_id}`}
                    >
                        #
                    </div>
                    <div
                        className={`${styles.tableorders_header_item} ${styles.tableorders_header_item_platform}`}
                    >
                        {t.platformLogin}
                    </div>
                    <div
                        className={`${styles.tableorders_header_item} ${styles.tableorders_header_item_amount}`}
                    >
                        {t.amount}
                    </div>
                    <div
                        className={`${styles.tableorders_header_item} ${styles.tableorders_header_item_price}`}
                    >
                        {t.price}
                    </div>
                    <div
                        className={`${styles.tableorders_header_item} ${styles.tableorders_header_item_status}`}
                    >
                        {t.status}
                    </div>
                </div>
                <div className={`${styles.tableorders_orders_container}`}>
                    {stateAllOrders?.map((el, i) => {
                        if (i <= 300) {
                            if (el.status.toLowerCase() != 'created') {
                                return <TableItem item={el} key={el.id} />;
                            }
                        }
                    })}
                </div>
            </div>
        </div>
    );
};

export default TableOrders;
