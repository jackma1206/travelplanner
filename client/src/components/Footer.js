import React from "react";
import "../styles/footer.scss";
const Footer = props => {
  return (
    <div className="footer">
      <div className="footer-content">
        <ul>
          <li>
            <a className="footer-icon" href="#">
              <i className="fab fa-github" />
            </a>
          </li>
          <li>
            <a className="footer-icon" href="#">
              <i className="fab fa-linkedin" />
            </a>
          </li>
          <li>
            <a className="footer-icon" href="github.com/jackma1206">
              <i className="fab fa-github" />
            </a>
          </li>
        </ul>
        <p>Created By Jack Ma</p>
      </div>
    </div>
  );
};
export default Footer;
