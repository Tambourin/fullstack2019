import styled from "styled-components";

const Button = styled.button`
  border-radius: 10px;
  background-color: ${props => props.primary ? "palevioletred" : "white"};
  border: 1px solid;
  padding: 10px;
`;

export default Button;