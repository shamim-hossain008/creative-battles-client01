import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Dashboard/Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="relative min-h-screen md:flex">
      {/* side bar */}
      <div className="bg-blue-500">
        Side Bar
        <Sidebar />
      </div>

      {/* Outlet --- Dynamic content */}
      <div className=" flex-1 md:ml-20 bg-green-400">
        <div className="p-5">
          <h4>Outlet</h4>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
