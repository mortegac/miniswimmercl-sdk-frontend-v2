import { lazy } from "react";
import { Navigate, useLocation } from "react-router-dom";

import FullscreenComponent from './FullscreenComponent';


import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { selectAuth, getAuthUser} from "@/stores/Users/slice";

import {
    PUBLIC,
    PRIVATE,
    HOME,
    LEADS,
    STUDENTS,
    STUDENTS_DATA,
    LOCATIONS, 
    COURSES,
    COURSES_QUOTAS,
    REPORT_OF_REGISTERED,
    QUICK_REGISTRATION,
    QUICK_REGISTRATION2,
    ENROLLMENTS,
    ENROLLMENTS_READ,
    ENROLLMENTS_CREATE,
    ATTENDANCE,
    PAYMENTS,
    TICKETS,
    NEW_EXPENSE, 
    EXPENSES, 
    INCOME,
    ACADEMYSTUDENTS,
    TRANSACTIONS,
    SHOPPING_CART,
    REPORT_COURSES,
    ADMIN_STUDENT,
    DOCUMENTATION
  } from "./paths";

  import Layout from "../themes";
  
  const AdminStudents = lazy(() => import("../pages/private/StudentProfile"));
  const Dashboard = lazy(() => import("../pages/private/Dashboard"));
  const Leads = lazy(() => import("../pages/private/Leads"));
  // const Students = lazy(() => import("../pages/private/Students"));
  import Students from "../pages/private/Students";
  import StudentData from "../pages/private/StudentData";
  const Locations = lazy(() => import("../pages/private/Locations"));
  // const Courses = lazy(() => import("../pages/private/Courses"));
  import Courses from "../pages/private/Courses";
  import ReportOfRegistered from "../pages/private/ReportOfRegistered";
  import CoursesQuotas from "../pages/private/CoursesQuotas";
  import QuickRegistration2 from "../pages/private/QuickRegistration2";
  import QuickRegistration from "../pages/private/QuickRegistration";
 
  const Enrollments = lazy(() => import("../pages/private/Enrollments"));
  const Transactions = lazy(() => import("../pages/private/Transactions"));
  const ShoppingCart = lazy(() => import("../pages/private/ShoppingCart"));
  
  // const Attendance = lazy(() => import("../pages/private/Attendance"));
  
  import StartAdmin from "../pages/private/StartAmin";
  // import EnrollmentsRead from "../pages/private/EnrollmentsRead";
  // import EnrollmentsCreate from "../pages/private/EnrollmentsCreate";
  
  import Attendance from "../pages/private/Attendance";
  const Payments = lazy(() => import("../pages/private/Payments"));
  const Tickets = lazy(() => import("../pages/private/Tickets"));
  const Expenses = lazy(() => import("../pages/private/Expenses"));
  const NewExpenses = lazy(() => import("../pages/private/NewExpenses"));
  const Income = lazy(() => import("../pages/private/Income"));
  
  
  const AcademyStudents = lazy(() => import("../pages/private/AcademyStudents"));
  const ReportCourseStudent = lazy(() => import("../pages/private/ReportCourseStudent"));
  const Documentation = lazy(() => import("../pages/private/Documentation"));
  
  
  
  export function PrivateValidation() {
    const { isAuthenticated, ...auth } = useAppSelector(selectAuth);
    const location = useLocation();
    
    
    // console.log("PrivateValidation>>> isAuthenticated", isAuthenticated)
    
    const prevUrl = location.state?.from ?? PUBLIC;
  
    if (!isAuthenticated) {
      return <Navigate to={prevUrl} state={{ from: location }} />;
    }
    
    // if (location.pathname == "/") {
    //   return <Navigate to={"/auth"} state={{ from: location }} />;
    // }
      return (
        <>
           {/* <FullscreenComponent> */}
            <Layout />
           {/* </FullscreenComponent> */}
        </>
      );
  
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
          path: HOME,
          element: <StartAdmin />,
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
          path: STUDENTS_DATA,
          element: <StudentData />,
        },
        {
          path: ATTENDANCE,
          element: <Attendance />,
        },
        {
          path: ADMIN_STUDENT,
          element: <AdminStudents />,
        },
        {
          path: QUICK_REGISTRATION,
          element: <QuickRegistration />,
        },
        {
          path: QUICK_REGISTRATION2,
          element: <QuickRegistration2 />,
        },
        {
          path: ENROLLMENTS,
          element: <Enrollments />,
        },
        // {
        //   path: ENROLLMENTS_READ,
        //   element: <EnrollmentsRead />,
        // },
        // {
        //   path: ENROLLMENTS_CREATE,
        //   element: <EnrollmentsCreate />,
        // },
        {
          path: COURSES,
          element: <Courses />,
        },
        {
          path: REPORT_OF_REGISTERED,
          element: <ReportOfRegistered />,
        },
        {
          path: REPORT_COURSES,
          element: <ReportCourseStudent />,         
          
        },
        {
          path: COURSES_QUOTAS,
          element: <CoursesQuotas />,
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
          path: SHOPPING_CART,
          element: <ShoppingCart />,
        },
        {
          path: TRANSACTIONS,
          element: <Transactions />,
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
        {
          path: DOCUMENTATION,
          element: <Documentation />,         
          
        },
        
      ],
  };