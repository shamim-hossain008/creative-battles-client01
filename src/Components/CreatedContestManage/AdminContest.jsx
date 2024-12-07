import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import CommentModal from "../Dashboard/Modal/CommentModal";
import DeleteModal from "../Dashboard/Modal/DeleteModal";
import SpinnerLoader from "../SpinnerLoader";

const AdminContest = () => {
  const { user } = useAuth();
  console.log(user, "Current User");

  const axiosSecure = useAxiosSecure();
  let [selectedContestId, setSelectedContestId] = useState(null);

  // For comment modal
  let [commentOpen, setCommentOpen] = useState(false);
  const closeCommentModal = () => setCommentOpen(false);

  // for delete Modal
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };

  // Update modal

  // Fetch Contests
  const {
    data: allContest = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allContest"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-contest`);
      return data;
    },
  });
  
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

  // Confirm Mutation
  const confirmMutation = useMutation({
    mutationFn: async (id) => await axiosSecure.patch(`/confirm-contest/${id}`),
    onSuccess: () => {
      refetch();
      toast.success("Contest confirm");
    },
  });

  // Comment Mutation
  const commentMutation = useMutation({
    mutationFn: async ({ id, comment }) =>
      await axiosSecure.post(`/contest-comment/${id}`, { comment }),
    onSuccess: () => {
      refetch();
      toast.success("Comment added");
      closeCommentModal();
    },
  });

  // handle Delete
  const handleDelete = async (id) => {
    try {
      await deleteMutation.mutate(id);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleConfirm = (id) => confirmMutation.mutate(id);
  const handleCommentSubmit = (comment) =>
    commentMutation.mutate({ id: selectedContestId, comment });

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
          {allContest.map((contest) => (
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
                  <button
                    onClick={() => handleConfirm(contest._id)}
                    className="btn btn-success"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => {
                      setCommentOpen(true);
                      setSelectedContestId(contest._id);
                    }}
                    className="btn btn-warning"
                  >
                    Comment
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

      {/* Modals */}
      <DeleteModal
        isOpen={isOpen}
        closeModal={closeModal}
        handleDelete={() => handleDelete(selectedContestId)}
      />
      <CommentModal
        isOpen={commentOpen}
        closeModal={closeCommentModal}
        handleSubmit={handleCommentSubmit}
      />
    </div>
  );
};

export default AdminContest;