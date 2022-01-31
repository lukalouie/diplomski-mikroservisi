import Header from "./Header"
import { Fragment } from "react"
import classes from "./Layout.module.css"
import Footer from "./Footer"

import React from 'react'

function Layout(props) {
    return (
        <Fragment>
        <Header />
        <body>
            <main className={classes.main}>
                {props.children}
            </main>
        </body>
        <Footer />
        </Fragment>
    )
}

export default Layout
