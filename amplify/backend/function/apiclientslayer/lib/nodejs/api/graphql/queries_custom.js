const gql = require("graphql-tag");

// -------------------------------------------------
// LOCATIONS
// -------------------------------------------------
const getLocation = gql`
  query GetLocation($id: ID!) {
    getLocation(id: $id) {
      id
      name
      city
      minimumTemperature
      maximumTemperature
      address
      phone
      courses {
        nextToken
        __typename
      }
      schedules {
        nextToken
        __typename
      }
      expenses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
const listLocations = gql`
  query ListLocations(
    $id: ID
    $filter: ModelLocationFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listLocations(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        city
        minimumTemperature
        maximumTemperature
        address
        phone
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

// -------------------------------------------------
// CURSOS
// -------------------------------------------------
const getCourse = gql`
  query GetCourse($id: ID!) {
    getCourse(id: $id) {
      id
      title
      description
      startingAge
      endingAge
      ageType
      AgeGroupType
      duration
      isActive
      location {
        id
        name
        city
        minimumTemperature
        maximumTemperature
        address
        phone
        createdAt
        updatedAt
        __typename
      }
      schedules {
        nextToken
        __typename
      }
      sessionTypes {
        nextToken
        __typename
      }
      enrollments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      locationCoursesId
      __typename
    }
  }
`;
const listCourses = gql`
  query ListCourses(
    $id: ID
    $filter: ModelCourseFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCourses(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;

// -------------------------------------------------
// HORARIOS
// -------------------------------------------------
const getSchedule = gql`
  query GetSchedule($id: ID!) {
    getSchedule(id: $id) {
      id
      day
      startHour
      endHour
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
      location {
        id
        name
        city
        minimumTemperature
        maximumTemperature
        address
        phone
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      locationSchedulesId
      courseSchedulesId
      __typename
    }
  }
`;
const listSchedules = gql`
  query ListSchedules(
    $id: ID
    $filter: ModelScheduleFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSchedules(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        day
        startHour
        endHour
        createdAt
        updatedAt
        locationSchedulesId
        courseSchedulesId
        __typename
      }
      nextToken
      __typename
    }
  }
`;


// -------------------------------------------------
// PACK DE SESIONES
// -------------------------------------------------
const getSessionType = gql`
  query GetSessionType($id: ID!) {
    getSessionType(id: $id) {
      id
      name
      description
      durationSession
      timeAWeek
      totalSessions
      amount
      courses {
        items{
          id
          courseId
        }
        nextToken
        __typename
      }
      enrollments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
const listSessionTypes = gql`
  query ListSessionTypes(
    $id: ID
    $filter: ModelSessionTypeFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSessionTypes(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        description
        durationSession
        timeAWeek
        totalSessions
        amount
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

const getCourseSessionType = gql`
  query GetCourseSessionType($id: ID!) {
    getCourseSessionType(id: $id) {
      id
      courseId
      sessionTypeId
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
      sessionType {
        id
        name
        description
        durationSession
        timeAWeek
        totalSessions
        amount
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
const listCourseSessionTypes = gql`
  query ListCourseSessionTypes(
    $filter: ModelCourseSessionTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCourseSessionTypes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        courseId
        sessionTypeId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

// -------------------------------------------------
// ALUMNOS
// -------------------------------------------------
const getStudent = gql`
  query GetStudent($id: ID!) {
    getStudent(id: $id) {
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
      enrollments {
        nextToken
        __typename
      }
      relationships {
        nextToken
        __typename
      }
      sessionDetail {
        id
        date
        status
        wasEmailSent
        createdAt
        updatedAt
        enrollmentSessionDetailsId
        sessionDetailStudentId
        __typename
      }
      createdAt
      updatedAt
      studentSessionDetailId
      __typename
    }
  }
`;
const listStudents = gql`
  query ListStudents(
    $id: ID
    $filter: ModelStudentFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listStudents(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;

// -------------------------------------------------
// INSCRIPCION
// -------------------------------------------------
const getEnrollment = gql`
  query GetEnrollment($id: ID!) {
    getEnrollment(id: $id) {
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
const listEnrollments = gql`
  query ListEnrollments(
    $id: ID
    $filter: ModelEnrollmentFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listEnrollments(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;

// -------------------------------------------------
// DETALLE SESIONES ALUMNO
// -------------------------------------------------


const getSessionDetail = gql`
  query GetSessionDetail($id: ID!) {
    getSessionDetail(id: $id) {
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
const listSessionDetails = gql`
  query ListSessionDetails(
    $filter: ModelSessionDetailFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSessionDetails(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        status
        wasEmailSent
        createdAt
        updatedAt
        enrollmentSessionDetailsId
        sessionDetailStudentId
        __typename
      }
      nextToken
      __typename
    }
  }
`;

// -------------------------------------------------
// TRANSACCIONES
// -------------------------------------------------
const getTransaction = gql`
  query GetTransaction($id: ID!) {
    getTransaction(id: $id) {
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
const listTransactions = gql`
  query ListTransactions(
    $id: ID
    $filter: ModelTransactionFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listTransactions(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;



// -------------------------------------------------
// GASTOS
// -------------------------------------------------
const getExpense = gql`
  query GetExpense($id: ID!) {
    getExpense(id: $id) {
      id
      amount
      description
      date
      day
      month
      year
      expenseType
      costCenterType
      location {
        id
        name
        city
        minimumTemperature
        maximumTemperature
        address
        phone
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      locationExpensesId
      __typename
    }
  }
`;
const listExpenses = gql`
  query ListExpenses(
    $id: ID
    $filter: ModelExpenseFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listExpenses(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        amount
        description
        date
        day
        month
        year
        expenseType
        costCenterType
        createdAt
        updatedAt
        locationExpensesId
        __typename
      }
      nextToken
      __typename
    }
  }
`;


module.exports = {
  getLocation,
  listLocations,
  getCourse,
  listCourses,
  getSchedule,
  listSchedules,
  getSessionType,
  listSessionTypes,
  getCourseSessionType,
  listCourseSessionTypes,
  getStudent,
  listStudents,
  getEnrollment,
  listEnrollments,
  getSessionDetail,
  listSessionDetails,
  getTransaction,
  listTransactions,
  getExpense,
  listExpenses,
  
}