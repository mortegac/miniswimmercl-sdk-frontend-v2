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
import { CookieStorage } from 'aws-amplify/utils';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import awsExports from './aws-exports.js';
if (process.env.NODE_ENV === "development") {
  awsExports.oauth.redirectSignIn = "http://localhost:5173/";
  awsExports.oauth.redirectSignOut = "http://localhost:5173/";
} else {
  awsExports.oauth.redirectSignIn = "https://app.miniswimmer.cl/";
  awsExports.oauth.redirectSignOut = "https://app.miniswimmer.cl/";
}

Amplify.configure(awsExports);

type SameSite = 'strict' | 'lax' | 'none';
interface CookieStorageOptions {
  domain: string;
  expires: number;
  secure: boolean;
  sameSite: SameSite;
}

const cookieOptions: CookieStorageOptions = {
  domain: process.env.NODE_ENV === "development" ?'localhost':'app.miniswimmer.cl',
  expires: 365, // número de días
  secure: true,
  sameSite: 'strict' // o 'lax' o 'none'
};

cognitoUserPoolsTokenProvider.setKeyValueStorage(new CookieStorage(cookieOptions));
  
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
