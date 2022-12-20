import { useState, useEffect } from 'react';
import Link from 'next/link';

import MainContainer from '../../components/MainContainer';

import styles from '../../styles/App.module.scss';
import MainOrder from '../../components/MainOrder';
import { useRouter } from 'next/router';
import { seoTags } from '../../data-elements/seoTags';
import { translates } from '../../locales/locales';

const Order = () => {
    const router = useRouter();
    const seo = seoTags[router.locale];

    return (
        <MainContainer title={seo.ps4.title} description={seo.ps4.description}>
            <div className={`${styles.app_main}`}>
                <h1 className={`${styles.app_h1}`}>
                    {translates[router.locale].h1_1} <br />
                    {translates[router.locale].h1_2}
                </h1>
                <MainOrder havePlatform={false} />
            </div>
        </MainContainer>
    );
};

export default Order;
