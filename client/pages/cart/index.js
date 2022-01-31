import {React, useContext, useState} from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import CartCard from '../../components/CartCard'
import CartContext from '../../store/CartContext'
import classes from "./index.module.css"
import { library, icon } from '@fortawesome/fontawesome-svg-core'
import { faFrown, faCreditCard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from "next/router"

library.add(faFrown)
library.add(faCreditCard)

function Cart() {


    const cartContext = useContext(CartContext)
    const router = useRouter()

    let total = 0
    
    
    const handleExploreClick = () => {
        router.push("/explore")
    }

    const handleCheckOutClick = () => {
        router.push("/checkout/shipping")
    }

    return (
        <div style={{"textAlign":"center", "alignItems":"center", "alignContent":"center", "alignSelf":"center", "position":"relative"}}>
        {(cartContext.countCartItems() !== 0) ? (
             
                <Container className={(cartContext.countCartItems() === 1) ? (classes.cont) : (null)}>
                    <Row>
                        <Col style={{"alignItems":"center"}}>    
                            {cartContext.cartItems.map((item) => { return (<li key={item.id} style={{"listStyleType":"none"}}><CartCard card={item} />
                            <br/></li>) })}
                        </Col>
                        <Col>
                            <div className={classes.total}>
                                <h2>SUBTOTAL</h2>
                                {cartContext.cartItems.map((item) => {
                                  total = total + item.price  
                                })}
                                <h6 style={{"color":'green'}}>${total}</h6>
                                <Button style={{"fontSize": "20px", "letterSpacing":"0.2rem", "marginBottom":"5px"}} variant="outline-success" onClick={handleCheckOutClick}>Check Out <FontAwesomeIcon icon={["fas", "credit-card"]}/></Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
                ) : (
                    <div className={classes.emptyBig}>
                    <div className={classes.empty}>
                        <h2>Your Cart is Empty <FontAwesomeIcon icon={["fas", "frown"]}/></h2>
                            <Button style={{"marginTop":"200px", "fontSize": "25px", "letterSpacing":"0.2rem"}} variant="outline-secondary" onClick={handleExploreClick}>Go Explore</Button>
                    </div>
                    </div>)}
        
        </div>
    )
}

export default Cart
