import styled from "styled-components"
import {Colors} from "../../common/colors"

export const StyledButton = styled.button`
    display: flex;
    flex-direction: row;
    border: 1px solid ${Colors.LightBlue};
    color: white;
    border-radius: 20px;
    padding: 10px 20px;
    justify-items: center;
    cursor: pointer;
    font-family: "Shadows Into Light";
    font-size: 22px;
    background-color: ${Colors.LightBlue};

    &:hover {
        background-color: ${Colors.NavyBlue};
    }

    @import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap');

`