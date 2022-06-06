import React, { useContext, useEffect } from "react"
import { Button } from "react-bootstrap"
import { useRouter } from "next/router"
import classes from "./goto.module.css"
import Image from "next/image"
import AuthContext from "../../store/AuthContext"
import buildClient from "../../api/buildClient"
import axios from "axios"


function Goto({user}) {
  const router = useRouter()

  

  const context = useContext(AuthContext)

  useEffect(() => {
    context.logIn()
    context.user = user
  }, [])

  const goExplore = () => {
    router.push("/explore")
  }
  return (
    <div className={classes.div1}>
      <div className={classes.div}>
        <h2>Thank you for joining the team!</h2>
        <br />
        Now go out there and find yourself some PokeCardz!
        <br />
        <br />
        <Button variant="outline-success" onClick={goExplore}>
          Explore
        </Button>
        <br />
      </div>
      <Image
        className={classes.img}
        height={300}
        width={500}
        src={"/images/teamRocket.png"}
      />
    </div>
  )
}

Goto.getInitialProps = async context => {
    const client = buildClient(context)
    const {data} = await client.get("/api/users/current")
    return data
  }

  export default Goto
