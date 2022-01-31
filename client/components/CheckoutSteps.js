import React from 'react'
import { Nav } from "react-bootstrap"
import Link from "next/link"
import classes from "./CheckoutSteps.module.css"

function CheckoutSteps({ step1, step2, step3 }) {
    return (
        <Nav className="justify-content-center mb-4">

            <Nav.Item>
                {step1 ? (
                    <Link href="/checkout/shipping" >
                        <Nav.Link className={classes.link}>Shipping</Nav.Link>
                    </Link>
                ) : <Nav.Link className={classes.link} disabled style={{"color":"smoke white"}}>Shipping</Nav.Link>}
            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                    <Link href="/payment" >
                        <Nav.Link className={classes.link} >Payment</Nav.Link>
                    </Link>
                ) : <Nav.Link className={classes.link} disabled>Payment</Nav.Link>}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                    <Link href="/placeorder" >
                        <Nav.Link className={classes.link} >Place Order</Nav.Link>
                    </Link>
                ) : <Nav.Link className={classes.link} disabled>Place Order</Nav.Link>}
            </Nav.Item>

        </Nav>
    )
}

export default CheckoutSteps
