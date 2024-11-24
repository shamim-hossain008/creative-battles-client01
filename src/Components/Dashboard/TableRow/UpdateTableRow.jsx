import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import DeleteModal from "../Modal/DeleteModal";
import UpdateRoleModal from "../Modal/UpdateRoleModal";

import { toast } from "react-hot-toast";

import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpdateTableRow = ({ user, refetch }) => {
  console.log(user);
  const axiosSecure = useAxiosSecure();
  // for delete Modal
  let [isOpen, setIsOpen] = useState(false);
  let [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  const closeModalUpdate = () => {
    setIsModalOpen(false);
  };

  // Updated handler
  const { mutateAsync } = useMutation({
    mutationFn: async (role) => {
      const { data } = await axiosSecure.patch(
        `/users/update/${user?.email}`,
        role
      );
      console.log(user, "all user..........");
      return data;
    },

    onSuccess: (data) => {
      console.log(data, "user data");
      refetch();
      toast.success("User role updated Successful!");
      setIsModalOpen(false);
    },
  });

  // modal handler
  const modalHandler = async (selected) => {
    console.log("role Updated", selected);
    const user = {
      role: selected,
      status: "Verified",
    };
    try {
      await mutateAsync(user);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  // delete contest
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/users/delete/${id}`, id);
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

  return (
    <tr>
      <td className="border px-4 py-2">{user?.name}</td>
      <td className="border px-4 py-2">{user?.email}</td>
      <td className="border px-4 py-2 text-center">{user?.role}</td>

      <td class="px-12 py-4 text-sm text-center font-medium whitespace-nowrap">
        <div class="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100">
          {user?.status}
        </div>
      </td>
      <td className="border flex justify-between px-4 py-2 space-x-2">
        <>
          {/* button Update role */}
          <div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn btn-primary"
            >
              Update Role
            </button>

            <UpdateRoleModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              modalHandler={modalHandler}
              user={user}
              closeModalUpdate={closeModalUpdate}
            />
          </div>

          {/* button Delete */}
          <button onClick={() => setIsOpen(true)} className="btn btn-error">
            Delete
          </button>
          <DeleteModal
            isOpen={isOpen}
            closeModal={closeModal}
            handleDelete={handleDelete}
            id={user?._id}
          />
        </>
      </td>
    </tr>
  );
};

export default UpdateTableRow;
