import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../../Provider/AuthProvider";
import logo from "../../../../assets/logo.webp";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext || {});

  const handleSignOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error.message));
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allContests">All Contests</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar fixed z-10 shadow-md lg:px-20 bg-base-100">
      <div className="navbar-start ">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost font-bold lg:text-2xl">
          <img src={logo} alt="" className="w-16 h-10 bg-base-100" />
          <span className="text-[#37c5bd]">Creative</span>-
          <span className="">Battles</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      {/*  */}
      <div className="navbar-end">
        {user ? (
          <div className="flex items-center lg:gap-4">
            {user && (
              <div
                tabIndex={0}
                role="button"
                data-tip={user?.email}
                className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom"
              >
                <img className="lg:w-10  rounded-full" src={user?.photoURL} />
              </div>
            )}

            <button
              onClick={handleSignOut}
              className="btn w-26 text-xl text-white bg-[#37c5bd] font-bold "
            >
              Sign Out
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="btn w-26 text-xl text-white bg-[#37c5bd] font-bold ">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
