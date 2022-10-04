import { wrapper } from "../store";
import { SessionProvider } from "next-auth/react";
import "../styles/global.css";

// This default export is required in a new `pages/_app.js` file.
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default wrapper.withRedux(MyApp);
