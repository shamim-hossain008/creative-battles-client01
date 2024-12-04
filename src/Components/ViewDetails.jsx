import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import SpinnerLoader from "./SpinnerLoader";

const ViewDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: contest = {}, isLoading } = useQuery({
    queryKey: ["contest, id"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/contest/${id}`);

      return data;
    },
  });

  const handleRegister = () => {
    navigate(`/dashboard/payment/${contest._id}`, {
      state: { price: contest.price, contestId: contest._id },
    });
  };
  if (isLoading) return <SpinnerLoader />;

  return (
    <>
      <Helmet>
        <title>Creative-Battles | View Details</title>
      </Helmet>
      <div className="max-w-4xl mx-auto p-4 mt-16">
        <h1 className="text-3xl font-bold mb-4">
          Contest Name: {contest?.contestName}
        </h1>

        <img
          src={contest?.image}
          alt="image"
          className="w-full h-64 object-cover mb-4"
        />

        <div className="mb-4">
          <strong>Participation Count: </strong>
          {contest?.participationCount || 0}
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Description</h2>
          <p>{contest?.description}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Prize</h2>
          <p>${contest?.prize}</p>
        </div>

        {contest.winnerName && contest.winnerImage && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Winner</h2>
            <p>{contest?.winnerName}</p>
            <img
              src={contest?.winnerImage}
              alt={`${contest?.winnerName}'s Image`}
              className="w-32 h-32 object-cover"
            />
          </div>
        )}

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Time Left</h2>
          <p>{/* Show a countdown timer */}</p>
        </div>

        <div className="mb-4 text-red-500">Contest is no longer available.</div>

        <button
          onClick={handleRegister}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Register for Contest
        </button>
      </div>
    </>
  );
};

export default ViewDetails;
