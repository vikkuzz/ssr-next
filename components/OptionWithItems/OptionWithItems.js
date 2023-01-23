import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

import { platforms } from '../../data-elements/platforms';

import styles from '../../styles/OptionWithItems.module.scss';

let count = 0;

const OptionWithItems = () => {
    const content = useRef();

    let [openOption, setOpenOption] = useState(false);
    const clickOption = () => {
        setOpenOption(!openOption);
    };
    useEffect(() => {
        if (openOption) {
            content.current.style.height = 'auto';
            content.current.style.overflow = 'auto';
            content.current.style.paddingTop = '20px';
        } else {
            content.current.style.height = '0px';
            content.current.style.overflow = 'hidden';
            content.current.style.paddingTop = '0px';
        }
    }, [openOption]);
    return (
        <div className={`${styles.option_container}`}>
            <button className={`${styles.option_btn}`} onClick={clickOption}>
                Buy coins{' '}
                <div className={`${styles.img_wrapper}`}>
                    <img
                        className={`${styles.img}`}
                        src="/img/arrow_drop_down.svg"
                    ></img>
                </div>
            </button>
            <div ref={content} className={`${styles.hidden_container}`}>
                {platforms.map((el) => (
                    <Link key={(count += 1)} href={el.url}>
                        <a className={`${styles.option_item}`}>{el.name}</a>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default OptionWithItems;
