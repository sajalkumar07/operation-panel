import React, { useState, useEffect } from "react";
import "./ViewAssessment.css";
import CreateAssessmentModal from "./CreateAssessment/createAssessment.js";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import axios from "axios";
import { apiUrl } from "../../config/environments/development";
import Loader from "../common/Loader";
import ViewAssessmentSidebar from "./ViewAssessmentSidebar.js";
import { temporaryToken } from "../../helpers/utils.js";

function ViewAssessments(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orgDetails, setOrgDetails] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [visibleMenuId, setVisibleMenuId] = useState(null);
  const { orgId, userId } = props?.match?.params || {};
  const [generatedLink, setGeneratedLink] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const examsPerPage = 2;

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(
          `https://api.liftu.tech/api/v1/exam/list?orgId=${userId}&page=1&size=10`,
          {
            headers: {
              Authorization: `Bearer ${temporaryToken}`,
              "Content-Type": "application/json"
            }
          }
        );
        console.log("response", response);
        if (response.data.status) {
          setAssessments(response.data.data.data);
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
    const fetchOrgName = async () => {
      try {
        const response = await axios.get(
          `https://api.liftu.tech/api/v1/organization/details/${orgId}`,
          {
            headers: {
              Authorization: `Bearer ${temporaryToken}`,
              "Content-Type": "application/json"
            }
          }
        );
        if (response?.data?.data) {
          let org = response.data.data.data;
          setOrgDetails(org);
          let currentUserFromResponse = org?.organizationUsers?.find(
            user => user.id?.toString() === userId
          );
          console.log("blah", currentUserFromResponse);
          currentUserFromResponse && setCurrentUser(currentUserFromResponse);
        } else {
          setError("Failed to fetch candidates");
        }
      } catch (err) {
        setError("An error occurred while fetching candidates");
      } finally {
        setLoading(false);
      }
    };

    fetchOrgName();
  }, []);

  const generateLink = async assessmentId => {
    try {
      const response = await axios.post(
        `https://api.liftu.tech/api/v1/exam/${assessmentId}/generateLink`,
        {},
        {
          headers: {
            Authorization: `Bearer ${temporaryToken}`,
            "Content-Type": "application/json"
          }
        }
      );
      console.log(`Exam Has Published for Exam id : ${assessmentId}`);
      console.log("Generated Link Response:", response.data);
      setGeneratedLink(response.data.data.link);
    } catch (err) {
      console.error("Error generating link:", err);
    }
  };

  const handleMenuToggle = id => {
    setVisibleMenuId(prevId => (prevId === id ? null : id));
  };

  // Calculate total pages
  const totalPages = Math.ceil(assessments.length / examsPerPage);

  // Get current exams for the current page
  const indexOfLastExam = currentPage * examsPerPage;
  const indexOfFirstExam = indexOfLastExam - examsPerPage;
  const currentExams = assessments.slice(indexOfFirstExam, indexOfLastExam);

  const handlePageChange = direction => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="admin-landing-container">
      <ViewAssessmentSidebar
        org={orgDetails}
        assessments={assessments}
        currentUser={currentUser}
      />
      <div className="main-container">
        <div className="header-container">
          <div className="title-text">All Assessments</div>

          <button
            className="create-assessment-btn"
            onClick={() => setIsModalOpen(true)}
          >
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
            Create Assessment
          </button>
        </div>

        <div className="main-list-container">
          {loading && <Loader />}
          {!loading && !currentExams.length && "No Data Found"}
          {currentExams.map(assessment => (
            <div key={assessment.id} className="org-container">
              <div className="assessment-left-content">
                <Link
                  to={`/view-candidate/${assessment.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="org-name">
                    {assessment.name || "Untitled Assessment"}
                  </div>
                </Link>
                {assessment.totalMarks && (
                  <p>Total Marks: {assessment.totalMarks}</p>
                )}
                {assessment.startTime && (
                  <p>{new Date(assessment.startTime).toLocaleString()}</p>
                )}
              </div>
              <div className="org-icon-div">
                {visibleMenuId === assessment.id && (
                  <div className="menu-box">
                    <button
                      className="menu-button"
                      onClick={() => generateLink(assessment.id)}
                    >
                      Publish Exam
                    </button>
                    <button className="menu-button">Edit Assessment</button>
                  </div>
                )}
                <MoreVert
                  className="org-icon"
                  onClick={() => handleMenuToggle(assessment.id)}
                />
              </div>
              {generatedLink && (
                <div className="generated-link-container">
                  <p>Generated Test Link:</p>
                  <a
                    href={generatedLink}
                    target="_blank"
                    rel="opener northerner"
                  >
                    {generatedLink}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination-controls">
            <button
              onClick={() => handlePageChange("prev")}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>{`${currentPage} / ${totalPages}`}</span>
            <button
              onClick={() => handlePageChange("next")}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
      <CreateAssessmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default ViewAssessments;
