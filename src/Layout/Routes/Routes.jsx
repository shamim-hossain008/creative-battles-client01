import { createBrowserRouter } from "react-router-dom";

import ViewDetails from "../../Components/ViewDetails";
import AllContestPage from "../../pages/AllContestPage/AllContestPage";
import Home from "../../pages/Home/Home/Home";
import Login from "../../pages/Login/Login";
import SignUp from "../../pages/SignUp/SignUp";
import Dashboard from "../Dashboard";
import MainLayout from "../MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/allContests",
        element: <AllContestPage />,
      },
      {
        path: "/viewDetails",
        element: <ViewDetails />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
]);
