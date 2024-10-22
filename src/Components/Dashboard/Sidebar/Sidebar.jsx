import { AiOutlineFileDone } from "react-icons/ai";
import { CgAdd } from "react-icons/cg";
import { IoCreateOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
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
  );
};

export default Sidebar;
