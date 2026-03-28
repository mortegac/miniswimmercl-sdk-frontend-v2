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

import { Amplify } from 'aws-amplify';
import { CookieStorage } from 'aws-amplify/utils';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import outputs from '../amplify_outputs.json';

Amplify.configure(outputs);

// CookieStorage solo en producción — en localhost interfiere con el flujo SRP de Cognito
if (window.location.hostname !== 'localhost') {
  cognitoUserPoolsTokenProvider.setKeyValueStorage(new CookieStorage({
    domain: '.miniswimmer.cl',
    expires: 365,
    secure: true,
    sameSite: 'strict',
  }));
}
  
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


// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js')
//   })
// }