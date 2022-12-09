import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { translates } from '../../locales/locales';

import styles from '../../styles/App.module.scss';

const ButtonToOrder = () => {
    const router = useRouter();
    const t = translates[router.locale];
    return (
        <Link href="/order">
            <a className={styles.button_to_order}>{t.menuLinkOrder}</a>
        </Link>
    );
};

export default ButtonToOrder;
