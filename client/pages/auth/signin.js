import Link from 'next/link'
import React from 'react'
import SignComponent from '../../components/SignComponent'
import classes from "./signin.module.css"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function SignIn() {

    const handleClick = async () => {
        const url = await axios.get("/api/users/auth/google/url").then(res => res.data).catch(error => console.log(error))
        window.location.href  = url
    }

    return (
        <div className={classes.div}>
            <SignComponent type={"Sign In"} url={"/api/users/login"} gotoUrl={"/"}/>
            <br/>
            Not a member yet? <Link href={"/auth/signup"}>Sign Up</Link>
            <br/>
            Continue with Google? <button className={classes.button} onClick={handleClick}><FontAwesomeIcon className={classes.icon} icon={["fab", "google"]} size="1x" /></button>
        </div>
    )
}

export default SignIn
