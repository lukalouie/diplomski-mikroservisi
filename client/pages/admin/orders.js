import React, { useEffect, useState } from "react";
import { OrderContainer } from "../../components/OrderContainer/OrderContainer";
import { StyledOrdersView } from "./orders.styles";
import axios from "axios"

const getOrders = async () => {
  const response = await axios.get("/api/orders");
  console.log("data" + response.data);
  return response.data.orders;
};

export default function Orders() {
  const [orders, setOrders] = useState();

  useEffect(() => {
    getOrders().then((res) => {
      const allOrders = res;
      console.log(allOrders)
      setOrders(allOrders);
    });
  }, []);
  return (
    <StyledOrdersView>
      <h2>Orders</h2>
      {orders && orders.map((order, index) => (
        <OrderContainer key={index + order.user} userName={order.user} total={order.total} userAddress={order.address} isDelivered={order.isDelivered} />
      ))}
    </StyledOrdersView>
  );
}
