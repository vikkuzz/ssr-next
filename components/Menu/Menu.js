import React from 'react';

import BuyCoinsDropdown from '../BuyCoinsDropdown/BuyCoinsDropdown';

import styles from '../../styles/Menu.module.scss';
import OptionWithItems from '../OptionWithItems/OptionWithItems';
import Link from 'next/link';

const Menu = () => {
    return (
        <div className={`${styles.menu_container}`}>
            <div className={`${styles.title_wrapper}`}>
                <div className={`${styles.divider_wrapper}`}>
                    <div className={`${styles.divider}`}></div>
                </div>
                <div className={`${styles.title}`}>Menu</div>
                <div className={`${styles.divider_wrapper}`}>
                    <div className={`${styles.divider}`}></div>
                </div>
            </div>
            <menu className={`${styles.menu}`}>
                <OptionWithItems />
                <Link href={'/delivery'}>
                    <a className={`${styles.option_btn}`}>Delivery</a>
                </Link>
                <Link href={'/faq'}>
                    <a className={`${styles.option_btn}`}>FAQ</a>
                </Link>
            </menu>
        </div>
    );
};

export default Menu;
