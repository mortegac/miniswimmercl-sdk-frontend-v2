/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getV2AcademyCourses = /* GraphQL */ `query GetV2AcademyCourses($id: ID!) {
  getV2AcademyCourses(id: $id) {
    address
    certificate {
      academyCoursesId
      academyStudentsId
      createdAt
      date
      descriptionOne
      id
      instructorName
      instructorSignature
      isOfficialCertification
      location
      practicalHours
      studentName
      theoreticalHours
      title
      updatedAt
      __typename
    }
    createdAt
    description
    enrollments {
      nextToken
      __typename
    }
    id
    isActive
    mapurl
    name
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2AcademyCoursesQueryVariables,
  APITypes.GetV2AcademyCoursesQuery
>;
export const getV2AcademyEnrollment = /* GraphQL */ `query GetV2AcademyEnrollment($id: ID!) {
  getV2AcademyEnrollment(id: $id) {
    amountPaid
    course {
      address
      createdAt
      description
      id
      isActive
      mapurl
      name
      updatedAt
      __typename
    }
    courseId
    createdAt
    date
    id
    shoppingCartDetail {
      academyEnrollmentId
      amount
      cartId
      createdAt
      createdById
      detail
      enrollmentId
      id
      privateEnrollmentId
      quantity
      type
      updatedAt
      wasDeleted
      __typename
    }
    shoppingCartDetailId
    students {
      address
      birthdate
      companyAgreement
      country
      createdAt
      email
      emergencyContact
      hasAgreement
      id
      isPaid
      isSponsored
      medicalHistory
      name
      phone
      presence
      profession
      status
      studiesRelated
      updatedAt
      urlImage
      years
      __typename
    }
    studentsId
    updatedAt
    user
    wasDeleted
    wasPaid
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2AcademyEnrollmentQueryVariables,
  APITypes.GetV2AcademyEnrollmentQuery
>;
export const getV2AcademyStudents = /* GraphQL */ `query GetV2AcademyStudents($id: ID!) {
  getV2AcademyStudents(id: $id) {
    address
    birthdate
    certificate {
      academyCoursesId
      academyStudentsId
      createdAt
      date
      descriptionOne
      id
      instructorName
      instructorSignature
      isOfficialCertification
      location
      practicalHours
      studentName
      theoreticalHours
      title
      updatedAt
      __typename
    }
    companyAgreement
    country
    createdAt
    email
    emergencyContact
    enrollments {
      nextToken
      __typename
    }
    hasAgreement
    id
    isPaid
    isSponsored
    medicalHistory
    name
    phone
    presence
    profession
    status
    studiesRelated
    updatedAt
    urlImage
    years
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2AcademyStudentsQueryVariables,
  APITypes.GetV2AcademyStudentsQuery
>;
export const getV2Certificates = /* GraphQL */ `query GetV2Certificates($id: ID!) {
  getV2Certificates(id: $id) {
    academyCoursesId
    academyStudentsId
    course {
      address
      createdAt
      description
      id
      isActive
      mapurl
      name
      updatedAt
      __typename
    }
    createdAt
    date
    descriptionOne
    id
    instructorName
    instructorSignature
    isOfficialCertification
    location
    practicalHours
    student {
      address
      birthdate
      companyAgreement
      country
      createdAt
      email
      emergencyContact
      hasAgreement
      id
      isPaid
      isSponsored
      medicalHistory
      name
      phone
      presence
      profession
      status
      studiesRelated
      updatedAt
      urlImage
      years
      __typename
    }
    studentName
    theoreticalHours
    title
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2CertificatesQueryVariables,
  APITypes.GetV2CertificatesQuery
>;
export const getV2Coach = /* GraphQL */ `query GetV2Coach($id: ID!) {
  getV2Coach(id: $id) {
    coachSchedules {
      nextToken
      __typename
    }
    createdAt
    email
    id
    isActive
    isCertificated
    lastName
    name
    phone
    updatedAt
    whatsapp
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2CoachQueryVariables,
  APITypes.GetV2CoachQuery
>;
export const getV2CoachSchedule = /* GraphQL */ `query GetV2CoachSchedule($id: ID!) {
  getV2CoachSchedule(id: $id) {
    coach {
      createdAt
      email
      id
      isActive
      isCertificated
      lastName
      name
      phone
      updatedAt
      whatsapp
      __typename
    }
    coachId
    createdAt
    date
    endTime
    id
    isAvailable
    isBooked
    location {
      address
      city
      country
      createdAt
      directions
      group
      id
      imageMap
      isActive
      isVisible
      maximumTemperature
      minimumTemperature
      name
      phone
      region
      updatedAt
      urlMap
      __typename
    }
    locationId
    notes
    schedule {
      courseSchedulesId
      createdAt
      day
      endHour
      id
      isActive
      locationSchedulesId
      maximumQuotas
      minimumQuotas
      startHour
      updatedAt
      __typename
    }
    scheduleId
    startTime
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2CoachScheduleQueryVariables,
  APITypes.GetV2CoachScheduleQuery
>;
export const getV2CommentTickets = /* GraphQL */ `query GetV2CommentTickets($id: ID!) {
  getV2CommentTickets(id: $id) {
    createdAt
    description
    id
    statusModificationIdUser
    statusModificationUser
    ticketComments {
      nextToken
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2CommentTicketsQueryVariables,
  APITypes.GetV2CommentTicketsQuery
>;
export const getV2Correlatives = /* GraphQL */ `query GetV2Correlatives($id: ID!) {
  getV2Correlatives(id: $id) {
    correlative
    createdAt
    id
    type
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2CorrelativesQueryVariables,
  APITypes.GetV2CorrelativesQuery
>;
export const getV2Course = /* GraphQL */ `query GetV2Course($id: ID!) {
  getV2Course(id: $id) {
    ageGroupType
    ageType
    courseSessionTypes {
      nextToken
      __typename
    }
    createdAt
    description
    duration
    endingAge
    enrollments {
      nextToken
      __typename
    }
    id
    isActive
    location {
      address
      city
      country
      createdAt
      directions
      group
      id
      imageMap
      isActive
      isVisible
      maximumTemperature
      minimumTemperature
      name
      phone
      region
      updatedAt
      urlMap
      __typename
    }
    locationId
    privateEnrollments {
      nextToken
      __typename
    }
    schedules {
      nextToken
      __typename
    }
    sessionDetails {
      nextToken
      __typename
    }
    startingAge
    title
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2CourseQueryVariables,
  APITypes.GetV2CourseQuery
>;
export const getV2CourseSessionType = /* GraphQL */ `query GetV2CourseSessionType($id: ID!) {
  getV2CourseSessionType(id: $id) {
    course {
      ageGroupType
      ageType
      createdAt
      description
      duration
      endingAge
      id
      isActive
      locationId
      startingAge
      title
      updatedAt
      __typename
    }
    courseId
    createdAt
    id
    sessionType {
      amount
      createdAt
      description
      durationSession
      id
      isActive
      isTestClass
      name
      packValidity
      timeAWeek
      totalSessions
      updatedAt
      __typename
    }
    sessionTypeId
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2CourseSessionTypeQueryVariables,
  APITypes.GetV2CourseSessionTypeQuery
>;
export const getV2EmailSend = /* GraphQL */ `query GetV2EmailSend($id: ID!) {
  getV2EmailSend(id: $id) {
    contentEmail
    contentMessage
    createdAt
    date
    email
    emailState
    enrollment {
      amountPaid
      courseId
      createdAt
      endDate
      id
      numberOfSessions
      paymentToken
      scheduleId
      scheduleName
      sessionTypeId
      sessionsLeft
      sessionsUsed
      startDate
      studentId
      timeAWeek
      typeOfPlan
      updatedAt
      userId
      wasDeleted
      wasPaid
      __typename
    }
    enrollmentId
    id
    phone
    phoneState
    privateEnrollment {
      amountPaid
      city
      coachId
      country
      courseId
      createdAt
      endDate
      id
      latitude
      longitude
      numberOfSessions
      paymentToken
      scheduleId
      scheduleName
      sessionTypeId
      startDate
      state
      streetAddress
      studentId
      timeAWeek
      typeOfPlan
      updatedAt
      userId
      wasDeleted
      wasPaid
      zipCode
      zoomLevel
      __typename
    }
    privateEnrollmentId
    student {
      anyIllnessInjuryMedicalCondition
      attendedDaycare
      birthdate
      bornPrematurely
      contactPhone
      country
      createdAt
      emailPhone
      evaluationDescription
      evaluationIcon
      evaluationLevelId
      firstSwimmingClass
      gender
      id
      immersesWithoutSwallowingWater
      isActive
      lastName
      middleName
      name
      placeOfResidence
      putYourFaceInTheWater
      updatedAt
      waterOnHisFaceBothersHim
      whoIsTheContact
      __typename
    }
    studentId
    type
    typeSend
    updatedAt
    userSend {
      city
      contactPhone
      country
      createdAt
      email
      firstContact
      id
      ig
      isAcademyStudent
      isActive
      isEmployed
      latitude
      longitude
      name
      roleId
      salesCommission
      state
      streetAddress
      updatedAt
      validated
      zipCode
      zoomLevel
      __typename
    }
    userSendId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2EmailSendQueryVariables,
  APITypes.GetV2EmailSendQuery
>;
export const getV2Enrollment = /* GraphQL */ `query GetV2Enrollment($id: ID!) {
  getV2Enrollment(id: $id) {
    amountPaid
    course {
      ageGroupType
      ageType
      createdAt
      description
      duration
      endingAge
      id
      isActive
      locationId
      startingAge
      title
      updatedAt
      __typename
    }
    courseId
    createdAt
    emailSends {
      nextToken
      __typename
    }
    endDate
    id
    numberOfSessions
    paymentToken
    scheduleId
    scheduleName
    sessionDetails {
      nextToken
      __typename
    }
    sessionType {
      amount
      createdAt
      description
      durationSession
      id
      isActive
      isTestClass
      name
      packValidity
      timeAWeek
      totalSessions
      updatedAt
      __typename
    }
    sessionTypeId
    sessionsLeft
    sessionsUsed
    shoppingCartDetail {
      academyEnrollmentId
      amount
      cartId
      createdAt
      createdById
      detail
      enrollmentId
      id
      privateEnrollmentId
      quantity
      type
      updatedAt
      wasDeleted
      __typename
    }
    startDate
    student {
      anyIllnessInjuryMedicalCondition
      attendedDaycare
      birthdate
      bornPrematurely
      contactPhone
      country
      createdAt
      emailPhone
      evaluationDescription
      evaluationIcon
      evaluationLevelId
      firstSwimmingClass
      gender
      id
      immersesWithoutSwallowingWater
      isActive
      lastName
      middleName
      name
      placeOfResidence
      putYourFaceInTheWater
      updatedAt
      waterOnHisFaceBothersHim
      whoIsTheContact
      __typename
    }
    studentId
    timeAWeek
    typeOfPlan
    updatedAt
    user {
      city
      contactPhone
      country
      createdAt
      email
      firstContact
      id
      ig
      isAcademyStudent
      isActive
      isEmployed
      latitude
      longitude
      name
      roleId
      salesCommission
      state
      streetAddress
      updatedAt
      validated
      zipCode
      zoomLevel
      __typename
    }
    userId
    wasDeleted
    wasPaid
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2EnrollmentQueryVariables,
  APITypes.GetV2EnrollmentQuery
>;
export const getV2EvaluationLevel = /* GraphQL */ `query GetV2EvaluationLevel($id: ID!) {
  getV2EvaluationLevel(id: $id) {
    createdAt
    description
    endingAge
    evaluationObjectives {
      nextToken
      __typename
    }
    ico
    id
    name
    order
    startingAge
    studentEvaluations {
      nextToken
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2EvaluationLevelQueryVariables,
  APITypes.GetV2EvaluationLevelQuery
>;
export const getV2EvaluationObjetives = /* GraphQL */ `query GetV2EvaluationObjetives($id: ID!) {
  getV2EvaluationObjetives(id: $id) {
    createdAt
    evaluationLevel {
      createdAt
      description
      endingAge
      ico
      id
      name
      order
      startingAge
      updatedAt
      __typename
    }
    evaluationLevelId
    id
    isActive
    isMandatory
    studentEvaluationsDetails {
      nextToken
      __typename
    }
    texto
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2EvaluationObjetivesQueryVariables,
  APITypes.GetV2EvaluationObjetivesQuery
>;
export const getV2Expense = /* GraphQL */ `query GetV2Expense($id: ID!) {
  getV2Expense(id: $id) {
    amount
    costCenterType
    createdAt
    date
    day
    description
    expenseType
    id
    location {
      address
      city
      country
      createdAt
      directions
      group
      id
      imageMap
      isActive
      isVisible
      maximumTemperature
      minimumTemperature
      name
      phone
      region
      updatedAt
      urlMap
      __typename
    }
    locationId
    month
    updatedAt
    year
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2ExpenseQueryVariables,
  APITypes.GetV2ExpenseQuery
>;
export const getV2GmailInbox = /* GraphQL */ `query GetV2GmailInbox($id: ID!) {
  getV2GmailInbox(id: $id) {
    attachments
    bodyHtml
    bodyText
    createdAt
    dateSent
    dateStr
    fromEmail
    fromName
    gmailAccount
    hasAttachments
    id
    isRead
    labels
    messageId
    snippet
    subject
    threadId
    toEmails
    updatedAt
    user {
      city
      contactPhone
      country
      createdAt
      email
      firstContact
      id
      ig
      isAcademyStudent
      isActive
      isEmployed
      latitude
      longitude
      name
      roleId
      salesCommission
      state
      streetAddress
      updatedAt
      validated
      zipCode
      zoomLevel
      __typename
    }
    userId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2GmailInboxQueryVariables,
  APITypes.GetV2GmailInboxQuery
>;
export const getV2Location = /* GraphQL */ `query GetV2Location($id: ID!) {
  getV2Location(id: $id) {
    address
    city
    coachSchedules {
      nextToken
      __typename
    }
    country
    courses {
      nextToken
      __typename
    }
    createdAt
    directions
    expenses {
      nextToken
      __typename
    }
    group
    id
    imageMap
    isActive
    isVisible
    maximumTemperature
    minimumTemperature
    name
    phone
    region
    schedules {
      nextToken
      __typename
    }
    updatedAt
    urlMap
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2LocationQueryVariables,
  APITypes.GetV2LocationQuery
>;
export const getV2Managers = /* GraphQL */ `query GetV2Managers($id: ID!) {
  getV2Managers(id: $id) {
    createdAt
    email
    firstName
    id
    isActive
    lastName
    profitCenter {
      code
      createdAt
      description
      id
      isActive
      managerID
      name
      parentProfitCenterID
      updatedAt
      __typename
    }
    profitCenterID
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2ManagersQueryVariables,
  APITypes.GetV2ManagersQuery
>;
export const getV2Metadata = /* GraphQL */ `query GetV2Metadata($id: ID!) {
  getV2Metadata(id: $id) {
    createdAt
    id
    key
    metadata {
      country
      createdAt
      id
      idParent
      label
      typeOfParameterId
      updatedAt
      value
      __typename
    }
    parametersId
    updatedAt
    value
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2MetadataQueryVariables,
  APITypes.GetV2MetadataQuery
>;
export const getV2Parameters = /* GraphQL */ `query GetV2Parameters($id: ID!) {
  getV2Parameters(id: $id) {
    country
    createdAt
    id
    idParent
    label
    metadata {
      nextToken
      __typename
    }
    typeOfParameter {
      createdAt
      description
      id
      updatedAt
      __typename
    }
    typeOfParameterId
    updatedAt
    value
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2ParametersQueryVariables,
  APITypes.GetV2ParametersQuery
>;
export const getV2ParametersEnc = /* GraphQL */ `query GetV2ParametersEnc($id: ID!) {
  getV2ParametersEnc(id: $id) {
    createdAt
    description
    id
    typeOfParameter {
      nextToken
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2ParametersEncQueryVariables,
  APITypes.GetV2ParametersEncQuery
>;
export const getV2PaymentTransactions = /* GraphQL */ `query GetV2PaymentTransactions($id: ID!) {
  getV2PaymentTransactions(id: $id) {
    accounting_date
    amount
    authorization_code
    buy_order
    card_detail
    card_number
    createdAt
    day
    glosa
    hasRefund
    hour
    id
    installments_amount
    installments_number
    month
    payment_type_code
    response_code
    session_id
    shoppingCart {
      createdAt
      id
      sellerId
      sellersCommissionId
      status
      totalPrice
      updatedAt
      userId
      __typename
    }
    shoppingCartId
    status
    token
    transaction_date
    updatedAt
    urlWebpay
    users {
      city
      contactPhone
      country
      createdAt
      email
      firstContact
      id
      ig
      isAcademyStudent
      isActive
      isEmployed
      latitude
      longitude
      name
      roleId
      salesCommission
      state
      streetAddress
      updatedAt
      validated
      zipCode
      zoomLevel
      __typename
    }
    usersId
    vci
    year
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2PaymentTransactionsQueryVariables,
  APITypes.GetV2PaymentTransactionsQuery
>;
export const getV2Permissions = /* GraphQL */ `query GetV2Permissions($id: ID!) {
  getV2Permissions(id: $id) {
    Padre {
      createdAt
      displayName
      icon
      id
      isLeaf
      isVisible
      name
      order
      padreId
      updatedAt
      __typename
    }
    Submenu {
      nextToken
      __typename
    }
    createdAt
    displayName
    icon
    id
    isLeaf
    isVisible
    name
    order
    padreId
    rolPermissions {
      nextToken
      __typename
    }
    updatedAt
    userPermissions {
      nextToken
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2PermissionsQueryVariables,
  APITypes.GetV2PermissionsQuery
>;
export const getV2PrivateEnrollment = /* GraphQL */ `query GetV2PrivateEnrollment($id: ID!) {
  getV2PrivateEnrollment(id: $id) {
    amountPaid
    city
    coach {
      city
      contactPhone
      country
      createdAt
      email
      firstContact
      id
      ig
      isAcademyStudent
      isActive
      isEmployed
      latitude
      longitude
      name
      roleId
      salesCommission
      state
      streetAddress
      updatedAt
      validated
      zipCode
      zoomLevel
      __typename
    }
    coachId
    country
    course {
      ageGroupType
      ageType
      createdAt
      description
      duration
      endingAge
      id
      isActive
      locationId
      startingAge
      title
      updatedAt
      __typename
    }
    courseId
    createdAt
    emailSends {
      nextToken
      __typename
    }
    endDate
    id
    latitude
    longitude
    numberOfSessions
    paymentToken
    scheduleId
    scheduleName
    sessionDetails {
      nextToken
      __typename
    }
    sessionType {
      amount
      createdAt
      description
      durationSession
      id
      isActive
      isTestClass
      name
      packValidity
      timeAWeek
      totalSessions
      updatedAt
      __typename
    }
    sessionTypeId
    shoppingCartDetail {
      academyEnrollmentId
      amount
      cartId
      createdAt
      createdById
      detail
      enrollmentId
      id
      privateEnrollmentId
      quantity
      type
      updatedAt
      wasDeleted
      __typename
    }
    startDate
    state
    streetAddress
    student {
      anyIllnessInjuryMedicalCondition
      attendedDaycare
      birthdate
      bornPrematurely
      contactPhone
      country
      createdAt
      emailPhone
      evaluationDescription
      evaluationIcon
      evaluationLevelId
      firstSwimmingClass
      gender
      id
      immersesWithoutSwallowingWater
      isActive
      lastName
      middleName
      name
      placeOfResidence
      putYourFaceInTheWater
      updatedAt
      waterOnHisFaceBothersHim
      whoIsTheContact
      __typename
    }
    studentId
    timeAWeek
    typeOfPlan
    updatedAt
    user {
      city
      contactPhone
      country
      createdAt
      email
      firstContact
      id
      ig
      isAcademyStudent
      isActive
      isEmployed
      latitude
      longitude
      name
      roleId
      salesCommission
      state
      streetAddress
      updatedAt
      validated
      zipCode
      zoomLevel
      __typename
    }
    userId
    wasDeleted
    wasPaid
    zipCode
    zoomLevel
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2PrivateEnrollmentQueryVariables,
  APITypes.GetV2PrivateEnrollmentQuery
>;
export const getV2Product = /* GraphQL */ `query GetV2Product($id: ID!) {
  getV2Product(id: $id) {
    createdAt
    criticalStock
    currentStock
    id
    isActive
    name
    profits
    purchasePrice
    sellingPrice
    sku
    supplier {
      address
      contactPerson
      createdAt
      email
      id
      isActive
      name
      phone
      taxId
      updatedAt
      __typename
    }
    supplierId
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2ProductQueryVariables,
  APITypes.GetV2ProductQuery
>;
export const getV2ProfitCenter = /* GraphQL */ `query GetV2ProfitCenter($id: ID!) {
  getV2ProfitCenter(id: $id) {
    code
    createdAt
    description
    id
    isActive
    managerID
    managers {
      nextToken
      __typename
    }
    name
    parentProfitCenterID
    transactions {
      nextToken
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2ProfitCenterQueryVariables,
  APITypes.GetV2ProfitCenterQuery
>;
export const getV2Relationship = /* GraphQL */ `query GetV2Relationship($id: ID!) {
  getV2Relationship(id: $id) {
    createdAt
    id
    relationType
    student {
      anyIllnessInjuryMedicalCondition
      attendedDaycare
      birthdate
      bornPrematurely
      contactPhone
      country
      createdAt
      emailPhone
      evaluationDescription
      evaluationIcon
      evaluationLevelId
      firstSwimmingClass
      gender
      id
      immersesWithoutSwallowingWater
      isActive
      lastName
      middleName
      name
      placeOfResidence
      putYourFaceInTheWater
      updatedAt
      waterOnHisFaceBothersHim
      whoIsTheContact
      __typename
    }
    studentId
    updatedAt
    user {
      city
      contactPhone
      country
      createdAt
      email
      firstContact
      id
      ig
      isAcademyStudent
      isActive
      isEmployed
      latitude
      longitude
      name
      roleId
      salesCommission
      state
      streetAddress
      updatedAt
      validated
      zipCode
      zoomLevel
      __typename
    }
    userId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2RelationshipQueryVariables,
  APITypes.GetV2RelationshipQuery
>;
export const getV2RolPermissions = /* GraphQL */ `query GetV2RolPermissions($id: ID!) {
  getV2RolPermissions(id: $id) {
    createdAt
    id
    permission {
      createdAt
      displayName
      icon
      id
      isLeaf
      isVisible
      name
      order
      padreId
      updatedAt
      __typename
    }
    permissionId
    role {
      createdAt
      displayName
      icon
      id
      name
      updatedAt
      __typename
    }
    roleId
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2RolPermissionsQueryVariables,
  APITypes.GetV2RolPermissionsQuery
>;
export const getV2Roles = /* GraphQL */ `query GetV2Roles($id: ID!) {
  getV2Roles(id: $id) {
    createdAt
    displayName
    icon
    id
    name
    rolPermissions {
      nextToken
      __typename
    }
    updatedAt
    users {
      nextToken
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2RolesQueryVariables,
  APITypes.GetV2RolesQuery
>;
export const getV2Schedule = /* GraphQL */ `query GetV2Schedule($id: ID!) {
  getV2Schedule(id: $id) {
    coachSchedules {
      nextToken
      __typename
    }
    course {
      ageGroupType
      ageType
      createdAt
      description
      duration
      endingAge
      id
      isActive
      locationId
      startingAge
      title
      updatedAt
      __typename
    }
    courseSchedulesId
    createdAt
    day
    endHour
    id
    isActive
    location {
      address
      city
      country
      createdAt
      directions
      group
      id
      imageMap
      isActive
      isVisible
      maximumTemperature
      minimumTemperature
      name
      phone
      region
      updatedAt
      urlMap
      __typename
    }
    locationSchedulesId
    maximumQuotas
    minimumQuotas
    sessionDetails {
      nextToken
      __typename
    }
    startHour
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2ScheduleQueryVariables,
  APITypes.GetV2ScheduleQuery
>;
export const getV2SellersCommission = /* GraphQL */ `query GetV2SellersCommission($id: ID!) {
  getV2SellersCommission(id: $id) {
    amount
    createdAt
    description
    id
    paymentAmount
    salesCommission
    shoppingCart {
      createdAt
      id
      sellerId
      sellersCommissionId
      status
      totalPrice
      updatedAt
      userId
      __typename
    }
    status
    type
    updatedAt
    users {
      city
      contactPhone
      country
      createdAt
      email
      firstContact
      id
      ig
      isAcademyStudent
      isActive
      isEmployed
      latitude
      longitude
      name
      roleId
      salesCommission
      state
      streetAddress
      updatedAt
      validated
      zipCode
      zoomLevel
      __typename
    }
    usersId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2SellersCommissionQueryVariables,
  APITypes.GetV2SellersCommissionQuery
>;
export const getV2SentEmail = /* GraphQL */ `query GetV2SentEmail($id: ID!) {
  getV2SentEmail(id: $id) {
    body
    createdAt
    emailState
    id
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2SentEmailQueryVariables,
  APITypes.GetV2SentEmailQuery
>;
export const getV2SessionDetail = /* GraphQL */ `query GetV2SessionDetail($id: ID!) {
  getV2SessionDetail(id: $id) {
    coach {
      city
      contactPhone
      country
      createdAt
      email
      firstContact
      id
      ig
      isAcademyStudent
      isActive
      isEmployed
      latitude
      longitude
      name
      roleId
      salesCommission
      state
      streetAddress
      updatedAt
      validated
      zipCode
      zoomLevel
      __typename
    }
    coachId
    course {
      ageGroupType
      ageType
      createdAt
      description
      duration
      endingAge
      id
      isActive
      locationId
      startingAge
      title
      updatedAt
      __typename
    }
    courseId
    createdAt
    date
    day
    enrollment {
      amountPaid
      courseId
      createdAt
      endDate
      id
      numberOfSessions
      paymentToken
      scheduleId
      scheduleName
      sessionTypeId
      sessionsLeft
      sessionsUsed
      startDate
      studentId
      timeAWeek
      typeOfPlan
      updatedAt
      userId
      wasDeleted
      wasPaid
      __typename
    }
    enrollmentId
    id
    locationId
    locationIdUsed
    modifiedBy
    modifiedByDate
    month
    privateEnrollment {
      amountPaid
      city
      coachId
      country
      courseId
      createdAt
      endDate
      id
      latitude
      longitude
      numberOfSessions
      paymentToken
      scheduleId
      scheduleName
      sessionTypeId
      startDate
      state
      streetAddress
      studentId
      timeAWeek
      typeOfPlan
      updatedAt
      userId
      wasDeleted
      wasPaid
      zipCode
      zoomLevel
      __typename
    }
    privateEnrollmentId
    proratedValue
    schedule {
      courseSchedulesId
      createdAt
      day
      endHour
      id
      isActive
      locationSchedulesId
      maximumQuotas
      minimumQuotas
      startHour
      updatedAt
      __typename
    }
    scheduleId
    sessionNumber
    status
    student {
      anyIllnessInjuryMedicalCondition
      attendedDaycare
      birthdate
      bornPrematurely
      contactPhone
      country
      createdAt
      emailPhone
      evaluationDescription
      evaluationIcon
      evaluationLevelId
      firstSwimmingClass
      gender
      id
      immersesWithoutSwallowingWater
      isActive
      lastName
      middleName
      name
      placeOfResidence
      putYourFaceInTheWater
      updatedAt
      waterOnHisFaceBothersHim
      whoIsTheContact
      __typename
    }
    studentId
    totalSessions
    updatedAt
    wasEmailSent
    year
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2SessionDetailQueryVariables,
  APITypes.GetV2SessionDetailQuery
>;
export const getV2SessionType = /* GraphQL */ `query GetV2SessionType($id: ID!) {
  getV2SessionType(id: $id) {
    amount
    courseSessionTypes {
      nextToken
      __typename
    }
    createdAt
    description
    durationSession
    enrollments {
      nextToken
      __typename
    }
    id
    isActive
    isTestClass
    name
    packValidity
    privateEnrollments {
      nextToken
      __typename
    }
    timeAWeek
    totalSessions
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2SessionTypeQueryVariables,
  APITypes.GetV2SessionTypeQuery
>;
export const getV2ShoppingCart = /* GraphQL */ `query GetV2ShoppingCart($id: ID!) {
  getV2ShoppingCart(id: $id) {
    cartDetails {
      nextToken
      __typename
    }
    createdAt
    id
    paymentTransactions {
      nextToken
      __typename
    }
    seller {
      city
      contactPhone
      country
      createdAt
      email
      firstContact
      id
      ig
      isAcademyStudent
      isActive
      isEmployed
      latitude
      longitude
      name
      roleId
      salesCommission
      state
      streetAddress
      updatedAt
      validated
      zipCode
      zoomLevel
      __typename
    }
    sellerId
    sellersCommission {
      amount
      createdAt
      description
      id
      paymentAmount
      salesCommission
      status
      type
      updatedAt
      usersId
      __typename
    }
    sellersCommissionId
    status
    totalPrice
    updatedAt
    user {
      city
      contactPhone
      country
      createdAt
      email
      firstContact
      id
      ig
      isAcademyStudent
      isActive
      isEmployed
      latitude
      longitude
      name
      roleId
      salesCommission
      state
      streetAddress
      updatedAt
      validated
      zipCode
      zoomLevel
      __typename
    }
    userId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2ShoppingCartQueryVariables,
  APITypes.GetV2ShoppingCartQuery
>;
export const getV2ShoppingCartDetail = /* GraphQL */ `query GetV2ShoppingCartDetail($id: ID!) {
  getV2ShoppingCartDetail(id: $id) {
    academyEnrollment {
      amountPaid
      courseId
      createdAt
      date
      id
      shoppingCartDetailId
      studentsId
      updatedAt
      user
      wasDeleted
      wasPaid
      __typename
    }
    academyEnrollmentId
    amount
    cart {
      createdAt
      id
      sellerId
      sellersCommissionId
      status
      totalPrice
      updatedAt
      userId
      __typename
    }
    cartId
    createdAt
    createdBy {
      city
      contactPhone
      country
      createdAt
      email
      firstContact
      id
      ig
      isAcademyStudent
      isActive
      isEmployed
      latitude
      longitude
      name
      roleId
      salesCommission
      state
      streetAddress
      updatedAt
      validated
      zipCode
      zoomLevel
      __typename
    }
    createdById
    detail
    enrollment {
      amountPaid
      courseId
      createdAt
      endDate
      id
      numberOfSessions
      paymentToken
      scheduleId
      scheduleName
      sessionTypeId
      sessionsLeft
      sessionsUsed
      startDate
      studentId
      timeAWeek
      typeOfPlan
      updatedAt
      userId
      wasDeleted
      wasPaid
      __typename
    }
    enrollmentId
    id
    privateEnrollment {
      amountPaid
      city
      coachId
      country
      courseId
      createdAt
      endDate
      id
      latitude
      longitude
      numberOfSessions
      paymentToken
      scheduleId
      scheduleName
      sessionTypeId
      startDate
      state
      streetAddress
      studentId
      timeAWeek
      typeOfPlan
      updatedAt
      userId
      wasDeleted
      wasPaid
      zipCode
      zoomLevel
      __typename
    }
    privateEnrollmentId
    quantity
    type
    updatedAt
    wasDeleted
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2ShoppingCartDetailQueryVariables,
  APITypes.GetV2ShoppingCartDetailQuery
>;
export const getV2Student = /* GraphQL */ `query GetV2Student($id: ID!) {
  getV2Student(id: $id) {
    anyIllnessInjuryMedicalCondition
    attendedDaycare
    birthdate
    bornPrematurely
    contactPhone
    country
    createdAt
    emailPhone
    emailSend {
      nextToken
      __typename
    }
    enrollments {
      nextToken
      __typename
    }
    evaluationDescription
    evaluationIcon
    evaluationLevelId
    firstSwimmingClass
    gender
    id
    immersesWithoutSwallowingWater
    isActive
    lastName
    middleName
    name
    placeOfResidence
    privateEnrollments {
      nextToken
      __typename
    }
    putYourFaceInTheWater
    relationships {
      nextToken
      __typename
    }
    sessionDetail {
      coachId
      courseId
      createdAt
      date
      day
      enrollmentId
      id
      locationId
      locationIdUsed
      modifiedBy
      modifiedByDate
      month
      privateEnrollmentId
      proratedValue
      scheduleId
      sessionNumber
      status
      studentId
      totalSessions
      updatedAt
      wasEmailSent
      year
      __typename
    }
    studentEvaluations {
      nextToken
      __typename
    }
    supportTickets {
      nextToken
      __typename
    }
    updatedAt
    waterOnHisFaceBothersHim
    whoIsTheContact
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2StudentQueryVariables,
  APITypes.GetV2StudentQuery
>;
export const getV2StudentEvaluations = /* GraphQL */ `query GetV2StudentEvaluations($id: ID!) {
  getV2StudentEvaluations(id: $id) {
    age
    createdAt
    date
    evaluationLevel {
      createdAt
      description
      endingAge
      ico
      id
      name
      order
      startingAge
      updatedAt
      __typename
    }
    evaluationLevelId
    id
    observations
    previousLevel
    sessionsCarriedOut
    student {
      anyIllnessInjuryMedicalCondition
      attendedDaycare
      birthdate
      bornPrematurely
      contactPhone
      country
      createdAt
      emailPhone
      evaluationDescription
      evaluationIcon
      evaluationLevelId
      firstSwimmingClass
      gender
      id
      immersesWithoutSwallowingWater
      isActive
      lastName
      middleName
      name
      placeOfResidence
      putYourFaceInTheWater
      updatedAt
      waterOnHisFaceBothersHim
      whoIsTheContact
      __typename
    }
    studentEvaluationsDetails {
      nextToken
      __typename
    }
    studentId
    updatedAt
    user {
      city
      contactPhone
      country
      createdAt
      email
      firstContact
      id
      ig
      isAcademyStudent
      isActive
      isEmployed
      latitude
      longitude
      name
      roleId
      salesCommission
      state
      streetAddress
      updatedAt
      validated
      zipCode
      zoomLevel
      __typename
    }
    userId
    wasApproved
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2StudentEvaluationsQueryVariables,
  APITypes.GetV2StudentEvaluationsQuery
>;
export const getV2StudentEvaluationsDetail = /* GraphQL */ `query GetV2StudentEvaluationsDetail($id: ID!) {
  getV2StudentEvaluationsDetail(id: $id) {
    createdAt
    evaluationObjective {
      createdAt
      evaluationLevelId
      id
      isActive
      isMandatory
      texto
      updatedAt
      __typename
    }
    evaluationObjectiveId
    id
    studentEvaluation {
      age
      createdAt
      date
      evaluationLevelId
      id
      observations
      previousLevel
      sessionsCarriedOut
      studentId
      updatedAt
      userId
      wasApproved
      __typename
    }
    studentEvaluationsId
    text
    updatedAt
    wasAchieved
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2StudentEvaluationsDetailQueryVariables,
  APITypes.GetV2StudentEvaluationsDetailQuery
>;
export const getV2Supplier = /* GraphQL */ `query GetV2Supplier($id: ID!) {
  getV2Supplier(id: $id) {
    address
    contactPerson
    createdAt
    email
    id
    isActive
    name
    phone
    products {
      nextToken
      __typename
    }
    taxId
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2SupplierQueryVariables,
  APITypes.GetV2SupplierQuery
>;
export const getV2SupportTicket = /* GraphQL */ `query GetV2SupportTicket($id: ID!) {
  getV2SupportTicket(id: $id) {
    createdAt
    date
    day
    description
    email
    id
    lastModificationUser
    month
    name
    phoneNumber
    reason
    statusTicket
    student {
      anyIllnessInjuryMedicalCondition
      attendedDaycare
      birthdate
      bornPrematurely
      contactPhone
      country
      createdAt
      emailPhone
      evaluationDescription
      evaluationIcon
      evaluationLevelId
      firstSwimmingClass
      gender
      id
      immersesWithoutSwallowingWater
      isActive
      lastName
      middleName
      name
      placeOfResidence
      putYourFaceInTheWater
      updatedAt
      waterOnHisFaceBothersHim
      whoIsTheContact
      __typename
    }
    studentId
    ticketComments {
      nextToken
      __typename
    }
    ticketUsers {
      nextToken
      __typename
    }
    updatedAt
    year
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2SupportTicketQueryVariables,
  APITypes.GetV2SupportTicketQuery
>;
export const getV2TicketComment = /* GraphQL */ `query GetV2TicketComment($id: ID!) {
  getV2TicketComment(id: $id) {
    comment {
      createdAt
      description
      id
      statusModificationIdUser
      statusModificationUser
      updatedAt
      __typename
    }
    commentId
    createdAt
    id
    ticket {
      createdAt
      date
      day
      description
      email
      id
      lastModificationUser
      month
      name
      phoneNumber
      reason
      statusTicket
      studentId
      updatedAt
      year
      __typename
    }
    ticketId
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2TicketCommentQueryVariables,
  APITypes.GetV2TicketCommentQuery
>;
export const getV2TicketUser = /* GraphQL */ `query GetV2TicketUser($id: ID!) {
  getV2TicketUser(id: $id) {
    createdAt
    id
    ticket {
      createdAt
      date
      day
      description
      email
      id
      lastModificationUser
      month
      name
      phoneNumber
      reason
      statusTicket
      studentId
      updatedAt
      year
      __typename
    }
    ticketId
    updatedAt
    user {
      city
      contactPhone
      country
      createdAt
      email
      firstContact
      id
      ig
      isAcademyStudent
      isActive
      isEmployed
      latitude
      longitude
      name
      roleId
      salesCommission
      state
      streetAddress
      updatedAt
      validated
      zipCode
      zoomLevel
      __typename
    }
    userId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2TicketUserQueryVariables,
  APITypes.GetV2TicketUserQuery
>;
export const getV2Transactions = /* GraphQL */ `query GetV2Transactions($id: ID!) {
  getV2Transactions(id: $id) {
    amount
    categoryID
    categoryType
    createdAt
    date
    description
    id
    month
    profitCenter {
      code
      createdAt
      description
      id
      isActive
      managerID
      name
      parentProfitCenterID
      updatedAt
      __typename
    }
    profitCenterID
    updatedAt
    year
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2TransactionsQueryVariables,
  APITypes.GetV2TransactionsQuery
>;
export const getV2UserPermissions = /* GraphQL */ `query GetV2UserPermissions($id: ID!) {
  getV2UserPermissions(id: $id) {
    createdAt
    id
    permission {
      createdAt
      displayName
      icon
      id
      isLeaf
      isVisible
      name
      order
      padreId
      updatedAt
      __typename
    }
    permissionId
    updatedAt
    user {
      city
      contactPhone
      country
      createdAt
      email
      firstContact
      id
      ig
      isAcademyStudent
      isActive
      isEmployed
      latitude
      longitude
      name
      roleId
      salesCommission
      state
      streetAddress
      updatedAt
      validated
      zipCode
      zoomLevel
      __typename
    }
    userId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2UserPermissionsQueryVariables,
  APITypes.GetV2UserPermissionsQuery
>;
export const getV2Users = /* GraphQL */ `query GetV2Users($id: ID!) {
  getV2Users(id: $id) {
    city
    coachedPrivateEnrollments {
      nextToken
      __typename
    }
    coachedSessions {
      nextToken
      __typename
    }
    contactPhone
    country
    createdAt
    email
    emailSend {
      nextToken
      __typename
    }
    enrollments {
      nextToken
      __typename
    }
    firstContact
    gmailMessages {
      nextToken
      __typename
    }
    id
    ig
    isAcademyStudent
    isActive
    isEmployed
    latitude
    longitude
    name
    paymentTransactions {
      nextToken
      __typename
    }
    privateEnrollments {
      nextToken
      __typename
    }
    relationships {
      nextToken
      __typename
    }
    role {
      createdAt
      displayName
      icon
      id
      name
      updatedAt
      __typename
    }
    roleId
    salesCommission
    sellersCommissions {
      nextToken
      __typename
    }
    shoppingCart {
      nextToken
      __typename
    }
    shoppingCartDetails {
      nextToken
      __typename
    }
    shoppingCartSeller {
      nextToken
      __typename
    }
    state
    streetAddress
    studentEvaluations {
      nextToken
      __typename
    }
    ticketUsers {
      nextToken
      __typename
    }
    updatedAt
    userPermissions {
      nextToken
      __typename
    }
    validated
    workdayReports {
      nextToken
      __typename
    }
    zipCode
    zoomLevel
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2UsersQueryVariables,
  APITypes.GetV2UsersQuery
>;
export const getV2WorkdayReports = /* GraphQL */ `query GetV2WorkdayReports($id: ID!) {
  getV2WorkdayReports(id: $id) {
    createdAt
    customersSatisfaction
    date
    day
    endTime
    endingTemperature
    id
    month
    notes
    startTime
    startingTemperature
    status
    totalHoursWorked
    totalIssues
    totalSales
    updatedAt
    user {
      city
      contactPhone
      country
      createdAt
      email
      firstContact
      id
      ig
      isAcademyStudent
      isActive
      isEmployed
      latitude
      longitude
      name
      roleId
      salesCommission
      state
      streetAddress
      updatedAt
      validated
      zipCode
      zoomLevel
      __typename
    }
    userId
    year
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetV2WorkdayReportsQueryVariables,
  APITypes.GetV2WorkdayReportsQuery
>;
export const listV2AcademyCourses = /* GraphQL */ `query ListV2AcademyCourses(
  $filter: ModelV2AcademyCoursesFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2AcademyCourses(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      address
      createdAt
      description
      id
      isActive
      mapurl
      name
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2AcademyCoursesQueryVariables,
  APITypes.ListV2AcademyCoursesQuery
>;
export const listV2AcademyEnrollments = /* GraphQL */ `query ListV2AcademyEnrollments(
  $filter: ModelV2AcademyEnrollmentFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2AcademyEnrollments(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      amountPaid
      courseId
      createdAt
      date
      id
      shoppingCartDetailId
      studentsId
      updatedAt
      user
      wasDeleted
      wasPaid
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2AcademyEnrollmentsQueryVariables,
  APITypes.ListV2AcademyEnrollmentsQuery
>;
export const listV2AcademyStudents = /* GraphQL */ `query ListV2AcademyStudents(
  $filter: ModelV2AcademyStudentsFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2AcademyStudents(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      address
      birthdate
      companyAgreement
      country
      createdAt
      email
      emergencyContact
      hasAgreement
      id
      isPaid
      isSponsored
      medicalHistory
      name
      phone
      presence
      profession
      status
      studiesRelated
      updatedAt
      urlImage
      years
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2AcademyStudentsQueryVariables,
  APITypes.ListV2AcademyStudentsQuery
>;
export const listV2Certificates = /* GraphQL */ `query ListV2Certificates(
  $filter: ModelV2CertificatesFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2Certificates(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      academyCoursesId
      academyStudentsId
      createdAt
      date
      descriptionOne
      id
      instructorName
      instructorSignature
      isOfficialCertification
      location
      practicalHours
      studentName
      theoreticalHours
      title
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2CertificatesQueryVariables,
  APITypes.ListV2CertificatesQuery
>;
export const listV2CoachScheduleByCoachIdAndDate = /* GraphQL */ `query ListV2CoachScheduleByCoachIdAndDate(
  $coachId: ID!
  $date: ModelStringKeyConditionInput
  $filter: Modelv2CoachScheduleFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listV2CoachScheduleByCoachIdAndDate(
    coachId: $coachId
    date: $date
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      coachId
      createdAt
      date
      endTime
      id
      isAvailable
      isBooked
      locationId
      notes
      scheduleId
      startTime
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2CoachScheduleByCoachIdAndDateQueryVariables,
  APITypes.ListV2CoachScheduleByCoachIdAndDateQuery
>;
export const listV2CoachScheduleByDateAndCoachId = /* GraphQL */ `query ListV2CoachScheduleByDateAndCoachId(
  $coachId: ModelIDKeyConditionInput
  $date: AWSDate!
  $filter: Modelv2CoachScheduleFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listV2CoachScheduleByDateAndCoachId(
    coachId: $coachId
    date: $date
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      coachId
      createdAt
      date
      endTime
      id
      isAvailable
      isBooked
      locationId
      notes
      scheduleId
      startTime
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2CoachScheduleByDateAndCoachIdQueryVariables,
  APITypes.ListV2CoachScheduleByDateAndCoachIdQuery
>;
export const listV2CoachScheduleByLocationIdAndDate = /* GraphQL */ `query ListV2CoachScheduleByLocationIdAndDate(
  $date: ModelStringKeyConditionInput
  $filter: Modelv2CoachScheduleFilterInput
  $limit: Int
  $locationId: ID!
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listV2CoachScheduleByLocationIdAndDate(
    date: $date
    filter: $filter
    limit: $limit
    locationId: $locationId
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      coachId
      createdAt
      date
      endTime
      id
      isAvailable
      isBooked
      locationId
      notes
      scheduleId
      startTime
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2CoachScheduleByLocationIdAndDateQueryVariables,
  APITypes.ListV2CoachScheduleByLocationIdAndDateQuery
>;
export const listV2CoachScheduleByScheduleIdAndDate = /* GraphQL */ `query ListV2CoachScheduleByScheduleIdAndDate(
  $date: ModelStringKeyConditionInput
  $filter: Modelv2CoachScheduleFilterInput
  $limit: Int
  $nextToken: String
  $scheduleId: ID!
  $sortDirection: ModelSortDirection
) {
  listV2CoachScheduleByScheduleIdAndDate(
    date: $date
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    scheduleId: $scheduleId
    sortDirection: $sortDirection
  ) {
    items {
      coachId
      createdAt
      date
      endTime
      id
      isAvailable
      isBooked
      locationId
      notes
      scheduleId
      startTime
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2CoachScheduleByScheduleIdAndDateQueryVariables,
  APITypes.ListV2CoachScheduleByScheduleIdAndDateQuery
>;
export const listV2CoachSchedules = /* GraphQL */ `query ListV2CoachSchedules(
  $filter: ModelV2CoachScheduleFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2CoachSchedules(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      coachId
      createdAt
      date
      endTime
      id
      isAvailable
      isBooked
      locationId
      notes
      scheduleId
      startTime
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2CoachSchedulesQueryVariables,
  APITypes.ListV2CoachSchedulesQuery
>;
export const listV2Coaches = /* GraphQL */ `query ListV2Coaches(
  $filter: ModelV2CoachFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2Coaches(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      email
      id
      isActive
      isCertificated
      lastName
      name
      phone
      updatedAt
      whatsapp
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2CoachesQueryVariables,
  APITypes.ListV2CoachesQuery
>;
export const listV2CommentTickets = /* GraphQL */ `query ListV2CommentTickets(
  $filter: ModelV2CommentTicketsFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2CommentTickets(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      description
      id
      statusModificationIdUser
      statusModificationUser
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2CommentTicketsQueryVariables,
  APITypes.ListV2CommentTicketsQuery
>;
export const listV2Correlatives = /* GraphQL */ `query ListV2Correlatives(
  $filter: ModelV2CorrelativesFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2Correlatives(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      correlative
      createdAt
      id
      type
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2CorrelativesQueryVariables,
  APITypes.ListV2CorrelativesQuery
>;
export const listV2CorrelativesByType = /* GraphQL */ `query ListV2CorrelativesByType(
  $filter: Modelv2CorrelativesFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
  $type: v2ParametersType!
) {
  listV2CorrelativesByType(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
    type: $type
  ) {
    items {
      correlative
      createdAt
      id
      type
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2CorrelativesByTypeQueryVariables,
  APITypes.ListV2CorrelativesByTypeQuery
>;
export const listV2CourseSessionTypes = /* GraphQL */ `query ListV2CourseSessionTypes(
  $filter: ModelV2CourseSessionTypeFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2CourseSessionTypes(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      courseId
      createdAt
      id
      sessionTypeId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2CourseSessionTypesQueryVariables,
  APITypes.ListV2CourseSessionTypesQuery
>;
export const listV2Courses = /* GraphQL */ `query ListV2Courses(
  $filter: ModelV2CourseFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2Courses(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      ageGroupType
      ageType
      createdAt
      description
      duration
      endingAge
      id
      isActive
      locationId
      startingAge
      title
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2CoursesQueryVariables,
  APITypes.ListV2CoursesQuery
>;
export const listV2EmailSendByEnrollmentId = /* GraphQL */ `query ListV2EmailSendByEnrollmentId(
  $enrollmentId: ID!
  $filter: Modelv2EmailSendFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listV2EmailSendByEnrollmentId(
    enrollmentId: $enrollmentId
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      contentEmail
      contentMessage
      createdAt
      date
      email
      emailState
      enrollmentId
      id
      phone
      phoneState
      privateEnrollmentId
      studentId
      type
      typeSend
      updatedAt
      userSendId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2EmailSendByEnrollmentIdQueryVariables,
  APITypes.ListV2EmailSendByEnrollmentIdQuery
>;
export const listV2EmailSendByStudentId = /* GraphQL */ `query ListV2EmailSendByStudentId(
  $filter: Modelv2EmailSendFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
  $studentId: ID!
) {
  listV2EmailSendByStudentId(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
    studentId: $studentId
  ) {
    items {
      contentEmail
      contentMessage
      createdAt
      date
      email
      emailState
      enrollmentId
      id
      phone
      phoneState
      privateEnrollmentId
      studentId
      type
      typeSend
      updatedAt
      userSendId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2EmailSendByStudentIdQueryVariables,
  APITypes.ListV2EmailSendByStudentIdQuery
>;
export const listV2EmailSendByUserSendId = /* GraphQL */ `query ListV2EmailSendByUserSendId(
  $filter: Modelv2EmailSendFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
  $userSendId: ID!
) {
  listV2EmailSendByUserSendId(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
    userSendId: $userSendId
  ) {
    items {
      contentEmail
      contentMessage
      createdAt
      date
      email
      emailState
      enrollmentId
      id
      phone
      phoneState
      privateEnrollmentId
      studentId
      type
      typeSend
      updatedAt
      userSendId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2EmailSendByUserSendIdQueryVariables,
  APITypes.ListV2EmailSendByUserSendIdQuery
>;
export const listV2EmailSends = /* GraphQL */ `query ListV2EmailSends(
  $filter: ModelV2EmailSendFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2EmailSends(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      contentEmail
      contentMessage
      createdAt
      date
      email
      emailState
      enrollmentId
      id
      phone
      phoneState
      privateEnrollmentId
      studentId
      type
      typeSend
      updatedAt
      userSendId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2EmailSendsQueryVariables,
  APITypes.ListV2EmailSendsQuery
>;
export const listV2Enrollments = /* GraphQL */ `query ListV2Enrollments(
  $filter: ModelV2EnrollmentFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2Enrollments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      amountPaid
      courseId
      createdAt
      endDate
      id
      numberOfSessions
      paymentToken
      scheduleId
      scheduleName
      sessionTypeId
      sessionsLeft
      sessionsUsed
      startDate
      studentId
      timeAWeek
      typeOfPlan
      updatedAt
      userId
      wasDeleted
      wasPaid
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2EnrollmentsQueryVariables,
  APITypes.ListV2EnrollmentsQuery
>;
export const listV2EvaluationLevels = /* GraphQL */ `query ListV2EvaluationLevels(
  $filter: ModelV2EvaluationLevelFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2EvaluationLevels(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      createdAt
      description
      endingAge
      ico
      id
      name
      order
      startingAge
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2EvaluationLevelsQueryVariables,
  APITypes.ListV2EvaluationLevelsQuery
>;
export const listV2EvaluationObjetives = /* GraphQL */ `query ListV2EvaluationObjetives(
  $filter: ModelV2EvaluationObjetivesFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2EvaluationObjetives(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      createdAt
      evaluationLevelId
      id
      isActive
      isMandatory
      texto
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2EvaluationObjetivesQueryVariables,
  APITypes.ListV2EvaluationObjetivesQuery
>;
export const listV2Expenses = /* GraphQL */ `query ListV2Expenses(
  $filter: ModelV2ExpenseFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2Expenses(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      amount
      costCenterType
      createdAt
      date
      day
      description
      expenseType
      id
      locationId
      month
      updatedAt
      year
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2ExpensesQueryVariables,
  APITypes.ListV2ExpensesQuery
>;
export const listV2GmailInboxByDateStr = /* GraphQL */ `query ListV2GmailInboxByDateStr(
  $dateStr: String!
  $filter: Modelv2GmailInboxFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listV2GmailInboxByDateStr(
    dateStr: $dateStr
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      attachments
      bodyHtml
      bodyText
      createdAt
      dateSent
      dateStr
      fromEmail
      fromName
      gmailAccount
      hasAttachments
      id
      isRead
      labels
      messageId
      snippet
      subject
      threadId
      toEmails
      updatedAt
      userId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2GmailInboxByDateStrQueryVariables,
  APITypes.ListV2GmailInboxByDateStrQuery
>;
export const listV2GmailInboxByFromEmailAndDateSent = /* GraphQL */ `query ListV2GmailInboxByFromEmailAndDateSent(
  $dateSent: ModelStringKeyConditionInput
  $filter: Modelv2GmailInboxFilterInput
  $fromEmail: String!
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listV2GmailInboxByFromEmailAndDateSent(
    dateSent: $dateSent
    filter: $filter
    fromEmail: $fromEmail
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      attachments
      bodyHtml
      bodyText
      createdAt
      dateSent
      dateStr
      fromEmail
      fromName
      gmailAccount
      hasAttachments
      id
      isRead
      labels
      messageId
      snippet
      subject
      threadId
      toEmails
      updatedAt
      userId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2GmailInboxByFromEmailAndDateSentQueryVariables,
  APITypes.ListV2GmailInboxByFromEmailAndDateSentQuery
>;
export const listV2GmailInboxByGmailAccountAndDateSent = /* GraphQL */ `query ListV2GmailInboxByGmailAccountAndDateSent(
  $dateSent: ModelStringKeyConditionInput
  $filter: Modelv2GmailInboxFilterInput
  $gmailAccount: String!
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listV2GmailInboxByGmailAccountAndDateSent(
    dateSent: $dateSent
    filter: $filter
    gmailAccount: $gmailAccount
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      attachments
      bodyHtml
      bodyText
      createdAt
      dateSent
      dateStr
      fromEmail
      fromName
      gmailAccount
      hasAttachments
      id
      isRead
      labels
      messageId
      snippet
      subject
      threadId
      toEmails
      updatedAt
      userId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2GmailInboxByGmailAccountAndDateSentQueryVariables,
  APITypes.ListV2GmailInboxByGmailAccountAndDateSentQuery
>;
export const listV2GmailInboxByMessageId = /* GraphQL */ `query ListV2GmailInboxByMessageId(
  $filter: Modelv2GmailInboxFilterInput
  $limit: Int
  $messageId: String!
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listV2GmailInboxByMessageId(
    filter: $filter
    limit: $limit
    messageId: $messageId
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      attachments
      bodyHtml
      bodyText
      createdAt
      dateSent
      dateStr
      fromEmail
      fromName
      gmailAccount
      hasAttachments
      id
      isRead
      labels
      messageId
      snippet
      subject
      threadId
      toEmails
      updatedAt
      userId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2GmailInboxByMessageIdQueryVariables,
  APITypes.ListV2GmailInboxByMessageIdQuery
>;
export const listV2GmailInboxByUserIdAndDateSent = /* GraphQL */ `query ListV2GmailInboxByUserIdAndDateSent(
  $dateSent: ModelStringKeyConditionInput
  $filter: Modelv2GmailInboxFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
  $userId: ID!
) {
  listV2GmailInboxByUserIdAndDateSent(
    dateSent: $dateSent
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
    userId: $userId
  ) {
    items {
      attachments
      bodyHtml
      bodyText
      createdAt
      dateSent
      dateStr
      fromEmail
      fromName
      gmailAccount
      hasAttachments
      id
      isRead
      labels
      messageId
      snippet
      subject
      threadId
      toEmails
      updatedAt
      userId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2GmailInboxByUserIdAndDateSentQueryVariables,
  APITypes.ListV2GmailInboxByUserIdAndDateSentQuery
>;
export const listV2GmailInboxes = /* GraphQL */ `query ListV2GmailInboxes(
  $filter: ModelV2GmailInboxFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2GmailInboxes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      attachments
      bodyHtml
      bodyText
      createdAt
      dateSent
      dateStr
      fromEmail
      fromName
      gmailAccount
      hasAttachments
      id
      isRead
      labels
      messageId
      snippet
      subject
      threadId
      toEmails
      updatedAt
      userId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2GmailInboxesQueryVariables,
  APITypes.ListV2GmailInboxesQuery
>;
export const listV2LocationByCountry = /* GraphQL */ `query ListV2LocationByCountry(
  $country: String!
  $filter: Modelv2LocationFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listV2LocationByCountry(
    country: $country
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      address
      city
      country
      createdAt
      directions
      group
      id
      imageMap
      isActive
      isVisible
      maximumTemperature
      minimumTemperature
      name
      phone
      region
      updatedAt
      urlMap
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2LocationByCountryQueryVariables,
  APITypes.ListV2LocationByCountryQuery
>;
export const listV2Locations = /* GraphQL */ `query ListV2Locations(
  $filter: ModelV2LocationFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2Locations(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      address
      city
      country
      createdAt
      directions
      group
      id
      imageMap
      isActive
      isVisible
      maximumTemperature
      minimumTemperature
      name
      phone
      region
      updatedAt
      urlMap
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2LocationsQueryVariables,
  APITypes.ListV2LocationsQuery
>;
export const listV2Managers = /* GraphQL */ `query ListV2Managers(
  $filter: ModelV2ManagersFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2Managers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      email
      firstName
      id
      isActive
      lastName
      profitCenterID
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2ManagersQueryVariables,
  APITypes.ListV2ManagersQuery
>;
export const listV2ManagersByEmail = /* GraphQL */ `query ListV2ManagersByEmail(
  $email: String!
  $filter: Modelv2ManagersFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listV2ManagersByEmail(
    email: $email
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      email
      firstName
      id
      isActive
      lastName
      profitCenterID
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2ManagersByEmailQueryVariables,
  APITypes.ListV2ManagersByEmailQuery
>;
export const listV2Metadata = /* GraphQL */ `query ListV2Metadata(
  $filter: ModelV2MetadataFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2Metadata(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      id
      key
      parametersId
      updatedAt
      value
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2MetadataQueryVariables,
  APITypes.ListV2MetadataQuery
>;
export const listV2Parameters = /* GraphQL */ `query ListV2Parameters(
  $filter: ModelV2ParametersFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2Parameters(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      country
      createdAt
      id
      idParent
      label
      typeOfParameterId
      updatedAt
      value
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2ParametersQueryVariables,
  APITypes.ListV2ParametersQuery
>;
export const listV2ParametersByCountryAndLabel = /* GraphQL */ `query ListV2ParametersByCountryAndLabel(
  $country: String!
  $filter: Modelv2ParametersFilterInput
  $label: ModelStringKeyConditionInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listV2ParametersByCountryAndLabel(
    country: $country
    filter: $filter
    label: $label
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      country
      createdAt
      id
      idParent
      label
      typeOfParameterId
      updatedAt
      value
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2ParametersByCountryAndLabelQueryVariables,
  APITypes.ListV2ParametersByCountryAndLabelQuery
>;
export const listV2ParametersEncs = /* GraphQL */ `query ListV2ParametersEncs(
  $filter: ModelV2ParametersEncFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2ParametersEncs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      description
      id
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2ParametersEncsQueryVariables,
  APITypes.ListV2ParametersEncsQuery
>;
export const listV2PaymentTransactions = /* GraphQL */ `query ListV2PaymentTransactions(
  $filter: ModelV2PaymentTransactionsFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2PaymentTransactions(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      accounting_date
      amount
      authorization_code
      buy_order
      card_detail
      card_number
      createdAt
      day
      glosa
      hasRefund
      hour
      id
      installments_amount
      installments_number
      month
      payment_type_code
      response_code
      session_id
      shoppingCartId
      status
      token
      transaction_date
      updatedAt
      urlWebpay
      usersId
      vci
      year
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2PaymentTransactionsQueryVariables,
  APITypes.ListV2PaymentTransactionsQuery
>;
export const listV2PaymentTransactionsByDayAndMonthAndYearAndHour = /* GraphQL */ `query ListV2PaymentTransactionsByDayAndMonthAndYearAndHour(
  $day: String!
  $filter: Modelv2PaymentTransactionsFilterInput
  $limit: Int
  $monthYearHour: Modelv2PaymentTransactionsSearchByDiaMesAnoHourCompositeKeyConditionInput
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listV2PaymentTransactionsByDayAndMonthAndYearAndHour(
    day: $day
    filter: $filter
    limit: $limit
    monthYearHour: $monthYearHour
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      accounting_date
      amount
      authorization_code
      buy_order
      card_detail
      card_number
      createdAt
      day
      glosa
      hasRefund
      hour
      id
      installments_amount
      installments_number
      month
      payment_type_code
      response_code
      session_id
      shoppingCartId
      status
      token
      transaction_date
      updatedAt
      urlWebpay
      usersId
      vci
      year
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2PaymentTransactionsByDayAndMonthAndYearAndHourQueryVariables,
  APITypes.ListV2PaymentTransactionsByDayAndMonthAndYearAndHourQuery
>;
export const listV2PaymentTransactionsByToken = /* GraphQL */ `query ListV2PaymentTransactionsByToken(
  $filter: Modelv2PaymentTransactionsFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
  $token: String!
) {
  listV2PaymentTransactionsByToken(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
    token: $token
  ) {
    items {
      accounting_date
      amount
      authorization_code
      buy_order
      card_detail
      card_number
      createdAt
      day
      glosa
      hasRefund
      hour
      id
      installments_amount
      installments_number
      month
      payment_type_code
      response_code
      session_id
      shoppingCartId
      status
      token
      transaction_date
      updatedAt
      urlWebpay
      usersId
      vci
      year
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2PaymentTransactionsByTokenQueryVariables,
  APITypes.ListV2PaymentTransactionsByTokenQuery
>;
export const listV2Permissions = /* GraphQL */ `query ListV2Permissions(
  $filter: ModelV2PermissionsFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2Permissions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      displayName
      icon
      id
      isLeaf
      isVisible
      name
      order
      padreId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2PermissionsQueryVariables,
  APITypes.ListV2PermissionsQuery
>;
export const listV2PrivateEnrollments = /* GraphQL */ `query ListV2PrivateEnrollments(
  $filter: ModelV2PrivateEnrollmentFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2PrivateEnrollments(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      amountPaid
      city
      coachId
      country
      courseId
      createdAt
      endDate
      id
      latitude
      longitude
      numberOfSessions
      paymentToken
      scheduleId
      scheduleName
      sessionTypeId
      startDate
      state
      streetAddress
      studentId
      timeAWeek
      typeOfPlan
      updatedAt
      userId
      wasDeleted
      wasPaid
      zipCode
      zoomLevel
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2PrivateEnrollmentsQueryVariables,
  APITypes.ListV2PrivateEnrollmentsQuery
>;
export const listV2ProductBySku = /* GraphQL */ `query ListV2ProductBySku(
  $filter: Modelv2ProductFilterInput
  $limit: Int
  $nextToken: String
  $sku: String!
  $sortDirection: ModelSortDirection
) {
  listV2ProductBySku(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sku: $sku
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      criticalStock
      currentStock
      id
      isActive
      name
      profits
      purchasePrice
      sellingPrice
      sku
      supplierId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2ProductBySkuQueryVariables,
  APITypes.ListV2ProductBySkuQuery
>;
export const listV2Products = /* GraphQL */ `query ListV2Products(
  $filter: ModelV2ProductFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2Products(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      criticalStock
      currentStock
      id
      isActive
      name
      profits
      purchasePrice
      sellingPrice
      sku
      supplierId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2ProductsQueryVariables,
  APITypes.ListV2ProductsQuery
>;
export const listV2ProfitCenterByCode = /* GraphQL */ `query ListV2ProfitCenterByCode(
  $code: String!
  $filter: Modelv2ProfitCenterFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listV2ProfitCenterByCode(
    code: $code
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      code
      createdAt
      description
      id
      isActive
      managerID
      name
      parentProfitCenterID
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2ProfitCenterByCodeQueryVariables,
  APITypes.ListV2ProfitCenterByCodeQuery
>;
export const listV2ProfitCenters = /* GraphQL */ `query ListV2ProfitCenters(
  $filter: ModelV2ProfitCenterFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2ProfitCenters(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      code
      createdAt
      description
      id
      isActive
      managerID
      name
      parentProfitCenterID
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2ProfitCentersQueryVariables,
  APITypes.ListV2ProfitCentersQuery
>;
export const listV2Relationships = /* GraphQL */ `query ListV2Relationships(
  $filter: ModelV2RelationshipFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2Relationships(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      id
      relationType
      studentId
      updatedAt
      userId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2RelationshipsQueryVariables,
  APITypes.ListV2RelationshipsQuery
>;
export const listV2RolPermissions = /* GraphQL */ `query ListV2RolPermissions(
  $filter: ModelV2RolPermissionsFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2RolPermissions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      id
      permissionId
      roleId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2RolPermissionsQueryVariables,
  APITypes.ListV2RolPermissionsQuery
>;
export const listV2Roles = /* GraphQL */ `query ListV2Roles(
  $filter: ModelV2RolesFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2Roles(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      displayName
      icon
      id
      name
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2RolesQueryVariables,
  APITypes.ListV2RolesQuery
>;
export const listV2Schedules = /* GraphQL */ `query ListV2Schedules(
  $filter: ModelV2ScheduleFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2Schedules(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      courseSchedulesId
      createdAt
      day
      endHour
      id
      isActive
      locationSchedulesId
      maximumQuotas
      minimumQuotas
      startHour
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2SchedulesQueryVariables,
  APITypes.ListV2SchedulesQuery
>;
export const listV2SellersCommissions = /* GraphQL */ `query ListV2SellersCommissions(
  $filter: ModelV2SellersCommissionFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2SellersCommissions(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      amount
      createdAt
      description
      id
      paymentAmount
      salesCommission
      status
      type
      updatedAt
      usersId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2SellersCommissionsQueryVariables,
  APITypes.ListV2SellersCommissionsQuery
>;
export const listV2SentEmails = /* GraphQL */ `query ListV2SentEmails(
  $filter: ModelV2SentEmailFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2SentEmails(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      body
      createdAt
      emailState
      id
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2SentEmailsQueryVariables,
  APITypes.ListV2SentEmailsQuery
>;
export const listV2SessionDetailByDateAndStudentId = /* GraphQL */ `query ListV2SessionDetailByDateAndStudentId(
  $date: AWSDateTime!
  $filter: Modelv2SessionDetailFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
  $studentId: ModelIDKeyConditionInput
) {
  listV2SessionDetailByDateAndStudentId(
    date: $date
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
    studentId: $studentId
  ) {
    items {
      coachId
      courseId
      createdAt
      date
      day
      enrollmentId
      id
      locationId
      locationIdUsed
      modifiedBy
      modifiedByDate
      month
      privateEnrollmentId
      proratedValue
      scheduleId
      sessionNumber
      status
      studentId
      totalSessions
      updatedAt
      wasEmailSent
      year
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2SessionDetailByDateAndStudentIdQueryVariables,
  APITypes.ListV2SessionDetailByDateAndStudentIdQuery
>;
export const listV2SessionDetailByLocationIdAndDate = /* GraphQL */ `query ListV2SessionDetailByLocationIdAndDate(
  $date: ModelStringKeyConditionInput
  $filter: Modelv2SessionDetailFilterInput
  $limit: Int
  $locationId: String!
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listV2SessionDetailByLocationIdAndDate(
    date: $date
    filter: $filter
    limit: $limit
    locationId: $locationId
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      coachId
      courseId
      createdAt
      date
      day
      enrollmentId
      id
      locationId
      locationIdUsed
      modifiedBy
      modifiedByDate
      month
      privateEnrollmentId
      proratedValue
      scheduleId
      sessionNumber
      status
      studentId
      totalSessions
      updatedAt
      wasEmailSent
      year
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2SessionDetailByLocationIdAndDateQueryVariables,
  APITypes.ListV2SessionDetailByLocationIdAndDateQuery
>;
export const listV2SessionDetailByStudentId = /* GraphQL */ `query ListV2SessionDetailByStudentId(
  $filter: Modelv2SessionDetailFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
  $studentId: ID!
) {
  listV2SessionDetailByStudentId(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
    studentId: $studentId
  ) {
    items {
      coachId
      courseId
      createdAt
      date
      day
      enrollmentId
      id
      locationId
      locationIdUsed
      modifiedBy
      modifiedByDate
      month
      privateEnrollmentId
      proratedValue
      scheduleId
      sessionNumber
      status
      studentId
      totalSessions
      updatedAt
      wasEmailSent
      year
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2SessionDetailByStudentIdQueryVariables,
  APITypes.ListV2SessionDetailByStudentIdQuery
>;
export const listV2SessionDetails = /* GraphQL */ `query ListV2SessionDetails(
  $filter: ModelV2SessionDetailFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2SessionDetails(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      coachId
      courseId
      createdAt
      date
      day
      enrollmentId
      id
      locationId
      locationIdUsed
      modifiedBy
      modifiedByDate
      month
      privateEnrollmentId
      proratedValue
      scheduleId
      sessionNumber
      status
      studentId
      totalSessions
      updatedAt
      wasEmailSent
      year
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2SessionDetailsQueryVariables,
  APITypes.ListV2SessionDetailsQuery
>;
export const listV2SessionTypes = /* GraphQL */ `query ListV2SessionTypes(
  $filter: ModelV2SessionTypeFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2SessionTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      amount
      createdAt
      description
      durationSession
      id
      isActive
      isTestClass
      name
      packValidity
      timeAWeek
      totalSessions
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2SessionTypesQueryVariables,
  APITypes.ListV2SessionTypesQuery
>;
export const listV2ShoppingCartDetailByCartId = /* GraphQL */ `query ListV2ShoppingCartDetailByCartId(
  $cartId: ID!
  $filter: Modelv2ShoppingCartDetailFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listV2ShoppingCartDetailByCartId(
    cartId: $cartId
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      academyEnrollmentId
      amount
      cartId
      createdAt
      createdById
      detail
      enrollmentId
      id
      privateEnrollmentId
      quantity
      type
      updatedAt
      wasDeleted
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2ShoppingCartDetailByCartIdQueryVariables,
  APITypes.ListV2ShoppingCartDetailByCartIdQuery
>;
export const listV2ShoppingCartDetails = /* GraphQL */ `query ListV2ShoppingCartDetails(
  $filter: ModelV2ShoppingCartDetailFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2ShoppingCartDetails(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      academyEnrollmentId
      amount
      cartId
      createdAt
      createdById
      detail
      enrollmentId
      id
      privateEnrollmentId
      quantity
      type
      updatedAt
      wasDeleted
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2ShoppingCartDetailsQueryVariables,
  APITypes.ListV2ShoppingCartDetailsQuery
>;
export const listV2ShoppingCarts = /* GraphQL */ `query ListV2ShoppingCarts(
  $filter: ModelV2ShoppingCartFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2ShoppingCarts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      id
      sellerId
      sellersCommissionId
      status
      totalPrice
      updatedAt
      userId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2ShoppingCartsQueryVariables,
  APITypes.ListV2ShoppingCartsQuery
>;
export const listV2StudentByCountry = /* GraphQL */ `query ListV2StudentByCountry(
  $country: String!
  $filter: Modelv2StudentFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listV2StudentByCountry(
    country: $country
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      anyIllnessInjuryMedicalCondition
      attendedDaycare
      birthdate
      bornPrematurely
      contactPhone
      country
      createdAt
      emailPhone
      evaluationDescription
      evaluationIcon
      evaluationLevelId
      firstSwimmingClass
      gender
      id
      immersesWithoutSwallowingWater
      isActive
      lastName
      middleName
      name
      placeOfResidence
      putYourFaceInTheWater
      updatedAt
      waterOnHisFaceBothersHim
      whoIsTheContact
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2StudentByCountryQueryVariables,
  APITypes.ListV2StudentByCountryQuery
>;
export const listV2StudentEvaluations = /* GraphQL */ `query ListV2StudentEvaluations(
  $filter: ModelV2StudentEvaluationsFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2StudentEvaluations(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      age
      createdAt
      date
      evaluationLevelId
      id
      observations
      previousLevel
      sessionsCarriedOut
      studentId
      updatedAt
      userId
      wasApproved
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2StudentEvaluationsQueryVariables,
  APITypes.ListV2StudentEvaluationsQuery
>;
export const listV2StudentEvaluationsDetails = /* GraphQL */ `query ListV2StudentEvaluationsDetails(
  $filter: ModelV2StudentEvaluationsDetailFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2StudentEvaluationsDetails(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      createdAt
      evaluationObjectiveId
      id
      studentEvaluationsId
      text
      updatedAt
      wasAchieved
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2StudentEvaluationsDetailsQueryVariables,
  APITypes.ListV2StudentEvaluationsDetailsQuery
>;
export const listV2Students = /* GraphQL */ `query ListV2Students(
  $filter: ModelV2StudentFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2Students(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      anyIllnessInjuryMedicalCondition
      attendedDaycare
      birthdate
      bornPrematurely
      contactPhone
      country
      createdAt
      emailPhone
      evaluationDescription
      evaluationIcon
      evaluationLevelId
      firstSwimmingClass
      gender
      id
      immersesWithoutSwallowingWater
      isActive
      lastName
      middleName
      name
      placeOfResidence
      putYourFaceInTheWater
      updatedAt
      waterOnHisFaceBothersHim
      whoIsTheContact
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2StudentsQueryVariables,
  APITypes.ListV2StudentsQuery
>;
export const listV2Suppliers = /* GraphQL */ `query ListV2Suppliers(
  $filter: ModelV2SupplierFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2Suppliers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      address
      contactPerson
      createdAt
      email
      id
      isActive
      name
      phone
      taxId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2SuppliersQueryVariables,
  APITypes.ListV2SuppliersQuery
>;
export const listV2SupportTicketByDate = /* GraphQL */ `query ListV2SupportTicketByDate(
  $date: AWSDateTime!
  $filter: Modelv2SupportTicketFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listV2SupportTicketByDate(
    date: $date
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      date
      day
      description
      email
      id
      lastModificationUser
      month
      name
      phoneNumber
      reason
      statusTicket
      studentId
      updatedAt
      year
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2SupportTicketByDateQueryVariables,
  APITypes.ListV2SupportTicketByDateQuery
>;
export const listV2SupportTickets = /* GraphQL */ `query ListV2SupportTickets(
  $filter: ModelV2SupportTicketFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2SupportTickets(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      date
      day
      description
      email
      id
      lastModificationUser
      month
      name
      phoneNumber
      reason
      statusTicket
      studentId
      updatedAt
      year
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2SupportTicketsQueryVariables,
  APITypes.ListV2SupportTicketsQuery
>;
export const listV2TicketComments = /* GraphQL */ `query ListV2TicketComments(
  $filter: ModelV2TicketCommentFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2TicketComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      commentId
      createdAt
      id
      ticketId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2TicketCommentsQueryVariables,
  APITypes.ListV2TicketCommentsQuery
>;
export const listV2TicketUsers = /* GraphQL */ `query ListV2TicketUsers(
  $filter: ModelV2TicketUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2TicketUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      id
      ticketId
      updatedAt
      userId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2TicketUsersQueryVariables,
  APITypes.ListV2TicketUsersQuery
>;
export const listV2Transactions = /* GraphQL */ `query ListV2Transactions(
  $filter: ModelV2TransactionsFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2Transactions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      amount
      categoryID
      categoryType
      createdAt
      date
      description
      id
      month
      profitCenterID
      updatedAt
      year
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2TransactionsQueryVariables,
  APITypes.ListV2TransactionsQuery
>;
export const listV2TransactionsByProfitCenterIDAndCategoryIDAndMonthAndYear = /* GraphQL */ `query ListV2TransactionsByProfitCenterIDAndCategoryIDAndMonthAndYear(
  $categoryIDMonthYear: Modelv2TransactionsSearchByProfitCenterCompositeKeyConditionInput
  $filter: Modelv2TransactionsFilterInput
  $limit: Int
  $nextToken: String
  $profitCenterID: ID!
  $sortDirection: ModelSortDirection
) {
  listV2TransactionsByProfitCenterIDAndCategoryIDAndMonthAndYear(
    categoryIDMonthYear: $categoryIDMonthYear
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    profitCenterID: $profitCenterID
    sortDirection: $sortDirection
  ) {
    items {
      amount
      categoryID
      categoryType
      createdAt
      date
      description
      id
      month
      profitCenterID
      updatedAt
      year
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2TransactionsByProfitCenterIDAndCategoryIDAndMonthAndYearQueryVariables,
  APITypes.ListV2TransactionsByProfitCenterIDAndCategoryIDAndMonthAndYearQuery
>;
export const listV2UserPermissions = /* GraphQL */ `query ListV2UserPermissions(
  $filter: ModelV2UserPermissionsFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2UserPermissions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      id
      permissionId
      updatedAt
      userId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2UserPermissionsQueryVariables,
  APITypes.ListV2UserPermissionsQuery
>;
export const listV2Users = /* GraphQL */ `query ListV2Users(
  $filter: ModelV2UsersFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2Users(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      city
      contactPhone
      country
      createdAt
      email
      firstContact
      id
      ig
      isAcademyStudent
      isActive
      isEmployed
      latitude
      longitude
      name
      roleId
      salesCommission
      state
      streetAddress
      updatedAt
      validated
      zipCode
      zoomLevel
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2UsersQueryVariables,
  APITypes.ListV2UsersQuery
>;
export const listV2UsersByCountry = /* GraphQL */ `query ListV2UsersByCountry(
  $country: String!
  $filter: Modelv2UsersFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listV2UsersByCountry(
    country: $country
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      city
      contactPhone
      country
      createdAt
      email
      firstContact
      id
      ig
      isAcademyStudent
      isActive
      isEmployed
      latitude
      longitude
      name
      roleId
      salesCommission
      state
      streetAddress
      updatedAt
      validated
      zipCode
      zoomLevel
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2UsersByCountryQueryVariables,
  APITypes.ListV2UsersByCountryQuery
>;
export const listV2UsersByEmail = /* GraphQL */ `query ListV2UsersByEmail(
  $email: String!
  $filter: Modelv2UsersFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listV2UsersByEmail(
    email: $email
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      city
      contactPhone
      country
      createdAt
      email
      firstContact
      id
      ig
      isAcademyStudent
      isActive
      isEmployed
      latitude
      longitude
      name
      roleId
      salesCommission
      state
      streetAddress
      updatedAt
      validated
      zipCode
      zoomLevel
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2UsersByEmailQueryVariables,
  APITypes.ListV2UsersByEmailQuery
>;
export const listV2WorkdayReports = /* GraphQL */ `query ListV2WorkdayReports(
  $filter: ModelV2WorkdayReportsFilterInput
  $limit: Int
  $nextToken: String
) {
  listV2WorkdayReports(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      customersSatisfaction
      date
      day
      endTime
      endingTemperature
      id
      month
      notes
      startTime
      startingTemperature
      status
      totalHoursWorked
      totalIssues
      totalSales
      updatedAt
      userId
      year
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2WorkdayReportsQueryVariables,
  APITypes.ListV2WorkdayReportsQuery
>;
export const listV2WorkdayReportsByDateAndUserId = /* GraphQL */ `query ListV2WorkdayReportsByDateAndUserId(
  $date: AWSDateTime!
  $filter: Modelv2WorkdayReportsFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
  $userId: ModelIDKeyConditionInput
) {
  listV2WorkdayReportsByDateAndUserId(
    date: $date
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
    userId: $userId
  ) {
    items {
      createdAt
      customersSatisfaction
      date
      day
      endTime
      endingTemperature
      id
      month
      notes
      startTime
      startingTemperature
      status
      totalHoursWorked
      totalIssues
      totalSales
      updatedAt
      userId
      year
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListV2WorkdayReportsByDateAndUserIdQueryVariables,
  APITypes.ListV2WorkdayReportsByDateAndUserIdQuery
>;
export const schedulesByCourse = /* GraphQL */ `query SchedulesByCourse(
  $courseSchedulesId: ID!
  $filter: Modelv2ScheduleFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  schedulesByCourse(
    courseSchedulesId: $courseSchedulesId
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      courseSchedulesId
      createdAt
      day
      endHour
      id
      isActive
      locationSchedulesId
      maximumQuotas
      minimumQuotas
      startHour
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SchedulesByCourseQueryVariables,
  APITypes.SchedulesByCourseQuery
>;
export const schedulesByLocationAndCourse = /* GraphQL */ `query SchedulesByLocationAndCourse(
  $courseSchedulesId: ModelIDKeyConditionInput
  $filter: Modelv2ScheduleFilterInput
  $limit: Int
  $locationSchedulesId: ID!
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  schedulesByLocationAndCourse(
    courseSchedulesId: $courseSchedulesId
    filter: $filter
    limit: $limit
    locationSchedulesId: $locationSchedulesId
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      courseSchedulesId
      createdAt
      day
      endHour
      id
      isActive
      locationSchedulesId
      maximumQuotas
      minimumQuotas
      startHour
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SchedulesByLocationAndCourseQueryVariables,
  APITypes.SchedulesByLocationAndCourseQuery
>;
export const v2ListCognitoUsers = /* GraphQL */ `query V2ListCognitoUsers($filter: String, $limit: Int, $nextToken: String) {
  v2ListCognitoUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    nextToken
    users {
      createdAt
      email
      enabled
      name
      status
      sub
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<
  APITypes.V2ListCognitoUsersQueryVariables,
  APITypes.V2ListCognitoUsersQuery
>;
