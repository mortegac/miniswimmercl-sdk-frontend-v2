export const createEmailSend = /* GraphQL */ `
  mutation CreateEmailSend(
    $input: CreateEmailSendInput!
    $condition: ModelEmailSendConditionInput
  ) {
    createEmailSend(input: $input, condition: $condition) {id}
  }
`;


export const sendWhatsapp = /* GraphQL */ `
  mutation SendWhatsapp(
    $message: String!
    $phoneNumber: String!
    $name: String!
  ) {
    sendWhatsapp(message: $message, phoneNumber: $phoneNumber, name: $name)
  }
`;