import React, {useEffect, useState} from 'react'
import axios from "axios"
import {useRouter} from "next/router"
import classes from "./index.module.css"

const getAdmin = async () => {
  const res = await axios.get("/api/users/current")
  return res.data.currentUser
}

const getGoogleAdmin = async () => {
  const res = await axios.get("/api/users/auth/google/user")
  return res.data
}

function Index() {
  
  const [admin, setAdmin] = useState({})

  const router = useRouter()

  const handleCreateCardClick = () => {
    router.push("/admin/create-card")
  }

  const handleConfigureUsersClick = () => {
    
  }

  useEffect(() => {


    getAdmin().then((res) => {
      const admin = res
      console.log(res)
      if (admin !== undefined && admin!==null) {
        setAdmin(admin)
        console.log(admin)
        return
      }
    })


    getGoogleAdmin().then((res) => {
      const admin = res.user
      if (admin !== undefined && admin!==null) {
        setAdmin(admin)
        return
      }
    })

    return

  }, [])

  /* const admin = context. */
  return (
    <div className={classes.container}>
        <h2>Administration</h2>
        <p>Hi {admin.email}, here you can configure orders, users and products.</p>
        <button onClick={handleCreateCardClick} className={classes.createCardButton}>Add card</button>
        <button onClick={handleConfigureUsersClick}>Configure users</button>
    </div>
  )
}

export default Index