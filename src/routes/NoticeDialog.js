// Global
import React from "react";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";

const NoticeContainer = styled.div`
  background-color: rgba(251, 242, 212, 1);
  width: 550px;
  height: 430px;
  padding: 30px;
  box-sizing: border-box;
`;

const AgreeBtn = styled.button`
  background-color: lightgray;
  width: 150px;
  height: 50px;
  border: 1px solid lightgray;
  color: black;
  font-weight: 600;
  opacity: 1;

  :hover {
    opacity: 0.8;
  }
`;

const DarkText = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const RedText = styled.span`
  font-size: 18px;
  color: red;
  font-weight: 600;
`;

const NormalText = styled.div`
  font-size: 18px;
`;

export default function NoticeDialog({
  openModal,
  handleModalClose,
  modalVisible
}) {
  return (
    <Dialog
      open={modalVisible}
      onClose={handleModalClose}
      disableEscapeKeyDown={true}
      disableBackdropClick={true}
    >
      <NoticeContainer>
        <DarkText className="mb-3">
          This system and data are confidential & proprietary property of
          Whitehat Jr.
        </DarkText>

        <NormalText className="mb-3">
          Access is provided to employee for legitimate Whitehat Jr business
          use. No copies should be made and shared with any other unauthorized
          individual. All activities are monitored and tracked.
        </NormalText>
        <NormalText className="mb-3">
          Any breaches of data confidentiality will be penalised and reported to
          the regulatory authority.
          <RedText>
            {" "}
            All violations will result in Termination and legal action against
            the employee or the employee group.
          </RedText>
        </NormalText>
        <div className="d-flex w-100 justify-content-center mt-4">
          <AgreeBtn onClick={handleModalClose}>Agree & Proceed</AgreeBtn>
        </div>
      </NoticeContainer>
    </Dialog>
  );
}
