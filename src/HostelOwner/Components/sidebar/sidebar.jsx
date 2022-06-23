import React from "react";
import { Link } from "react-router-dom";

/**
 * defined components
 */
import seller from "../../../app.config";

/**
 * styles and assets
 */
import "./sidebar.css";
import ProfileImage from "../../../assets/logos/plus_logo_color.png";

export default (props) => {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-hdr">
          <img src={ProfileImage} alt="CLASSIMAGE" />
          <span>{seller.seller_business_name || "...."}</span>
        </div>
        <div className="sidebar-links">
          <Link to="/">
            <div
              className={
                props.active === "home" ? "sidebar-link active" : "sidebar-link"
              }
            >
              <i className="las la-home"></i>
              <span>Home</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
