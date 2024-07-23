import { Outlet } from "react-router-dom";
import NavBar from "../pages/Home/Shared/NavBar/NavBar";

const MainLayout = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Outlet />
    </div>
  );
};

export default MainLayout;
