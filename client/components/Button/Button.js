import React from "react";
import { StyledButton } from "./Button.styles";

export function Button(props) {
  return (
    <StyledButton
      className={props.className}
      onClick={props.onClick}
      type={props.type}
    >
      {props.text}
    </StyledButton>
  );
}
