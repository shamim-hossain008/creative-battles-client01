import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import DeleteModal from "../Modal/DeleteModal";
import EditContestModal from "../Modal/EditContestModal";

const CreatorContestTableRow = ({ contest, refetch }) => {
  const [selectedContestId, setSelectedContestId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // for delete Modal
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };

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
      await deleteMutation.mutateAsync(id);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <tr>
      <td className="border px-4 py-2">{contest.contestName}</td>
      <td className="border px-4 py-2 text-center text-red-400 ">
        {contest.status === "confirmed" ? "Accepted" : "Pending.."}
      </td>

      <td className="border flex justify-between px-4 py-2 space-x-2">
        <button
          className="btn btn-primary"
          onClick={() => {
            setIsEditModalOpen(true);
            selectedContestId(contest._id);
          }}
        >
          Edit
        </button>
        <EditContestModal
          contest={contest}
          isOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          refetch={refetch}
        />

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

          <DeleteModal
            isOpen={isOpen}
            closeModal={closeModal}
            handleDelete={() => handleDelete(selectedContestId)}
          />
        </>
        <Link
          to={`/dashboard/contest-submitted/${contest._id}`}
          className="btn bg-[#37C5BD]"
        >
          See Submissions
        </Link>
      </td>
    </tr>
  );
};

export default CreatorContestTableRow;
