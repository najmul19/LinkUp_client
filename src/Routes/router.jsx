import { createBrowserRouter } from "react-router-dom";
import RootLayouts from "../Layouts/RootLayouts";
import FeedPage from "../components/Feed/Feed";
import AuthLayout from "../Layouts/AuthLayout";
import LoginPage from "../components/Auth/Login";
import RegisterPage from "../components/Auth/Register";
import PrivateRout from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
  {
    path: "/root",
    element: (
      <PrivateRout>
        <RootLayouts />
      </PrivateRout>
    ),
    children: [
      { path: "feed", element: <FeedPage /> },
      
    ],
  },
]);
