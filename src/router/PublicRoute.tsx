import { lazy, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { selectAuth, getAuthUser} from "@/stores/Users/slice";

import {
    PUBLIC,
    PRIVATE,
   
  } from "./paths";
  
  // import Layout from "../themes";
  
  const Login = lazy(() => import("../pages/public/Login"));


  function PublicValidation() {
    const location = useLocation();
    const { isAuthenticated } = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      dispatch(getAuthUser());
    }, []);
  
    if (isAuthenticated) {
      const prevUrl = location.state?.from ?? PRIVATE;
  
      return <Navigate to={prevUrl} state={{ from: location }} />;
    }
  
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
  
        {/* <Layout /> */}
        <Outlet />
      </>
    );
  }
  
export const publicRoutes = {
    path: PUBLIC,
    element: <PublicValidation />,
    children: [
        {
          path: PUBLIC,
          element: <Login />,
        },
      
        
      ],
  };