import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import styles from '../../styles/Dropdown.module.scss';
import { changePlatform, order } from '../../redux/actions/royalfutActions';
import { translates } from '../../locales/locales';
import { Router, useRouter } from 'next/router';

const BuyCoinsDropdown = () => {
    const locale = useSelector((state) => state.royalfutReducer.locale.title);
    const buycoinsRef = React.createRef();
    const router = useRouter();

    const dispatch = useDispatch();

    function hideContent(ref) {
        ref.current.classList.toggle('hide');
    }

    const onMouseEnterBlock = (e, ref) => {
        e.stopPropagation();
        console.log('enter');
        hideContent(ref);
    };

    const onMouseLeaveBlock = (e, ref) => {
        e.stopPropagation();
        hideContent(ref);
    };

    return (
        <div className={`${styles.dropdown_container} ${styles.drop_cont}`}>
            <div
                className={`${styles.drop_wrap}`}
                onMouseEnter={(e) => {
                    e.stopPropagation();
                    window.innerWidth > 1024
                        ? onMouseEnterBlock(e, buycoinsRef)
                        : null;
                }}
                onMouseLeave={(e) => {
                    e.stopPropagation();
                    window.innerWidth > 1024
                        ? onMouseLeaveBlock(e, buycoinsRef)
                        : null;
                }}
            >
                <div
                    className={`${styles.dropdown_countries} ${styles.dropdown__links}`}
                >
                    {translates[router.locale].menuLinkOrder}
                </div>

                <div className={`dropdown__arrow`} />
                <div
                    className={`${styles.dropdown__buycoins_content} hide`}
                    ref={buycoinsRef}
                >
                    <div className={`${styles.content_wrap}`}>
                        <div className={`${styles.buycoins_item}`}>
                            <Link href={`/order/ps4`} locale={locale}>
                                <a
                                    className={`${styles.buycoins_link}`}
                                    onClick={() => {
                                        dispatch(changePlatform('ps'));
                                        dispatch(order({}));
                                    }}
                                >
                                    PlayStation 4
                                </a>
                            </Link>
                        </div>
                        <div className={`${styles.buycoins_item}`}>
                            <Link href={`/order/ps5`} locale={locale}>
                                <a
                                    className={`${styles.buycoins_link}`}
                                    onClick={() => {
                                        dispatch(order({}));
                                        dispatch(changePlatform('ps'));
                                    }}
                                >
                                    PlayStation 5
                                </a>
                            </Link>
                        </div>
                        <div className={`${styles.buycoins_item}`}>
                            <Link href={`/order/xbox_one`} locale={locale}>
                                <a
                                    className={`${styles.buycoins_link}`}
                                    onClick={() => {
                                        dispatch(order({}));
                                        dispatch(changePlatform('xbox'));
                                    }}
                                >
                                    Xbox One
                                </a>
                            </Link>
                        </div>
                        <div className={`${styles.buycoins_item}`}>
                            <Link href={`/order/xbox_series_x`} locale={locale}>
                                <a
                                    className={`${styles.buycoins_link}`}
                                    onClick={() => {
                                        dispatch(order({}));
                                        dispatch(changePlatform('xbox'));
                                    }}
                                >
                                    Xbox Series X|S
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyCoinsDropdown;
