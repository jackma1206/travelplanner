import React from "react";

const Card = props => {
  const { name, todo, image, description } = props.data;

  return (
    <div className="card">
      <div className="card-image">
        <img src={image} alt="city" />
        <span className="card-title">{name}</span>
        <a className="btn-floating halfway-fab waves-effect waves-light red">
          <i class="fas fa-angle-right" />
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
                <i class="fas fa-map-marker-alt" />
              </span>
              <span className="todo-number">{todo}</span>
            </li>
            <li>
              <span className="star-icon">
                <i className="fa fa-star" />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Card;
