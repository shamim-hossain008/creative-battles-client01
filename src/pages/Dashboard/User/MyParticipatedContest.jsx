import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Helmet } from "react-helmet";
import ParticipatedTableRow from "../../../Components/Dashboard/TableRow/ParticipatedTableRow";
import SpinnerLoader from "../../../Components/SpinnerLoader";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyParticipatedContest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch data
  const {
    data: participatedContest = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-participated-contest", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/my-participated-contest/${user?.email}`
      );
      return data;
    },
  });

  console.log(participatedContest);
  if (isLoading) return <SpinnerLoader />;

  return (
    <div>
      <Helmet>
        <title>My Participated Contest Page | Dashboard </title>
      </Helmet>
      <div>
        <h2 className="inline text-center font-bold mx-auto text-xl p-2 bg-green-300 border rounded-full px-6 py-2">
          My Participated Contest List
        </h2>

        <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-[#37C5BD]">
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Participation Date</th>
              <th className="border px-4 py-2">Transaction ID</th>
              <th className="border px-4 py-2">Status Payment</th>
            </tr>
          </thead>
          <tbody>
            {participatedContest.map((participated) => (
              <ParticipatedTableRow
                key={participated._id}
                participated={participated}
                refetch={refetch}
              />
            ))}
          </tbody>
          <p className="font-semibold">
            Total Participate Contests: {participatedContest?.length}
          </p>
        </table>
      </div>
    </div>
  );
};

export default MyParticipatedContest;
