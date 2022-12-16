import { useState, useEffect } from 'react';
import Link from 'next/link';

import MainContainer from '../components/MainContainer';

import styles from '../styles/App.module.scss';
import { useRouter } from 'next/router';
import { translates } from '../locales/locales';
import Aside from '../components/Aside';
import { seoTags } from '../data-elements/seoTags';
import PrivacyContent from '../components/PrivacyContent/PrivacyContent';

const Privacy = () => {
    const router = useRouter();
    const seo = seoTags[router.locale];
    return (
        <MainContainer
            title={seo['privacy-policy'].title}
            description={seo['privacy-policy'].description}
        >
            <div className={`${styles.app_main}`}>
                <h2 className={`${styles.app_h1}`}>
                    {translates[router.locale].footerLinkPrivacyPolicy}
                </h2>
                <PrivacyContent />
            </div>
        </MainContainer>
    );
};

export default Privacy;
