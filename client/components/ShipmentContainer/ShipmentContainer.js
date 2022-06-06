import React, { useEffect, useState } from "react";
import { StyledShipmentContainer } from "./ShipmentContainer.styles";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";


library.add(faCheck);

export function ShipmentContainer(props) {
  const [delivered, setDelivered] = useState(false);

  const handleDeliveredClick = async () => {
    setDelivered(!delivered);
    await updateShippings();
  };

  useEffect(() => {}, [delivered]);

  const updateShippings = async () => {
    const response = await axios.put(`/api/shipping/update/${props.id}`, {orderId: props.orderId, isDelivered: !delivered});
    console.log("data" + response.data);
    return response.data.shippings;
  };

  return (
    <StyledShipmentContainer>
      <div>
        <span>Order ID:</span>
        <span>{props.orderId}</span>
      </div>
      <div>
        <span>Address:</span>
        <span>{props.address}</span>
      </div>
      <div>
        <span>
          <FontAwesomeIcon
            icon={["fa", "check"]}
            onClick={handleDeliveredClick}
            style={{color: delivered ? "green" : "grey"}}
          />
        </span>
      </div>
    </StyledShipmentContainer>
  );
}
