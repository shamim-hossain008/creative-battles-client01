import { createBrowserRouter } from "react-router-dom";

import EditContest from "../../Components/SocialLogin/EditContest";
import ViewDetails from "../../Components/ViewDetails";
import AllContestPage from "../../pages/AllContestPage/AllContestPage";
import ManageContest from "../../pages/Dashboard/Admin/ManageContest";
import ManageUser from "../../pages/Dashboard/Admin/ManageUser";
import Statistics from "../../pages/Dashboard/Common/Statistics";
import AddContest from "../../pages/Dashboard/Creator/AddContest";
import ContestSubmitted from "../../pages/Dashboard/Creator/ContestSubmitted";
import MyCreatedContest from "../../pages/Dashboard/Creator/MyCreatedContest";
import MyParticipatedContest from "../../pages/Dashboard/User/MyParticipatedContest";
import MyProfile from "../../pages/Dashboard/User/MyProfile";
import MyWinningContestPage from "../../pages/Dashboard/User/MyWinningContestPage";
import Home from "../../pages/Home/Home/Home";
import Login from "../../pages/Login/Login";
import PaymentPage from "../../pages/Payment/PaymentPage";
import SignUp from "../../pages/SignUp/SignUp";
import Dashboard from "../Dashboard";
import MainLayout from "../MainLayout";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";

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
        path: "/contest/:id",
        element: <ViewDetails />,
      },
    ],
  },

  // Dashboard Layout
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <Statistics />,
      },
      // user routes

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
      {
        path: "payment/:contestId",
        element: <PaymentPage />,
      },

      // Admin Only Routes
      {
        path: "manage-user",
        element: (
          <AdminRoute>
            <PrivateRoute>
              <ManageUser />
            </PrivateRoute>
          </AdminRoute>
        ),
      },
      {
        path: "manage-contest",
        element: <ManageContest />,

        // Creator Dashboard
      },
      {
        path: "add-contest",
        element: <AddContest />,
      },
      {
        path: "my-created-contest",
        element: <MyCreatedContest />,
      },
      {
        path: "contest-submitted/:contestId",
        element: <ContestSubmitted />,
      },
      {
        path: "my-participated-contest",
        element: <MyParticipatedContest />,
      },
      {
        path: "my-winning-contest-page",
        element: <MyWinningContestPage />,
      },
      {
        path: "my-profile",
        element: <MyProfile />,
      },
      {
        path: "edit-contest:id",
        element: <EditContest />,
      },
    ],
  },
]);
