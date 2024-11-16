import { AiOutlineFileDone } from "react-icons/ai";
import { CgAdd } from "react-icons/cg";
import { IoCreateOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const Sidebar = () => {
  const { logOut } = useAuth();

  const handleSignOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error.message));
  };
  return (
    <div className="flex flex-col justify-between  gap-4">
      <div>
        <ul className="menu">
          {/* Admin Dashboard */}
          {/* <>
        

          <li>
            <NavLink to="manage-user">
              <GrUserManager />
              Manage User
            </NavLink>
          </li>
          <li>
            <NavLink to="manage-contest">
              <FaUserEdit /> 
              Manage Contests
            </NavLink>
          </li>
        </> */}
          <li>
            <NavLink to="add-contest">
              <CgAdd />
              Add Contest
            </NavLink>
          </li>
          <li>
            <NavLink to="my-created-contest">
              <IoCreateOutline />
              My Created Contest
            </NavLink>
          </li>
          <li>
            <NavLink to="contest-submitted">
              <AiOutlineFileDone />
              Contest Submitted
            </NavLink>
          </li>
        </ul>
      </div>

      <div>
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
