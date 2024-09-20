import React from "react";
import orangeAngleRight from "../images/icons/orange_angle_right.png";

//Global Setting of slick Used in carousels in different dashboard pages.
const settings = {
  arrows: false,
  dots: true,
  infinite: false,
  lazyLoad: true,
  speed: 500,
  rows: 1,
  slidesToShow: 4,
  slidesToScroll: 2,
  responsive: [
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: true
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: true
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ],
  variableWidth: false,
  swipeToSlide: true,
  appendDots: dots => {
    return (
      <div
        style={{
          position: "relative",
          float: "left",
          bottom: "unset",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 25,
          marginBottom: 15
        }}
      >
        <span className={"leftAngleIcon"}>
          <img alt={orangeAngleRight} src={orangeAngleRight} />
        </span>
        <ul style={{ margin: "0px" }}> {dots} </ul>
        <span className={"rightAngleIcon"}>
          <img alt={orangeAngleRight} src={orangeAngleRight} />
        </span>
      </div>
    );
  }
};

export default settings;
