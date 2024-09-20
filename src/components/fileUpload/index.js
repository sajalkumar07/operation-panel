import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { dispatchWithRequest, uploadFileToS3 } from "../../actions";
import Loader from "../common/Loader";
import {
  custEntityFn,
  checkFile,
  fileSizeCheck,
  h__formatFileSize
} from "../../helpers/utils";
import { doEntityOps } from "../../actions";

const defaultEntity = "S3_SIGNED_URL",
  cEntity = custEntityFn(defaultEntity);
/*
 * Pass customEntity as a prop, for a specific API , default is "FILE_UPLOAD"
 */

export const FileUpload = function({
  placeholder = "Upload",
  response = {},
  customEntity = defaultEntity,
  acceptOnly = [],
  multiple = true,
  updateActionType,
  actionType,
  additionalFlag = false,
  additionalData = {},
  contentDownload = false,
  isB2B = false,
  buttonStyle = false,
  uploadFileToS3Action,
  maxSizeLimit = 100, //in MB
  inputAcceptType = "*",
  beforeUploadCB = () => {},
  onUpload,
  upload
}) {
  const [fileName, setFileName] = useState("");
  const [mustUpdate, setMustUpdate] = useState(false);
  const [error, setError] = useState(false);
  const [fileType, setFileType] = useState("");
  cEntity.setE(customEntity);
  useEffect(() => {
    // check if response is empty object

    if (Object.keys(response).length === 0 && response.constructor === Object)
      return;
    if (mustUpdate) {
      setMustUpdate(false);
      onUpload(response);
    }
  }, [response]);

  const onChange = ({ target }) => {
    let formData = new FormData();
    let files = Array.from(target.files);
    beforeUploadCB(files);
    if (
      target &&
      target.files &&
      target.files.length > 0 &&
      [...target.files].find(file => fileSizeCheck(file.size, maxSizeLimit))
    ) {
      setError(true);
    } else {
      setError(false);
      if (updateActionType) {
        formData.append("actionFile", files[0]);
        formData.append("actionType", actionType);
      } else {
        for (let i = 0; i < files.length; i++) {
          formData.append("files", files[i]);
        }
      }
      target.value = "";
      if (additionalFlag) {
        formData.append("BUCKET_NAME", additionalData.bucketName);
        formData.append("CDN_URL", additionalData.cdn);
        formData.append("contentDownload", contentDownload);
      }
      if (isB2B) {
        formData.append("AFFILIATE_ID", additionalData.id);
        formData.append("schoolName", additionalData.name);
      }
      if (
        files &&
        files.length > 0 &&
        files[0].name &&
        checkFile(files[0].name, acceptOnly)
      ) {
        setFileName(files[0].name);
        setFileType(files[0].type);
        setMustUpdate(true);
        customEntity === defaultEntity
          ? uploadFileToS3Action({
              files: files,
              fileName: files[0].name
            })
          : upload({ formData, customEntity });
      }
    }
  };

  return (
    <>
      <label className="m-0">
        {updateActionType ? (
          <input
            type="file"
            onChange={onChange}
            accept={inputAcceptType}
            hidden
          />
        ) : (
          <input
            multiple={multiple}
            type="file"
            accept={inputAcceptType}
            onChange={onChange}
            hidden
          />
        )}
        <div
          className="d-inline-block btn btn-primary text-nowrap mr-2 text-truncate"
          style={buttonStyle ? buttonStyle : btnStyle}
        >
          {fileName || placeholder}
        </div>
        <div className="m-0">
          {error ? (
            <span style={errorStyle}>
              File Size should be less than {h__formatFileSize(maxSizeLimit)}
            </span>
          ) : (
            ""
          )}
        </div>
        {fileType === "application/msword" || customEntity === defaultEntity
          ? ""
          : mustUpdate && <Loader />}
      </label>
    </>
  );
};

const btnStyle = {
  backgroundColor: "#0085A0",
  borderColor: "#0085A0",
  maxWidth: "220px",
  overflow: "hidden"
};
const errorStyle = {
  color: "#ba000d"
};

const mapStateToProps = state => {
  return {
    response:
      cEntity.getE() === defaultEntity
        ? state.authUser.getS3UploadUrl
        : state.entityData[cEntity.getE()]
  };
};
const mapDispatchToProps = dispatchWithRequest((dispatch, req) => {
  return {
    uploadFileToS3Action: data =>
      dispatch(
        uploadFileToS3.request({
          ...data
        })
      ),
    upload: ({ formData, customEntity }) => {
      dispatch(
        doEntityOps.request({
          entityName: customEntity,
          action: "LIST",
          body: formData
        })
      );
    }
  };
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(FileUpload));
