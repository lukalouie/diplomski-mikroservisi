import React, {useState, useContext, useEffect} from "react"
import { Button, Form } from "react-bootstrap"
import FormContainer from "../../components/FormContainer"
import classes from "./shipping.module.css"
import CheckoutSteps from "../../components/CheckoutSteps"
import {useRouter} from "next/router"
import ShippingContext from "../../store/ShippingContext"
import CartContext from "../../store/CartContext"
import AuthContext from "../../store/AuthContext"
import PopUp from "../../components/Warning"

function ShippingScreen() {


const [address, setAddress] = useState("")
const [city, setCity] = useState("")
const [postalCode, setPostalCode] = useState("")
const [country, setCountry] = useState("")
const [warning, setWarning] = useState(false)

const router = useRouter()

const context = useContext(ShippingContext)
const preContext = useContext(CartContext)
const authContext = useContext(AuthContext)

const addrClick = (e) => {
    setAddress(e.target.value)
}

const cityClick = (e) => {
    setCity(e.target.value)
}

const zipClick = (e) => {
    setPostalCode(e.target.value)
}

const countryClick = (e) => {
    setCountry(e.target.value)
}

const submitHandler = (e) => {

    if (address==="" || country === "" || city === "" || postalCode === "") {
        e.preventDefault()
        setWarning(true)
    } else {
        e.preventDefault()
        context.setAll(true)
        context.setShippingAddress(address)
        context.setShippingCity(city)
        context.setShippingZip(postalCode)
        context.setShippingCountry(country)
        router.push("/checkout/payment")
    }

}
useEffect(() => {
    if (preContext.cartItems.length === 0) {
        router.push("/cart")
    } else if (!authContext.loggedIn) {
        router.push("/auth/signin")
    }
}, [])

    return (
            <FormContainer className={classes.container}>
            <CheckoutSteps step1 />
            <h2 style={{"fontFamily": "Shadows Into Light", "textAlign":"center", "letterSpacing":"0.5rem", "fontWeight":"bolder"}}>Shipping</h2>
            <br/>
            <Form className={classes.formGroup}>
                <Form.Group>
                    <input type="text" name="address" className={classes.inputStreet} id="add" value={address} requiredautocomplete="off" placeholder="Address" onChange={addrClick} />
                </Form.Group>
                <Form.Group controlId="city">
                    <input type="text" name="city" className={classes.inputCity} id="cty" value={city} requiredautocomplete="off" placeholder="City" onChange={cityClick} />
                </Form.Group>
                <Form.Group controlId="postalCode">
                    <input type="text" name="postalCode" className={classes.inputZip} id="pstl" value={postalCode} requiredautocomplete="off" placeholder="Postal code" onChange={zipClick} />
                </Form.Group>
                <Form.Group controlId="country">
                    <input type="text" name="country" className={classes.inputCountry} id="ctry" value={country} requiredautocomplete="off" placeholder="Country" onChange={countryClick} />
                </Form.Group>

                <hr></hr>
                {warning ? <PopUp message={"Please fill all the fields!"}></PopUp> : null}
                <Button variant="outline-info" className={classes.botun} onClick={submitHandler}>Submit</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
