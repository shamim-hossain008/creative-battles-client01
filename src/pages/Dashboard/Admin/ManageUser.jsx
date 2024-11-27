import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { toast } from "react-hot-toast";
import UpdateTableRow from "../../../Components/Dashboard/TableRow/UpdateTableRow";
import SpinnerLoader from "../../../Components/SpinnerLoader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  // Fetch Contest
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get(`/users`);
        return data;
      } catch (error) {
        console.error("Error fetching users", error.message);
        toast.error("Error fetching users", error.message);
      }
    },
  });

  // console.log(users, "all users data");

  if (isLoading) return <SpinnerLoader />;

  return (
    <div>
      <Helmet>
        <title>Manage User by Admin | Dashboard </title>
      </Helmet>
      <div>
        <h2 className="inline text-center font-bold mx-auto text-xl p-2 bg-green-300 border rounded-full px-6 py-2">
          Total Users: {users.length}
        </h2>
        <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-[#37C5BD]">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UpdateTableRow key={user?._id} user={user} refetch={refetch} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
