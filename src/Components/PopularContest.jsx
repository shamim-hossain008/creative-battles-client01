import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import SpinnerLoader from "./SpinnerLoader";

const PopularContest = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { user } = useAuth();

  console.log(user, "from popular section");

  const { data: popularContest = [], isLoading } = useQuery({
    queryKey: ["popularContest"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/popular-contest");
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2">
        {popularContest.map((contest) => (
          <div
            key={contest._id}
            className="card bg-base-100 w-96 h-full mx-auto shadow-xl cursor-pointer group overflow-hidden aspect-square"
          >
            <figure>
              <img
                src={contest.image}
                alt={contest.contestName}
                className="object-cover h-full w-full transition group-hover:scale-125"
              />
            </figure>
            <div className="p-2">
              <h3 className="font-semibold text-lg">
                Contest Name: {contest.contestName}
              </h3>
              <p>Participants: {contest.participationCount || 0}</p>
              <p>{contest.description.slice(0, 100)}...</p>
              <button
                className="btn bg-[#37c5bd] mt-2"
                onClick={() => {
                  if (!user) {
                    navigate("/login");
                  } else {
                    navigate(`/contest/${contest._id}`);
                  }
                  console.log(contest);
                }}
              >
                View Details
              </button>
            </div>
          </div>
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
