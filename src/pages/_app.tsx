import "../styles/globals.css";
import "../styles/custom.css";
import "../styles/tops.css";
import "../styles/rules.css";
import React from "react";
import Layout from "layouts";
import ErrorBoundary from "containers/error-boundary";

import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import "primereact/resources/themes/rhea/theme.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "react-spring-bottom-sheet/dist/style.css";

import { AppPropsWithLayout } from "types/layout.type";
import { RXStore } from "store/rx.store";
import { Provider } from "react-redux";
import store from "store";
import { SessionProvider, useSession } from "next-auth/react";

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <ErrorBoundary onReset={() => window.location.reload()}>
      <Provider store={store}>
        <SessionProvider session={pageProps.session}>
          {Component.requireAuth ? (
            <Auth>{getLayout(<Component {...pageProps} />)}</Auth>
          ) : (
            getLayout(<Component {...pageProps} />)
          )}
          <RXStore />
        </SessionProvider>
      </Provider>
    </ErrorBoundary>
  );
}

function Auth({ children }: any) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
}
