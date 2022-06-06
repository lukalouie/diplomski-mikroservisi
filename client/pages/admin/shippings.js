import React, { useEffect, useState } from "react";
import { ShipmentContainer } from "../../components/ShipmentContainer/ShipmentContainer";
import { StyledShippingsView } from "./shippings.styles";
import axios from "axios";

const getShippings = async () => {
  const response = await axios.get("/api/shipping");
  console.log("data shippings" + response.data);
  return response.data.shippings;
};

export default function shippings() {
  const [shippings, setShippings] = useState();

  useEffect(() => {
    getShippings().then((res) => {
      const allShippings = res;
      console.log(allShippings);
      setShippings(allShippings);
    });
  }, []);

  return (
    <StyledShippingsView>
      <h2>Shipments</h2>
      {shippings &&
        shippings.map((shipment, index) => (
          <ShipmentContainer key={shipment.id + index} orderId={shipment.orderId} address={shipment.address} />
        ))}
    </StyledShippingsView>
  );
}
