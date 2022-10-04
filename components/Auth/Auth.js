import { useSession, signIn, signOut } from "next-auth/react";
import styles from "../../styles/BurgerMenu.module.scss";

import Facebook from "../SvgComponents/Facebook";

import Image from "next/image";

const Auth = () => {
  return (
    <div className={styles.auth}>
      <div className={styles.auth_text}>Зарегистрируйтесь через:</div>
      <div className={styles.auth_btns_wrapper}>
        <div className={styles.auth_fb_wrapper}>
          <button className={styles.auth_fb}>
            <img className={styles.auth_fb_img} src="/img/fb-color.svg" />
          </button>
        </div>
        <div>
          <button onClick={() => signIn()}>Sign in</button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
