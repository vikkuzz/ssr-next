import MainContainer from "../components/MainContainer";
import Calculator from "../components/Calculator";

import styles from "../styles/App.module.scss";

const Index = () => {
  return (
    <>
      <MainContainer keywords={", main page"}>
        <div className={`${styles.app_main}`}>
          <h1 className={`${styles.app_h1}`}>
            Самые безопасные монеты FIFA 23 тут!
          </h1>
          <Calculator />
        </div>
      </MainContainer>
    </>
  );
};

export default Index;
