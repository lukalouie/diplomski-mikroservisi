import React, {useContext, useEffect, useState} from 'react'
import PaymentContext from '../../store/PaymentContext'
import CartContext from '../../store/CartContext'
import ShippingContext from '../../store/ShippingContext'
import { Card, Col, Container, Row } from 'react-bootstrap'
import SummaryCard from '../../components/SummaryCard'
import CheckoutSteps from '../../components/CheckoutSteps'
import classes from "./place-order.module.css"
import { PayPalButton } from 'react-paypal-button-v2'
import Loader from "../../components/Loader"
import { useRouter } from 'next/router'

function PlaceOrderScreen() {

    const paymentContext = useContext(PaymentContext)
    const cartContext = useContext(CartContext)
    const shippingContext = useContext(ShippingContext)

    const [sdkReady, setSdkReady] = useState(false);
    const [scriptReady, setScriptReady] = useState(false)

    const router = useRouter()

    const checkMargin = () => {

        let className

        if (cartContext.countCartItems() === 1) {
            className = classes.cont
        } else if (cartContext.countCartItems() === 2) {
            className = classes.cont2
        } else {
            className = classes.cont3
        }

        return className
    }

    useEffect(() => {
        const addPayPalScript = async () => {
          setScriptReady(true);
          const script = document.createElement('script')
          script.type = 'text/javascript'
          script.src = `https://www.paypal.com/sdk/js?client-id=AQbnoxxTbB4I-kR8a5hv-9eQsKIDWJ5zUvs6L01RL0ZEeX4JXPuSST04fDfyGAZdDf4aiWtjjnWW8Ude`
          script.async = true

          script.onload = () => setSdkReady(true)
    
          document.body.appendChild(script)
        }
    
        if (!scriptReady) {
          addPayPalScript()
        }
      })

      const successPaymentHandler = () => {

      }

      useEffect(() => {
        shippingContext.checkAllIn()
        if (cartContext.cartItems.length === 0) {
            router.push("/cart")
        } else if (!shippingContext.allIn) {
            router.push("/checkout/shipping")
        }
    }, [])

    return (
        <Container>
        <CheckoutSteps step1 step2 step3 />
            <Row>    
                <Col>
                    <Card style={{"border":"none"}} className={checkMargin()}>
                        <Col style={{"textAlign":"center", "alignContent":"center"}}>
                        <h2>Your Order</h2>
                        <br/>
                        <ul style={{"listStyleType":"none"}}>
                        {cartContext.cartItems.map((item) => {
                            
                            return <li key={item.id}><SummaryCard item={item}/><br/></li>
                        })}
                        </ul>
                        <p>
                          Method: {paymentContext.paymentMethod}
                        </p>
                        </Col>
                        <Col style={{"textAlign":"center"}}>
                            <h2>Shipping</h2>
                            <Card style={{"border":"none", "textAlign":"center"}}>
                                <Card.Text>
                                    Address: {shippingContext.address}
                                    <br/>
                                    {shippingContext.city}, {shippingContext.country}
                                    <br/>
                                    {shippingContext.zip}

                                </Card.Text>
                            </Card>
                        </Col>
                    
                    </Card>
                </Col>
            <Col>
            {!sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton
                    layout="vertical"
                    amount={cartContext.amount}
                    onSuccess={successPaymentHandler}
                    onButtonReady={() => setSdkReady(true)}
                  />
                )}
            </Col>
            </Row>
        </Container>
    )
}

export default PlaceOrderScreen
