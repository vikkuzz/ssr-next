import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { currentCurrency } from '../../redux/actions/royalfutActions';

import styles from '../../styles/DropdownList.module.scss';
import { useOutsideClick } from '../../utils/hooks';

const DropdownList = ({ title, value }) => {
    const container = useRef();
    const drop = useRef();
    let [open, setOpen] = useState(false);
    const dropOn = () => {
        setOpen(!open);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        document.addEventListener('click', (e) => {
            if (!drop.current.contains(e.target)) {
                setOpen(false);
            }
        });
        return () => {
            document.removeEventListener('click', (e) => {
                if (!drop.current.contains(e.target)) {
                    setOpen(false);
                }
            });
        };
    }, []);

    useEffect(() => {
        if (open) {
            container.current.style.display = 'flex';
            container.current.style.opacity = '1';
            container.current.style.height = 'auto';
            container.current.style.top = '-193px';
            container.current.style.zIndex = '1';
        } else {
            container.current.style.opacity = '0';
            container.current.style.height = '0';
            container.current.style.top = '-140px';
            container.current.style.zIndex = '-1';
        }
    }, [open]);
    const changeCurrency = (e) => {
        //e.stopPropagation();
        dispatch(currentCurrency(e.target.id));
    };

    return (
        <div ref={drop} className={`${styles.container}`}>
            <button className={`${styles.title_wrapper}`} onClick={dropOn}>
                <span className={`${styles.title}`}>{title}</span>
                <img
                    className={`${styles.title_arrow} ${open && styles.rotate}`}
                    src={'../../img/arrow_drop_down.svg'}
                ></img>
            </button>
            <div className={`${styles.value_container}`} ref={container}>
                {value.map((el) => {
                    return (
                        <button
                            id={el.title}
                            key={el.id}
                            className={`${styles.drop_elem}`}
                            onClick={changeCurrency}
                        >
                            <div
                                id={el.title}
                                className={`${styles.value_img_wrapper}`}
                            >
                                <img
                                    id={el.title}
                                    src={el.url}
                                    className={`${styles.value_img}`}
                                ></img>
                            </div>
                            <span
                                id={el.title}
                                className={`${styles.value_title}`}
                            >
                                {el.title}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default DropdownList;
