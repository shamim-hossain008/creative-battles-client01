import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SpinnerLoader from "../SpinnerLoader";

const CreatorContest = () => {
  const { user } = useAuth();
  console.log(user, "Current User");

  const axiosSecure = useAxiosSecure();
  let [selectedContestId, setSelectedContestId] = useState(null);


  // for delete Modal
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };

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
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/my-created-contest/${id}`);
      return data;
    },
    onSuccess: (data) => {
      refetch(), toast.success("Your Contest has been deleted");
    },
  });

  // handle Delete
  const handleDelete = async (id) => {
    try {
      await deleteMutation.mutate(id);
    } catch (error) {
      console.log(error.message);
    }
  };

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
            <tr key={contest._id}>
              <td className="border px-4 py-2">{contest.contestName}</td>
              <td className="border px-4 py-2 text-center text-red-400 ">
                {contest.status === "confirmed" ? "Accepted" : "Pending.."}
              </td>

              <td className="border flex justify-between px-4 py-2 space-x-2">
                <Link
                  className="btn btn-primary"
                  to={`dashboard/edit-contest/${contest?._id}`}
                >
                  Edit
                </Link>

                <>
                  <button
                    onClick={() => {
                      setIsOpen(true);
                      setSelectedContestId(contest._id);
                    }}
                    className="btn btn-error"
                  >
                    Delete
                  </button>
                </>

                <Link
                  to={`/dashboard/contest-submitted/${contest._id}`}
                  className="btn bg-[#37C5BD]"
                >
                  See Submissions
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreatorContest;
