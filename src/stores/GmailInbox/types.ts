export type GmailInbox = {
  id: string;
  messageId: string;
  threadId: string;
  subject?: string;
  fromEmail?: string;
  fromName?: string;
  toEmails?: string[];
  dateSent: string;
  dateStr: string;
  snippet?: string;
  bodyText?: string;
  bodyHtml?: string;
  labels?: string[];
  isRead?: boolean;
  hasAttachments?: boolean;
  attachments?: any;
  gmailAccount: string;
  userId?: string;
};

export const emptyGmailInbox: GmailInbox = {
  id: "",
  messageId: "",
  threadId: "",
  dateSent: "",
  dateStr: "",
  gmailAccount: "",
};

export type FilterOptions = {
  userId: string;
  dateFrom?: string;
  dateTo?: string;
};

export type AdminFilterOptions = {
  dateFrom?: string;
  dateTo?: string;
  searchText?: string;
  nextToken?: string | null;
};

export type AdminPageResult = {
  items: GmailInbox[];
  nextToken: string | null;
};
