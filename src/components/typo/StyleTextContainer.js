import styled from "styled-components";

const pumpkinOrange = "rgba(0, 0, 0, 0.87)";

export const StyledTextContainer = styled.span`
  color: ${props => props.color || pumpkinOrange};
  word-break: break-word;
`;

export const StyledBlockContainer = styled.div`
  color: ${props => props.color || pumpkinOrange};
  word-break: break-word;
`;
