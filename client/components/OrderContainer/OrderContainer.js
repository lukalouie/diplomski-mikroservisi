import React from "react";
import { StyledOrderContainer } from "./OrderContainer.styles";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


library.add(faCheck);
library.add(faBan);

export function OrderContainer(props) {
  return (
    <StyledOrderContainer $isDelivered={props.isDelivered}>
      <div>
        <span>User:</span>
        <span>{props.userName}</span>
      </div>
      <div>
        <span>Address:</span>
        <span>{props.userAddress}</span>
      </div>
      <div>
        <span>Total:</span>
        {console.log(props.total)}
        <span>{props.total}</span>
      </div>
      <div>
        <span>Delivered:</span>
        <span><FontAwesomeIcon icon={props.isDelivered ? ["fa", "check"] : ["fa", "ban"]}/></span>
      </div>
    </StyledOrderContainer>
  );
}
