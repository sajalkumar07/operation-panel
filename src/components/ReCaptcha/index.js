import React, { useEffect, useState } from "react";
import Recaptcha from "react-gcaptcha";
import { config } from "../../config";

const ReCaptcha = ({ getCaptchaToken, captchaRefresh = false }) => {
  const [captchaReset, setCaptchaReset] = useState(0);

  useEffect(() => {
    if (captchaRefresh) {
      setCaptchaReset(prevState => prevState + 1);
    }
  }, [captchaRefresh]);

  const handleChange = key => {
    getCaptchaToken(key || "");
  };
  return (
    <>
      <Recaptcha
        sitekey={config["CAPTCHA_SITE_KEY"]}
        verifyCallback={handleChange}
        reset={captchaReset}
      />
    </>
  );
};

export default ReCaptcha;
