import { lazy } from "react";
import { Navigate, useLocation } from "react-router-dom";

import FullscreenComponent from './FullscreenComponent';


import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { selectAuth, getAuthUser} from "@/stores/Users/slice";

import {
    ADMIN_DASHBOARD,
    ANFITRION_DASHBOARD,
    NONE_DASHBOARD,
    PUBLIC,
    PRIVATE,
    HOME,
    LEADS,
    STUDENTS,
    STUDENTS_DATA,
    LOCATIONS,
    EVALUATIONS_ADMIN,
    COURSES,
    COURSES_QUOTAS,
    REPORT_OF_REGISTERED,
    QUICK_REGISTRATION,
    QUICK_REGISTRATION2,
    QUICK_REGISTRATION_US,
    ENROLLMENTS_EXPIRING,
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
    DOCUMENTATION,
  } from "./paths";

  import Layout from "../themes";
  
  // const AdminStudents = lazy(() => import("../pages/private/StudentProfile"));
  import AdminStudents from "../pages/private/StudentProfile";
  // const Dashboard = lazy(() => import("../pages/private/Dashboard"));
  const Leads = lazy(() => import("../pages/private/Leads"));
  // const Students = lazy(() => import("../pages/private/Students"));
  // import Students from "../pages/private/Students";
  // import StudentData from "../pages/private/StudentData";
  const StudentData = lazy(() => import("../pages/private/StudentData"));
  const Locations = lazy(() => import("../pages/private/Locations"));
  const Evaluations = lazy(() => import("../pages/private/AdminEvaluations"));
  const Courses = lazy(() => import("../pages/private/Courses"));
  // import Courses from "../pages/private/Courses";
  const ReportOfRegistered = lazy(() => import("../pages/private/ReportOfRegistered"));
  // import ReportOfRegistered from "../pages/private/ReportOfRegistered";
  const CoursesQuotas = lazy(() => import("../pages/private/CoursesQuotas"));
  // import CoursesQuotas from "../pages/private/CoursesQuotas";
  // import QuickRegistration2 from "../pages/private/QuickRegistration2";
  import QuickRegistration from "../pages/private/QuickRegistration";
  // import QuickRegistrationUs from "../pages/private/QuickRegistrationUs";
  
  const EnrollmentsExpiring = lazy(() => import("../pages/private/EnrollmentsExpiringv2"));
  const Enrollments = lazy(() => import("../pages/private/Enrollments"));
  const Transactions = lazy(() => import("../pages/private/Transactions"));
  const ShoppingCart = lazy(() => import("../pages/private/ShoppingCart"));
  
  // const Attendance = lazy(() => import("../pages/private/Attendance"));
  
  const StartAdmin = lazy(() => import("../pages/private/StartAmin"));
  // import StartAdmin from "../pages/private/StartAmin";
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
  const AdminDashboard = lazy(() => import("../pages/private/DashboardAdmin"));
  const AnfitrionDashboard = lazy(() => import("../pages/private/DashboardAnfitrion"));
  const NoneDashboard = lazy(() => import("../pages/private/DashboardNone"));
  
  // Definición de permisos por rol
  const adminRolePermissions: string[] = [
    QUICK_REGISTRATION,
    ADMIN_DASHBOARD,
    PRIVATE,
    HOME,
    LEADS,
    STUDENTS,
    STUDENTS_DATA,
    LOCATIONS,
    EVALUATIONS_ADMIN,
    COURSES,
    COURSES_QUOTAS,
    REPORT_OF_REGISTERED,
    QUICK_REGISTRATION2,
    QUICK_REGISTRATION_US,
    ENROLLMENTS,
    ENROLLMENTS_EXPIRING,
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
  ];

  const AnfitrionesPermissions: string[] = [
    ATTENDANCE,
    ANFITRION_DASHBOARD,
    DOCUMENTATION,
    ADMIN_STUDENT
  ];

  const NonePermissions: string[] = [
    NONE_DASHBOARD,
  ];

  // Función para obtener permisos según el rol
  const getPermissionsByRole = (roleId: string): string[] => {
    switch (roleId) {
      case "adminRole":
        return adminRolePermissions;
      case "anfitrion":
        return AnfitrionesPermissions;
      case "coach":
      case "parents":
      case "academyRole":
        return NonePermissions;
      default:
        return NonePermissions;
    }
  };

  // Función para obtener el dashboard según el rol
  const getDashboardByRole = (roleId: string): string => {
    switch (roleId) {
      case "adminRole":
        return ADMIN_DASHBOARD;
      case "anfitrion":
        return ANFITRION_DASHBOARD;
      case "coach":
      case "parents":
      case "academyRole":
        return NONE_DASHBOARD;
      default:
        return NONE_DASHBOARD;
    }
  };

  // Componente para proteger rutas basado en permisos
  interface ProtectedRouteProps {
    children: React.ReactElement;
    requiredPath: string;
  }

  const ProtectedRoute = ({ children, requiredPath }: ProtectedRouteProps) => {
    const { usersRolesId } = useAppSelector(selectAuth);
    const location = useLocation();
    
    const userPermissions = getPermissionsByRole(usersRolesId);
    
    // adminRole tiene acceso a todo
    if (usersRolesId === "adminRole") {
      return children;
    }
    
    // Verificar si el usuario tiene permiso para esta ruta
    const hasPermission = userPermissions.includes(requiredPath);
    
    if (!hasPermission) {
      // Redirigir al dashboard correspondiente según el rol
      const dashboardPath = getDashboardByRole(usersRolesId);
      return <Navigate to={dashboardPath} state={{ from: location }} replace />;
    }
    
    return children;
  };
  
  export function PrivateValidation() {
    const { isAuthenticated, usersRolesId } = useAppSelector(selectAuth);
    const location = useLocation();
    
    
    console.log("PrivateValidation>>>", usersRolesId)
      // adminRole
      // admin
      // anfitrion
      // coach
      // parents
      // academyRole
    
    const prevUrl = location.state?.from ?? PUBLIC;
  
    if (!isAuthenticated) {
      return <Navigate to={prevUrl} state={{ from: location }} />;
    }
    
    // Redirigir al dashboard correspondiente si accede a la ruta raíz
    if (location.pathname === PRIVATE) {
      const dashboardPath = getDashboardByRole(usersRolesId);
      return <Navigate to={dashboardPath} replace />;
    }
    
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
        {
          path: ADMIN_DASHBOARD,
          element: (
            <ProtectedRoute requiredPath={ADMIN_DASHBOARD}>
              <AdminDashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: ANFITRION_DASHBOARD,
          element: (
            // <ProtectedRoute requiredPath={ANFITRION_DASHBOARD}>
            //   <AnfitrionDashboard />
            // </ProtectedRoute>
            <ProtectedRoute requiredPath={ATTENDANCE}>
              <Attendance />
            </ProtectedRoute>
          ),
        },
        {
          path: NONE_DASHBOARD,
          element: (
            <ProtectedRoute requiredPath={NONE_DASHBOARD}>
              <NoneDashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: PRIVATE,
          element: (
            <ProtectedRoute requiredPath={PRIVATE}>
              <QuickRegistration />
            </ProtectedRoute>
          ),
        },
        {
          path: HOME,
          element: (
            <ProtectedRoute requiredPath={HOME}>
              <StartAdmin />
            </ProtectedRoute>
          ),
        },
        {
          path: LEADS,
          element: (
            <ProtectedRoute requiredPath={LEADS}>
              <Leads />
            </ProtectedRoute>
          ),
        },
        {
          path: STUDENTS_DATA,
          element: (
            <ProtectedRoute requiredPath={STUDENTS_DATA}>
              <StudentData />
            </ProtectedRoute>
          ),
        },
        {
          path: ATTENDANCE,
          element: (
            <ProtectedRoute requiredPath={ATTENDANCE}>
              <Attendance />
            </ProtectedRoute>
          ),
        },
        {
          path: ADMIN_STUDENT,
          element: (
            <ProtectedRoute requiredPath={ADMIN_STUDENT}>
              <AdminStudents />
            </ProtectedRoute>
          ),
        },
        {
          path: QUICK_REGISTRATION,
          element: (
            <ProtectedRoute requiredPath={QUICK_REGISTRATION}>
              <QuickRegistration />
            </ProtectedRoute>
          ),
        },
        {
          path: ENROLLMENTS,
          element: (
            <ProtectedRoute requiredPath={ENROLLMENTS}>
              <Enrollments />
            </ProtectedRoute>
          ),
        },
        {
          path: ENROLLMENTS_EXPIRING,
          element: (
            <ProtectedRoute requiredPath={ENROLLMENTS_EXPIRING}>
              <EnrollmentsExpiring />
            </ProtectedRoute>
          ),
        },
        {
          path: COURSES,
          element: (
            <ProtectedRoute requiredPath={COURSES}>
              <Courses />
            </ProtectedRoute>
          ),
        },
        {
          path: REPORT_OF_REGISTERED,
          element: (
            <ProtectedRoute requiredPath={REPORT_OF_REGISTERED}>
              <ReportOfRegistered />
            </ProtectedRoute>
          ),
        },
        {
          path: REPORT_COURSES,
          element: (
            <ProtectedRoute requiredPath={REPORT_COURSES}>
              <ReportCourseStudent />
            </ProtectedRoute>
        ),
        },
        {
          path: COURSES_QUOTAS,
          element: (
            <ProtectedRoute requiredPath={COURSES_QUOTAS}>
              <CoursesQuotas />
            </ProtectedRoute>
          ),
        },
        {
          path: LOCATIONS,
          element: (
            <ProtectedRoute requiredPath={LOCATIONS}>
              <Locations />
            </ProtectedRoute>
          ),
        },
        {
          path: EVALUATIONS_ADMIN,
          element: (
            <ProtectedRoute requiredPath={EVALUATIONS_ADMIN}>
              <Evaluations />
            </ProtectedRoute>
          ),
        },
        {
          path: PAYMENTS,
          element: (
            <ProtectedRoute requiredPath={PAYMENTS}>
              <Payments />
            </ProtectedRoute>
          ),
        },
        {
          path: SHOPPING_CART,
          element: (
            <ProtectedRoute requiredPath={SHOPPING_CART}>
              <ShoppingCart />
            </ProtectedRoute>
          ),
        },
        {
          path: TRANSACTIONS,
          element: (
            <ProtectedRoute requiredPath={TRANSACTIONS}>
              <Transactions />
            </ProtectedRoute>
          ),
        },
        {
          path: TICKETS,
          element: (
            <ProtectedRoute requiredPath={TICKETS}>
              <Tickets />
            </ProtectedRoute>
          ),
        },
        {
          path: NEW_EXPENSE,
          element: (
            <ProtectedRoute requiredPath={NEW_EXPENSE}>
              <NewExpenses />
            </ProtectedRoute>
          ),
        },
        {
          path: EXPENSES,
          element: (
            <ProtectedRoute requiredPath={EXPENSES}>
              <Expenses />
            </ProtectedRoute>
          ),
        },
        {
          path: INCOME,
          element: (
            <ProtectedRoute requiredPath={INCOME}>
              <Income />
            </ProtectedRoute>
          ),
        },
        {
          path: ACADEMYSTUDENTS,
          element: (
            <ProtectedRoute requiredPath={ACADEMYSTUDENTS}>
              <AcademyStudents />
            </ProtectedRoute>
        ),
        },
        {
          path: DOCUMENTATION,
          element: (
            <ProtectedRoute requiredPath={DOCUMENTATION}>
              <Documentation />
            </ProtectedRoute>
        ),
        },
    ],
  };