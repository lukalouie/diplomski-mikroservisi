import Link from 'next/link'
import React from 'react'
import SignComponent from '../../components/SignComponent'
import classes from "./signin.module.css"

function SignIn() {


    return (
        <div className={classes.div}>
            <SignComponent type={"Sign In"} url={"/api/users/login"} gotoUrl={"/"}/>
            <br/>
            Not a member yet? <Link href={"/auth/signup"}>Sign Up</Link>
        </div>
    )
}

export default SignIn
