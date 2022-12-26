import { useRouter } from 'next/router';
import React from 'react';
import { translates } from '../../locales/locales';

import styles from '../../styles/TextBlock.module.scss';

import TextBlock from '../TextBlock/TextBlock';

const TextBlockContainer = () => {
    const router = useRouter();
    const t = translates[router.locale];
    return (
        <div className={`${styles.textblock_container}`}>
            <div className={`${styles.textblock_row}`}>
                <TextBlock
                    img={'/img/Benefit1.svg'}
                    title={t.infoBlockTitle1}
                    text={t.infoBlockText1}
                />
                <TextBlock
                    img={'/img/Benefit2.svg'}
                    title={t.infoBlockTitle2}
                    text={t.infoBlockText2}
                />
            </div>
            <div className={`${styles.textblock_row}`}>
                <TextBlock
                    img={'/img/Benefit3.svg'}
                    title={t.infoBlockTitle3}
                    text={t.infoBlockText3}
                />
                <TextBlock
                    img={'/img/Benefit4.svg'}
                    title={t.infoBlockTitle4}
                    text={t.infoBlockText4}
                />
            </div>
        </div>
    );
};

export default TextBlockContainer;
