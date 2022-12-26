import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { breadcrumbs } from '../../locales/breadcrumbs';

import styles from '../../styles/Breadcrumbs.module.scss';

const Breadcrumbs = () => {
    const router = useRouter();
    const t = breadcrumbs[router.locale];

    let [crumbs, setCrumbs] = useState([]);

    useEffect(() => {
        let currentPath = router.asPath.split('/').filter((n) => n);
        setCrumbs(currentPath);
    }, []);

    console.log(router);
    return (
        <div className={`${styles.breadcrumbs_container}`}>
            {router.asPath != '/' && (
                <Link href={'/'}>
                    <a className={`${styles.breadcrumbs_link}`}>
                        {t.home}
                        <span className={`${styles.breadcrumbs_separator}`}>
                            /
                        </span>
                    </a>
                </Link>
            )}
            {crumbs.length > 0 &&
                crumbs.map((elem, i, arr) => {
                    if (i != arr.length - 1) {
                        let link = '';
                        crumbs.forEach((el, idx) => {
                            console.log(idx, i);
                            if (idx <= i) {
                                link = link + '/' + el;
                            }
                        });
                        console.log(link);
                        return (
                            <div key={i}>
                                <Link href={link}>
                                    <a className={`${styles.breadcrumbs_link}`}>
                                        {t[elem]}
                                        <span
                                            className={`${styles.breadcrumbs_separator}`}
                                        >
                                            /
                                        </span>
                                    </a>
                                </Link>
                            </div>
                        );
                    } else
                        return (
                            <span
                                className={`${styles.breadcrumbs_link} ${styles.breadcrumbs_disable}`}
                            >
                                {t[elem]}
                            </span>
                        );
                })}
        </div>
    );
};

export default Breadcrumbs;
