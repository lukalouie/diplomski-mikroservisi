import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "@fortawesome/free-regular-svg-icons";
import "@fortawesome/free-brands-svg-icons";
import Layout from "../components/layout/Layout";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { CartContextProvider } from "../store/CartContext";
import { PaymentContextProvider } from "../store/PaymentContext";
import { ShippingContextProvider } from "../store/ShippingContext";
import { AuthContextProvider } from "../store/AuthContext";
import buildClient from "../api/buildClient";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

library.add(fas);
library.add(fab);

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <AuthContextProvider>
      <ShippingContextProvider>
        <PaymentContextProvider>
          <CartContextProvider>
            <Layout>
              <Header currentUser={currentUser} />
              <Component {...pageProps} currentUser={currentUser} />
            </Layout>
          </CartContextProvider>
        </PaymentContextProvider>
      </ShippingContextProvider>
    </AuthContextProvider>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/current");

  console.log(data);

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
