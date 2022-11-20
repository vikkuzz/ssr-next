import MainContainer from '../components/MainContainer';
import Calculator from '../components/Calculator';

import styles from '../styles/App.module.scss';
import Howdelivery from '../components/HowDelivery';
import TextBlockContainer from '../components/TextBlockContainer';
import Aside from '../components/Aside';

const Index = () => {
    return (
        <>
            <MainContainer keywords={', main page'}>
                <div className={`${styles.app_main}`}>
                    <h1 className={`${styles.app_h1}`}>
                        Самые безопасные <br />
                        монеты FIFA 23 тут!
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
