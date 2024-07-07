import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { icons } from "@/components/Base/Lucide";

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
      pathname: "/",
      title: "Inicio",
    },
    {
      icon: "User",
      pathname: "/leads",
      title: "Leads",
    },
    {
      icon: "Users",
      pathname: "/students",
      title: "Alumnnos",
    },
    {
      icon: "MapPin",
      pathname: "/locations",
      title: "Sedes",
    },
    {
      icon: "HardDrive",
      pathname: "/courses",
      title: "Cursos",
    },
    {
      icon: "DollarSign",
      pathname: "/payments",
      title: "Pagos",
    },
    {
      icon: "MessageCircle",
      pathname: "/tickets",
      title: "Requerimientos",
    },
    "Ingresos - Egresos",
    {
      icon: "PlusCircle",
      pathname: "/new-expense",
      title: "Nuevo Gastos",
    },
    {
      icon: "ShieldOff",
      pathname: "/expenses",
      title: "Gastos",
    },
    {
      icon: "Shield",
      pathname: "/income",
      title: "Ingresos",
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
