
const gql = require("graphql-tag");

// -------------------------------------------------
// USERS
// -------------------------------------------------
const createUsers = gql`
 mutation CreateUsers(
    $input: CreateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    createUsers(input: $input, condition: $condition) {
      id
    }
  }
`;
const updateUsers = gql`
  mutation UpdateUsers(
    $input: UpdateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    updateUsers(input: $input, condition: $condition) {
      id
    }
  }
`;
const deleteUsers = gql`
  mutation DeleteUsers(
    $input: DeleteUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    deleteUsers(input: $input, condition: $condition) {
      id
    }
  }
`;

// -------------------------------------------------
// LOCATIONS
// -------------------------------------------------


// -------------------------------------------------
// CURSOS
// -------------------------------------------------



// -------------------------------------------------
// HORARIOS
// -------------------------------------------------



// -------------------------------------------------
// PACK DE SESIONES
// -------------------------------------------------


// -------------------------------------------------
// ALUMNOS
// -------------------------------------------------


// -------------------------------------------------
// INSCRIPCION
// -------------------------------------------------
const createEnrollment = gql`
  mutation CreateEnrollment(
    $input: CreateEnrollmentInput!
    $condition: ModelEnrollmentConditionInput
  ) {
    createEnrollment(input: $input, condition: $condition) {
      id
      amountPaid
      startDate
      endDate
      wasPaid
      timeAWeek
      numberOfSessions
      sessionsLeft
      sessionsUsed
      student {
        id
        name
        lastName
        middleName
        birthdate
        placeOfResidence
        contactPhone
        whoIsTheContact
        emailPhone
        gender
        firstSwimmingClass
        attendedDaycare
        immersesWithoutSwallowingWater
        bornPrematurely
        waterOnHisFaceBothersHim
        putYourFaceInTheWater
        anyIllnessInjuryMedicalCondition
        createdAt
        updatedAt
        studentSessionDetailId
        __typename
      }
      sessionType {
        id
        name
        description
        durationSession
        totalSessions
        amount
        createdAt
        updatedAt
        __typename
      }
      course {
        id
        title
        description
        startingAge
        endingAge
        ageType
        AgeGroupType
        duration
        isActive
        createdAt
        updatedAt
        locationCoursesId
        __typename
      }
      transaction {
        id
        amount
        date
        paymentMethod
        status
        createdAt
        updatedAt
        transactionEnrollmentId
        __typename
      }
      sessionDetails {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      studentEnrollmentsId
      courseEnrollmentsId
      sessionTypeEnrollmentsId
      enrollmentTransactionId
      __typename
    }
  }
`;
const updateEnrollment = gql`
  mutation UpdateEnrollment(
    $input: UpdateEnrollmentInput!
    $condition: ModelEnrollmentConditionInput
  ) {
    updateEnrollment(input: $input, condition: $condition) {
      id
      amountPaid
      startDate
      endDate
      wasPaid
      timeAWeek
      numberOfSessions
      sessionsLeft
      sessionsUsed
      student {
        id
        name
        lastName
        middleName
        birthdate
        placeOfResidence
        contactPhone
        whoIsTheContact
        emailPhone
        gender
        firstSwimmingClass
        attendedDaycare
        immersesWithoutSwallowingWater
        bornPrematurely
        waterOnHisFaceBothersHim
        putYourFaceInTheWater
        anyIllnessInjuryMedicalCondition
        createdAt
        updatedAt
        studentSessionDetailId
        __typename
      }
      sessionType {
        id
        name
        description
        durationSession
        totalSessions
        amount
        createdAt
        updatedAt
        __typename
      }
      course {
        id
        title
        description
        startingAge
        endingAge
        ageType
        AgeGroupType
        duration
        isActive
        createdAt
        updatedAt
        locationCoursesId
        __typename
      }
      transaction {
        id
        amount
        date
        paymentMethod
        status
        createdAt
        updatedAt
        transactionEnrollmentId
        __typename
      }
      sessionDetails {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      studentEnrollmentsId
      courseEnrollmentsId
      sessionTypeEnrollmentsId
      enrollmentTransactionId
      __typename
    }
  }
`;
const deleteEnrollment = gql`
  mutation DeleteEnrollment(
    $input: DeleteEnrollmentInput!
    $condition: ModelEnrollmentConditionInput
  ) {
    deleteEnrollment(input: $input, condition: $condition) {
      id
      amountPaid
      startDate
      endDate
      wasPaid
      timeAWeek
      numberOfSessions
      sessionsLeft
      sessionsUsed
      student {
        id
        name
        lastName
        middleName
        birthdate
        placeOfResidence
        contactPhone
        whoIsTheContact
        emailPhone
        gender
        firstSwimmingClass
        attendedDaycare
        immersesWithoutSwallowingWater
        bornPrematurely
        waterOnHisFaceBothersHim
        putYourFaceInTheWater
        anyIllnessInjuryMedicalCondition
        createdAt
        updatedAt
        studentSessionDetailId
        __typename
      }
      sessionType {
        id
        name
        description
        durationSession
        totalSessions
        amount
        createdAt
        updatedAt
        __typename
      }
      course {
        id
        title
        description
        startingAge
        endingAge
        ageType
        AgeGroupType
        duration
        isActive
        createdAt
        updatedAt
        locationCoursesId
        __typename
      }
      transaction {
        id
        amount
        date
        paymentMethod
        status
        createdAt
        updatedAt
        transactionEnrollmentId
        __typename
      }
      sessionDetails {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      studentEnrollmentsId
      courseEnrollmentsId
      sessionTypeEnrollmentsId
      enrollmentTransactionId
      __typename
    }
  }
`;
// -------------------------------------------------
// DETALLE SESIONES ALUMNO
// -------------------------------------------------
const createSessionDetail = gql `
  mutation CreateSessionDetail(
    $input: CreateSessionDetailInput!
    $condition: ModelSessionDetailConditionInput
  ) {
    createSessionDetail(input: $input, condition: $condition) {
      id
      date
      month
      year
      sessionNumber
      totalSessions
      status
      proratedValue
      wasEmailSent
      enrollment {
        id
        amountPaid
        startDate
        endDate
        wasPaid
        timeAWeek
        numberOfSessions
        sessionsLeft
        sessionsUsed
        createdAt
        updatedAt
        studentEnrollmentsId
        courseEnrollmentsId
        sessionTypeEnrollmentsId
        enrollmentTransactionId
        __typename
      }
      student {
        id
        name
        lastName
        middleName
        birthdate
        placeOfResidence
        contactPhone
        whoIsTheContact
        emailPhone
        gender
        firstSwimmingClass
        attendedDaycare
        immersesWithoutSwallowingWater
        bornPrematurely
        waterOnHisFaceBothersHim
        putYourFaceInTheWater
        anyIllnessInjuryMedicalCondition
        createdAt
        updatedAt
        studentSessionDetailId
        __typename
      }
      createdAt
      updatedAt
      enrollmentSessionDetailsId
      sessionDetailStudentId
      __typename
    }
  }
`;
const updateSessionDetail = gql`
  mutation UpdateSessionDetail(
    $input: UpdateSessionDetailInput!
    $condition: ModelSessionDetailConditionInput
  ) {
    updateSessionDetail(input: $input, condition: $condition) {
      id
      date
      status
      wasEmailSent
      enrollment {
        id
        amountPaid
        startDate
        endDate
        wasPaid
        timeAWeek
        numberOfSessions
        sessionsLeft
        sessionsUsed
        createdAt
        updatedAt
        studentEnrollmentsId
        courseEnrollmentsId
        sessionTypeEnrollmentsId
        enrollmentTransactionId
        __typename
      }
      student {
        id
        name
        lastName
        middleName
        birthdate
        placeOfResidence
        contactPhone
        whoIsTheContact
        emailPhone
        gender
        firstSwimmingClass
        attendedDaycare
        immersesWithoutSwallowingWater
        bornPrematurely
        waterOnHisFaceBothersHim
        putYourFaceInTheWater
        anyIllnessInjuryMedicalCondition
        createdAt
        updatedAt
        studentSessionDetailId
        __typename
      }
      createdAt
      updatedAt
      enrollmentSessionDetailsId
      sessionDetailStudentId
      __typename
    }
  }
`;
const deleteSessionDetail = gql`
  mutation DeleteSessionDetail(
    $input: DeleteSessionDetailInput!
    $condition: ModelSessionDetailConditionInput
  ) {
    deleteSessionDetail(input: $input, condition: $condition) {
      id
      date
      status
      wasEmailSent
      enrollment {
        id
        amountPaid
        startDate
        endDate
        wasPaid
        timeAWeek
        numberOfSessions
        sessionsLeft
        sessionsUsed
        createdAt
        updatedAt
        studentEnrollmentsId
        courseEnrollmentsId
        sessionTypeEnrollmentsId
        enrollmentTransactionId
        __typename
      }
      student {
        id
        name
        lastName
        middleName
        birthdate
        placeOfResidence
        contactPhone
        whoIsTheContact
        emailPhone
        gender
        firstSwimmingClass
        attendedDaycare
        immersesWithoutSwallowingWater
        bornPrematurely
        waterOnHisFaceBothersHim
        putYourFaceInTheWater
        anyIllnessInjuryMedicalCondition
        createdAt
        updatedAt
        studentSessionDetailId
        __typename
      }
      createdAt
      updatedAt
      enrollmentSessionDetailsId
      sessionDetailStudentId
      __typename
    }
  }
`;

// -------------------------------------------------
// TRANSACCIONES
// -------------------------------------------------
const createTransaction = gql`
  mutation CreateTransaction(
    $input: CreateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    createTransaction(input: $input, condition: $condition) {
      id
      amount
      date
      paymentMethod
      status
      enrollment {
        id
        amountPaid
        startDate
        endDate
        wasPaid
        timeAWeek
        numberOfSessions
        sessionsLeft
        sessionsUsed
        createdAt
        updatedAt
        studentEnrollmentsId
        courseEnrollmentsId
        sessionTypeEnrollmentsId
        enrollmentTransactionId
        __typename
      }
      createdAt
      updatedAt
      transactionEnrollmentId
      __typename
    }
  }
`;
const updateTransaction = gql`
  mutation UpdateTransaction(
    $input: UpdateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    updateTransaction(input: $input, condition: $condition) {
      id
      amount
      date
      paymentMethod
      status
      enrollment {
        id
        amountPaid
        startDate
        endDate
        wasPaid
        timeAWeek
        numberOfSessions
        sessionsLeft
        sessionsUsed
        createdAt
        updatedAt
        studentEnrollmentsId
        courseEnrollmentsId
        sessionTypeEnrollmentsId
        enrollmentTransactionId
        __typename
      }
      createdAt
      updatedAt
      transactionEnrollmentId
      __typename
    }
  }
`;
const deleteTransaction = gql`
  mutation DeleteTransaction(
    $input: DeleteTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    deleteTransaction(input: $input, condition: $condition) {
      id
      amount
      date
      paymentMethod
      status
      enrollment {
        id
        amountPaid
        startDate
        endDate
        wasPaid
        timeAWeek
        numberOfSessions
        sessionsLeft
        sessionsUsed
        createdAt
        updatedAt
        studentEnrollmentsId
        courseEnrollmentsId
        sessionTypeEnrollmentsId
        enrollmentTransactionId
        __typename
      }
      createdAt
      updatedAt
      transactionEnrollmentId
      __typename
    }
  }
`;



// -------------------------------------------------
// GASTOS
// -------------------------------------------------




module.exports = {
  createUsers,
  updateUsers,
  deleteUsers,
  
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
  
  createSessionDetail,
  updateSessionDetail,
  deleteSessionDetail,
  
  createTransaction,
  updateTransaction,
  deleteTransaction
};
