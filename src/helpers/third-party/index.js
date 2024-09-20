const ENV = process.env.NODE_ENV || "development";
const DD_LOGGING_ENABLED =
  process.env.REACT_APP_DATADOG_LOGGING_ENABLED || false;
const DD_CLIENT_TOKEN = process.env.REACT_APP_DATADOG_CLIENT_TOKEN;
const DD_APPLICATION_ID = process.env.REACT_APP_DATADOG_APPLICATION_ID;

window.onDataDogLoad = function() {
  if (window.DD_LOGS && DD_LOGGING_ENABLED && DD_CLIENT_TOKEN) {
    window.DD_LOGS.init({
      clientToken: DD_CLIENT_TOKEN,
      forwardErrorsToLogs: true,
      service: "ops-ui",
      version: "0.1.0",
      env: ENV
    });
    const event = new Event("datadogLoaded");
    document.dispatchEvent(event);
  }
};

let scriptsToBeLoaded = [
  {
    src: "https://www.datadoghq-browser-agent.com/datadog-logs-us.js",
    defer: true,
    onload: "window.onDataDogLoad()"
  }
];

const globalAddScriptTag = attributes => {
  let s = document.createElement("script");
  Object.keys(attributes).forEach(attribute => {
    if (attribute === "textContent") {
      s.textContent = attributes[attribute];
      return;
    }
    s.setAttribute(attribute, attributes[attribute]);
  });
  document.body.appendChild(s);
};

/*
 * Load third party scripts
 */
const thirdPartyScripts = (enableThirdPartyScripts = false) => {
  if (!window.thirdPartyScriptLoadStarted) {
    scriptsToBeLoaded.forEach(scriptToLoad => {
      const { enableForAllEnv, ...rest } = scriptToLoad;
      if (enableThirdPartyScripts || enableForAllEnv) {
        globalAddScriptTag(rest);
      }
    });
    window.thirdPartyScriptLoadStarted = true;
  }
};

export { thirdPartyScripts };
