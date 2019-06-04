import React from "react";

const placeList = props => {
  let className = "";

  return (
    <div>
      <ul>
        {props.places.map((place, i) => {
          className = "";
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
