import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { translates } from '../../locales/locales';
import { terms } from '../../locales/terms';

import ButtonToOrder from '../ButtonToOrder/ButtonToOrder';

import styles from '../../styles/TermsContent.module.scss';

const TermsContent = () => {
    const router = useRouter();
    const t = translates[router.locale];

    return (
        <div className="content">
            <h2 className={`${styles.terms_h}`}>{t.user_agreement}</h2>

            {terms[router.locale].map((el, i) => {
                return (
                    <p className={`${styles.p_text}`} key={i}>
                        {el.p}
                    </p>
                );
            })}
            <p className={`${styles.p_text}`}>
                <a
                    href="/Terms_and_conditions_from_01_10_2020_01_10_2020_07_02_2021.pdf"
                    target={'_blank'}
                    className={`${styles.terms_link}`}
                >
                    {t.termsa1}
                </a>
            </p>
            <p className={`${styles.p_text}`}>
                <a
                    href="/Terms_and_conditions_from_08_02_2021_08_02_2021_03_06_2021.pdf"
                    target={'_blank'}
                    className={`${styles.terms_link}`}
                >
                    {t.termsa2}
                </a>
            </p>
            <p className={`${styles.p_text}`}>
                <a
                    href="/Privacy_Policy_from_01_10_2020_01_10_2020_07_02_2021.pdf"
                    target={'_blank'}
                    className={`${styles.terms_link}`}
                >
                    {t.termsa3}
                </a>
            </p>
            <ButtonToOrder />
        </div>
    );
};

export default TermsContent;
