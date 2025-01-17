// export type {
//   SupportTicket,
//   SupportTicketLevel,
//   SupportTicketStatusTicket,
//   ModelSupportTicketFilterInput,
// } from "../graphql/API";
// import { SupportTicket, ModelSupportTicketFilterInput } from "../graphql/API";

export const emptySupportTicket: any = {
  __typename: "SupportTicket",
  createdAt: "",
  updatedAt: "",
  employeeId: "",
  solicitantId: "",
  supportTicketId: "",
};

// export interface CustomSupportTicketFilterObject
//   extends ModelSupportTicketFilterInput {
//   month?: string;
//   year?: string;
//   // statusTicket?: string;
// }



export type InputOptions = {
  id?: string;
  date?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  eveId?: string;
  level?: string;
  statusTicket?: string;
  lastModificationUser?: string;
  employeeId?: string | undefined;
  solicitantId?: string | undefined;

  // COMMENTS
  ticketCommentId?: string;
  message?: string;
  typeOfUser?: string;
  canClientSeeComment?: boolean;
  isEnergica?: boolean;
  supportTicketId?: string;
  description?: string;
  userId?: string;


}


export type FilterOptions = {
  statusTicket?: string;
  onlyValidTickets?: boolean;
  email?: string;

}