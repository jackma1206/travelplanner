import React from "react";
import "../../styles/tripDetail.scss";
import RenderTrips from "../dash/renderTrips";

const tripDeets = props => {
  console.log(props);

  if (!props.data.toDe) return "loading";

  return (
    <div className="tripDeets">
      <div className="coll-wrapper">
        <RenderTrips data={props.data} />
      </div>
      <button onClick={props.toggleEdit}>Press me</button>
    </div>
  );
};

export default tripDeets;
