import {
    createBrowserRouter,
  } from "react-router-dom";
import AdminBoard from "../Components/Dashboard/Admins/AdminBoard";
import InstructorBoard from "../Components/Dashboard/Instructors/InstructorBoard";
import StudentBoard from "../Components/Dashboard/Students/StudentBoard";
import Home from "../Components/Home/Home";
import Shared from "../Components/shared/Shared";
import Login from "../Components/Sign/Login";
import Register from "../Components/Sign/Register";

 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Shared></Shared>,
      children:[
        {
          path: '/',
          element: <Home></Home>
        }
      ]
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/register',
        element: <Register></Register>
    },
    {
        path: '/adminDashboard',
        element: <AdminBoard></AdminBoard>
    },
    {
        path: '/instructorDashboard',
        element: <InstructorBoard></InstructorBoard>
    },
    {
        path: '/userDashboard',
        element: <StudentBoard></StudentBoard>
    }
  ]);