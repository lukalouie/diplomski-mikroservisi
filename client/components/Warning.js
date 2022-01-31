import React from 'react'
import classes from "./Warning.module.css"

function PopUp(props) {
    return (
        <div className={classes.div}>
            {props.message}
        </div>
    )
}

export default PopUp