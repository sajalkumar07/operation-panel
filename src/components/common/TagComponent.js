import React from "react";
import styled from "styled-components";

export const StyledTagComponent = styled.div`
  background: #39ff14;
  color: #ff6400;
  padding: 4px 12px;
  font-weight: bolder;
  top: 0px;
  font-size: 14px;
`;

const TagComponent = ({ label = "" }) => {
  return (
    <StyledTagComponent className="heading_reg d-inline mr-2">
      {label}
    </StyledTagComponent>
  );
};

export default TagComponent;
