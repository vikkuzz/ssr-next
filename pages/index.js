import MainContainer from '../components/MainContainer';
import Calculator from '../components/Calculator';

import styles from '../styles/App.module.scss';
import Howdelivery from '../components/HowDelivery';
import TextBlockContainer from '../components/TextBlockContainer';
import Aside from '../components/Aside';
import { translates } from '../locales/locales';
import { Router, useRouter } from 'next/router';

const Index = () => {
    const router = useRouter();
    return (
        <>
            <MainContainer keywords={', main page'}>
                <div className={`${styles.app_main}`}>
                    <h1 className={`${styles.app_h1}`}>
                        {translates[router.locale].h1_1} <br />
                        {translates[router.locale].h1_2}
                    </h1>
                    <Calculator />
                    <Howdelivery />
                    <TextBlockContainer />
                </div>

                <Aside />
            </MainContainer>
        </>
    );
};

export default Index;
