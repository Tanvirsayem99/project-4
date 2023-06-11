import {
    createBrowserRouter,
  } from "react-router-dom";
import AllInstructor from "../Components/AllInstructor/AllInstructor";
import AdminClasses from "../Components/Dashboard/Admins/AdminClasses";
import AdminSideBar from "../Components/Dashboard/Admins/AdminSideBar";
import AdminUsers from "../Components/Dashboard/Admins/AdminUsers";
import AddClass from "../Components/Dashboard/Instructors/AddClass";
import InstructorBoard from "../Components/Dashboard/Instructors/InstructorBoard";
import MyClass from "../Components/Dashboard/Instructors/MyClass";
import AllClasses from "../Components/Dashboard/Students/AllClasses";
import MyEnrolledClasses from "../Components/Dashboard/Students/MyEnrolledClasses";
import PaymentHistory from "../Components/Dashboard/Students/PaymentHistory";
import SelectedClasses from "../Components/Dashboard/Students/SelectedClasses";
import StudentBoard from "../Components/Dashboard/Students/StudentBoard";
import Home from "../Components/Home/Home";
import Shared from "../Components/shared/Shared";
import Login from "../Components/Sign/Login";
import Register from "../Components/Sign/Register";
import ErrorPage from "../ErrorPage/ErrorPage";
import AdminPrivate from "../ProtectedRoute/AdminPrivate";
import InstructorPrivate from "../ProtectedRoute/InstructorPrivate";


 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Shared></Shared>,
      errorElement: <ErrorPage></ErrorPage>,
      children:[
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path: '/class',
          element: <AllClasses></AllClasses>
        },
        {
          path: '/instructors',
          element: <AllInstructor></AllInstructor>
        },
      ],
    },
    {
        path: '/adminDashboard',
        element: <AdminPrivate><AdminSideBar></AdminSideBar></AdminPrivate>,
        children:[
          {
            path: '/adminDashboard',
            element: <AdminUsers></AdminUsers>
          },
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
            path: '/instructorDashboard',
            element: <InstructorPrivate> <AddClass></AddClass></InstructorPrivate>
          },
          {
            path: 'myclass',
            element: <MyClass></MyClass>
          },
        ]
    },
    {
        path: '/userDashboard',
        element: <StudentBoard></StudentBoard>,
        children:[
          {
            path: '/userDashboard',
            element: <SelectedClasses></SelectedClasses>
          },
          {
            path: 'enrolledClass',
            element: <MyEnrolledClasses></MyEnrolledClasses>
          },
          {
            path: 'history',
            element: <PaymentHistory></PaymentHistory>
          }
        ]
    }
  ]);