import React, { useState, useEffect } from "react";
import axios from "axios";
import { temporaryToken } from "../../../helpers/utils";

import "./selectQuestion.css";

function QuestionList({ onAddQuestion, difficulty, setDifficulty }) {
  const [fetchedQuestions, setFetchedQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, [difficulty]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        `https://api.liftu.tech/api/v1/curriculum/question/list`,
        {
          params: {
            questionType: ["pr", "coding"],
            difficulty: [difficulty],
            page: 1,
            size: 10
          },
          headers: {
            Authorization: `Bearer ${temporaryToken}`
          }
        }
      );

      const questionsWithDescriptions = response.data.data.map(question => ({
        id: question.id,
        title: question.title,
        description: question.description,
        difficulty: question.difficulty
      }));
      setFetchedQuestions(questionsWithDescriptions);
      console.log(questionsWithDescriptions);
    } catch (error) {
      console.error("Error fetching questions:", error);
      alert("Failed to fetch questions. Please try again.");
    }
  };

  const handleDifficulty = e => {
    setDifficulty(e.target.value);
  };

  return (
    <div className="modal-content">
      <div className="search-and-filters">
        <div className="question-list-title">Question List</div>
        <div className="filters">
          <select>
            <option value="">Question</option>
          </select>
          <select onChange={handleDifficulty} value={difficulty}>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <select>
            <option value="">Tools</option>
          </select>
          <select>
            <option value="">Skills</option>
          </select>
        </div>
      </div>
      <div className="border-bottom"></div>
      {fetchedQuestions.map(question => (
        <div key={question.id} className="question-item">
          <div className="question-tittle">
            <div className="question-name-and-difficulty">
              <h6>{question.title}</h6>
            </div>
            <div>{question.difficulty}</div>
          </div>
          <div className="question-item-container">
            <div className="add-question-container">
              <button
                onClick={() => onAddQuestion(question)}
                className="add-question-btn"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default QuestionList;
