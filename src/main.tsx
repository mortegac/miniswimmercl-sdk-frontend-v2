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
// import awsExports from './aws-exports';
let awsExports ={
  "aws_project_region": "us-east-2",
  "aws_appsync_graphqlEndpoint": "https://4mtfzd2aubcrhnnaclzkxosnoq.appsync-api.us-east-2.amazonaws.com/graphql",
  "aws_appsync_region": "us-east-2",
  "aws_appsync_authenticationType": "API_KEY",
  "aws_appsync_apiKey": "da2-vk3lmmvnk5bmbpt6vkfz7xghpi",
  "aws_cognito_identity_pool_id": "us-east-2:63f9c713-19f8-40ff-a99b-1d7006191372",
  "aws_cognito_region": "us-east-2",
  "aws_user_pools_id": "us-east-2_bpfOANSWX",
  "aws_user_pools_web_client_id": "6rq7qopcr25728fuc62k9k8igv",
  "oauth": {
      "domain": "apiclientsbb306568-bb306568-main.auth.us-east-2.amazoncognito.com",
      "scope": [
          "phone",
          "email",
          "openid",
          "profile",
          "aws.cognito.signin.user.admin"
      ],
      "redirectSignIn": "http://localhost:5173/",
      "redirectSignOut": "http://localhost:5173/",
      "responseType": "code"
  },
  "federationTarget": "COGNITO_USER_POOLS",
  "aws_cognito_username_attributes": [],
  "aws_cognito_social_providers": [
      "GOOGLE"
  ],
  "aws_cognito_signup_attributes": [
      "EMAIL"
  ],
  "aws_cognito_mfa_configuration": "OFF",
  "aws_cognito_mfa_types": [
      "SMS"
  ],
  "aws_cognito_password_protection_settings": {
      "passwordPolicyMinLength": 8,
      "passwordPolicyCharacters": []
  },
  "aws_cognito_verification_mechanisms": [
      "EMAIL"
  ]
};
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
