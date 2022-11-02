import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

import styles from '../../styles/Dropdown.module.scss';

const BuyCoinsDropdown = () => {
    const locale = useSelector((state) => state.royalfutReducer.locale.title);
    const buycoinsRef = React.createRef();

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
        <div className={`${styles.dropdown_container}`}>
            <div
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
                    buy coins
                </div>
                <div
                    className={`${styles.dropdown__buycoins_content} hide`}
                    ref={buycoinsRef}
                >
                    <div className={`${styles.buycoins_item}`}>
                        <Link href={`/order/ps4`} locale={locale}>
                            ps4
                        </Link>
                    </div>
                    <div className={`${styles.buycoins_item}`}>
                        <Link href={`/order/ps5`} locale={locale}>
                            ps5
                        </Link>
                    </div>
                    <div className={`${styles.buycoins_item}`}>
                        <Link href={`/order/xbox_one`} locale={locale}>
                            Xbox One
                        </Link>
                    </div>
                    <div className={`${styles.buycoins_item}`}>
                        <Link href={`/order/xbox_series_x`} locale={locale}>
                            Xbox Series X|S
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyCoinsDropdown;
