import withStyles from "@material-ui/core/styles/withStyles";
import React, { useEffect, useRef, useCallback } from "react";
import { compose } from "ramda";

import * as JSONEditor from "jsoneditor/dist/jsoneditor";
import "jsoneditor/dist/jsoneditor.min.css";

const styles = theme => ({});

const JsonBeautifier = ({
  height = "215px",
  width = "auto",
  json,
  onChange,
  mode = "tree",
  mainMenuBar = true,
  onError,
  disabled = false
}) => {
  function useHookWithRefCallback() {
    const ref = useRef(null);
    const setRef = useCallback(node => {
      if (ref.current) {
        // Make sure to cleanup any events/references added to the last instance
      }

      if (node) {
        const container = node;
        container.style.height = height;
        container.style.width = width;
        const options = {
          mode, // *  tree , code , text , preview,
          mainMenuBar,
          onError: function(err) {
            typeof onError === "function" && onError(err.toString());
          },
          onChange: function() {
            onChange(getEditorDat());
          },
          onEditable: function(node) {
            if (!node.path) {
              // In modes code and text, node is empty: no path, field, or value
              // returning false makes the text area read-only
              return disabled ? false : true;
            }
          }
        };
        const editor = new JSONEditor(container, options);

        const getEditorDat = () => editor.get();

        try {
          let v = JSON.parse(json);
          editor.set(v);
        } catch (e) {
          return "{}";
        }
      }

      // Save a reference to the node
      ref.current = node;
    }, []);

    return [setRef];
  }

  const [ref] = useHookWithRefCallback();

  return (
    <>
      <div ref={ref}></div>
    </>
  );
};

export default withStyles(styles)(JsonBeautifier);
