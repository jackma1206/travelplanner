import React from "react";
import FaveStar from "../star/FaveStar";

const Card = props => {
  const { tripName, image, description, thingsToDo } = props.data;
  const { href } = props;
  const tId = props.data._id;
  return (
    <div className="card">
      <div className="card-image">
        <img src={image} alt="city" />
        <span className="card-title">{tripName}</span>
        <a
          href={href}
          className="btn-floating halfway-fab waves-effect waves-light red"
        >
          <i className="fas fa-angle-right" />
        </a>
      </div>
      <div className="card-content">
        <div className="description">
          <p>{description}</p>
        </div>
        <div className="stats">
          <ul>
            <li>
              <span className="marker-icon">
                <i className="fas fa-map-marker-alt" />
              </span>
              <span className="todo-number">{thingsToDo.length}</span>
            </li>
            <FaveStar tId={tId} />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Card;
