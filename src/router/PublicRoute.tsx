import { lazy } from "react";
import { Navigate, useLocation } from "react-router-dom";

import {
    PUBLIC,
    PRIVATE,
   
  } from "./paths";
  
  import Layout from "../themes";
  
  const Login = lazy(() => import("../pages/public/Login"));


export const publicRoutes = {
    path: PUBLIC,
    // element: <PrivateValidation />,
    children: [
        {
          path: PUBLIC,
          element: <Login />,
        },
      
        
      ],
  };