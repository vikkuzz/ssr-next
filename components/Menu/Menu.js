import React from 'react';

import BuyCoinsDropdown from '../BuyCoinsDropdown/BuyCoinsDropdown';

import styles from '../../styles/Menu.module.scss';
import OptionWithItems from '../OptionWithItems/OptionWithItems';
import Link from 'next/link';

let counter = 0;

const Menu = ({ children, title, menuItems }) => {
    return (
        <div className={`${styles.menu_container}`}>
            <div className={`${styles.title_wrapper}`}>
                <div className={`${styles.divider_wrapper}`}>
                    <div className={`${styles.divider}`}></div>
                </div>
                <div className={`${styles.title}`}>{title}</div>
                <div className={`${styles.divider_wrapper}`}>
                    <div className={`${styles.divider}`}></div>
                </div>
            </div>
            <menu className={`${styles.menu}`}>
                {children}

                {menuItems &&
                    menuItems.map((el) => (
                        <Link key={(counter += 1)} href={el.url}>
                            <a className={`${styles.option_btn}`}>{el.name}</a>
                        </Link>
                    ))}
            </menu>
        </div>
    );
};

export default Menu;
