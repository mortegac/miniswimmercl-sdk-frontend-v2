import React, { Suspense } from "react";
import ScrollToTop from "@/components/Base/ScrollToTop";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import Splash from "@/components/Base/Splash";
import ErrorBoundary from "./ErrorBoundary";
import { store } from "./stores/store";
import Router from "./router";
import "./assets/css/app.css";

import  { Amplify } from 'aws-amplify';
import awsExports from './aws-exports.js';
Amplify.configure(awsExports);

// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
//   <BrowserRouter>
//     <Provider store={store}>
//       <Router />
//     </Provider>
//     <ScrollToTop />
//   </BrowserRouter>
  
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <ErrorBoundary>
          <Provider store={store}>
            <Suspense fallback={<Splash />}>
              <Router />
            </Suspense>
          </Provider>
          <ScrollToTop />
        </ErrorBoundary>
      </BrowserRouter>
    </React.StrictMode>
);
