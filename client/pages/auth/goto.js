import React from 'react'
import { Button } from 'react-bootstrap'
import { useRouter } from 'next/router'
import classes from "./goto.module.css"
import Image from "next/image"

function Goto() {
    
    const router = useRouter()

    const goExplore = () => {
        router.push("/explore")
    }
    return (
        <div className={classes.div1}>
        <div className={classes.div}>
            <h2>Thank you for joining the team!</h2>
            <br/>
            Now go out there and find yourself some PokeCardz!
            <br/>
            <br/>
            <Button variant="outline-success" onClick={goExplore}>Explore</Button>
            <br/>

        </div>
        <Image className={classes.img} height={300} width={500} src={"/images/teamRocket.png"} />
        </div>
    )
}

export default Goto
