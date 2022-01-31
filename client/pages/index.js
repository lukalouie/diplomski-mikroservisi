import React, { useState } from "react"
import {useRouter} from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from "next/image"
import classes from "./index.module.css"


function Page() {

    const [src, setSrc] = useState("/images/oo.png")
    const [height, setHeight] = useState(600)
    const [width, setWidth] = useState(600)
    const [div, setDiv] = useState(classes.homeDiv)
    const [hidden, setHidden] = useState(false)


    const router = useRouter()

    const googleHandler = () => {
        setSrc("/images/oo.gif")
        setWidth(613)
        setHeight(714)
        setDiv(classes.homeDiv2)
        setHidden(true)
        setTimeout(router.push, 500, "/explore")
    }

    
      return (
        <div className={classes.homeDiv}>
            
            <Image className={classes.img} width={width} height={height} src={src} />
            <button className={classes.button} onClick={googleHandler}><FontAwesomeIcon className={classes.icon} icon={["fab", "google"]} size="2x" hidden={hidden} /></button>
        </div>
      );
    }

export default Page
