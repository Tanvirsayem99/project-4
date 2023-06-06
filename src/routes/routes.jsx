import {
    createBrowserRouter,
  } from "react-router-dom";
import Shared from "../Components/shared/Shared";
import Login from "../Components/Sign/Login";
import Register from "../Components/Sign/Register";

 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Shared></Shared>
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/register',
        element: <Register></Register>
    }
  ]);