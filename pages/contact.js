import { useState, useEffect } from 'react';
import Link from 'next/link';

import MainContainer from '../components/MainContainer';

import styles from '../styles/App.module.scss';
import { useRouter } from 'next/router';
import { translates } from '../locales/locales';
import Aside from '../components/Aside';
import { seoTags } from '../data-elements/seoTags';
import СontactsContent from '../components/СontactsContent';

const Contacts = () => {
    const router = useRouter();
    const seo = seoTags[router.locale];
    return (
        <MainContainer
            title={seo.contact.title}
            description={seo.contact.description}
        >
            <div className={`${styles.app_main} ${styles.app_contact_main}`}>
                <h2 className={`${styles.app_h1} ${styles.faq_h2}`}>
                    {translates[router.locale].footerLinkContact}
                </h2>
                <СontactsContent />
            </div>
        </MainContainer>
    );
};

export default Contacts;
