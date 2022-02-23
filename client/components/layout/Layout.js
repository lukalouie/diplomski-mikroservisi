import Header from "./Header"
import { Fragment } from "react"
import classes from "./Layout.module.css"
import Footer from "./Footer"

import React from 'react'

function Layout(props) {
    return (
        <Fragment>
        <Header />
        <div>
            <main className={classes.main}>
                {props.children}
            </main>
        </div>
        <Footer />
        </Fragment>
    )
}

export default Layout
