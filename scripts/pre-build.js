const path = require("path");
const fs = require("fs");
const fsPromises = fs.promises;

let staticPostBuildFileContent;
let staticIndexFilePathContent;
async function replaceTimestampBuild() {
  const staticAppVersionFilePath = path.resolve(
    __dirname,
    "../public/others",
    "app-version.txt"
  );
  const staticIndexFilePath = path.resolve(
    __dirname,
    "../public",
    "index.html"
  );

  try {
    console.log("Reading post build");
    staticPostBuildFileContent = await fsPromises.readFile(
      staticAppVersionFilePath,
      "utf8"
    );
    staticIndexFilePathContent = await fsPromises.readFile(
      staticIndexFilePath,
      "utf8"
    );
    console.log("finished reading file post-build");
  } catch (e) {
    console.log(`Unable to read file ${e}`);
  }
  let epochTime = new Date().getTime();
  staticPostBuildFileContent = staticPostBuildFileContent.replace(
    "%clientBuildVersion%",
    epochTime
  );
  staticIndexFilePathContent = staticIndexFilePathContent.replace(
    "%clientBuildVersion%",
    epochTime
  );
  try {
    await fsPromises.writeFile(
      staticAppVersionFilePath,
      staticPostBuildFileContent
    );
    await fsPromises.writeFile(staticIndexFilePath, staticIndexFilePathContent);
  } catch (e) {
    console.log(`Unable to write to file ${e}`);
    throw e;
  }
}

async function init() {
  try {
    console.log("Pre build script started");
    await replaceTimestampBuild();
    console.log("Pre build script completed successfully!");
  } catch (e) {
    console.error(e);
    throw e;
  }
}

init();
