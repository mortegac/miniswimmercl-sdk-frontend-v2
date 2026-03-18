
export const createSessionType = /* GraphQL */ `
  mutation CreateV2SessionType($input: CreateV2SessionTypeInput!) {
    createV2SessionType(input: $input) {
      id
      name
      description
      durationSession
      timeAWeek
      totalSessions
      amount
      isActive
      isTestClass
      packValidity
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const updateSessionType = /* GraphQL */ `
  mutation UpdateV2SessionType($input: UpdateV2SessionTypeInput!) {
    updateV2SessionType(input: $input) {
      id
      name
      description
      durationSession
      timeAWeek
      totalSessions
      amount
      isActive
      isTestClass
      packValidity
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const deleteSessionType = /* GraphQL */ `
  mutation DeleteV2SessionType($input: DeleteV2SessionTypeInput!) {
    deleteV2SessionType(input: $input) {
      id
      __typename
    }
  }
`;

export const createCourseSessionType = /* GraphQL */ `
  mutation CreateV2CourseSessionType($input: CreateV2CourseSessionTypeInput!) {
    createV2CourseSessionType(input: $input) {
      id
      courseId
      sessionTypeId
      __typename
    }
  }
`;

export const deleteCourseSessionType = /* GraphQL */ `
  mutation DeleteV2CourseSessionType($input: DeleteV2CourseSessionTypeInput!) {
    deleteV2CourseSessionType(input: $input) {
      id
      __typename
    }
  }
`;
