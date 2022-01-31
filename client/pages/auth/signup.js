import Link from 'next/link'
import React from 'react'
import SignComponent from '../../components/SignComponent'
import classes from "./signup.module.css"

function Signup() {

    return (
        <div className={classes.div}>
            <SignComponent type={"Sign Up"} url={"/api/users/signup"} gotoUrl={"/auth/goto"}/>
            <br/>
            Already a member? <Link href={"/auth/signin"}>Sign In</Link>
        </div>
    )
}

export default Signup
