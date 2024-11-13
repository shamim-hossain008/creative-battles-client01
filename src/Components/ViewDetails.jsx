import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import SpinnerLoader from "./SpinnerLoader";

const ViewDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: contest = {}, isLoading } = useQuery({
    queryKey: ["contest, id"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/contest/${id}`);

      return data;
    },
  });
  if (isLoading) return <SpinnerLoader />;

  console.log(contest);

  return (
    <>
      <Helmet>
        <title>Creative-Battles | View Details</title>
      </Helmet>
      <div className="max-w-4xl mx-auto p-4 mt-16">
        <h1 className="text-3xl font-bold mb-4">Contest Name</h1>
        <img
          src="https://miro.medium.com/v2/resize:fit:1358/0*MP6LuktlEBIr8N90"
          alt=""
          className="w-full h-64 object-cover mb-4"
        />

        <div className="mb-4">
          <strong>Attempts/Participation Count:</strong> attempted Count
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Description</h2>
          <p>contest-description</p>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Prize</h2>
          <p>contest-prize</p>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Winner</h2>
          <p>contest-winner-name</p>
          <img
            src="https://miro.medium.com/v2/resize:fit:1358/0*MP6LuktlEBIr8N90"
            alt=""
            className="w-32 h-32 object-cover"
          />
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Time Left</h2>
          <p>{/* Show a countdown timer */}</p>
        </div>

        <div className="mb-4 text-red-500">Contest is no longer available.</div>

        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Register for Contest
        </button>
      </div>
    </>
  );
};

export default ViewDetails;
