export const v2GmailSync = /* GraphQL */ `
  mutation V2GmailSync {
    v2GmailSync
  }
`;

export const v2GmailReply = /* GraphQL */ `
  mutation V2GmailReply(
    $fromAccount: String!
    $toEmail: String!
    $subject: String!
    $body: String!
    $threadId: String
    $inReplyToMessageId: String
  ) {
    v2GmailReply(
      fromAccount: $fromAccount
      toEmail: $toEmail
      subject: $subject
      body: $body
      threadId: $threadId
      inReplyToMessageId: $inReplyToMessageId
    ) {
      success
      messageId
      error
    }
  }
`;
