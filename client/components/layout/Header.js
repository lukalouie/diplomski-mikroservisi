import React, {useEffect, useState} from 'react'
import Link from "next/link"
import classes from "./Header.module.css"
import Image from 'next/image'
import CartContext from "../../store/CartContext"
import { useContext } from 'react'
import AuthContext from '../../store/AuthContext'
import axios from "axios"


function Header({currentUser}) {

    const cartContext = useContext(CartContext)
    const authContext = useContext(AuthContext)

    const [isAdmin, setIsAdmin] = useState(false)

    const signOut = async () => {
        authContext.logOut()
        const res = await axios.get("/api/users/signout")
    }


     useEffect(() => {
         console.log(currentUser)
         let user = currentUser
        if (user && user.admin) {
            setIsAdmin(true)
        } else {
            setIsAdmin(false)
        }
        
    })

    const checkAdmin = () => {
        if (isAdmin) {
            return "inline"
        } else {
            return "none"
        }
    }

    return (
        <nav className={classes.header}>
            <Link href="/">
                <a className={classes.logo}><Image src="/images/o31.gif" width={200} height={80}/></a>
            </Link>
            <div className="d-flex justify-content-end">
                <ul className={classes.ul}>
                    <li key="exp" className={classes.li}>
                        <Link href="/explore">
                            <a className={classes.a}>Explore</a>
                        </Link>
                    </li>
                    <li key="sign" className={classes.li}>
                        <Link href={authContext.loggedIn ? "/" : "/auth/signin"}>
                            <a onClick={authContext.loggedIn ? signOut : null} className={classes.a}>{authContext.loggedIn ? "Sign Out" : "Sign In"}</a>
                        </Link>
                        </li>
                    <li style={{display:checkAdmin()}} key="admin" className={classes.li}>
                        <Link href={"/admin"}>
                            <a className={classes.a}>Admin</a>
                        </Link>
                        </li>
                    <li>
                        <Link href="/cart">
                            <a className={classes.a}>Cart {(cartContext.countCartItems() !== 0) ? <span className={classes.badge}>{cartContext.countCartItems()}</span>  : (null)}
                            </a>
                        </Link>
                    </li>
                </ul>
            </div>    
        </nav>
    )
}

/* Header.getInitialProps = async context => {
    const client = buildClient(context)
    const {data} = await client.get("/api/users/current")
    console.log("header IP")
    console.log(data)
    return data
  } */

export default Header
