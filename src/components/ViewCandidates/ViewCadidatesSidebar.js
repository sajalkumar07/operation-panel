import React, { useState } from "react";
import HeaderIcon from "../LeftHeaderLogo/LeftHeaderLogo";
import "../sidebar/sidebar.css";
import { Link } from "react-router-dom";
import { Avatar, Box, Typography } from "@material-ui/core";

const ViewCandidatesSidebar = ({ org, assessments, currentUser }) => {
  console.log("org", org);
  console.log("currentuser", currentUser);

  return (
    <div className="side-container">
      <Link to="/">
        <HeaderIcon />
      </Link>

      <div className="sidebar-container-text">
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            borderBottom: "1px solid lightgray"
          }}
          py={1}
          alignItems={"center"}
          mb={2}
        >
          <Avatar style={{ width: "30px", height: "30px", fontSize: "15px" }}>
            I
          </Avatar>
          <Typography
            variant="h6"
            style={{ fontWeight: "600", fontSize: "15px" }}
          >
            {org?.name}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            borderBottom: "1px solid lightgray"
          }}
          py={1}
          alignItems={"center"}
          mb={2}
        >
          <Avatar style={{ width: "30px", height: "30px", fontSize: "15px" }}>
            I
          </Avatar>
          <Typography
            variant="h6"
            style={{ fontWeight: "600", fontSize: "15px" }}
          >
            {currentUser?.user?.name}
          </Typography>
        </Box>

        <div className="sidebar-item">
          <div className="svg-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 2H9C8.44772 2 8 2.44772 8 3V5C8 5.55228 8.44772 6 9 6H15C15.5523 6 16 5.55228 16 5V3C16 2.44772 15.5523 2 15 2Z"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17 19C17 18.4696 16.7893 17.9609 16.4142 17.5858C16.0391 17.2107 15.5304 17 15 17H9C8.46957 17 7.96086 17.2107 7.58579 17.5858C7.21071 17.9609 7 18.4696 7 19"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13Z"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <Link to="/view-candidate">
            <h1 className="item">View Candidates</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewCandidatesSidebar;
