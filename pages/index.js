import Link from "next/link";
import A from "../components/A";
import Head from "next/head";
import MainContainer from "../components/MainContainer";
import { Provider } from "react-redux";

import store from "../store";

const Index = () => {
  return (
    <>
      <div className="body__backgr"></div>
      <Provider store={store}>
        <MainContainer keywords={"main page"}></MainContainer>
      </Provider>
    </>
  );
};

export default Index;
