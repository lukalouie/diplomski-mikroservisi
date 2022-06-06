import Header from "./Header"
import { Fragment, useEffect } from "react"
import classes from "./Layout.module.css"
import Footer from "./Footer"

import React from 'react'

function Layout(props) {

    return (
        <div className={classes.container}>
            {props.children}
            <Footer />
        </div>
    )
}

export default Layout
