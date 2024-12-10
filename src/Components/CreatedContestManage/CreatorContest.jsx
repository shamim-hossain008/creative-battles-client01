import { useQuery } from "@tanstack/react-query";

import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import CreatorContestTableRow from "../Dashboard/TableRow/CreatorContestTableRow";
import SpinnerLoader from "../SpinnerLoader";

const CreatorContest = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  // Update modal

  // Fetch Contests
  const {
    data: contests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-created-contest", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/my-created-contest/${user?.email}`
      );
      return data;
    },
  });
  // console.log(contests, " MyCreatedContest data");
  // delete contest

  if (isLoading) return <SpinnerLoader />;
  return (
    <div>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-[#37C5BD]">
            <th className="border px-4 py-2">Contest Name</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contests.map((contest) => (
            <CreatorContestTableRow
              key={contest._id}
              contest={contest}
              refetch={refetch}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreatorContest;
