import React from "react";
import styled from "styled-components";

export const StylePdfViewContainer = styled.div`
  .iframe-container {
    width: 600px;
    height: 80vh;
  }
`;

export const ViewFile = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const docUrl = queryParams.get("fileSrc");
  return (
    <StylePdfViewContainer>
      <div className="menu_overlayed_container bs_grid">
        <div className="d-flex justify-content-center p-4">
          {docUrl && <iframe className="iframe-container" src={docUrl} />}
        </div>
      </div>
    </StylePdfViewContainer>
  );
};

export default ViewFile;
