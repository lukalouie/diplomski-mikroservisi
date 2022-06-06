import React, { useContext, useEffect, useState } from "react";
import PaymentContext from "../../store/PaymentContext";
import CartContext from "../../store/CartContext";
import ShippingContext from "../../store/ShippingContext";
import SummaryCard from "../../components/SummaryCard";
import CheckoutSteps from "../../components/CheckoutSteps";
import classes, { StyledPlaceOrderView } from "./place-order.styles.js";
import AuthContext from "../../store/AuthContext";
import { useRouter } from "next/router";
import axios from "axios";
import { Button } from "../../components/Button/Button";

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
    let price = 0;
    let orderId = Math.floor(Math.random() * 100000);
    cartContext.cartItems.forEach((card) => {
      price = price + card.price;
    });
    const address = shippingContext.address;
    const city = shippingContext.city;
    const country = shippingContext.country;
    await axios.post(`/api/orders/create`, {
      cards: buying,
      user: authContext.user.email,
      total: price,
      address: `${address}, ${city}, ${country}`,
      isDelivered: false,
      orderId: orderId,
    });
    await axios.post(`/api/shipping/create`, {
      orderId: orderId,
      address: `${address}, ${city}, ${country}`,
      isDelivered: false,
    });
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
    <StyledPlaceOrderView>
      <CheckoutSteps step1 step2 step3 />
      <h2>Your Order</h2>
      <div>
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
      </div>
      <div>
        <span>Method: {paymentContext.paymentMethod}</span>
        <div>
          <h2>Shipping</h2>
          <span>Address: {shippingContext.address}</span>
          <span>City: {shippingContext.city}, {shippingContext.country}</span>
          <span>ZIP: {shippingContext.zip}</span>
        </div>
      </div>
      <Button text="Checkout" onClick={successPaymentHandler} />
    </StyledPlaceOrderView>
  );
}

export default PlaceOrderScreen;
