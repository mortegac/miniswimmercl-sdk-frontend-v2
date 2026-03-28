export type AppUser = {
  id: string;
  name: string;
  email?: string;
  contactPhone?: string;
  ig?: string;
  isEmployed?: boolean;
  isActive?: boolean;
  isAcademyStudent?: boolean;
  validated?: boolean;
  firstContact?: boolean;
  roleId?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type AppRole = {
  id: string;
  name: string;
  displayName: string;
  icon?: string;
};

export type UserFormData = {
  id: string;             // email = id
  name: string;
  contactPhone: string;
  roleId: string;
  isEmployed: boolean;
  isActive: boolean;
  isAcademyStudent: boolean;
  validated: boolean;
  // solo en creación
  createInCognito: boolean;
  temporaryPassword: string;
};

export const emptyUserForm: UserFormData = {
  id: "",
  name: "",
  contactPhone: "",
  roleId: "",
  isEmployed: false,
  isActive: true,
  isAcademyStudent: false,
  validated: true,
  createInCognito: false,
  temporaryPassword: "",
};
