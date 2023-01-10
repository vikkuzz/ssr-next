import React from 'react';

import styles from '../../styles/DropdownList.module.scss';

const DropdownList = ({ title, value }) => {
    return (
        <div className={`${styles.container}`}>
            <button>{title}</button>
            <div className={`${styles.value_container}`}>
                {value.map((el) => {
                    return <button>{el.title}</button>;
                })}
            </div>
        </div>
    );
};

export default DropdownList;
