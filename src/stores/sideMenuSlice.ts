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
  COURSES,
  QUICK_REGISTRATION,
  QUICK_REGISTRATION2,
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
    {
      icon: "Trello",
      pathname: HOME,
      title: "Dashboard",
    },
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
    // {
    //   icon: "UserCheck",
    //   pathname: ADMIN_STUDENT,
    //   title: "Perfil Estudiante",
    // },
    {
      icon: "Users",
      pathname: STUDENTS,
      title: "Alumnnos",
    },

    "Cursos",
    {
      icon: "CheckSquare",
      pathname: ATTENDANCE,
      title: "Asistencia",
    },
    {
      icon: "PlusSquare",
      pathname: QUICK_REGISTRATION,
      title: "Inscripción rápida",
    },
    {
      icon: "PlusSquare",
      pathname: QUICK_REGISTRATION2,
      title: "Inscripción",
    },
    {
      icon: "Send",
      pathname: ENROLLMENTS,
      title: "Envío de email",
    },
    {
      icon: "HardDrive",
      pathname: COURSES,
      title: "Cursos",
    },
    "Administración",
    {
      icon: "MapPin",
      pathname: LOCATIONS,
      title: "Sedes",
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
        "Informes",
        {
            icon: "CheckSquare",
            pathname: REPORT_COURSES,
            title: "Incritos por curso",
          },

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
          "Academia",
          {
            icon: "UserCheck",
            pathname: ACADEMYSTUDENTS,
            title: "Instructores Inscritos",
          },
              
            ],
          };
          
          export const sideMenuSlice = createSlice({
            name: "sideMenu",
  initialState,
  reducers: {},
});

export const selectSideMenu = (state: RootState) => state.sideMenu.menu;

export default sideMenuSlice.reducer;
