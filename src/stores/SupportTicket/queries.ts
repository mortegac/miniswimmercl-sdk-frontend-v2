// import * as APITypes from "../graphql/API";
// type GeneratedMutation<InputType, OutputType> = string & {
//   __generatedMutationInput: InputType;
//   __generatedMutationOutput: OutputType;
// };

// type GeneratedQuery<InputType, OutputType> = string & {
//   __generatedQueryInput: InputType;
//   __generatedQueryOutput: OutputType;
// };

export const customListSupportTicket = /* GraphQL */ `
query ListSupportTickets(
  $filter: ModelSupportTicketFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
  $supportTicketId: ID
) {
  listSupportTickets(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
    supportTicketId: $supportTicketId
  ) {
    items {
      createdAt
      date
      description
      email
      employeeId
      eveId
      lastModificationUser
      level
      name
      phoneNumber
      solicitantId
      statusTicket
      supportTicketId
      updatedAt
      TicketComments {
        items {
          ticketCommentId
          canClientSeeComment
          createdAt
          message
          supportTicketId
          ticketCommentId
          typeOfUser
          updatedAt
          User {
            name
          }
          __typename
        }
      }
      __typename
    }
    nextToken
    __typename
  }
}
` 
// as GeneratedQuery<
//   APITypes.ListSupportTicketsQueryVariables,
//   APITypes.ListSupportTicketsQuery
// >;


export const createSupportTicket = /* GraphQL */ `
mutation CreateSupportTicket(
  $condition: ModelSupportTicketConditionInput
  $input: CreateSupportTicketInput!
) {
  createSupportTicket(condition: $condition, input: $input)  { supportTicketId }
}
`

export const updateSupportTicket = /* GraphQL */ `mutation UpdateSupportTicket(
  $condition: ModelSupportTicketConditionInput
  $input: UpdateSupportTicketInput!
) {
  updateSupportTicket(condition: $condition, input: $input) { supportTicketId }
}
`
// as GeneratedMutation<
//   APITypes.UpdateSupportTicketMutationVariables,
//   APITypes.UpdateSupportTicketMutation
// >;

export const createTag = /* GraphQL */ `mutation CreateTag(
  $condition: ModelTagConditionInput
  $input: CreateTagInput!
) {
  createTag(condition: $condition, input: $input)  { id }
}
`
export const createTicketComment = /* GraphQL */ `mutation CreateTicketComment(
  $condition: ModelTicketCommentConditionInput
  $input: CreateTicketCommentInput!
) {
  createTicketComment(condition: $condition, input: $input) { id }
}
`