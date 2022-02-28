import React from 'react'
import Link from "next/link"
import classes from "./Header.module.css"
import Image from 'next/image'
import CartContext from "../../store/CartContext"
import { useContext } from 'react'
import AuthContext from '../../store/AuthContext'
import axios from "axios"

function Header() {

    const cartContext = useContext(CartContext)
    const authContext = useContext(AuthContext)

    const signOut = async () => {
        authContext.logOut()
        const res = await axios.get("/api/users/signout")
    }

    const links = [{label: "Explore", href: "/explore"},{label: "Sign In", href:"/auth/signin"}]
    

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
                    <li>
                        <Link href="/cart">
                            <a className={classes.a}>Cart {(cartContext.countCartItems() !== 0) ? <span className={classes.badge}>{cartContext.countCartItems()}</span>  : (null)}
                                {console.log(cartContext.countCartItems())}
                            </a>
                        </Link>
                    </li>
                </ul>
            </div>    
        </nav>
    )
}

export default Header
