import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SubmissionForm = () => {
  const { contestId } = useParams(); // Get contest ID from URL or context
  const axiosSecure = useAxiosSecure();

  const submitMutation = useMutation({
    mutationFn: async (submissionData) => {
      const { data } = await axiosSecure.post(
        `/contests/${contestId}/submit`,
        submissionData
      );
      return data;
    },

    onSuccess: () => {
      toast.success("Submission successful!");
      window.location.reload();
    },
    onError: (error) => {
      toast.error("Error submitting: " + error.message);
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const submissionData = {
      participantName: formData.get("name"),
      email: formData.get("email"),
      taskLink: formData.get("taskLink"),
    };

    try {
      await submitMutation.mutateAsync(submissionData);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="card glass w-96 h-full mx-auto bg-slate-500 my-20 ">
      <form className="card-body " onSubmit={handleSubmit}>
        <input
          className="input input-bordered w-full max-w-xs "
          name="name"
          placeholder="Your Name"
          required
        />
        <input
          className="input input-bordered w-full max-w-xs mt-2"
          name="email"
          type="email"
          placeholder="Your Email"
          required
        />
        <input
          className="input input-bordered w-full mt-2 max-w-xs "
          name="taskLink"
          placeholder="Link to Task"
          required
        />

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SubmissionForm;
