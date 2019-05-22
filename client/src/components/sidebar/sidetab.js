import React from "react";

const sidetab = props => {
  let className = "waves-effect";
  if (props.isActive === props.id) {
    className += " sidebar-active";
  }
  return (
    <li className={className} onClick={props.onClick}>
      <span className="dash-icon">
        <i className={props.icon} /> {props.name}
      </span>
    </li>
  );
};

export default sidetab;
