import { Relationship } from "../Relationships/types";
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
  relationships?: { items: Relationship[] };
  createdAt: string;
  updatedAt: string;
  companiesUsersId?: string;
  usersRoleId?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  latitude?: string;
  longitude?: string;
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

export type FilterOptions = {
  userEmail?: string;
  userPhone?: string;
  userId?: string;
  name?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  latitude?: string;
  longitude?: string;
};