import { useRoutes } from "react-router-dom";

import ErrorPage from "../pages/public/ErrorPage";
import ErrorDataPage from "../pages/public/ErrorDataPage";
import { privateRoutes } from "./PrivateRoute";
import { publicRoutes } from "./PublicRoute";


// import Layout from "../themes";

function Router() {
  const routes = [
    { ...publicRoutes },
    { ...privateRoutes },
    {
      path: "500",
      element: <ErrorDataPage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ];

  return useRoutes(routes);
}

export default Router;

