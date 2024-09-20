import React from "react";
import "./AdminLanding.css";

import Sidebar from "../sidebar/Sidebar";

const AdminLanding = () => {
  return (
    <div className="admin-landing-container">
      <Sidebar />

      <div className="main-container">
        <img
          src="/images/rafiki.jpg"
          alt="Illustration"
          className="styled-image"
        />
        <div className="header-container"></div>

        <div className="title-text">
          Select an action from the left panel to get started
        </div>
      </div>
    </div>
  );
};

export default AdminLanding;
