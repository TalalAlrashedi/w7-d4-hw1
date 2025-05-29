import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Register from "../component/Register";
import Login from "../component/Login";
import HomeCharacter from "../component/HomeCharacter";

const Layout = () => <Outlet />;

let router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/home", element: <HomeCharacter /> },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
