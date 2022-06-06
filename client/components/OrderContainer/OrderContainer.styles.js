import styled from "styled-components"
import {Colors} from "../../common/colors"

export const StyledOrderContainer = styled.div`
    display: flex;
    flex-direction: row;
    border: 1px solid ${Colors.NavyBlue};
    border-radius: 20px;
    padding: 10px 20px;
    justify-content: space-between;
    min-width: 550px;
    margin-top: 20px;
    color: ${Colors.NavyBlue};

    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;

        &:first-child {
            span {
                &:first-child {
                    color: black;
                }
                &:nth-child(2) {
                }
            }
        }

        &:nth-child(2) {
            span {
                &:first-child {
                    color: black;
                }
            }
        }

        &:nth-child(3) {
            span {
                &:first-child {
                    color: black;
                }
                &:nth-child(2) {
                    color: green;
                    font-weight: bold;

                    &:before {
                        content: "$";
                    }
                }
            }
        }

        &:nth-child(4) {
            span {
                &:first-child {
                    color: black;
                }
                &:nth-child(2) {
                    color: ${(props) => props.$isDelivered ? "green" : "red"}
                }
            }
        }
    }

`