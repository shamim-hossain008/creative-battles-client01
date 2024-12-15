import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import HostModal from "../Modal/HostModal";
import AdminMenu from "../RoleMenu/AdminMenu/AdminMenu";
import CreatorMenu from "../RoleMenu/CreatorMenu/CreatorMenu";
import UserMenu from "../RoleMenu/UserMenu/UserMenu";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [role, isLoading, loading, setLoading] = useRole();

  // for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalHandler = async () => {
    // console.log("I want become a host");
    closeModal();
    try {
      const currentUser = {
        email: user?.email,
        role: "user",
        status: "Requested",
      };
      const { data } = await axiosSecure.put(`/user`, currentUser);
      // console.log(data, "request to Admin for host");
      if (data.modifiedCount > 0) {
        toast.success("Success! Please wait  for admin confirmation");
      } else {
        toast.success("Please!, Wait for admin Approval!!");
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.message);
    } finally {
      closeModal();
    }
  };

  const handleSignOut = () => {
    setLoading(true);
    logOut()
      .then(() => {})
      .catch((error) => console.log(error.message));
    setLoading(false);
  };
  return (
    <div className="flex flex-col justify-between  gap-4">
      <div>
        <ul className="menu">
          {/* User Dashboard */}
          {/* {role === "user" && <UserMenu />} */}
          <UserMenu />
          {/* Contest Creator */}
          {/* {role === "creator" && <CreatorMenu />} */}
          <CreatorMenu />

          {/* Admin Dashboard */}
          {/* {role === "admin" && <AdminMenu />} */}
          <AdminMenu />
        </ul>
      </div>

      <div className="text-center">
        <>
          <button
            className="  text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-300 w-full   hover:text-gray-600 transition-colors duration-300 transform"
            onClick={() => setIsModalOpen(true)}
          >
            Host Your Contest
          </button>
          <HostModal
            isOpen={isModalOpen}
            closeModal={closeModal}
            modalHandler={modalHandler}
          />
        </>
        <button
          onClick={handleSignOut}
          className=" text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-300 w-full   hover:text-gray-600 transition-colors duration-300 transform"
        >
          <Link to="/login" className="mx-4 font-medium">
            Logout
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
