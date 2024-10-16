import { FaUserEdit } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <ul className="menu">
        <>
          {/* Admin Dashboard */}

          <li>
            <NavLink to="/">
              <GrUserManager />
              Manage User
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <FaUserEdit />
              Manage Contests
            </NavLink>
          </li>
        </>
      </ul>
    </div>
  );
};

export default Sidebar;
