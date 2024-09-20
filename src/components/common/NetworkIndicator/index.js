import React from "react";
import { StyledNwBar } from "./styles";
//import BasicToolTip from "../../ToolTip/BasicToolTip";
import { Tooltip } from "@material-ui/core";
import {
  makeStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";

import "./styles.scss";

const NetworkIndicator = ({
  strength = 0,
  maxStrength = 5,
  barsConfig,
  withTooltip
}) => {
  // return null; //TODO: Remove once network indicator fixed for remote participant
  const [tooltipIsOpen, setTooltipIsOpen] = React.useState(false);
  if (isNaN(strength)) return null;
  const { startingHeight, totalBars, colors } = barsConfig;
  const barStrength = Math.round((strength / maxStrength) * totalBars);

  const getBgColor = (barStrength = 0) => {
    return colors[barStrength];
  };
  const getDataContent = () => {
    if (barStrength > 4) return <div>Good Internet</div>;
    if (barStrength > 2) return <div>Unstable Internet</div>;
    else return <div>Poor Internet</div>;
  };
  const theme = createMuiTheme({
    overrides: {
      MuiTooltip: {
        tooltip: {
          // zIndex:9999
        }
      }
    }
  });

  const useStylesBootstrap = makeStyles(theme => ({
    arrow: {
      color: theme.palette.common.black
    },
    tooltip: {
      backgroundColor: theme.palette.common.black
    }
  }));

  function BootstrapTooltip(props) {
    const classes = useStylesBootstrap();

    return (
      <div>
        <Tooltip arrow classes={classes} {...props} />
      </div>
    );
  }

  const getNetworkBars = () => {
    return (
      <div
        style={{
          height: "15px",
          padding: "2px",
          width: "30px"
        }}
        className={`d-flex align-items-baseline ${
          barStrength <= 2 ? "fade-in-fade-out" : ""
        }`}
      >
        {barsArray.map((val, i) => (
          <StyledNwBar
            key={i}
            bgColor={i < barStrength ? bgColor : barsConfig.colors.default}
            height={startingHeight + increment * i}
            // height={startingHeight * (i + 1)}
          />
        ))}
      </div>
    );
  };
  const bgColor = getBgColor(barStrength);
  const barsArray = [...new Array(totalBars)];
  const increment = (100 - startingHeight) / (totalBars - 1 || 1);
  if (withTooltip) {
    return (
      <MuiThemeProvider>
        <BootstrapTooltip
          open={tooltipIsOpen}
          onOpen={() => {
            setTooltipIsOpen(true);
          }}
          onClose={() => setTooltipIsOpen(false)}
          PopperProps={{
            container: document.getElementById("class-session-container")
          }}
          placement="top-end"
          title={getDataContent()}
        >
          {getNetworkBars()}
        </BootstrapTooltip>
      </MuiThemeProvider>
    );
  }
  return getNetworkBars();
};
export default NetworkIndicator;
NetworkIndicator.defaultProps = {
  barsConfig: {
    totalBars: 5,
    colors: {
      5: "green",
      4: "orange",
      3: "orange",
      2: "red",
      1: "red",
      0: "#CACACA",
      default: "#CACACA"
    },
    startingHeight: 30
  },
  withTooltip: false
};
