import { generateClient } from 'aws-amplify/api';
import { listV2GmailInboxByUserIdAndDateSent, listV2GmailInboxes } from './queries';
import { v2GmailReply, v2GmailSync } from './mutations';
import { FilterOptions, AdminFilterOptions, AdminPageResult } from './types';

const client = generateClient();

export interface GmailReplyParams {
  fromAccount: string;
  toEmail: string;
  subject: string;
  body: string;
  threadId?: string;
  inReplyToMessageId?: string;
}

export const triggerGmailSync = async (): Promise<void> => {
  await client.graphql({ query: v2GmailSync });
};

export const sendGmailReply = async (params: GmailReplyParams): Promise<{ success: boolean; messageId?: string; error?: string }> => {
  const result: any = await client.graphql({
    query: v2GmailReply,
    variables: params,
  });
  return result?.data?.v2GmailReply ?? { success: false, error: "No response" };
};

const ADMIN_PAGE_SIZE = 200; // una sola request por página

export const fetchGmailInboxPage = async (params: AdminFilterOptions): Promise<AdminPageResult> => {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const dateFrom = params.dateFrom ?? thirtyDaysAgo.toISOString();
  const dateTo   = params.dateTo   ?? now.toISOString();

  const filter: any = {
    dateSent: { between: [dateFrom, dateTo] },
  };

  if (params.searchText?.trim()) {
    const text = params.searchText.trim();
    filter.or = [
      { fromEmail: { contains: text } },
      { fromName:  { contains: text } },
      { toEmails:  { contains: text } },
    ];
  }

  const result: any = await client.graphql({
    query: listV2GmailInboxes,
    variables: { filter, limit: ADMIN_PAGE_SIZE, nextToken: params.nextToken ?? null },
  });
  const page = result?.data?.listV2GmailInboxes;
  const items = (page?.items ?? []).sort((a: any, b: any) => b.dateSent.localeCompare(a.dateSent));
  return { items, nextToken: page?.nextToken ?? null };
};

export const fetchGmailInboxByUser = async (objFilter: FilterOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const now = new Date();
      const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

      const dateFrom = objFilter.dateFrom ?? oneYearAgo.toISOString();
      const dateTo   = objFilter.dateTo   ?? now.toISOString();

      const getData: any = await client.graphql({
        query: listV2GmailInboxByUserIdAndDateSent,
        variables: {
          userId: objFilter.userId,
          dateSent: { between: [dateFrom, dateTo] },
          sortDirection: 'DESC',
          limit: 200,
        },
      });

      const items = getData?.data?.listV2GmailInboxByUserIdAndDateSent?.items ?? [];
      resolve(items);
    } catch (err) {
      reject({ errorMessage: JSON.stringify(err) });
    }
  });
};
