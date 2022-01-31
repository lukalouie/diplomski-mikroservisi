import React from 'react'
import classes from "./404.module.css"
import Image from "next/image"

function Custom404() {
  return (
    <div className={classes.div404}>
      <h1>WUUUT?!</h1>
      <Image height={424} width={600} src="/images/psyduck.png"/>
    </div>
  )

}

export default Custom404
