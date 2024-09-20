import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import { COMPANY_LOGO } from "../../helpers/ImagePath";

const Header = function({ history }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light pl-4 pr-4">
      <div className="container-fluid">
        <a
          className="navbar-brand"
          style={{ cursor: "pointer" }}
          onClick={() => {
            history.push("/dashboard");
          }}
        >
          <img src={COMPANY_LOGO} alt="Logo" className="img-fluid" />
        </a>
        <div className="ml-auto profile__info-xs">
          <div className="heading6_sb initials_ring">SC</div>
        </div>
        <button
          className="navbar-toggler bg-white"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse ml-5" id="navbarNav">
          <ul className="navbar-nav h-100">
            <li className="nav-item d-flex align-items-center noOutline pt-1 pb-1" />
            <li className="nav-item d-flex align-items-center noOutline" />
            <li className="nav-item noOutline logout-xs text-white heading3_sb mt-3">
              Logout
            </li>
          </ul>
          <ul className="navbar-nav h-100 ml-auto profile__info">
            <li className="nav-item d-flex align-items-center noOutline pt-1 pb-1">
              <div className="form-inline">
                <div className="heading6_sb initials_ring">SC</div>
                <div className="text-white">
                  <div className="heading6_sb">
                    {JSON.parse(localStorage.getItem("name"))
                      ? JSON.parse(localStorage.getItem("name"))
                      : ""}
                  </div>
                  <div className="heading7_r">
                    {JSON.parse(localStorage.getItem("roles"))
                      ? JSON.parse(localStorage.getItem("roles"))
                      : ""}
                  </div>
                </div>
              </div>
            </li>
            <li className="mx-2">
              <div className="nav__link-sepa" />
            </li>
            <li className="nav-item noOutline logout ml-3 text-white">
              <FontAwesomeIcon
                icon={faPowerOff}
                onClick={() => {
                  window.location.href = "/logout";
                }}
              />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Header);
