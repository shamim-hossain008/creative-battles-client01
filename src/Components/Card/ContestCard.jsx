import React from "react";
import { Link } from "react-router-dom";

const ContestCard = ({
  contestName,
  participationCount,
  image,
  description,
  contest,
}) => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl p-2">
      <figure>
        <img src={image} alt={contestName} className="object-cover" />
      </figure>
      <div>
        <div className="flex justify-between">
          <h2 className="card-title">ContestName:{contestName}</h2>
          <h2>Participation Count:{participationCount}</h2>
        </div>
        <div>
          <p>{description}....</p>
        </div>
        <div className="card-actions p-2">
          <Link to="(`/contest/${contest._id}`)" className="btn bg-[#37c5bd]">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContestCard;
