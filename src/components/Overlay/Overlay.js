import React from "react";

const Overlay = ({ showOverlay, overlayContent }) => {
  return (
    <>
      <div
        style={{
          backgroundColor: "#333",
          opacity: "0.7",
          position: "fixed",
          height: "100vh",
          width: "100%",
          zIndex: "9999",
          left: "0",
          top: "0",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
          fontWeight: "600"
        }}
        hidden={showOverlay}
      >
        <span>{overlayContent}</span>
      </div>
    </>
  );
};

export default Overlay;
