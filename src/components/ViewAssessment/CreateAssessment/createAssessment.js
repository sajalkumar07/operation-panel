// CreateAssessmentModal.js
import React, { useState, useCallback } from "react";
import axios from "axios";
import "./createAssessment.css";
import { temporaryToken } from "../../../helpers/utils";
import QuestionList from "./selectQuestion";

function CreateAssessmentModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [examName, setExamName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState(180);
  const [sections, setSections] = useState([
    {
      name: "Section 1",
      questions: []
    }
  ]);
  const [difficulty, setDifficulty] = useState("Easy");
  const [showPreview, setShowPreview] = useState(false);

  const handleAddQuestionToSection = question => {
    setSections(prevSections => {
      return prevSections.map(section => {
        if (section.name === "Section 1") {
          if (!section.questions.some(q => q.id === question.id)) {
            return {
              ...section,
              questions: [...section.questions, question]
            };
          }
        }
        return section;
      });
    });
  };

  const createExam = async () => {
    try {
      const startDateTime = `${startDate} ${startTime}`;
      const endDateTime = `${endDate} ${endTime}`;

      if (new Date(startDateTime) >= new Date(endDateTime)) {
        alert("Start time must be before end time.");
        return;
      }

      const formattedSections = sections.map(section => ({
        name: section.name,
        title: section.title,
        questionIds: section.questions.map(q => q.id)
      }));

      const response = await axios.post(
        "https://api.liftu.tech/api/v1/exam/createExam",
        {
          startTime: startDateTime,
          endTime: endDateTime,
          duration: duration,
          name: examName,
          sections: formattedSections
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${temporaryToken}`
          }
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error creating exam:", error);
      alert("An error occurred while creating the exam. Please try again.");
    }
  };

  const handleNext = event => {
    event.preventDefault();

    if (currentStep === 3) {
      setShowPreview(true);
    } else if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = event => {
    event.preventDefault();
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      if (currentStep === 3) {
        setShowPreview(false);
      }
    }
  };

  const handlePreview = e => {
    e.preventDefault();
    setShowPreview(true);
    setCurrentStep(3);
  };
  const handleDeleteQuestion = useCallback(questionId => {
    console.log("Deleting question with ID:", questionId);
    setSections(prevSections => {
      const updatedSections = prevSections.map(section => {
        if (section.name === "Section 1") {
          return {
            ...section,
            questions: section.questions.filter(q => q.id !== questionId)
          };
        }
        return section;
      });
      console.log("Updated sections:", updatedSections);
      return updatedSections;
    });
  }, []);

  const getStepContent = step => {
    switch (step) {
      case 1:
        return (
          <>
            <input
              className="input"
              type="text"
              placeholder="Exam Name"
              value={examName}
              onChange={e => setExamName(e.target.value)}
              required
            />
            <input
              className="input"
              type="date"
              onChange={e => setStartDate(e.target.value)}
              placeholder="Exam Start Date"
              required
            />
            <input
              className="input"
              type="time"
              placeholder="Exam Start Time"
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
              required
            />
            <input
              className="input"
              type="date"
              placeholder="Exam End Date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              required
            />
            <input
              className="input"
              type="time"
              placeholder="Exam End Time"
              value={endTime}
              onChange={e => setEndTime(e.target.value)}
              required
            />
          </>
        );
      case 2:
        return (
          <>
            <div className="select-question-input">
              <h5>Section 1</h5>
            </div>
            <div className="selected-question">
              {sections[0].questions.map(q => (
                <div key={q.id} className="question-item">
                  <div className="question-tittle">
                    <div className="question-name-and-difficulty">
                      <h6>{q.title}</h6>
                    </div>
                    <div>{q.difficulty}</div>
                  </div>
                  <button
                    className="delete-question-button"
                    onClick={() => handleDeleteQuestion(q.id)}
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
                        d="M15.8337 5V16.6667C15.8337 17.5 15.0003 18.3333 14.167 18.3333H5.83366C5.00033 18.3333 4.16699 17.5 4.16699 16.6667V5"
                        stroke="#E04C4C"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M6.66699 4.99984V3.33317C6.66699 2.49984 7.50033 1.6665 8.33366 1.6665H11.667C12.5003 1.6665 13.3337 2.49984 13.3337 3.33317V4.99984"
                        stroke="#E04C4C"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.33301 9.1665V14.1665"
                        stroke="#E04C4C"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M11.667 9.1665V14.1665"
                        stroke="#E04C4C"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              ))}
              <div className="border-bottom"></div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h5>Set the Duration of the Exam</h5>
            <input
              type="number"
              value={duration}
              onChange={e => setDuration(e.target.value)}
              placeholder="Duration"
              required
            />
            <div className="button-group">
              <button
                type="submit"
                className="next-button"
                onClick={handlePreview}
              >
                Preview Question Paper
              </button>
              {currentStep !== 1 && (
                <button type="submit" className="save-draft-button">
                  Save Draft
                </button>
              )}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="model-container">
        <span className="close" onClick={onClose}>
          &times;
        </span>

        <div className="modal-content">
          <div className="progress-indicator">
            {currentStep > 1 && (
              <button
                type="button"
                className="back-button"
                onClick={handleBack}
              >
                <svg
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
              </button>
            )}

            <span
              className={`step ${
                currentStep === 1
                  ? "active"
                  : currentStep > 1
                  ? "completed"
                  : ""
              }`}
            >
              {currentStep === 1 ? "Exam Detail" : "1"}
            </span>
            <span
              className={`step ${
                currentStep === 2
                  ? "active"
                  : currentStep > 2
                  ? "completed"
                  : ""
              }`}
            >
              {currentStep === 2 ? "Select Question" : "2"}
            </span>
            <span
              className={`step ${
                currentStep === 3
                  ? "active"
                  : currentStep > 3
                  ? "completed"
                  : ""
              }`}
            >
              {currentStep === 3 ? "Set Duration" : "3"}
            </span>
          </div>
          <form id="examDetailsForm">
            {getStepContent(currentStep)}
            {currentStep !== 3 && (
              <div className="button-group">
                <button
                  type="submit"
                  className="next-button"
                  onClick={handleNext}
                >
                  {currentStep === 3 ? "Preview Question Paper" : "Next"}
                </button>
                {currentStep !== 1 && (
                  <button type="submit" className="save-draft-button">
                    Save Draft
                  </button>
                )}
              </div>
            )}
          </form>
        </div>

        {currentStep === 2 && (
          <QuestionList
            onAddQuestion={handleAddQuestionToSection}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />
        )}

        {showPreview && (
          <div className="modal-content">
            <div className="preview-header">
              <div className="question-list-title">Front End SDE-1</div>
              <div className="total-question-selected">
                {sections.reduce(
                  (sum, section) => sum + section.questions.length,
                  0
                )}{" "}
                Qs
              </div>

              <div
                contentEditable
                onBlur={e => setDuration(e.target.textContent)}
                suppressContentEditableWarning={true}
                placeholder="Duration"
                className="duration-of-exam"
              >
                {duration}
              </div>
            </div>

            <div className="preview-date-and-time">
              <div>
                Date: {startDate} to {endDate}
              </div>
              <div>
                Time: {startTime} to {endTime}
              </div>
            </div>
            {sections.map(section => (
              <div className="exam-question-preview" key={section.name}>
                <h6 style={{ fontWeight: "bold", fontSize: "20px" }}>
                  {section.name}
                </h6>

                {section.questions.length > 0 ? (
                  <div className="selected-question-summery">
                    {sections[0].questions.map(q => (
                      <h6 key={q.id}>{q.title}</h6>
                    ))}
                  </div>
                ) : (
                  <p>No questions selected.</p>
                )}
              </div>
            ))}
            <div className="border-bottom"></div>
            <div className="button-group">
              <div className="button-group">
                <button
                  type="button"
                  className="next-button"
                  onClick={createExam}
                >
                  Create Exam
                </button>
                <button type="submit" className="save-draft-button">
                  Save Draft
                </button>
                <button type="submit" className="save-draft-button">
                  Edit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateAssessmentModal;
