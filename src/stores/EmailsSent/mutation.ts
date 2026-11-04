export const createEmailSend = /* GraphQL */ `
  mutation CreateV2EmailSend(
    $input: CreateV2EmailSendInput!
    $condition: ModelV2EmailSendConditionInput
  ) {
    createV2EmailSend(input: $input, condition: $condition) {id}
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