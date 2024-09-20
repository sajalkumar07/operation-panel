export const ACCESS_MICROPHONE = {
  SUCCESS: "ACCESS_MIC_SUCCESS",
  FAILED: "ACCESS_MIC_FAILED",
  BLOCKED: "ACCESS_MIC_BLOCKED",
  NOT_SUPPORTED: "ACCESS_MIC_NOT_SUPPORTED"
};

export const ACCESS_CAMERA = {
  SUCCESS: "ACCESS_CAMERA_SUCCESS",
  FAILED: "ACCESS_CAMERA_FAILED",
  BLOCKED: "ACCESS_CAMERA_BLOCKED"
};

export const isChrome = () => {
  // please note,
  // that IE11 now returns undefined again for window.chrome
  // and new Opera 30 outputs true for window.chrome
  // but needs to check if window.opr is not undefined
  // and new IE Edge outputs to true now for window.chrome
  // and if not iOS Chrome check
  // so use the below updated condition
  var isChromium = window.chrome;
  var winNav = window.navigator;
  var vendorName = winNav.vendor;
  var isOpera = typeof window.opr !== "undefined";
  var isIEedge = winNav.userAgent.indexOf("Edge") > -1;
  var isIOSChrome = winNav.userAgent.match("CriOS");

  if (isIOSChrome) {
    // is Google Chrome on IOS
    return true;
  } else if (
    isChromium !== null &&
    typeof isChromium !== "undefined" &&
    vendorName === "Google Inc." &&
    isOpera === false &&
    isIEedge === false
  ) {
    // is Google Chrome
    return true;
  } else {
    // not Google Chrome
    return false;
  }
};

export const checkAudioInput = callback => {
  navigator.getUserMedia_ =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia; //Check for Media API
  if (navigator.getUserMedia_) {
    navigator.getUserMedia_(
      { audio: true }, //Access Audio from Media API
      function(stream) {
        callback(ACCESS_MICROPHONE["SUCCESS"]);
        return ACCESS_MICROPHONE["SUCCESS"];
      },
      function(err) {
        /**
         * This block is executed if Media API Fails to Access Microphone
         */
        console.log("The following error occured: =============>" + err.name);
        callback(ACCESS_MICROPHONE["BLOCKED"]);
        return ACCESS_MICROPHONE["BLOCKED"];
      }
    );
  } else {
    /**
     * This block is executed if Media API Fails for WEBRTC
     */
    console.log("getUserMedia not supported");
    callback({ audioAccess: ACCESS_MICROPHONE["NOT_SUPPORTED"] });
    return ACCESS_MICROPHONE["NOT_SUPPORTED"];
  }
};

export const checkVideoInput = callback => {
  navigator.getUserMedia_ =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;
  if (navigator.getUserMedia_) {
    navigator.getUserMedia_(
      { video: true },
      function(stream) {
        console.log("Accessed the Video");
        callback(ACCESS_CAMERA["SUCCESS"]);
        return ACCESS_CAMERA["SUCCESS"];
      },
      function(err) {
        console.log("The following error occured: " + err.name);
        callback(ACCESS_CAMERA["BLOCKED"]);
        return ACCESS_CAMERA["BLOCKED"];
      }
    );
  } else {
    console.log("getUserMedia not supported");

    callback({ audioAccess: ACCESS_CAMERA["NOT_SUPPORTED"] });
    return ACCESS_CAMERA["NOT_SUPPORTED"];
  }
};
