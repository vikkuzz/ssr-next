import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { translates } from '../../locales/locales';
import { privacy } from '../../locales/privacy';

import ButtonToOrder from '../ButtonToOrder/ButtonToOrder';

import styles from '../../styles/PrivacyContent.module.scss';

const PrivacyContent = () => {
    const router = useRouter();
    const t = translates[router.locale];

    return (
        <div className="content">
            {privacy[router.locale].map((el, i) => {
                return (
                    <p className={`${styles.p_text}`} key={i}>
                        {el.p}
                    </p>
                );
            })}
            <p className={`${styles.p_text}`}>
                {t.privacya1}
                <Link href="/termsold">
                    <a
                        href="https://royalfut.com"
                        target={'_blank'}
                        className={`${styles.link}`}
                    >
                        https://royalfut.com
                    </a>
                </Link>
                {router.locale === 'de' && ' registriert ist.'}
                {router.locale === 'ch' && ' 注册之日起生效。'}
                {router.locale === 'tr' &&
                    ' kayıt olduğu anda yürürlüğe girer.'}
            </p>
            <p className={`${styles.p_text}`}>
                {t.privacya2}

                <a
                    href="mailto:support@royalfut.com"
                    target={'_blank'}
                    className={`${styles.link}`}
                >
                    support@royalfut.com
                </a>
            </p>
            <ButtonToOrder />
        </div>
    );
};

export default PrivacyContent;
