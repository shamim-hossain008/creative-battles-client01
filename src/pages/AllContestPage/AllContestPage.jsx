import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Helmet } from "react-helmet";
import ContestCard from "../../Components/Card/ContestCard";
import SpinnerLoader from "../../Components/SpinnerLoader";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AllContestPage = () => {
  const axiosPublic = useAxiosPublic();

  const { data: allContest = [], isLoading } = useQuery({
    queryKey: ["allContest"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/all-contest");
      return data;
    },
  });

  if (isLoading) return <SpinnerLoader />;

  return (
    <>
      <Helmet>
        <title>Creative-Battles | All Contest Page</title>
      </Helmet>
      <div className="p-2 ">
        <h2 className="text-2xl uppercase font-bold text-center p-4 text-[#37c5bd]">
          All contest section
        </h2>
        <p className="text-center text-gray-600">
          Total Contests: {allContest.length}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {allContest.map((contest) => (
            <ContestCard
              key={contest._id}
              contest={contest}
              image={contest.image}
              contestName={contest.contestName}
              participationCount={contest.participationCount || 0} // Passing the count to ContestCard
              description={contest.description.slice(0, 100)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AllContestPage;
