import React, { memo } from "react";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import JsonBeautifier from "../../components/JsonBeautifier";
import ReactCodeJar from "../../components/ReactCodeJar";
import { feedJson } from "../../helpers/utils";
import { CollectionsOutlined } from "@material-ui/icons";

/* 
? Usage :
          <PopOverTooltip
            keyProp={data.id}    //! key
            btnText="View Config"
            fieldType={'json'}   //! json , text
            ContentView={()=> <div />}  //! If not fieldType and valueData
            valueData={feedJson(
              isNewConfigStructure(data)
                ? _.get(data, "config.variables")
                : _.get(data, "config")
            )}
          />
*/

const popOverStyles = theme => ({
  popMouseOver: {
    pointerEvents: "none",
    zIndex: 999
  },
  popButtonClick: {
    pointerEvents: "visible",
    zIndex: 999
  },
  paper: {
    padding: theme.spacing(1),
    zIndex: 999
  }
});

const fieldStyles = theme => ({
  jsonContainer: { width: 400, height: 350, margin: "0.5em" },
  textMiniContainer: { minWidth: 80 },
  textContainer: {
    minWidth: 300,
    "& .MuiFormControl-root": {
      minWidth: "350px !important"
    }
  }
});

const FieldViewer = withStyles(fieldStyles)(
  ({
    valueData,
    fieldType,
    classes,
    language,
    miniEditorBox,
    lineNumber,
    logs
  }) => {
    let charCount = valueData && valueData.length ? valueData.length : 0;
    return (fieldType === "json" && logs && valueData.length) ||
      (fieldType === "json" && !logs) ? (
      <div className={classes.jsonContainer}>
        <JsonBeautifier
          height={"350px"}
          disabled={true}
          json={feedJson(valueData)}
          mainMenuBar={false}
          mode={"code"}
        />
      </div>
    ) : logs ? (
      <div className={classes.textMiniContainer}>No records found</div>
    ) : (
      <div
        className={
          charCount < 10 ? classes.textMiniContainer : classes.textContainer
        }
      >
        <ReactCodeJar
          miniEditorBox={miniEditorBox}
          lineNumber={lineNumber}
          disabled={true}
          language={language}
          value={valueData || ""}
        />
      </div>
    );
  }
);

// * Can be used independently
export const PopOverCompo = withStyles(popOverStyles)(prop => (
  <Popover
    id={`mouseOver-${prop.mouseOver}-popOver-json`}
    className={
      prop.mouseOver ? prop.classes.popMouseOver : prop.classes.popButtonClick
    }
    classes={{
      paper: prop.classes.paper
    }}
    open={prop.open}
    anchorEl={prop.anchorEl}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left"
    }}
    onClose={prop.handlePopoverClose}
    disableRestoreFocus
  >
    <div>{prop.children}</div>
  </Popover>
));

const PopOverMenu = ({
  ContentView = () => {},
  keyProp,
  mouseOver = false,
  btnText = "View Config",
  fieldType = null,
  isHelperText = true,
  valueData = null,
  language = "md",
  lineNumber = false,
  onClick = () => {},
  miniEditorBox = true,
  logs,
  handleButtonClick
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget);
    onClick(keyProp);
    handleButtonClick && handleButtonClick();
    event.preventDefault();
    event.stopPropagation();
  };

  const handlePopoverClose = event => {
    setAnchorEl(null);
    event.preventDefault();
    event.stopPropagation();
  };
  const open = Boolean(anchorEl);

  return (
    <React.Fragment key={`popOver-container-mouseOver-${mouseOver}-${keyProp}`}>
      {mouseOver ? (
        <>
          {isHelperText ? (
            <Typography
              aria-owns={
                open ? `mouseOver-${mouseOver}-popOver-json` : undefined
              }
              aria-haspopup="true"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
              variant={isHelperText ? "caption" : "subtitle1"}
            >
              <small className="text-danger ml-2"> {btnText}</small>
            </Typography>
          ) : (
            <div
              onMouseEnter={handlePopoverOpen}
              aria-owns={
                open ? `mouseOver-${mouseOver}-popOver-json` : undefined
              }
              aria-haspopup="true"
              onMouseLeave={handlePopoverClose}
            >
              {btnText}
            </div>
          )}
        </>
      ) : (
        <Button
          aria-describedby={`mouseOver-${mouseOver}-popOver-json`}
          size="small"
          color="primary"
          onClick={handlePopoverOpen}
        >
          {btnText}
        </Button>
      )}
      <PopOverCompo {...{ handlePopoverClose, mouseOver, anchorEl, open }}>
        {/* // * Replaces a TextField or JSONEditor for viewing configs */}
        {fieldType ? (
          <FieldViewer
            {...{
              valueData,
              fieldType,
              language,
              miniEditorBox,
              lineNumber,
              logs
            }}
          />
        ) : (
          <ContentView />
        )}
      </PopOverCompo>
    </React.Fragment>
  );
};

export default memo(PopOverMenu);
