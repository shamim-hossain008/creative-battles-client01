import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import SubmittedTableRow from "../../../Components/Dashboard/TableRow/SubmittedTablerow";
import SpinnerLoader from "../../../Components/SpinnerLoader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ContestSubmitted = () => {
  const { contestId } = useParams();

  const axiosSecure = useAxiosSecure();

  // Fetch all contests created by the user
  // const { data: contests = [], isLoading: loadingContests } = useQuery({
  //   queryKey: ["all-contests"],
  //   queryFn: async () => {
  //     const { data } = await axiosSecure.get(`/all-contest`);
  //     return data;
  //   },
  // });

  // Fetch submissions for the contest
  const {
    data: submissionResponse = {},
    isLoading: loadingSubmissions,
    refetch,
  } = useQuery({
    queryKey: ["contest-submissions", contestId],
    queryFn: async () => {
      // Verify that contestId is a proper string before making the request
      if (!contestId) {
        throw new Error("Contest ID is missing or invalid");
      }
      const { data } = await axiosSecure.get(
        `/contest/${contestId}/submissions`
      );
      return data;
    },
  });

  // Extract submissions array from the response
  const submissions = submissionResponse.data || [];

  if (loadingSubmissions) return <SpinnerLoader />;

  console.log("Fetched submissions:", submissions);

  return (
    <div>
      <Helmet>
        <title>Contest Submitted | Dashboard </title>
      </Helmet>
      <h3 className="text-2xl p-4 font-bold">Your Contest</h3>
      {/* Contest List */}
      {/* <ul>
        {contests.map((contest) => (
          <li
            key={contest._id}
            className="cursor-pointer text-blue-500 underline"
            onClick={() => setSelectedContestId(contest._id)}
          >
            {contest.contestName} - Prize: {contest.prize}
          </li>
        ))}
      </ul> */}
      {/* Show Submissions if Contest is Selected */}

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-[#37C5BD]">
            <th className="border px-4 py-2">Participant Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Submitted Task</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {submissions.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No submissions found.
              </td>
            </tr>
          ) : (
            submissions.map((submission) => (
              <SubmittedTableRow
                key={submission?._id}
                submission={submission}
                refetch={refetch}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
export default ContestSubmitted;
