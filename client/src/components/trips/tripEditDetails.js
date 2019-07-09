import React from "react";
import "../../styles/tripDetail.scss";
import RenderTrips from "../dash/renderTrips";

const tripEditDetails = props => {
  if (!props.data.toDe) return "loading";

  return (
    <div className="tripDeets">
      <div className="coll-wrapper">
        <RenderTrips data={props.data} />
        <span
          className="edit-button btn-small grey lighten-2"
          onClick={props.toggleEdit}
        >
          <i className="far fa-edit" /> Edit
        </span>
      </div>
    </div>
  );
};

export default tripEditDetails;
