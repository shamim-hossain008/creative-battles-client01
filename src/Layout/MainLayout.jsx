import { Outlet } from "react-router-dom";
import Footer from "../pages/Home/Shared/Footer/Footer";
import NavBar from "../pages/Home/Shared/NavBar/NavBar";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
