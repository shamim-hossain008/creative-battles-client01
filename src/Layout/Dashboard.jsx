import { SiBattledotnet } from "react-icons/si";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "../Components/Dashboard/Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="relative min-h-screen md:flex mx-4">
      {/* side bar */}
      <div className="to-base-600">
        <div className="brightness-600 ">
          <Link
            to="/"
            className="flex items-center justify-center bg-[#37c5bd] drop-shadow-2xl rounded-sm p-2 gap-2"
          >
            <SiBattledotnet className="size-6 md:size-10" />

            <h3 className="text-base md:text-2xl mx-4 font-bold">
              Creative <span className="text-primary">Battles</span>
            </h3>
          </Link>
        </div>
        <Sidebar />
      </div>

      {/* Outlet --- Dynamic content */}
      <div className=" flex-1 md:ml-10 bg-green-400">
        <div className="p-4">
          <h4>Outlet</h4>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
