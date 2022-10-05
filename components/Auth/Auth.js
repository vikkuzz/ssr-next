import { useSession, signIn, signOut } from "next-auth/react";
import styles from "../../styles/BurgerMenu.module.scss";

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
        <div className={styles.auth_fb_wrapper}>
          <button className={styles.auth_fb} onClick={() => signIn()}>
            <img className={styles.auth_fb_img} src="/img/google-16.svg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
