import React, { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { fbAuth } from "../../utils/auth";
import styles from "../../styles/BurgerMenu.module.scss";

const Auth = () => {
  const containergoogle = React.createRef();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(googleAuth, 1000);
  }, []);

  function googleAuth() {
    function handleCredentialResponse(response) {
      authToken(response.credential, "google");
    }

    let googleScript = document.createElement("script");
    googleScript.onload = () => {
      google.accounts.id.initialize({
        client_id:
          "754137399246-qabm6770ckoo0puec4pibpbsh79pvi44.apps.googleusercontent.com",
        ux_mode: "popup",
        // auto_select: true,
        select_by: "btn",
        callback: handleCredentialResponse,
      });

      google.accounts.id.renderButton(containergoogle.current, {});

      // отображать one tap окошко
      google.accounts.id.prompt();
    };
    googleScript.src = "https://accounts.google.com/gsi/client";
    googleScript.defer = true;
    document.head.appendChild(googleScript);
  }
  return (
    <div className={styles.auth}>
      <div className={styles.auth_text}>Зарегистрируйтесь через:</div>
      <div className={styles.auth_btns_wrapper}>
        <div className={styles.auth_fb_wrapper}>
          <button onClick={() => fbAuth()} className={styles.auth_fb}>
            <img className={styles.auth_fb_img} src="/img/fb-color.svg" />
          </button>
        </div>

        <div ref={containergoogle}></div>
      </div>
    </div>
  );
};

export default Auth;
