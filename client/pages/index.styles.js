import styled from "styled-components";

export const StyledIndexView = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Shadows Into Light";
  font-size: 30px;
  align-items: center;
  justfiy-content: center;

  > span {
    &:first-child {
      font-size: 40px;
      margin-top: 120px;
      margin-bottom: 30px;
    }
    &:nth-child(2) {
        margin-bottom: 50px;
    }   
  }
`;
