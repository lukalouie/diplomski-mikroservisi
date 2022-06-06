import React, {useContext, useEffect} from 'react'
import { Button } from 'react-bootstrap'
import CheckoutSteps from "../../components/CheckoutSteps"
import FormContainer from '../../components/FormContainer'
import classes from "./payment.module.css"
import PaymentContext from "../../store/PaymentContext"
import CartContext from "../../store/CartContext"
import ShippingContext from '../../store/ShippingContext'
import AuthContext from '../../store/AuthContext'
import { useRouter } from 'next/router'


function PaymentScreen() {

    const context = useContext(PaymentContext)

    const prePreContext = useContext(CartContext)
    const preContext = useContext(ShippingContext)
    const authContext = useContext(AuthContext)

    const router = useRouter()

    var method = "PayPal"

    const handleMethodChange = (e) => {
        method = e.target.value
        console.log(method)
    }

    const handleProceedClick = () => {
        context.setPaymentMethod(method)
        router.push("/checkout/place-order")
    }

    useEffect(() => {
        console.log(prePreContext.cartItems)
        preContext.checkAllIn()
        if (prePreContext.cartItems.length === 0) {
            router.push("/cart")
        } else if (!preContext.allIn) {
            router.push("/checkout/shipping")
        } else if (!authContext.loggedIn) {
            router.push("/auth/signin")
        }
    }, [])

    return (
        <FormContainer>
        <CheckoutSteps step1 step2 />
        <div className={classes.div}>
        <h2 className={classes.h}>Select Payment Method</h2>
        <div className={classes.body}>
            <label className={classes.radLabel}>
                <input value="PayPal" type="radio" className={classes.radInput} name="method" defaultChecked={true} onClick={handleMethodChange} />
                <div className={classes.radDesign}></div>
                <div className={classes.radText}> PayPal</div>
            </label>

            <label className={classes.radLabel}>
                <input value="Stripe" type="radio" className={classes.radInput} name="method" onClick={handleMethodChange} />
                <div className={classes.radDesign}></div>
                <div className={classes.radText}> Stripe</div>
            </label>
            <Button variant="outline-info" className={classes.botun} onClick={handleProceedClick}>Proceed</Button>
        </div>
        </div>
        </FormContainer>
    )
}

export default PaymentScreen
