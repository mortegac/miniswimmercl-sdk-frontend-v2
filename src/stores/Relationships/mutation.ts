export const createRelationship = /* GraphQL */ `
  mutation CreateV2Relationship(
    $input: CreateV2RelationshipInput!
    $condition: ModelV2RelationshipConditionInput
  ) {
    createV2Relationship(input: $input, condition: $condition) { id }
  }
`;

export const createStudent = /* GraphQL */ `
  mutation CreateV2Student(
    $input: CreateV2StudentInput!
    $condition: ModelV2StudentConditionInput
  ) {
    createV2Student(input: $input, condition: $condition) { id }
  }
`;


export const updateRelationship = /* GraphQL */ `
  mutation UpdateV2Relationship(
    $input: UpdateV2RelationshipInput!
    $condition: ModelV2RelationshipConditionInput
  ) {
    updateV2Relationship(input: $input, condition: $condition) { id }
  }
`;
