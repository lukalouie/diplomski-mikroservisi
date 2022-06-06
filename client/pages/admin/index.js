import React, {useEffect, useState} from 'react'
import axios from "axios"
import {useRouter} from "next/router"
import classes from "./index.module.css"
import { Button } from '../../components/Button/Button'

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

  const handleOrderClick = () => {
    router.push("/admin/orders")
  }

  const handleShippingClick = () => {
    router.push("/admin/shippings")
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

  return (
    <div className={classes.container}>
        <h2>Administration</h2>
        <p>Hi {admin.email}, here you can configure orders, users and products.</p>
        <Button onClick={handleCreateCardClick} className={classes.createCardButton} text="Add card"/>
        <Button onClick={handleOrderClick} className={classes.configureUserButton} text="Orders" />
        <Button onClick={handleShippingClick} className={classes.configureUserButton} text="Shipments" />

    </div>
  )
}

export default Index