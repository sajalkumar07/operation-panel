import { color } from "d3";
import React from "react";

const LeftHeaderLogo = () => {
  const styles = {
    iconContainer: {
      position: "absolute",
      top: "20px", // Adjusted spacing from the top
      left: "10px", // Adjusted spacing from the left
      display: "flex",
      alignItems: "center",
      padding: "10px"
    },
    icon: {
      display: "flex",
      alignItems: "center",
      width: "208px",
      height: "48px",
      padding: "8px"
    },
    img: {
      width: "32px",
      height: "32px",
      marginRight: "10px"
    },
    text: {
      margin: 0,
      fontSize: "16px",
      fontFamily: "Source Sans Pro, sans-serif",
      fontWeight: 400,
      lineHeight: "20.11px",
      textAlign: "left",
      color: "black"
    }
  };

  return (
    <div style={styles.iconContainer}>
      <div style={styles.icon}>
        <img
          src="/images/black logo transparent bg 2.png"
          alt="logo"
          style={styles.img}
        />
        <p style={styles.text}>Liftu.tech</p>
      </div>
    </div>
  );
};

export default LeftHeaderLogo;
