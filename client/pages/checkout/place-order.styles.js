import styled from "styled-components"

export const StyledPlaceOrderView = styled.div`
    display: flex;
    flex-direction: column;
    font-family: "Shadows Into Light";
    font-size: 22px;
    align-items: center;
    justify-content: center;

    button {
        max-width: fit-content;
    }

    > div {
        &:nth-child(3) {
            margin-top: 50px;
        }

        &:nth-child(4) {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            min-width: 700px;
            > span {
                font-size: 30px;
                margin-left: 30px;
            }
            div {
                &:nth-child(2) {
                    margin-right: 30px;
                    display: flex;
                    flex-direction: column;
                }
            }
        }
    }
`
