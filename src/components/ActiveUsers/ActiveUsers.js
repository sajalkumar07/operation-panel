import React, { useState, useEffect } from "react";
import "./ActiveUsers.css";
import Loader from "../common/Loader";
import { MoreVert } from "@material-ui/icons";
import axios from "axios";
import ActiveUsersSidebar from "./ActiveUsersSidebar";
import { temporaryToken } from "../../helpers/utils";

function ActiveUsers(props) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleFormToggle = () => {
    setIsFormVisible(!isFormVisible);
  };

  const [orgDetails, setOrgDetails] = useState(null);
  console.log(">>>", orgDetails);
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(
          `https://api.liftu.tech/api/v1/organization/details/${props?.match?.params?.id}`,
          {
            headers: {
              Authorization: `Bearer ${temporaryToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response?.data?.data) {
          setOrgDetails(response.data.data.data);
        } else {
          setError("Failed to fetch candidates");
        }
      } catch (err) {
        setError("An error occurred while fetching candidates");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);
  if (loading) return <Loader />;
  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className="admin-landing-container">
      <ActiveUsersSidebar org={orgDetails} />
      <div className="main-container">
        <div className="header-container">
          <div className="title-text">
            <svg
              className="back-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleBackClick}
            >
              <path
                d="M19 12H5"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 19L5 12L12 5"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            List Of Active Users
          </div>

          <button className="create-assessment-btn" onClick={handleFormToggle}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5V19"
                stroke="#4D80F4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 12H19"
                stroke="#4D80F4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            New User
          </button>
        </div>

        <div className="main-list-container">
          {loading && <Loader />}
          {!orgDetails?.organizationUsers?.length && "No Data Found"}
          {orgDetails?.organizationUsers?.map((user) => (
            <div key={user.id} className="list-container" id="list-container">
              <div className="org-details">
                <div className="user-number padded">{user.id}.</div>
                <div className="user-name padded">
                  <a
                    style={{ textDecoration: "none" }}
                    href={`/view-assessments/${orgDetails.id}/${user.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {user.user.name || "Generic Name1"}
                  </a>
                </div>

                <div
                  className={`user-role padded ${
                    user.userRole.roleId === 1 ? "admin" : ""
                  }`}
                >
                  {user.userRole.roleId === 1
                    ? "Admin"
                    : `Role ${user.userRole.roleId}`}
                </div>
                <div className="user-email padded">
                  {user.user.email || "emailid@host.com"}
                </div>
              </div>
              <div className="org-icon-div">
                <MoreVert className="org-icon" />
              </div>
            </div>
          ))}
        </div>

        {isFormVisible && (
          <div className="form-container">
            <div className="form-header">
              <button className="close-button" onClick={handleFormToggle}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 5L5 15"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5 5L15 15"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <p>Add new User</p>
            </div>
            <form className="form">
              <input
                type="email"
                id="name"
                name="name"
                placeholder="Email address"
              />
              <input type="text" id="name" name="name" placeholder="Name" />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Organization name"
              />

              <button type="submit">Add user</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ActiveUsers;
