import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { translates } from '../../locales/locales';
import { order } from '../../redux/actions/royalfutActions';

import styles from '../../styles/App.module.scss';

const ButtonToOrder = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const t = translates[router.locale];
    return (
        <Link href="/order/platform">
            <a
                onClick={() => {
                    dispatch(order({}));
                }}
                className={styles.button_to_order}
            >
                {t.menuLinkOrder}
            </a>
        </Link>
    );
};

export default ButtonToOrder;
