import React from "react";

const tripDetail = props => {
  let fCode = props.data.fromDe.code;
  let fCity = `${props.data.fromDe.city}, ${props.data.fromDe.country}`;

  let toCode = props.data.toDe.code;
  let toCity = `${props.data.toDe.city}, ${props.data.toDe.country}`;

  const renderButtons = () => {
    if (window.location.pathname === "/dashboard") {
      return (
        <div className="col s4 right-align icons">
          <a href="#" className="btn-small">
            <i className="fas fa-eye" />
          </a>
          <a href={props.href} className="btn-small">
            <i className="far fa-edit" />
          </a>
          <a href="#" className="btn-small">
            <i className="far fa-trash-alt" />
          </a>
        </div>
      );
    }
  };
  return (
    <div>
      <div className="destination-wrapper">
        <div className="from">
          <span className="code">{fCode}</span>
          <span className="city">{fCity}</span>
        </div>
        <div className="plane">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK-kAYqfyoe1Hfq1HZCp_68-D9yADgc3MT4f5bID29RyOTbqSd1w"
            alt="plane"
          />
        </div>
        <div className="to">
          <span className="code">{toCode}</span>
          <span className="city">{toCity}</span>
        </div>
      </div>
      <div className="divider" />
      <div className="trip-detail">
        <div className="row">
          <div className="col s4">
            <span className="text-hiline">Departure Date</span>
            <span className="text-actual">{props.data.departDate}</span>
          </div>
          <div className="col s4">
            <span className="text-hiline">Travelers</span>
            <span className="text-actual">{props.data.numPeople}</span>
          </div>
          <div className="col s4 ">
            <span className="text-hiline">Estimated Cost</span>
            <span className="text-actual">${props.data.flightCost}</span>
          </div>
        </div>
        <div className="row">
          <div className="col s4">
            <span className="text-hiline">Return Date</span>
            <span className="text-actual">{props.data.returnDate}</span>
          </div>
          <div className="col s4">
            <span className="text-hiline">Itinerary</span>
            <span className="text-actual">{props.data.thingsToDo.length}</span>
          </div>
          {renderButtons()}
        </div>
      </div>
    </div>
  );
};

export default tripDetail;