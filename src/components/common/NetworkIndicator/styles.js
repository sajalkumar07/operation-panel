import styled from "styled-components";
export const StyledNwBar = styled.div`
  height: ${props => `${props.height}%` || `100%`};
  background: ${props => props.bgColor || "#FAFAFA"};
  width: 3px;
  //border: thin solid #F3F3F3;
  margin: 0 1px;
`;
