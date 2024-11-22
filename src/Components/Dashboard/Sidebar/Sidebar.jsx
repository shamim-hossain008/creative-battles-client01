import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import AdminMenu from "../RoleMenu/AdminMenu/AdminMenu";
import CreatorMenu from "../RoleMenu/CreatorMenu/CreatorMenu";
import UserMenu from "../RoleMenu/UserMenu/UserMenu";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [role, isLoading] = useRole();

  console.log(role);

  const handleSignOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error.message));
  };
  return (
    <div className="flex flex-col justify-between  gap-4">
      <div>
        <ul className="menu">
          {/* User Dashboard */}
          {role === "user" && <UserMenu />}
          {/* Contest Creator */}
          {role === "creator" && <CreatorMenu />}

          {/* Admin Dashboard */}
          {role === "admin" && <AdminMenu />}
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
