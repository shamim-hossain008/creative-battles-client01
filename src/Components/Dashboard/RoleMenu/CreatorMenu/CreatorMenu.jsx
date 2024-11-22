import { AiOutlineFileDone } from "react-icons/ai";
import { CgAdd } from "react-icons/cg";
import { IoCreateOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const CreatorMenu = () => {
  return (
    <div>
      <ul className="menu">
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

export default CreatorMenu;
