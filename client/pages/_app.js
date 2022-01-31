import "bootstrap/dist/css/bootstrap.css"
import 'font-awesome/css/font-awesome.min.css'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { config, library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'
import "@fortawesome/free-regular-svg-icons"
import "@fortawesome/free-brands-svg-icons"
import Layout from "../components/layout/Layout"
import { fas } from '@fortawesome/free-solid-svg-icons'
import { CartContextProvider } from "../store/CartContext"
import { PaymentContextProvider } from "../store/PaymentContext"
import { ShippingContextProvider } from "../store/ShippingContext"
import { AuthContextProvider } from "../store/AuthContext";
import { SessionProvider } from 'next-auth/react'

library.add(fas)
library.add(fab)


const AppComponent = ({ Component, pageProps, currentUser }) => {
    return (
        <SessionProvider session={pageProps.session}>
        <AuthContextProvider>
        <ShippingContextProvider>
        <PaymentContextProvider>
        <CartContextProvider>
        <Layout>
            <Component {...pageProps} />
        </Layout>
        </CartContextProvider>
        </PaymentContextProvider>
        </ShippingContextProvider>
        </AuthContextProvider>
        </SessionProvider>

    )
}

//AppComponent.getInitialProps = async (appContext) => {
//    const client = buildClient(appContext.ctx)
//    const { data } = await client.get("/api/users/currentuser")

//    let pageProps = {}
//    if (appContext.Component.getInitialProps) {
//        pageProps = await appContext.Component.getInitialProps(appContext.ctx)
//    }
    

//    return {
//        pageProps,
//        ...data
//    }
//}

export default AppComponent