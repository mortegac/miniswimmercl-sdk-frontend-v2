export const createEmailSend = /* GraphQL */ `
  mutation CreateEmailSend(
    $input: CreateEmailSendInput!
    $condition: ModelEmailSendConditionInput
  ) {
    createEmailSend(input: $input, condition: $condition) { id }
  }
`;