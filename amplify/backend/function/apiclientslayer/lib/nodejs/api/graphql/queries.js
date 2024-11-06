/* eslint-disable */
// this is an auto generated file. This will be overwritten

const getUsers = gql`
  query GetUsers($id: ID!) {
    getUsers(id: $id) {
      id
      name
      email
      validated
      contactPhone
      ig
      emailPhone
      firstContact
      relationships {
        nextToken
        __typename
      }
      userTickets {
        nextToken
        __typename
      }
      roles {
        id
        name
        displayName
        icon
        createdAt
        updatedAt
        __typename
      }
      userPermissions {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      usersRolesId
      __typename
    }
  }
`;
const listUsers = gql`
  query ListUsers(
    $id: ID
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        email
        validated
        contactPhone
        ig
        emailPhone
        firstContact
        createdAt
        updatedAt
        usersRolesId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
const getRelationship = gql`
  query GetRelationship($id: ID!) {
    getRelationship(id: $id) {
      id
      user {
        id
        name
        email
        validated
        contactPhone
        ig
        emailPhone
        firstContact
        createdAt
        updatedAt
        usersRolesId
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
      relationType
      createdAt
      updatedAt
      usersRelationshipsId
      studentRelationshipsId
      __typename
    }
  }
`;
const listRelationships = gql`
  query ListRelationships(
    $id: ID
    $filter: ModelRelationshipFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listRelationships(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        relationType
        createdAt
        updatedAt
        usersRelationshipsId
        studentRelationshipsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
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
const getSessionType = gql`
  query GetSessionType($id: ID!) {
    getSessionType(id: $id) {
      id
      name
      description
      durationSession
      totalSessions
      amount
      courses {
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
const getRoles = gql`
  query GetRoles($id: ID!) {
    getRoles(id: $id) {
      id
      name
      displayName
      icon
      rolPermissions {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
const listRoles = gql`
  query ListRoles(
    $id: ID
    $filter: ModelRolesFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listRoles(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        displayName
        icon
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
const getPermissions = gql`
  query GetPermissions($id: ID!) {
    getPermissions(id: $id) {
      id
      displayName
      name
      icon
      order
      Padre {
        id
        displayName
        name
        icon
        order
        createdAt
        updatedAt
        permissionsSubmenuId
        __typename
      }
      Submenu {
        nextToken
        __typename
      }
      rolPermissions {
        nextToken
        __typename
      }
      userPermissions {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      permissionsSubmenuId
      __typename
    }
  }
`;
const listPermissions = gql`
  query ListPermissions(
    $id: ID
    $filter: ModelPermissionsFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPermissions(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        displayName
        name
        icon
        order
        createdAt
        updatedAt
        permissionsSubmenuId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
const getSupportTicket = gql`
  query GetSupportTicket($id: ID!) {
    getSupportTicket(id: $id) {
      id
      name
      email
      phoneNumber
      description
      date
      day
      month
      year
      lastModificationUser
      statusTicket
      reason
      userTickets {
        nextToken
        __typename
      }
      ticketComments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
const listSupportTickets = gql`
  query ListSupportTickets(
    $filter: ModelSupportTicketFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSupportTickets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        phoneNumber
        description
        date
        day
        month
        year
        lastModificationUser
        statusTicket
        reason
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
const getCommentTickets = gql`
  query GetCommentTickets($id: ID!) {
    getCommentTickets(id: $id) {
      id
      description
      statusModificationIdUser
      statusModificationUser
      ticketComments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
const listCommentTickets = gql`
  query ListCommentTickets(
    $filter: ModelCommentTicketsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCommentTickets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        description
        statusModificationIdUser
        statusModificationUser
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
const getTicketUser = gql`
  query GetTicketUser($id: ID!) {
    getTicketUser(id: $id) {
      id
      usersId
      supportTicketId
      users {
        id
        name
        email
        validated
        contactPhone
        ig
        emailPhone
        firstContact
        createdAt
        updatedAt
        usersRolesId
        __typename
      }
      supportTicket {
        id
        name
        email
        phoneNumber
        description
        date
        day
        month
        year
        lastModificationUser
        statusTicket
        reason
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
const listTicketUsers = gql`
  query ListTicketUsers(
    $filter: ModelTicketUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTicketUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        usersId
        supportTicketId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
const getUserPermissions = gql`
  query GetUserPermissions($id: ID!) {
    getUserPermissions(id: $id) {
      id
      usersId
      permissionsId
      users {
        id
        name
        email
        validated
        contactPhone
        ig
        emailPhone
        firstContact
        createdAt
        updatedAt
        usersRolesId
        __typename
      }
      permissions {
        id
        displayName
        name
        icon
        order
        createdAt
        updatedAt
        permissionsSubmenuId
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
const listUserPermissions = gql`
  query ListUserPermissions(
    $filter: ModelUserPermissionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserPermissions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        usersId
        permissionsId
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
const getRolPermissions = gql`
  query GetRolPermissions($id: ID!) {
    getRolPermissions(id: $id) {
      id
      rolesId
      permissionsId
      roles {
        id
        name
        displayName
        icon
        createdAt
        updatedAt
        __typename
      }
      permissions {
        id
        displayName
        name
        icon
        order
        createdAt
        updatedAt
        permissionsSubmenuId
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
const listRolPermissions = gql`
  query ListRolPermissions(
    $filter: ModelRolPermissionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRolPermissions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        rolesId
        permissionsId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
const getComments = gql`
  query GetComments($id: ID!) {
    getComments(id: $id) {
      id
      supportTicketId
      commentTicketsId
      supportTicket {
        id
        name
        email
        phoneNumber
        description
        date
        day
        month
        year
        lastModificationUser
        statusTicket
        reason
        createdAt
        updatedAt
        __typename
      }
      commentTickets {
        id
        description
        statusModificationIdUser
        statusModificationUser
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
const listComments = gql`
  query ListComments(
    $filter: ModelCommentsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        supportTicketId
        commentTicketsId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
const ticketUsersByUsersId = gql`
  query TicketUsersByUsersId(
    $usersId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTicketUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ticketUsersByUsersId(
      usersId: $usersId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        usersId
        supportTicketId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
const ticketUsersBySupportTicketId = gql`
  query TicketUsersBySupportTicketId(
    $supportTicketId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTicketUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ticketUsersBySupportTicketId(
      supportTicketId: $supportTicketId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        usersId
        supportTicketId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
const userPermissionsByUsersId = gql`
  query UserPermissionsByUsersId(
    $usersId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserPermissionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userPermissionsByUsersId(
      usersId: $usersId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        usersId
        permissionsId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
const userPermissionsByPermissionsId = gql`
  query UserPermissionsByPermissionsId(
    $permissionsId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserPermissionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userPermissionsByPermissionsId(
      permissionsId: $permissionsId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        usersId
        permissionsId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
const courseSessionTypesByCourseId = gql`
  query CourseSessionTypesByCourseId(
    $courseId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCourseSessionTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    courseSessionTypesByCourseId(
      courseId: $courseId
      sortDirection: $sortDirection
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
const courseSessionTypesBySessionTypeId = gql`
  query CourseSessionTypesBySessionTypeId(
    $sessionTypeId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCourseSessionTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    courseSessionTypesBySessionTypeId(
      sessionTypeId: $sessionTypeId
      sortDirection: $sortDirection
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
const rolPermissionsByRolesId = gql`
  query RolPermissionsByRolesId(
    $rolesId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRolPermissionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    rolPermissionsByRolesId(
      rolesId: $rolesId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        rolesId
        permissionsId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
const rolPermissionsByPermissionsId = gql`
  query RolPermissionsByPermissionsId(
    $permissionsId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRolPermissionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    rolPermissionsByPermissionsId(
      permissionsId: $permissionsId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        rolesId
        permissionsId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
const commentsBySupportTicketId = gql`
  query CommentsBySupportTicketId(
    $supportTicketId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCommentsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsBySupportTicketId(
      supportTicketId: $supportTicketId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        supportTicketId
        commentTicketsId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
const commentsByCommentTicketsId = gql`
  query CommentsByCommentTicketsId(
    $commentTicketsId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCommentsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsByCommentTicketsId(
      commentTicketsId: $commentTicketsId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        supportTicketId
        commentTicketsId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
