import MainContainer from '../components/MainContainer';
import Calculator from '../components/Calculator';

import styles from '../styles/App.module.scss';
import Howdelivery from '../components/HowDelivery';
import TextBlockContainer from '../components/TextBlockContainer';
import Aside from '../components/Aside';
import { translates } from '../locales/locales';
import { Router, useRouter } from 'next/router';
import { seoTags } from '../data-elements/seoTags';
import MainCover from '../components/MainCover/MainCover';
import H1 from '../components/H1/H1';
import SpecialOffer from '../components/SpecialOffer/SpecialOffer';

const Index = () => {
    const router = useRouter();
    const seo = seoTags[router.locale];
    return (
        <>
            <MainContainer
                keywords={', main page'}
                title={seo.title}
                description={seo.description}
            >
                <div className={`${styles.app_main}`}>
                    {/* <h1 className={`${styles.app_h1}`}>
                        {translates[router.locale].h1_1} <br />
                        {translates[router.locale].h1_2}
                    </h1>
                    <Calculator />
                    <Howdelivery />
                    <TextBlockContainer /> */}
                    <MainCover />
                    <H1 />
                    <Aside />
                    <div className={`${styles.wrapper_btns}`}>
                        <button className={` ${styles.buy_btn}`}>
                            buy coins
                        </button>
                        <button
                            className={`${styles.calc_btn} ${styles.buy_btn}`}
                        >
                            calculator
                            <img
                                className={`${styles.calc_icon}`}
                                src="/img/calc.svg"
                            />
                        </button>
                    </div>
                    <div className={`${styles.info_method}`}>
                        <a
                            href="#deliveryMain"
                            className={`${styles.method_info}`}
                        >
                            <span className={`${styles.info_text}`}>
                                {translates[router.locale].marketMethodWhat}
                            </span>
                            <img src="/img/what-question.svg" />
                        </a>
                    </div>
                    <SpecialOffer />
                    <Howdelivery />
                </div>

                {/* <Aside /> */}
            </MainContainer>
        </>
    );
};

export default Index;

// export async function getStaticProps(context) {
//     return {
//         props: {}, // will be passed to the page component as props
//     };
// }
