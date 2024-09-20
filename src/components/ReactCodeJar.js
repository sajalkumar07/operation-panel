import React, { useCallback, useRef, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { CodeJar } from "codejar";
import hljs from "highlight.js/lib/core";
import xml from "highlight.js/lib/languages/xml";
import json from "highlight.js/lib/languages/json";
import javascript from "highlight.js/lib/languages/javascript";
import sql from "highlight.js/lib/languages/sql";
import markdown from "highlight.js/lib/languages/markdown";
import bash from "highlight.js/lib/languages/bash";
import "highlight.js/scss/atom-one-dark.scss";
import { withLineNumbers } from "codejar/linenumbers";

const highlight = editor => {
  editor.textContent = editor.textContent;
  hljs.highlightBlock(editor);
};

const langMapObj = {
  xml: xml,
  json: json,
  js: javascript,
  sql: sql,
  md: markdown,
  bash: bash
};

const useHookWithRefCallback = function(callback) {
  const ref = useRef(null);
  const setRef = useCallback(node => {
    if (node) {
      callback(node);
    }
    ref.current = node;
  }, []);
  return [setRef];
};

export const styles = theme => ({
  jar: {
    textAlign: "left",
    borderRadius: "4px",
    boxShadow:
      "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2)",
    fontFamily: "'Source Code Pro', monospace",
    fontSize: "14px",
    fontWeight: "400",
    height: "250px",
    letterSpacing: "normal",
    whiteSpace: "normal !important",
    lineHeight: "20px",
    padding: "10px",
    tabSize: "4",
    resize: "none"
  },
  jarMini: {
    height: "280px",
    width: "350px"
  }
});

const ReactCodeJar = ({
  classes,
  value = "",
  onUpdate = () => {},
  miniEditorBox = false,
  language = "xml",
  lineNumber = true,
  disabled = false,
  height = "250px"
}) => {
  hljs.registerLanguage(language, langMapObj[language]);

  const options = { tab: " ".repeat(4), indentOn: /[(\[]$/ };
  const [setCodeJarRef] = useHookWithRefCallback(node => {
    const jar = CodeJar(
      node,
      lineNumber ? withLineNumbers(highlight) : highlight,
      options
    );
    jar.onUpdate(onUpdate);
    jar.updateCode(value);
  });

  useEffect(() => {
    if (setCodeJarRef) {
      const outerDiv = document.getElementById("ReactjarCode-Editor");
      outerDiv.contentEditable = disabled ? "false" : "plaintext-only";
    }
  }, [setCodeJarRef]);

  const classForEditor = miniEditorBox
    ? classes.jar + " " + classes.jarMini
    : classes.jar;

  return (
    <div>
      <div
        className={classForEditor}
        style={{ height: `${height}` }}
        id="ReactjarCode-Editor"
        ref={setCodeJarRef}
      ></div>
    </div>
  );
};

export default withStyles(styles)(ReactCodeJar);
