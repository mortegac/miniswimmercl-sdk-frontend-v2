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
  ENROLLMENTS_EXPIRING,
  ENROLLMENTS,
  TRANSACTIONS,
  SHOPPING_CART,
  REPORT_COURSES,
  ADMIN_STUDENT,
  DOCUMENTATION,
  ENROLLMENTS_READ,
  ENROLLMENTS_CREATE,
  ADMIN_DASHBOARD,
  ANFITRION_DASHBOARD,
  NONE_DASHBOARD,
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

// Definición de permisos por rol (misma lógica que en PrivateRoute)
const adminRolePermissions: string[] = [
  QUICK_REGISTRATION,
  ADMIN_DASHBOARD,
  PRIVATE,
  HOME,
  LEADS,
  STUDENTS,
  STUDENTS_DATA,
  LOCATIONS,
  EVALUATIONS_ADMIN,
  COURSES,
  COURSES_QUOTAS,
  REPORT_OF_REGISTERED,
  QUICK_REGISTRATION2,
  QUICK_REGISTRATION_US,
  ENROLLMENTS_EXPIRING,
  ENROLLMENTS,
  ENROLLMENTS_READ,
  ENROLLMENTS_CREATE,
  ATTENDANCE,
  PAYMENTS,
  TICKETS,
  NEW_EXPENSE,
  EXPENSES,
  INCOME,
  ACADEMYSTUDENTS,
  TRANSACTIONS,
  SHOPPING_CART,
  REPORT_COURSES,
  ADMIN_STUDENT,
  DOCUMENTATION
];

const AnfitrionesPermissions: string[] = [
  ATTENDANCE,
  ANFITRION_DASHBOARD,
  DOCUMENTATION
];

const NonePermissions: string[] = [
  NONE_DASHBOARD
];

// Función para obtener permisos según el rol
const getPermissionsByRole = (roleId: string): string[] => {
  switch (roleId) {
    case "adminRole":
      return adminRolePermissions;
    case "anfitrion":
      return AnfitrionesPermissions;
    case "coach":
    case "parents":
    case "academyRole":
      return NonePermissions;
    default:
      return NonePermissions;
  }
};

// Función para filtrar el menú basado en permisos
const filterMenuByPermissions = (
  menu: Array<Menu | string>,
  allowedPaths: string[]
): Array<Menu | string> => {
  const filteredMenu: Array<Menu | string> = [];
  let pendingSeparator: string | null = null;

  menu.forEach((item, index) => {
    if (typeof item === "string") {
      // Es un separador de sección, guardarlo para agregarlo si hay items válidos después
      pendingSeparator = item;
      return;
    }

    // Si es un item de menú con pathname, verificar permisos
    if (item.pathname) {
      // Verificar si el usuario tiene acceso a esta ruta
      const hasAccess = allowedPaths.includes(item.pathname);
      
      if (hasAccess) {
        // Si había un separador pendiente, agregarlo primero
        if (pendingSeparator !== null) {
          filteredMenu.push(pendingSeparator);
          pendingSeparator = null;
        }
        
        // Si tiene submenú, filtrarlo también
        if (item.subMenu) {
          const filteredSubMenu = filterMenuByPermissions(item.subMenu, allowedPaths);
          if (filteredSubMenu.length > 0) {
            filteredMenu.push({
              ...item,
              subMenu: filteredSubMenu.filter((subItem): subItem is Menu => 
                typeof subItem !== "string"
              ) as Menu[]
            });
          }
        } else {
          filteredMenu.push(item);
        }
      }
    } else {
      // Item sin pathname (probablemente un contenedor), agregarlo si tiene submenú válido
      if (item.subMenu) {
        const filteredSubMenu = filterMenuByPermissions(item.subMenu, allowedPaths);
        if (filteredSubMenu.length > 0) {
          // Si había un separador pendiente, agregarlo primero
          if (pendingSeparator !== null) {
            filteredMenu.push(pendingSeparator);
            pendingSeparator = null;
          }
          filteredMenu.push({
            ...item,
            subMenu: filteredSubMenu.filter((subItem): subItem is Menu => 
              typeof subItem !== "string"
            ) as Menu[]
          });
        }
      }
    }
  });

  // Limpiar separadores duplicados o al final
  return filteredMenu.filter((item, index, array) => {
    if (typeof item === "string") {
      // No permitir separadores al inicio o final
      if (index === 0 || index === array.length - 1) {
        return false;
      }
      // No permitir separadores consecutivos
      if (index > 0 && typeof array[index - 1] === "string") {
        return false;
      }
    }
    return true;
  });
};

// Función para obtener el menú según el rol
const getMenuByRole = (roleId: string): Array<Menu | string> => {
  switch (roleId) {
    case "adminRole":
      return [
        "",
        {
          icon: "Home",
          pathname: ADMIN_DASHBOARD,
          title: "Inicio",
        },
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
        // {
        //   icon: "Delete",
        //   pathname: EXPENSES,
        //   title: "Gastos",
        // },
        "Informes",
        {
          icon: "AlertTriangle",
          pathname: ENROLLMENTS_EXPIRING,
          title: "Planes x Vencer",
        },
        {
          icon: "Calendar",
          pathname: COURSES_QUOTAS,
          title: "Cupos mes",
        },
        {
          icon: "CheckSquare",
          pathname: REPORT_COURSES,
          title: "Incritos por curso",
        },
        "Profesores",
        {
          icon: "UserCheck",
          pathname: ACADEMYSTUDENTS,
          title: "Certificaciones",
        },
      ];
    case "anfitrion":
      return [
        "",
        {
          icon: "Home",
          pathname: ANFITRION_DASHBOARD,
          title: "Inicio",
        },
        {
          icon: "CheckSquare",
          pathname: ATTENDANCE,
          title: "Asistencia",
        },
        {
          icon: "File",
          pathname: DOCUMENTATION,
          title: "Documentación",
        },
      ];
    case "coach":
    case "parents":
    case "academyRole":
      return [
        "",
        {
          icon: "Home",
          pathname: NONE_DASHBOARD,
          title: "Inicio",
        },
      ];
    default:
      return [
        "",
        {
          icon: "Home",
          pathname: NONE_DASHBOARD,
          title: "Inicio",
        },
      ];
  }
};

const initialState: SideMenuState = {
  menu: [
    "",
    {
      icon: "Home",
      pathname: PRIVATE,
      title: "Inicio",
    },
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
        {
          icon: "Calendar",
          pathname: COURSES_QUOTAS,
          title: "Cupos mes",
        },
          "Profesores",
          {
            icon: "UserCheck",
            pathname: ACADEMYSTUDENTS,
            title: "Certificaciones",
          },              
            ],
          };
          
export const sideMenuSlice = createSlice({
  name: "sideMenu",
  initialState,
  reducers: {},
});

// Selector base que retorna el menú completo
export const selectSideMenu = (state: RootState) => state.sideMenu.menu;

// Selector que filtra el menú basado en los permisos del rol del usuario
export const selectFilteredSideMenu = (state: RootState) => {
  const usersRolesId = state.auth.usersRolesId;
  
  // Retornar el menú específico según el rol
  return getMenuByRole(usersRolesId);
};

export default sideMenuSlice.reducer;
