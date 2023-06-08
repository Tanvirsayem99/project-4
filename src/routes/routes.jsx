import {
    createBrowserRouter,
  } from "react-router-dom";
import AdminClasses from "../Components/Dashboard/Admins/AdminClasses";
import AdminSideBar from "../Components/Dashboard/Admins/AdminSideBar";
import AdminUsers from "../Components/Dashboard/Admins/AdminUsers";
import AddClass from "../Components/Dashboard/Instructors/AddClass";
import InstructorBoard from "../Components/Dashboard/Instructors/InstructorBoard";
import MyClass from "../Components/Dashboard/Instructors/MyClass";
import StudentBoard from "../Components/Dashboard/Students/StudentBoard";
import Home from "../Components/Home/Home";
import Shared from "../Components/shared/Shared";
import Login from "../Components/Sign/Login";
import Register from "../Components/Sign/Register";
import AdminPrivate from "../ProtectedRoute/AdminPrivate";
import InstructorPrivate from "../ProtectedRoute/InstructorPrivate";

 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Shared></Shared>,
      children:[
        {
          path: '/',
          element: <Home></Home>
        }
      ],
    },
    {
        path: '/adminDashboard',
        element: <AdminPrivate><AdminSideBar></AdminSideBar></AdminPrivate>,
        children:[
          // {
          //   path: 'adminDashboard',
          //   element: <p>hello</p>
          // },
          {
            path: 'class',
            element: <AdminClasses></AdminClasses>
          },
          {
            path: 'adUsers',
            element: <AdminUsers></AdminUsers>
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
        path: '/instructorDashboard',
        element: <InstructorPrivate><InstructorBoard></InstructorBoard></InstructorPrivate>,
        children:[
          {
            path: 'addclass',
            element: <AddClass></AddClass>
          },
          {
            path: 'myclass',
            element: <MyClass></MyClass>
          },
        ]
    },
    {
        path: '/userDashboard',
        element: <StudentBoard></StudentBoard>
    }
  ]);