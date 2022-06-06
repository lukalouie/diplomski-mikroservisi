import React, { useContext, useEffect, useState } from "react";
import PaymentContext from "../../store/PaymentContext";
import CartContext from "../../store/CartContext";
import ShippingContext from "../../store/ShippingContext";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import SummaryCard from "../../components/SummaryCard";
import CheckoutSteps from "../../components/CheckoutSteps";
import classes from "./place-order.module.css";
import AuthContext from "../../store/AuthContext";
import { useRouter } from "next/router";
import axios from "axios";

function PlaceOrderScreen() {
  const paymentContext = useContext(PaymentContext);
  const cartContext = useContext(CartContext);
  const shippingContext = useContext(ShippingContext);
  const authContext = useContext(AuthContext);

  const router = useRouter();

  const checkMargin = () => {
    let className;

    if (cartContext.countCartItems() === 1) {
      className = classes.cont;
    } else if (cartContext.countCartItems() === 2) {
      className = classes.cont2;
    } else {
      className = classes.cont3;
    }

    return className;
  };

  const successPaymentHandler = async () => {
    const buying = cartContext.cartItems.map((cartItem) => cartItem.id);
    let price = 0
    let orderId = Math.floor(Math.random() * 100000)
    cartContext.cartItems.forEach((card) => {price = price + card.price});
    const address = shippingContext.address
    const city = shippingContext.city
    const country = shippingContext.country
    await axios.post(`/api/orders/create`, {
      cards: buying,
      user: authContext.user.email,
      total: price,
      address: `${address}, ${city}, ${country}`,
      isDelivered: false,
      orderId: orderId
    });
    await axios.post(`/api/shipping/create`, {
      orderId: orderId,
      address: `${address}, ${city}, ${country}`,
      isDelivered: false,
    })
    cartContext.emptyCart();
    router.push("/explore");
  };

  useEffect(() => {
    shippingContext.checkAllIn();
    if (cartContext.cartItems.length === 0) {
      router.push("/cart");
    } else if (!shippingContext.allIn) {
      router.push("/checkout/shipping");
    }
  }, []);

  return (
    <Container>
      <CheckoutSteps step1 step2 step3 />
      <Row>
        <Col>
          <Card style={{ border: "none" }} className={checkMargin()}>
            <Col style={{ textAlign: "center", alignContent: "center" }}>
              <h2>Your Order</h2>
              <br />
              <ul style={{ listStyleType: "none" }}>
                {cartContext.cartItems.map((item) => {
                  return (
                    <li key={item.id}>
                      <SummaryCard item={item} />
                      <br />
                    </li>
                  );
                })}
              </ul>
              <p>Method: {paymentContext.paymentMethod}</p>
            </Col>
            <Col style={{ textAlign: "center" }}>
              <h2>Shipping</h2>
              <Card style={{ border: "none", textAlign: "center" }}>
                <Card.Text>
                  Address: {shippingContext.address}
                  <br />
                  {shippingContext.city}, {shippingContext.country}
                  <br />
                  {shippingContext.zip}
                </Card.Text>
              </Card>
            </Col>
          </Card>
        </Col>
        <Col>
          <Button onClick={successPaymentHandler}>Checkout</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default PlaceOrderScreen;
