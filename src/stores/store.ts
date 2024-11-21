import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import darkModeReducer from "./darkModeSlice";
import colorSchemeReducer from "./colorSchemeSlice";
import sideMenuReducer from "./sideMenuSlice";
import themeReducer from "./themeSlice";
import compactMenuReducer from "./compactMenuSlice";
import pageLoaderReducer from "./pageLoaderSlice";
import breadcrumbReducer from "./breadcrumb";

import authReducer from "./Users/slice";
import locationReducer from "./Locations/slice";
import studentReducer from "./Students/slice";
import courseReducer from "./Courses/slice";
import sessionDetailReducer from "./SessionDetails/slice";
import enrollmentReducer from "./Enrollment/slice";
import parametersReducer from "./Parameters/slice";
import relationshipsReducer from "./Relationships/slice";
import academyStudentsReducer from "./AcademyStudents/slice";
import emailSendReducer from "./EmailsSent/slice";
import paymentTransactionsReducer from "./PaymentTransactions/slice";
import shoppingCartDetailsReducer from "./ShoppingCartDetail/slice";
import schedulesReducer from "./Schedule/slice";
import shoppingCartsReducer from "./ShoppingCarts/slice";
import WPReducer from "./WP/slice";

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    colorScheme: colorSchemeReducer,
    sideMenu: sideMenuReducer,
    theme: themeReducer,
    compactMenu: compactMenuReducer,
    pageLoader: pageLoaderReducer,
    breadcrumb: breadcrumbReducer,
    
    auth: authReducer,
    location: locationReducer,
    student: studentReducer,
    course: courseReducer,
    sessionDetail: sessionDetailReducer,
    enrollment: enrollmentReducer,
    parameters: parametersReducer,
    relationships: relationshipsReducer,
    academyStudents: academyStudentsReducer,
    emailSend: emailSendReducer,
    paymentTransactions: paymentTransactionsReducer,
    shoppingCartDetails: shoppingCartDetailsReducer,
    schedules: schedulesReducer,
    shoppingCarts: shoppingCartsReducer,
    WP: WPReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
