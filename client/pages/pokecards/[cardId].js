import {React, useContext} from 'react'
import {useRouter} from "next/router"
import { getData } from '../explore'
import path from "path"
import fs from "fs/promises"
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import Image from 'next/image'
import { library, icon } from '@fortawesome/fontawesome-svg-core'
import { faTags, faBolt, faCodeBranch, faCartPlus, faMicroscope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from "./[cardId].module.css"
import CartContext from "../../store/CartContext" 

library.add(faTags)
library.add(faBolt)
library.add(faCodeBranch)
library.add(faCartPlus)
library.add(faMicroscope)


function CardDetails(props) {

    const router = useRouter()
    const cartContext = useContext(CartContext)
    const pid = router.query
    const {cardId} = pid

    const card = props.cards.find((item) => (item.id === cardId))

    const handleCartClick = () => {
        cartContext.addCartItem(card)
        console.log(cartContext.cartItems)
        router.push("/cart")
    }

    

    const {name, image, evolution, description, category, fit, price} = card
    return (
        <Container className={classes.container}>
            <h2>{name}</h2>
            <br/>
            <Row>
                
                <Col style={{"textAlign":"center"}}>
                    
                    <Image src={image} width={215} height={300} />
                    <br/>
                    <Button variant="outline-success" style={{"fontSize":"20px"}} onClick={handleCartClick}>Add to Cart <FontAwesomeIcon icon={["fas", "cart-plus"]}/></Button>
                </Col>
            <Col>    
            <div>
                {description}
                <ul style={{"textAlign":"left"}} className={classes.ul}>
                <li><FontAwesomeIcon icon={["fas", "bolt"]} style={{"marginRight":"2rem"}}/>{evolution ? "This is an evolution pokemon" : "This is a basic non evolution pokemon"}</li>
                    <li><FontAwesomeIcon icon={["fas", "code-branch"]} style={{"marginRight":"2rem"}}/>It is a <u>{category}</u> category pokemon</li>
                    <li><FontAwesomeIcon icon={["fas", "microscope"]} style={{"marginRight":"2rem"}}/>Card is in a {fit} condition</li>
                    <li><FontAwesomeIcon icon={["fas", "tags"]} style={{"marginRight":"2rem"}}/><span style={{"color":"green"}}>${price.toString()}</span></li>
                </ul>
            </div>
            </Col>
            </Row>
        </Container>
    )
}

export async function getStaticProps() {
    const filePath = path.join(process.cwd(), "data", "cards.json")
    
    const jsonData = await fs.readFile(filePath)
    
    const data = JSON.parse(jsonData)
    

    return ( {
        props: {
            cards: data.cards
        }
    })
}

export async function getStaticPaths() {
    
    return {
        paths: [{params: {cardId: "1"}},
        {params: {cardId: "2"}},
        {params: {cardId: "3"}},
        {params: {cardId: "4"}},
        {params: {cardId: "5"}},
        {params: {cardId: "6"}},
        {params: {cardId: "7"}},
        {params: {cardId: "8"}},
        {params: {cardId: "9"}},
        {params: {cardId: "10"}},
        {params: {cardId: "11"}},
        {params: {cardId: "12"}}],
        fallback: true
    }
}

export default CardDetails
