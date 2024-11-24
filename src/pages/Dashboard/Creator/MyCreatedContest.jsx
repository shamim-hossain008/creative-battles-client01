import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import DeleteModal from "../../../Components/Dashboard/Modal/DeleteModal";
import SpinnerLoader from "../../../Components/SpinnerLoader";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyCreatedContest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

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
      <Helmet>
        <title>My Created Contest | Dashboard </title>
      </Helmet>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Contest Name</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contests.map((contest) => (
            // <TableRows key={contest._id} contest={contest} refetch={refetch} />
            <tr key={contest._id}>
              <td className="border px-4 py-2">{contest.contestName}</td>
              <td className="border px-4 py-2 text-center">
                {contest.status === "accepted" ? "Accepted" : "Pending.."}
              </td>
              <td className="border flex justify-between px-4 py-2 space-x-2">
                <>
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      (window.location.href = `/editContest/${contest?._id}`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setIsOpen(true)}
                    className="btn btn-error"
                  >
                    Delete
                  </button>
                  <DeleteModal
                    isOpen={isOpen}
                    closeModal={closeModal}
                    handleDelete={handleDelete}
                    id={contest?._id}
                  />
                </>

                <Link
                  to={`/contest-submitted/${contest?._id}`}
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

export default MyCreatedContest;
