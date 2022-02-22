import Link from 'next/link'
import React, { useCallback, useContext } from 'react'
import SignComponent from '../../components/SignComponent'
import classes from "./signup.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import axios from "axios"

function Signup() {


    const handleClick = async () => {
        const url = await axios.get("/api/users/auth/google/url").then(res => res.data).catch(error => console.log(error))
        window.location.href  = url
    }

    return (
        <div className={classes.div}>
            <SignComponent type={"Sign Up"} url={"/api/users/signup"} gotoUrl={"/auth/goto"}/>
            <br/>
            Already a member? <Link href={"/auth/signin"}>Sign In</Link>
            <br/>
            Continue with Google? <button className={classes.button} onClick={handleClick}><FontAwesomeIcon className={classes.icon} icon={["fab", "google"]} size="1x" /></button>
        </div>
    )
}

export default Signup
