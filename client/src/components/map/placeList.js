import React from "react";

const placeList = props => {
  return (
    <div className="placelist">
      <ul className="side-list">
        {props.places.map((place, i) => {
          let className = "";
          if (i === props.isActive) {
            className += "isActive";
          }
          return (
            <li
              className={className}
              id={i}
              key={i}
              onClick={e => props.onClick(e, place, i)}
            >
              {place.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default placeList;
