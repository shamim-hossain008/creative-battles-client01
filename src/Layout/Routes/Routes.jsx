import { createBrowserRouter } from "react-router-dom";

import Login from "../../Pages/Login/Login";
import Home from "../../pages/Home/Home/Home";
import SignUp from "../../pages/SignUp/SignUp";
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
    ],
  },
]);
