import React from 'react';

import styles from '../../styles/TextBlock.module.scss';

import TextBlock from '../TextBlock/TextBlock';

const TextBlockContainer = () => {
    return (
        <div className={`${styles.textblock_container}`}>
            <div className={`${styles.textblock_row}`}>
                <TextBlock
                    img={'/img/purple.svg'}
                    title={'YOUR FIRST CHOICE'}
                    text={
                        'Our main goal is to provide you with the safest way to refill your FUT club balance for low price. Our prices do not contain any commissions or hidden fees. We spent years to develop such service.'
                    }
                />
                <TextBlock
                    img={'/img/blue.svg'}
                    title={'SAFEST DELIVERY'}
                    text={
                        'We are using Smart ANTI-BAN System 3.0 which works under special rules. For example, our system include manually earned coins for each order. Those rules guarantee 100% safety of your FUT club.'
                    }
                />
            </div>
            <div className={`${styles.textblock_row}`}>
                <TextBlock
                    img={'/img/red.svg'}
                    title={'FAST AND SIMPLE'}
                    text={
                        "We appreciate your time. Our interface and support are constantly being improved to make your orders run smoothly and quickly. Just a couple of clicks – and we'll do the rest."
                    }
                />
                <TextBlock
                    img={'/img/yellow.svg'}
                    title={'REFUND GURANTEE'}
                    text={
                        "If, after the purchase, you can't use the coins, or if there is any other reason why you can't get coins for your account, a refund is guaranteed."
                    }
                />
            </div>
        </div>
    );
};

export default TextBlockContainer;
