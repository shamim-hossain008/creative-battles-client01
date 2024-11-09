import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import ContestCard from "./Card/ContestCard";
import SpinnerLoader from "./SpinnerLoader";

const PopularContest = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: contest = [], isLoading } = useQuery({
    queryKey: ["popularContest"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/all-contest");
      return data;
    },
    select: (data) => data.slice(0.5),
  });

  if (isLoading) return <SpinnerLoader />;

  return (
    <div className="p-2  ">
      <h2 className="text-2xl uppercase font-bold text-center p-4 text-[#37c5bd]">
        popular contest section
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {contest.map((contest) => (
          <ContestCard
            key={contest._id}
            contest={contest.contest}
            contestName={contest.contestName}
            image={contest.image}
            participationCount={contest.participationCount || 0}
            description={contest.description.slice(0, 100)}
            onDetailsClick={() => {
              if (!user) {
                navigate("/login");
              } else {
                navigate(`/contest/$contest_id`);
              }
            }}
          />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Link to="allContests" className="btn text-bold bg-[#37c5bd]">
          Show All
        </Link>
      </div>
    </div>
  );
};

export default PopularContest;
