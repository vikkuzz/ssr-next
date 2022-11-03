import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';

import styles from '../../styles/PriceCoupon.module.scss';

const PriceCoupon = () => {
    const stateCoins = useSelector((state=>state.royalfutReducer.coins)) || 100000;
    const stateCurrency = useSelector((state=>state.royalfutReducer.currency.currency))

    let [hide,setHide] = useState(true);

  return (
    <div className={`${styles.price}`}>
        <div className={`${styles.price_wrapper}`}>
            {stateCurrency} {stateCoins.price}
        </div>
        <button className={`${styles.coupon}`} onClick={()=>setHide(!hide)}>
            Have a coupon
        </button>
        <div className={`${styles.coupon_container_content} ${hide && styles.coupon_content_hide}`}>
            <fieldset className={`${styles.coupon_fieldset}`}>
                <legend className={`${styles.coupon_legend}`}>Coupon</legend>
                <input className={`${styles.coupon_input}`} type={'text'}></input>
                <button className={`${styles.coupon_btn}`} type='button'>APPLY coupon</button>
            </fieldset>
        </div>
        
    </div>
  )
}

export default PriceCoupon