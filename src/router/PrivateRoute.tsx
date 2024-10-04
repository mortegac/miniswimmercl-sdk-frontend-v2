import { lazy } from "react";
import { Navigate, useLocation } from "react-router-dom";


import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { selectAuth, getAuthUser} from "@/stores/Users/slice";

import {
    PUBLIC,
    PRIVATE,
    LEADS,
    STUDENTS, 
    LOCATIONS, 
    COURSES,
    QUICK_REGISTRATION,
    ATTENDANCE,
    PAYMENTS,
    TICKETS,
    NEW_EXPENSE, 
    EXPENSES, 
    INCOME,
    ACADEMYSTUDENTS,
  } from "./paths";
  
  import Layout from "../themes";
  
  const Dashboard = lazy(() => import("../pages/private/Dashboard"));
  const Leads = lazy(() => import("../pages/private/Leads"));
  // const Students = lazy(() => import("../pages/private/Students"));
  import Students from "../pages/private/Students";
  const Locations = lazy(() => import("../pages/private/Locations"));
  // const Courses = lazy(() => import("../pages/private/Courses"));
  import Courses from "../pages/private/Courses";
  import QuickRegistration from "../pages/private/QuickRegistration2";
  
  // const Attendance = lazy(() => import("../pages/private/Attendance"));
  import Attendance from "../pages/private/Attendance";
  const Payments = lazy(() => import("../pages/private/Payments"));
  const Tickets = lazy(() => import("../pages/private/Tickets"));
  const Expenses = lazy(() => import("../pages/private/Expenses"));
  const NewExpenses = lazy(() => import("../pages/private/NewExpenses"));
  const Income = lazy(() => import("../pages/private/Income"));
  const AcademyStudents = lazy(() => import("../pages/private/AcademyStudents"));

  export function PrivateValidation() {
    const { isAuthenticated, ...auth } = useAppSelector(selectAuth);
    const location = useLocation();
    
    const prevUrl = location.state?.from ?? PUBLIC;
  
    if (!isAuthenticated) {
      return <Navigate to={prevUrl} state={{ from: location }} />;
    }
    
    // if (location.pathname == "/") {
      return (
        <>
          {/* <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          /> */}
          <Layout />
        </>
      );
    // }
  
    // return <Navigate to={"/"} state={{ from: location }} />;
  }
  
export const privateRoutes = {
    path: PRIVATE,
    element: <PrivateValidation />,
    children: [
        // {
        //   path: PRIVATE,
        //   element: <Dashboard />,
        // },
        {
          path: PRIVATE,
          element: <QuickRegistration />,
        },
        {
          path: LEADS,
          element: <Leads />,
        },
        {
          path: STUDENTS,
          element: <Students />,
        },
        {
          path: ATTENDANCE,
          element: <Attendance />,
        },
        {
          path: QUICK_REGISTRATION,
          element: <QuickRegistration />,
        },
        {
          path: COURSES,
          element: <Courses />,
        },
        
        {
          path: LOCATIONS,
          element: <Locations />,
        },
        {
          path: PAYMENTS,
          element: <Payments />,
        },
        {
          path: TICKETS,
          element: <Tickets />,
        },
        {
          path: NEW_EXPENSE,
          element: <NewExpenses />,
        },
        {
          path: EXPENSES,
          element: <Expenses />,
        },
        {
          path: INCOME,
          element: <Income />,
        },
        
        {
          path: ACADEMYSTUDENTS,
          element: <AcademyStudents />,
          
          
        },
        
      ],
  };