import { useMutation } from "@tanstack/react-query";

import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SubmittedTableRow = ({ submission, refetch, name }) => {
  const axiosSecure = useAxiosSecure();

  // Mutation to declare winner
  const declareWinnerMutation = useMutation({
    mutationFn: async (submissionId, contestId) => {
      const { data } = await axiosSecure.patch(
        `contests/${contestId}/winner/${submissionId}`
      );
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success("Winner declared successFully!");
    },
  });

  //   Handle declare Winner
  const handleDeclareWinner = async (submissionId) => {
    try {
      await declareWinnerMutation.mutateAsync(submissionId);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <tr className="text-center">
      <td className="border px-4 py-2">{name}</td>
      <td className="border px-4 py-2">{submission.user?.email}</td>
      <td className="border px-4 py-2">
        <a
          href={submission.taskLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View Task
        </a>
      </td>
      <td className="border px-4 py-2">{submission.contestId}</td>
      <td className="border px-4 py-2 text-center">
        {submission.status === "Winner" ? (
          <span className="text-green-500">Winner</span>
        ) : (
          <span className="text-red-500">
            {submission.status || "Un-success"}
          </span>
        )}
      </td>
      <td className="border px-4 py-2 text-center">
        {submission.status !== "Winner" && (
          <button
            className="btn btn-primary"
            onClick={() => handleDeclareWinner(submission._id)}
          >
            Declare Win
          </button>
        )}
      </td>
    </tr>
  );
};

export default SubmittedTableRow;
