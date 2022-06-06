import styled from "styled-components"
import {Colors} from "../../common/colors"

export const StyledShipmentContainer = styled.div`
    display: flex;
    flex-direction: row;
    border: 1px solid ${Colors.NavyBlue};
    border-radius: 20px;
    padding: 10px 20px;
    justify-content: space-between;
    min-width: 350px;
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
            justify-content: center;
            span {
                cursor: pointer;
            }
        }
    }

`