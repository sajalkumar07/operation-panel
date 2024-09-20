import React from "react";
import EditIcon from "@material-ui/icons/Edit";

const validateForMoreInfo = (val = "") => !!(val && val.length > 200);

const ProfileSummary = ({ profileSummaryData = {}, handleProfileSummary }) => {
  return (
    <>
      <p className="heading_bold">
        Profile Summary:
        <span className="ml-2">
          <EditIcon
            style={{
              color: "#ff8d1b",
              fontSize: "1.25rem",
              marginBottom: "5px",
              cursor: "pointer"
            }}
            className="mr-3 cursor_pointer"
            onClick={() => handleProfileSummary("add")}
          />
        </span>
      </p>
      <div className="d-flex">
        {Object.keys(profileSummaryData).length &&
        profileSummaryData.profileNotes.length ? (
          <>
            {validateForMoreInfo(profileSummaryData.profileNotes[0].note) ? (
              <p
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "700px"
                }}
              >
                {profileSummaryData.profileNotes[0].note}
              </p>
            ) : (
              <p>{profileSummaryData.profileNotes[0].note} ...</p>
            )}
            <a
              href="javascript:;"
              onClick={() => handleProfileSummary("view")}
              style={{ color: "#ff8d1b", width: "90px" }}
            >
              read more
            </a>
          </>
        ) : (
          "No profile summary available"
        )}
      </div>
    </>
  );
};

export default ProfileSummary;
