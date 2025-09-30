import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { icons } from "@/components/Base/Lucide";
import {
  PUBLIC,
  PRIVATE,
  HOME,
  LEADS,
  STUDENTS, 
  ATTENDANCE,
  STUDENTS_DATA,
  LOCATIONS, 
  EVALUATIONS_ADMIN,
  COURSES,
  REPORT_OF_REGISTERED,
  COURSES_QUOTAS,
  QUICK_REGISTRATION,
  QUICK_REGISTRATION2,
  QUICK_REGISTRATION_US,
  PAYMENTS,
  TICKETS,
  NEW_EXPENSE, 
  EXPENSES, 
  INCOME,
  ACADEMYSTUDENTS,
  ENROLLMENTS,
  TRANSACTIONS,
  SHOPPING_CART,
  REPORT_COURSES,
  ADMIN_STUDENT,
  
} from "@/router/paths";

export interface Menu {
  icon: keyof typeof icons;
  title: string;
  badge?: number;
  pathname?: string;
  subMenu?: Menu[];
  ignore?: boolean;
}

export interface SideMenuState {
  menu: Array<Menu | string>;
}

const initialState: SideMenuState = {
  menu: [
    "",
    {
      icon: "Home",
      pathname: PRIVATE,
      title: "Inicio",
    },
    // {
    //   icon: "Trello",
    //   pathname: HOME,
    //   title: "Dashboard",
    // },
    // {
    //   icon: "User",
    //   pathname: LEADS,
    //   title: "Leads",
    // },
    "Estudiantes",
    {
      icon: "UserCheck",
      pathname: STUDENTS_DATA,
      title: "Administrador Alumno",
    },
    {
      icon: "Send",
      pathname: ENROLLMENTS,
      title: "Envío de email",
    },
    // {
    //   icon: "UserCheck",
    //   pathname: ADMIN_STUDENT,
    //   title: "Perfil Estudiante",
    // },
    // {
    //   icon: "Users",
    //   pathname: STUDENTS,
    //   title: "Alumnnos",
    // },

    // "US",
    // {
    //   icon: "PlusSquare",
    //   pathname: QUICK_REGISTRATION_US,
    //   title: "Enrollment",
    // },
    "Cursos",
    {
      icon: "CheckSquare",
      pathname: ATTENDANCE,
      title: "Asistencia",
    },
    {
      icon: "PlusSquare",
      pathname: QUICK_REGISTRATION,
      title: "Inscripción",
    },
    // {
    //   icon: "PlusSquare",
    //   pathname: QUICK_REGISTRATION2,
    //   title: "Inscripción OLD",
    // },

    "Administración",
    {
      icon: "HardDrive",
      pathname: COURSES,
      title: "Cursos",
    },
    {
      icon: "MapPin",
      pathname: LOCATIONS,
      title: "Sedes",
    },
    {
      icon: "MapPin",
      pathname: EVALUATIONS_ADMIN,
      title: "Evaluaciones",
    },
    // {
      //   icon: "DollarSign",
      //   pathname: PAYMENTS,
      //   title: "Pagos",
      // },
      // {
        //   icon: "MessageCircle",
        //   pathname: TICKETS,
        //   title: "Requerimientos",
        // },
        "Ingresos - Egresos",
        {
            icon: "CircleDollarSign",
            pathname: TRANSACTIONS,
            title: "Transacciones",
          },
        {
            icon: "ShoppingCart",
            pathname: SHOPPING_CART,
            title: "Carros de compra",
          },
        {
            icon: "Delete",
            pathname: EXPENSES,
            title: "Gastos",
          },
        "Informes",
        {
          icon: "CheckSquare",
          pathname: REPORT_COURSES,
          title: "Incritos por curso",
        },
        // {
        //   icon: "UserPlus",
        //   pathname: REPORT_OF_REGISTERED,
        //   title: "Cupos por curso",
        // },
        // {
        //   icon: "Calendar",
        //   pathname: COURSES_QUOTAS,
        //   title: "Cupos calendario",
        // },

        // {
          //   icon: "PlusCircle",
          //   pathname: NEW_EXPENSE,
          //   title: "Nuevo Gasto",
          // },
          // {
            //   icon: "ShieldOff",
            //   pathname: EXPENSES,
            //   title: "Gastos",
            // },
            // {
              //   icon: "Shield",
              //   pathname: INCOME,
              //   title: "Ingresos",
              // },
          "Profesores",
          {
            icon: "UserCheck",
            pathname: ACADEMYSTUDENTS,
            title: "Certificaciones",
          },
          // {
          //   icon: "Users",
          //   pathname: ACADEMYSTUDENTS,
          //   title: "Horas Profesores",
          // },
              
            ],
          };
          
          export const sideMenuSlice = createSlice({
            name: "sideMenu",
  initialState,
  reducers: {},
});

export const selectSideMenu = (state: RootState) => state.sideMenu.menu;

export default sideMenuSlice.reducer;
