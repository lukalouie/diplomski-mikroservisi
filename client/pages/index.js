import React from "react"
import {useRouter} from 'next/router'
import {StyledIndexView} from "./index.styles"
import { Button } from "../components/Button/Button.js"


function Page() {

    const router = useRouter()

    const handleSignUpClick = () => {
        router.push("/auth/signup")
    }

    
      return (
        <StyledIndexView>
            <span>Hi! Nice to see you!</span>
            <span>please sign up if you do not have an accout</span>
            <div>
            <Button text="Sign Up" onClick={handleSignUpClick} />
            </div>
        </StyledIndexView>
      );
    }

export default Page
