import React, { useEffect, useState } from "react";
import "./OrganizationManagement.css";
import Sidebar from "../sidebar/Sidebar";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import axios from "axios";
import { apiUrl } from "../../config/environments/development";
import Loader from "../common/Loader";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrganizationsRequest } from "../../actions";
import { temporaryToken } from "../../helpers/utils";

const OrganizationManagement = () => {
  const dispatch = useDispatch();
  const { loading, organizations, error } = useSelector(
    (state) => state.organization
  );

  useEffect(() => {
    dispatch(fetchOrganizationsRequest());
  }, [dispatch]);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    socialLinks: ["", ""],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSocialLinkChange = (index, value) => {
    const newSocialLinks = [...formData.socialLinks];
    newSocialLinks[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      socialLinks: newSocialLinks,
    }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api.liftu.tech/api/v1/organization",
        {
          name: formData.name,
          socialLinks: formData.socialLinks,
        },
        {
          headers: {
            Authorization: `Bearer ${temporaryToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error(
        "Error creating organization:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleFormToggle = () => {
    setIsFormVisible(!isFormVisible);
  };

  const paginate = (items, pageNumber, itemsPerPage) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = Math.ceil(organizations.length / itemsPerPage);
  const paginatedOrganizations = paginate(
    organizations,
    currentPage,
    itemsPerPage
  );

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className="admin-landing-container">
      <Sidebar />
      <div className="main-container">
        <div className="header-container">
          <div className="title-text">
            <svg
              onClick={handleBackClick}
              className="back-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
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
            List of Organizations
          </div>
          <button onClick={handleFormToggle} className="add-button">
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
            Add Organization
          </button>
        </div>

        <div className="main-list-container">
          {loading && <Loader />}
          {error && <p>{error}</p>}
          {!organizations.length && !loading && "No Data Found"}
          {paginatedOrganizations.map((o) => (
            <div key={o.id} className="org-container">
              <div className="org-left-content">
                <Avatar
                  style={{ width: "30px", height: "30px", fontSize: "15px" }}
                  className="org-avatar"
                >
                  S
                </Avatar>
                <Link
                  to={`/view-active-users/${o.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="org-name">{o.name}</div>
                </Link>
              </div>
              <div className="org-icon-div">
                <MoreVert className="org-icon" />
              </div>
            </div>
          ))}
        </div>

        <div className="pagination-controls">
          <svg
            onClick={() =>
              setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
            }
            disabled={currentPage === 1}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <span>
            {currentPage} / {totalPages}
          </span>

          <svg
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
            }
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
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
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 5L15 15"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <p>Add new organization</p>
            </div>
            <form className="form" onSubmit={handleSubmitForm}>
              <div className="logo-upload">
                <span>+</span>
                <span>Upload Logo</span>
              </div>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Organization name"
                value={formData.name}
                onChange={handleChange}
              />
              <div className="social-media-section">
                <span>Social Link +</span>
              </div>
              {formData.socialLinks.map((link, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Social Link ${index + 1}`}
                  style={{ marginBottom: "8px" }}
                  value={link}
                  onChange={(e) =>
                    handleSocialLinkChange(index, e.target.value)
                  }
                />
              ))}
              <button type="submit">Add Organization</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizationManagement;
