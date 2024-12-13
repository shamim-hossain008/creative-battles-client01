import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import img2 from "../assets/developers-1.png";
import useAxiosPublic from "../hooks/useAxiosPublic";
import SpinnerLoader from "./SpinnerLoader";

const Advertises = () => {
  const axiosPublic = useAxiosPublic();
  // ..................
  // Fetch submissions for the contest
  const {
    data: submissions = [],
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["contest-submissions"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/contest-submissions`);

      return data;
    },
  });
  console.log("submissions data", submissions);

  if (isLoading) return <SpinnerLoader />;

  // Check if submissions data is empty
  if (submissions.length === 0) {
    return <div>No submissions found.</div>;
  }

  return (
    <>
      <div className="text-center p-4 ">
        <h2 className="text-3xl font-bold text-[#37c5bd] p-2">
          🏆 Join Our Exciting Contest! 🏆
        </h2>
        <p> Be Part of the Challenge and Win Amazing Prizes!</p>
      </div>
      <div className="divider mx-96"></div>
      <div className="flex-1 md:flex justify-around p-4">
        <div className="font-bold">
          <h2 className="text-xl">Current Contest Winner</h2>
          <p>Name:{submissions[0]?.user?.name}</p>
          <p>
            Winning Entry:
            <a
              href={submissions[0]?.taskLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Entry
            </a>
          </p>
          <p>Prize:$5000</p>
          <div className="divider"></div>
          <h2 className="text-xl">Contest Statistics:</h2>
          <ul>
            <li>Participants: submissions.length</li>
            <li>
              Total Contest Winners:
              {submissions.filter((sub) => sub.status === "Winner").length}
            </li>
          </ul>
          <div className="divider"></div>
          <h2 className="text-xl"> Why Participate? </h2>
          <p>Participating in our contest is a chance to:</p>
          <ul>
            <li>Showcase your creativity.</li>
            <li>Compete with talented individuals.</li>
            <li>Win exciting prizes and gain recognition.</li>
          </ul>
          <div className="divider"></div>
          <h3 className="text-xl">How to Participate:</h3>
          <ul>
            <li>1. Register on our website.</li>
            <li>2. Submit your entry before the deadline.</li>
            <li>3. Wait for the announcement of the winners.</li>
          </ul>
          <div className="divider"></div>
          <h3 className="text-xl">Inspiration from Our Community:</h3>
          <p>
            "Winning this contest was a dream come true! <br /> It boosted my
            confidence and opened new opportunities." - John Smith, Previous
            Winner
          </p>
          <p>
            "I loved the challenge and the thrill of competition. <br />
            Can’t wait for the next one!" - Emily Davis, Contest Participant
          </p>
          <div className="divider"></div>
          <h3 className="mb-4 text-xl">
            Don’t miss out on the chance to be our next star! <br />
            <Link to="/signUp" className="text-[#37c5bd]">
              Register Now
            </Link>
            and let your talent shine!
          </h3>
        </div>
        <div>
          <img src={img2} alt="Contest" />
        </div>
      </div>
    </>
  );
};

export default Advertises;
