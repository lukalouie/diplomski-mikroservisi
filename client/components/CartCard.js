import Image from 'next/image'
import {React, useContext} from 'react'
import { Card, Button } from 'react-bootstrap'
import Link from "next/link"
import { library, icon } from '@fortawesome/fontawesome-svg-core'
import { faTags, faBolt, faCodeBranch, faCartArrowDown, faScrollOld, faMicroscope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from "./CartCard.module.css"
import CartContext from '../store/CartContext'
import { useRouter } from "next/router"

library.add(faTags)
library.add(faBolt)
library.add(faCodeBranch)
library.add(faCartArrowDown)
library.add(faMicroscope)

function CartCard(props) {

    const {id, name, image, description, evolution, category, fit, price} = props.card

    const cartContext = useContext(CartContext)

    const router = useRouter()

    function getFit() {
        if (fit === "mint") {
            return "lawnGreen"
        } else if (fit === "good") {
            return "yellow"
        } else {
            return "red"
        }
    }

    const colorFit = getFit()

    function getEvolution() {
        if (evolution) {
            return "gold"
        } else {
            return "silver"
        }
    }

    const colorEvo = getEvolution()

    const handleRemoveClick = (e) => {
        e.preventDefault()
        cartContext.removeCartItem(props.card)
        router.push("/cart")
    }

    return (
        <Link href={`/pokecards/${id}`}>
        <Card className={classes.card}>
            <Card.Title className={classes.title}>{name}</Card.Title>
            <Image src={image} width={215} height={300} />
            <Card.Text>
                <ul style={{"textAlign":"left", "listStyleType":"none", "padding":"0", "margin":"0"}}>
                    <li><FontAwesomeIcon icon={["fas", "bolt"]} className={classes.icon} color={colorEvo}/>{evolution ? "This is an evolution pokemon" : "This is a basic non evolution pokemon"}</li>
                    <li><FontAwesomeIcon icon={["fas", "code-branch"]} className={classes.icon} style={{"color":"blue"}}/>It is a <u>{category}</u> category pokemon</li>
                    <li><FontAwesomeIcon icon={["fas", "microscope"]} className={classes.icon} color={colorFit}/>Card is in a {fit} condition</li>
                    <li><FontAwesomeIcon icon={["fas", "tags"]} className={classes.icon} style={{"color":"green"}}/><span style={{"color":"green"}}>${price.toString()}</span></li>
                </ul>
                <Button variant="outline-danger" style={{"fontSize":"20px", "marginBottom":"5px"}} onClick={handleRemoveClick}>Remove from Cart <FontAwesomeIcon icon={["fas", "cart-arrow-down"]}/></Button>{' '}
            </Card.Text>
        </Card>
        </Link>
    )
}

export default CartCard
