import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../sidebar/Sidebar";
import Loader from "../common/Loader";
import { MoreVert } from "@material-ui/icons";
import "./ViewCandidates.css";
import { temporaryToken } from "../../helpers/utils";

const ViewCandidates = props => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const candidatesPerPage = 10;
  const [isFormModelOpen, setIsFormModelOpen] = useState(false);
  const [fields, setFields] = useState([{ email: "" }]);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  console.log(props.match.params.id);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(
          `https://api.liftu.tech/api/v1/exam/${props?.match?.params?.id}/candidates`,
          {
            headers: {
              Authorization: `Bearer ${temporaryToken}`,
              "Content-Type": "application/json"
            }
          }
        );
        if (response.data.status) {
          setCandidates(response.data.data.data);
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
  if (error) return <div>{error}</div>;

  const totalPages = Math.ceil(candidates.length / candidatesPerPage);

  // Determine the candidates to display on the current page
  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = candidates.slice(
    indexOfFirstCandidate,
    indexOfLastCandidate
  );

  const handleBackClick = () => {
    window.history.back();
  };

  const toggleAddStudentForm = e => {
    setIsFormModelOpen(!isFormModelOpen);
  };

  // const handleAddField = () => {
  //   setFields([...fields, { email: ''  }]);
  // };

  // const handleRemoveField = (index) => {
  //   const newFields = fields.filter((_, fieldIndex) => fieldIndex !== index);
  //   setFields(newFields);
  // };

  const handleAddField = () => {
    setFields([...fields, { email: "" }]);
  };

  const handleRemoveField = index => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleFieldChange = (index, event) => {
    const { value } = event.target;
    const updatedFields = fields.map((field, i) =>
      i === index ? { ...field, email: value } : field
    );
    setFields(updatedFields);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const usersToAdd = fields.map(field => field.email).filter(email => email);

    if (usersToAdd.length === 0) {
      alert("Please enter at least one email address.");
      return;
    }

    try {
      const response = await axios.post(
        `https://api.liftu.tech/api/v1/exam/${props?.match?.params?.id}/addUsers`,
        { usersToAdd },
        {
          headers: {
            Authorization: `Bearer ${temporaryToken}`, // Use the actual token
            "Content-Type": "application/json"
          }
        }
      );
      console.log("Response:", response.data);
      // Optionally, handle success, e.g., show a success message or reset the form
    } catch (error) {
      console.error("Error adding students:", error);
      // Optionally, handle error, e.g., show an error message
    }
  };

  return (
    <div className="admin-landing-container">
      <Sidebar />
      <div className="main-container">
        <header className="header-container">
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
            All Candidates
          </div>

          <button
            className="create-assessment-btn"
            onClick={toggleAddStudentForm}
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
            Add Student
          </button>

          {isFormModelOpen && (
            <div className="form-container-new">
              <div className="form-header-new">
                <button className="close-button" onClick={toggleAddStudentForm}>
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
                <p className="modal-title">
                  Add Students{" "}
                  <span
                    onClick={handleAddField}
                    style={{
                      cursor: "pointer"
                    }}
                  >
                    +
                  </span>
                </p>
              </div>
              <form className="form">
                {fields.map((field, index) => (
                  <div className="detail-field">
                    <input
                      type="email"
                      className="EmailInput"
                      placeholder="Email Address"
                      value={field.email}
                      onChange={event => handleFieldChange(index, event)}
                    />
                    <input
                      type="Name"
                      className="NameInput"
                      placeholder="Name"
                    />
                    <div
                      className="bin-icon"
                      onClick={() => handleRemoveField(index)}
                      style={{
                        cursor: "pointer"
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.5 5H17.5"
                          stroke="#E04C4C"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M15.8332 5V16.6667C15.8332 17.5 14.9998 18.3333 14.1665 18.3333H5.83317C4.99984 18.3333 4.1665 17.5 4.1665 16.6667V5"
                          stroke="#E04C4C"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M6.6665 5.00008V3.33341C6.6665 2.50008 7.49984 1.66675 8.33317 1.66675H11.6665C12.4998 1.66675 13.3332 2.50008 13.3332 3.33341V5.00008"
                          stroke="#E04C4C"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M8.3335 9.16675V14.1667"
                          stroke="#E04C4C"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M11.6665 9.16675V14.1667"
                          stroke="#E04C4C"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                ))}

                <button type="submit" onClick={handleSubmit}>
                  Add Student
                </button>
              </form>
            </div>
          )}

          <div className="search-and-filters">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search for name, email or phone number"
              />
              <svg
                className="search-icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.9999 20.9999L16.6499 16.6499"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="filters">
              <select>
                <option value="">Status</option>
                <option value="Incomplete">Incomplete</option>
                <option value="Completed">Completed</option>
              </select>
              <select>
                <option value="">Start Time</option>
              </select>
              <select>
                <option value="">Date</option>
              </select>
            </div>
          </div>
        </header>

        <div className="main-list-container">
          <table className="candidates-table">
            <thead>
              <>
                <th>S/N</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </>
            </thead>

            <tbody className="candidates-table-content">
              {currentCandidates.length > 0 ? (
                currentCandidates.map((candidate, index) => (
                  <tr key={candidate.id}>
                    <td>{indexOfFirstCandidate + index + 1}</td>
                    <td>{candidate.name}</td>
                    <td>{candidate.email}</td>
                    <td>{candidate.phone}</td>
                    <td>
                      <button className="view-submission">
                        View Submission
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 9L12 15L18 9"
                            stroke="#4D80F4"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </td>
                    <div className="more-option-icon">
                      <MoreVert className="org-icon" />
                    </div>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No candidates found</td>{" "}
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="pagination-controls">
          <svg
            onClick={() =>
              setCurrentPage(prevPage => Math.max(prevPage - 1, 1))
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
              setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))
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
      </div>
    </div>
  );
};

export default ViewCandidates;
