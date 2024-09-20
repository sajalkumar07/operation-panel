import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { getCookie, setCookie } from "../../helpers/cookie";

const styles = theme => ({
  languageDropdown: {
    maxWidth: "200px"
  }
});

let Component = function({ classes }) {
  const [langCode, setLangCode] = useState("");

  useEffect(() => {
    setLangCode(getCookie("langCode"));
  }, []);

  return (
    <>
      <div className="m-4 d-flex">
        <div className="mr-auto" />
        <TextField
          select
          fullWidth
          label="Language"
          className={`m-0 mr-3 ${classes.languageDropdown}`}
          onChange={e => {
            setLangCode(e.target.value);
            setCookie("langCode", e.target.value, 355);
            window.location.reload();
          }}
          value={langCode}
          margin="normal"
        >
          <MenuItem key="" value="" disabled>
            --- Select Language ---
          </MenuItem>
          {[
            {
              langCode: "en_US",
              name: "English US"
            },
            {
              langCode: "es_MX",
              name: "Spanish (Mexican)"
            },
            {
              langCode: "pt_BR",
              name: "Portuguese (Brazil)"
            }
          ].map(({ langCode, name }, i) => (
            <MenuItem key={i} value={langCode}>
              {name}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </>
  );
};

export const SelectPageLanguage = withStyles(styles)(Component);
