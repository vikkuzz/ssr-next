import { useState, useEffect } from 'react';
import Link from 'next/link';

import MainContainer from '../components/MainContainer';

import styles from '../styles/App.module.scss';
import MainOrder from '../components/MainOrder';
import Howdelivery from '../components/HowDelivery';
import TextBlockContainer from '../components/TextBlockContainer';
import { useRouter } from 'next/router';
import { translates } from '../locales/locales';
import Aside from '../components/Aside';
import { seoTags } from '../data-elements/seoTags';
import CustomAccordion from '../components/CustomAccordion/CustomAccordion';

const Delivery = () => {
    const router = useRouter();
    const seo = seoTags[router.locale];
    return (
        <MainContainer
        //title={seo.order.title}
        //description={seo.order.description}
        >
            <div className={`${styles.app_main} ${styles.faq_main}`}>
                <h2 className={`${styles.app_h1} ${styles.faq_h2}`}>
                    {translates[router.locale].faqtitle}
                </h2>
                <CustomAccordion />
            </div>
        </MainContainer>
    );
};

export default Delivery;
