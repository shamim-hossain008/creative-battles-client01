import { CgProfile } from "react-icons/cg";
import { FaUsers } from "react-icons/fa";
import { GiChampions } from "react-icons/gi";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div>
      <ul className="menu">
        <li>
          <NavLink to="my-participated-Contest">
            <FaUsers />
            My Participated Contest
          </NavLink>
        </li>
        <li>
          <NavLink to="my-winning-contest-page">
            <GiChampions />
            My WinningContest Page
          </NavLink>
        </li>
        <li>
          <NavLink to="my-Profile">
            <CgProfile />
            My Profile
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
