import { Users } from "../Users/types";

export type SupportTicket = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  level: "one" | "two" | "three";
  ticketUser: TicketUser;
  Comments: { items: Comments[] };
  date: string;
  day: string;
  month: string;
  year: string;
  statusTicket: "open" | "in_progress" | "resolver" | "does_not_apply";
  lastModificationUser: string;
  createdAt: string;
  updatedAt: string;
};

export type CommentTickets = {
  id: string;
  description: String;
  ticketSupport: { items: Comments[] };
  statusModificationIdUser: string;
  statusModificationUser: string;
  createdAt: string;
  updatedAt: string;
};

export type Comments = {
  id: string;
  supportTicketId: string;
  commentTicketId: string;
  supportTicket: SupportTicket;
  commentTickets: CommentTickets;
  createdAt: string;
  updatedAt: string;
};

export type TicketUser = {
  id: string;
  usersId: string;
  supportTicketId: string;
  users: Users;
  supportTicket: SupportTicket;
  createdAt: string;
  updatedAt: string;
};
