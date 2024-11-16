import { useContext } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { SiBattledotnet } from "react-icons/si";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../../Provider/AuthProvider";

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
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
    </>
  );

  return (
    <header className="bg-base-100 px-4 md:px-20 w-full z-50 sticky top-0 border-b">
      <nav className="h-20 flex justify-between items-center">
        {/* Left */}
        <div>
          <Link to="/" className="flex items-center justify-center gap-2">
            <SiBattledotnet className="size-6 md:size-10" />

            <h3 className="text-base md:text-2xl font-bold">
              Creative <span className="text-primary">Battles</span>
            </h3>
          </Link>
        </div>

        {/* Middle */}
        <div className="hidden md:block">
          <ul className="flex items-center gap-10">{navLinks}</ul>
        </div>

        {/* Right side */}
        <div className="">
          {/* Dropdown Menu */}
          <div className="block md:hidden dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn">
              <RxHamburgerMenu className="size-6" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2.5 shadow flex flex-col gap-2"
            >
              {navLinks}
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="btn w-26 text-xl text-white bg-[#37c5bd] font-bold "
                >
                  Sign Out
                </button>
              ) : (
                <Link to="/login">
                  <button className="btn btn-primary btn-md w-full">
                    Login
                  </button>
                </Link>
              )}
            </ul>
          </div>

          {/* Right side */}
          <div className="hidden md:block">
            {user ? (
              <div className="flex items-center lg:gap-4 ">
                {user && (
                  <div
                    tabIndex={0}
                    role="button"
                    data-tip={user?.email}
                    className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom"
                  >
                    <img
                      className="lg:w-10  rounded-full"
                      src={user?.photoURL}
                    />
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
                <button className="hidden md:block btn w-24 text-white btn-primary">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
