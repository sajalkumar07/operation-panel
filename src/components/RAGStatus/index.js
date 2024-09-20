import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import _get from "lodash/get";
import Tooltip from "@material-ui/core/Tooltip";

const DEFAULT_COLOR = "#707070";
const DEFAULT_STATUS_DATA = {
  color: DEFAULT_COLOR,
  tooltipText: ""
};
const getColor = ({ color = DEFAULT_COLOR }) => color;

const RAGStyleCircle = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  text-align: center;
  margin: ${({ margin = 0 }) => margin};
  border: 1px solid ${props => getColor(props)};
  background: ${props => getColor(props)};
  box-shadow: 0 2px 2px 2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
    0 2px 2px 0 rgb(0 0 0 / 12%);
`;

const RAGStatus = ({ callRecommendation, margin = 0 }) => {
  const [status, setStatus] = useState(DEFAULT_STATUS_DATA);
  const getStatusDetails = (sensitivity, message = "") => {
    switch (sensitivity) {
      case "R":
        return {
          color: "#FF0000",
          tooltipText: message || "Something went wrong"
        };
      case "A":
        return {
          color: "#ffa500",
          tooltipText: message || "Something went wrong"
        };
      case "G":
        return {
          color: "#03a703",
          tooltipText: message || "Something went wrong"
        };
      default:
        return DEFAULT_STATUS_DATA;
    }
  };

  useEffect(() => {
    if (callRecommendation) {
      const sensitivity = _get(callRecommendation, "sensitivity");
      const message = _get(callRecommendation, "message", "");
      const statusData = getStatusDetails(sensitivity, message);
      setStatus({ ...statusData });
    }
  }, [callRecommendation]);

  return (
    <>
      <Tooltip
        title={_get(status, "tooltipText", "")}
        className="heading_reg font14"
      >
        <p
          className="m-0 cursor_pointer"
          style={{
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            cursor: "pointer",
            maxWidth: "300px"
          }}
        >
          <RAGStyleCircle
            color={_get(status, "color", DEFAULT_COLOR)}
            margin={margin}
          />
        </p>
      </Tooltip>
    </>
  );
};

const mapStateToProps = state => {
  return {
    callRecommendation: state.entityData.CALL_RECOMMENDATION
  };
};

export default connect(mapStateToProps, null)(RAGStatus);
