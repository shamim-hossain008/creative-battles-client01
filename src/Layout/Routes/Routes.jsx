import { createBrowserRouter } from "react-router-dom";

import ViewDetails from "../../Components/ViewDetails";
import AllContestPage from "../../pages/AllContestPage/AllContestPage";
import Statistics from "../../pages/Dashboard/Common/Statistics";
import MyParticipatedContest from "../../pages/Dashboard/User/MyParticipatedContest";
import MyProfile from "../../pages/Dashboard/User/MyProfile";
import MyWinningContestPage from "../../pages/Dashboard/User/MyWinningContestPage";
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
    children: [
      {
        index: true,
        element: <Statistics />,
      },

      {
        path: "my-participated-contest",
        element: <MyParticipatedContest />,
      },
      {
        path: "my-winning-contest",
        element: <MyWinningContestPage />,
      },
      {
        path: "my-profile",
        element: <MyProfile />,
      },
    ],
  },
]);
