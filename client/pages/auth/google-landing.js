import Link from 'next/link'
import React, {useContext, useEffect} from 'react'
import AuthContext from '../../store/AuthContext'
import {Button} from "react-bootstrap"
import {useRouter} from "next/router"
import Image from "next/image"
import classes from "./google-landing.module.css"
import axios from "axios"
import buildClient from '../../api/buildClient'

function googleLanding({user}) {

  const context = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    context.logIn()
    context.user = user
  }, [])

  const goExplore = () => {
    router.push("/explore")
  }

  return (
    <div className={classes.div}>
        <h2>You are signed in with Google.</h2>
        <br/> 
        In case you want us to remember your data please <Link href={"/auth/signin"}>sign in</Link> with your account or <Link href={"/auth/signup"}>create one</Link>, otherwise feel free to continue using Google sign in.
        <br/>
        <br/>
        <Button variant="outline-success" onClick={goExplore}>Explore</Button>
        <br/>
        <br/>
        <Image height={625} width={1114} src={"/images/riba.png"} />
    </div>
  )
}
googleLanding.getInitialProps = async context => {
    const client = buildClient(context)
    const {data} = await client.get("/api/users/current")
    console.log(`init props - ${data.user}`)
    return data
  }

/* export async function getStaticProps() {
  try {
    const response = await axios.get("http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/auth/google/user")
    console.log(response.data.user)

    return {
      props: {
        currentUser: response.data.user,
      },

      
    }
  } catch (error) {
    console.log(error)
  }
} */

export default googleLanding