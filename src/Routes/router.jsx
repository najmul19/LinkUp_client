import { createBrowserRouter } from "react-router-dom";
import RootLayouts from "../Layouts/RootLayouts";
import FeedPage from "../components/Feed/Feed";
import AuthLayout from "../Layouts/AuthLayout";
import LoginPage from "../components/Auth/Login";
import RegisterPage from "../components/Auth/Register";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayouts />,
    children: [
      {
        index: true,
        element: <FeedPage />,
      },
      // ... other routes
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
]);
