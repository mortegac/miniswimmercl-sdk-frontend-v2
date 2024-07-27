import { PermissionUsers } from "../UserPermissions/types";
import { Roles, emptyRole } from "../Roles/types";
import { TicketUser } from "../SupportTicket/types";

export type Users = {
  id: string;
  name: string;
  validated: boolean;
  firstLogin: boolean;
  TicketUser?: { items: TicketUser[] };
  Role: Roles;
  Permissions?: { items: PermissionUsers[] };
  createdAt: string;
  updatedAt: string;
  companiesUsersId?: string;
  usersRoleId?: string;
};

export const emptyUser: Users = {
  id: "",
  name: "",
  validated: true,
  firstLogin: true,
  Role: emptyRole,
  createdAt: "",
  updatedAt: "",
};

export type FilterOptions  = {
  userEmail?: string;
  name?: string;
}