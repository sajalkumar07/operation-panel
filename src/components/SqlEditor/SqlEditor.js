import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import GetAppIcon from "@material-ui/icons/GetApp";
import makeStyles from "@material-ui/core/styles/makeStyles";
import LazyEditor from "./LazyEditor";
import { dispatchWithRequest } from "../../actions";
import { connect } from "react-redux";
import _isEmpty from "lodash/isEmpty";
import _get from "lodash/get";
import { matTableColumnOptions, downloadExcel } from "../../helpers/utils";
import MaterialTable from "material-table";
import PermissionProvider from "../RBAC/PermissionProvider";

const useStyles = makeStyles({
  editorStyles: {
    border: "1rem",
    borderColor: "error.main",
    backgroundColor: ""
  },
  btn_class: {
    marginRight: "1rem",
    backgroundColor: "green",
    color: "white",
    "&:hover": {
      backgroundColor: "rgb(7, 177, 77, 0.42)"
    }
  },
  root: {
    "& .MuiTableHead-root": {
      "& .MuiTableRow-head": {
        "& .MuiTableCell-root": {
          textAlign: "left !important"
        }
      }
    },
    marginTop: "1rem"
  }
});

function SqlEditor({ getQuery, data, getUserDetails, me, saveEventData }) {
  const [currentQuery, setval] = useState("");
  const [userData, setUserData] = useState({ output: [] });
  const [tableColumn, setTableColumnTitle] = useState([]);

  useEffect(() => {
    getUserDetails();
  }, []);

  // let hiddenColumns = ["id"];
  useEffect(() => {
    if (!_isEmpty(data)) {
      setUserData({ output: data });
      const columnTitle = Object.keys(data[0]);
      const column = columnTitle.map(item => ({
        title: item,
        // field:item,
        render: data => <div className="d-flex  ">{data[item]}</div>
        // hidden: hiddenColumns.includes(item),
      }));
      setTableColumnTitle(column);
    }
  }, [data]);

  const saveData = () => {
    const data = {
      data: {
        queryStr: currentQuery,
        opsUserId: me.id
      },
      eventName: "RUN_QUERY",
      eventSource: "OPS_SQL_QUERY_EVENT",
      schema: {
        queryStr: "s2",
        opsUserId: "s1"
      }
    };
    saveEventData(data);
  };

  let table = {
    title: "User Data",
    columns: tableColumn,
    data: userData.output
  };
  const downloadFile = output => {
    if (!_isEmpty(output)) {
      downloadExcel(output, "UserData", true);
    }
  };

  const classes = useStyles();
  return (
    <div className="">
      <h4>My Sql Editor</h4>
      <div className="border border-primary rounded">
        <LazyEditor
          aria-label="query editor input"
          mode="mysql"
          // theme="tomorrow"
          theme="github"
          name="ace-editor"
          fontSize={16}
          maxLines={20}
          minLines={15}
          width="100%"
          height="500px"
          showPrintMargin={false}
          showGutter
          highlightActiveLine={true}
          placeholder="type here"
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true
          }}
          value={currentQuery}
          showLineNumbers
          onChange={currentQuery => setval(currentQuery)}
          focus={true}
        />
      </div>
      <div className="mt-2">
        <Button
          variant="outlined"
          size="small"
          startIcon={<PlayArrowRoundedIcon />}
          className={classes.btn_class}
          onClick={() => {
            getQuery({ query: currentQuery });
            saveData();
            // setUserData({ output: [] });
          }}
        >
          Run Query
        </Button>
        <Button
          variant="outlined"
          size="small"
          className={classes.btn_class}
          onClick={() => {
            setval("");
          }}
        >
          Reset
        </Button>
        <PermissionProvider name="ACTION_DOWNLOAD_SQL_DATA">
          <Button
            variant="outlined"
            size="small"
            startIcon={<GetAppIcon />}
            className="btn btn-dark float-right"
            onClick={() => {
              downloadFile(userData.output);
            }}
          >
            Download data
          </Button>
        </PermissionProvider>
      </div>

      {/* <div>
        <h5 className="">Output</h5>
        <div style={outputClass}>
          {userData.output
            ? userData.output.map((item, i) => (
                <pre key={i}>{JSON.stringify(item, undefined, 2)}</pre>
              ))
            : null}
        </div>
      </div> */}
      <div className={`${classes.root}`}>
        <MaterialTable
          title={table.title}
          columns={matTableColumnOptions(table.columns)}
          data={table.data}
        />
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    data: state.entityData.SQLEDITOR_DATA,
    me: state.entityData.ME
  };
};

const mapDispatchToProps = dispatchWithRequest((dispatch, req) => {
  return {
    getQuery: req({
      entityName: "SQLEDITOR_DATA",
      action: "LIST"
    }),
    getUserDetails: req({ entityName: "ME", action: "LIST" }),
    saveEventData: req({ entityName: "EVENT_DATA", action: "ADD" })
  };
});

export default connect(mapStateToProps, mapDispatchToProps)(SqlEditor);
