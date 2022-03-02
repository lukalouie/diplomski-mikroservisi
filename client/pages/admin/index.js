import React, {useEffect, useState} from 'react'
import axios from "axios"

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

  useEffect(() => {

    let finished = false

    getAdmin().then((res) => {
      const admin = res
      if (admin !== undefined && admin!==null) {
        setAdmin(admin)
        finished = true
      }
    })

    if(finished) {return}

    getGoogleAdmin().then((res) => {
      const admin = res.user
      if (admin !== undefined && admin!==null) {
        setAdmin(admin)
        finished = true
      }
    })

    if(finished) {return}


  }, [])

  /* const admin = context. */
  return (
    <div>
        <h2>Administration</h2>
        <p>Hi {admin.email}, here you can configure orders, users and products.</p>
    </div>
  )
}

export default Index