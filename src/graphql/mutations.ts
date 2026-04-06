/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createV2AcademyCourses = /* GraphQL */ `mutation CreateV2AcademyCourses(
  $condition: ModelV2AcademyCoursesConditionInput
  $input: CreateV2AcademyCoursesInput!
) {
  createV2AcademyCourses(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2AcademyCoursesMutationVariables,
  APITypes.CreateV2AcademyCoursesMutation
>;
export const createV2AcademyEnrollment = /* GraphQL */ `mutation CreateV2AcademyEnrollment(
  $condition: ModelV2AcademyEnrollmentConditionInput
  $input: CreateV2AcademyEnrollmentInput!
) {
  createV2AcademyEnrollment(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2AcademyEnrollmentMutationVariables,
  APITypes.CreateV2AcademyEnrollmentMutation
>;
export const createV2AcademyStudents = /* GraphQL */ `mutation CreateV2AcademyStudents(
  $condition: ModelV2AcademyStudentsConditionInput
  $input: CreateV2AcademyStudentsInput!
) {
  createV2AcademyStudents(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2AcademyStudentsMutationVariables,
  APITypes.CreateV2AcademyStudentsMutation
>;
export const createV2Certificates = /* GraphQL */ `mutation CreateV2Certificates(
  $condition: ModelV2CertificatesConditionInput
  $input: CreateV2CertificatesInput!
) {
  createV2Certificates(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2CertificatesMutationVariables,
  APITypes.CreateV2CertificatesMutation
>;
export const createV2Coach = /* GraphQL */ `mutation CreateV2Coach(
  $condition: ModelV2CoachConditionInput
  $input: CreateV2CoachInput!
) {
  createV2Coach(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2CoachMutationVariables,
  APITypes.CreateV2CoachMutation
>;
export const createV2CoachSchedule = /* GraphQL */ `mutation CreateV2CoachSchedule(
  $condition: ModelV2CoachScheduleConditionInput
  $input: CreateV2CoachScheduleInput!
) {
  createV2CoachSchedule(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2CoachScheduleMutationVariables,
  APITypes.CreateV2CoachScheduleMutation
>;
export const createV2CommentTickets = /* GraphQL */ `mutation CreateV2CommentTickets(
  $condition: ModelV2CommentTicketsConditionInput
  $input: CreateV2CommentTicketsInput!
) {
  createV2CommentTickets(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2CommentTicketsMutationVariables,
  APITypes.CreateV2CommentTicketsMutation
>;
export const createV2Correlatives = /* GraphQL */ `mutation CreateV2Correlatives(
  $condition: ModelV2CorrelativesConditionInput
  $input: CreateV2CorrelativesInput!
) {
  createV2Correlatives(condition: $condition, input: $input) {
    correlative
    createdAt
    id
    type
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateV2CorrelativesMutationVariables,
  APITypes.CreateV2CorrelativesMutation
>;
export const createV2Course = /* GraphQL */ `mutation CreateV2Course(
  $condition: ModelV2CourseConditionInput
  $input: CreateV2CourseInput!
) {
  createV2Course(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2CourseMutationVariables,
  APITypes.CreateV2CourseMutation
>;
export const createV2CourseSessionType = /* GraphQL */ `mutation CreateV2CourseSessionType(
  $condition: ModelV2CourseSessionTypeConditionInput
  $input: CreateV2CourseSessionTypeInput!
) {
  createV2CourseSessionType(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2CourseSessionTypeMutationVariables,
  APITypes.CreateV2CourseSessionTypeMutation
>;
export const createV2EmailSend = /* GraphQL */ `mutation CreateV2EmailSend(
  $condition: ModelV2EmailSendConditionInput
  $input: CreateV2EmailSendInput!
) {
  createV2EmailSend(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2EmailSendMutationVariables,
  APITypes.CreateV2EmailSendMutation
>;
export const createV2Enrollment = /* GraphQL */ `mutation CreateV2Enrollment(
  $condition: ModelV2EnrollmentConditionInput
  $input: CreateV2EnrollmentInput!
) {
  createV2Enrollment(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2EnrollmentMutationVariables,
  APITypes.CreateV2EnrollmentMutation
>;
export const createV2EvaluationLevel = /* GraphQL */ `mutation CreateV2EvaluationLevel(
  $condition: ModelV2EvaluationLevelConditionInput
  $input: CreateV2EvaluationLevelInput!
) {
  createV2EvaluationLevel(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2EvaluationLevelMutationVariables,
  APITypes.CreateV2EvaluationLevelMutation
>;
export const createV2EvaluationObjetives = /* GraphQL */ `mutation CreateV2EvaluationObjetives(
  $condition: ModelV2EvaluationObjetivesConditionInput
  $input: CreateV2EvaluationObjetivesInput!
) {
  createV2EvaluationObjetives(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2EvaluationObjetivesMutationVariables,
  APITypes.CreateV2EvaluationObjetivesMutation
>;
export const createV2GmailInbox = /* GraphQL */ `mutation CreateV2GmailInbox(
  $condition: ModelV2GmailInboxConditionInput
  $input: CreateV2GmailInboxInput!
) {
  createV2GmailInbox(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2GmailInboxMutationVariables,
  APITypes.CreateV2GmailInboxMutation
>;
export const createV2Location = /* GraphQL */ `mutation CreateV2Location(
  $condition: ModelV2LocationConditionInput
  $input: CreateV2LocationInput!
) {
  createV2Location(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2LocationMutationVariables,
  APITypes.CreateV2LocationMutation
>;
export const createV2Managers = /* GraphQL */ `mutation CreateV2Managers(
  $condition: ModelV2ManagersConditionInput
  $input: CreateV2ManagersInput!
) {
  createV2Managers(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2ManagersMutationVariables,
  APITypes.CreateV2ManagersMutation
>;
export const createV2Metadata = /* GraphQL */ `mutation CreateV2Metadata(
  $condition: ModelV2MetadataConditionInput
  $input: CreateV2MetadataInput!
) {
  createV2Metadata(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2MetadataMutationVariables,
  APITypes.CreateV2MetadataMutation
>;
export const createV2Parameters = /* GraphQL */ `mutation CreateV2Parameters(
  $condition: ModelV2ParametersConditionInput
  $input: CreateV2ParametersInput!
) {
  createV2Parameters(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2ParametersMutationVariables,
  APITypes.CreateV2ParametersMutation
>;
export const createV2ParametersEnc = /* GraphQL */ `mutation CreateV2ParametersEnc(
  $condition: ModelV2ParametersEncConditionInput
  $input: CreateV2ParametersEncInput!
) {
  createV2ParametersEnc(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2ParametersEncMutationVariables,
  APITypes.CreateV2ParametersEncMutation
>;
export const createV2PaymentTransactions = /* GraphQL */ `mutation CreateV2PaymentTransactions(
  $condition: ModelV2PaymentTransactionsConditionInput
  $input: CreateV2PaymentTransactionsInput!
) {
  createV2PaymentTransactions(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2PaymentTransactionsMutationVariables,
  APITypes.CreateV2PaymentTransactionsMutation
>;
export const createV2Permissions = /* GraphQL */ `mutation CreateV2Permissions(
  $condition: ModelV2PermissionsConditionInput
  $input: CreateV2PermissionsInput!
) {
  createV2Permissions(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2PermissionsMutationVariables,
  APITypes.CreateV2PermissionsMutation
>;
export const createV2PrivateEnrollment = /* GraphQL */ `mutation CreateV2PrivateEnrollment(
  $condition: ModelV2PrivateEnrollmentConditionInput
  $input: CreateV2PrivateEnrollmentInput!
) {
  createV2PrivateEnrollment(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2PrivateEnrollmentMutationVariables,
  APITypes.CreateV2PrivateEnrollmentMutation
>;
export const createV2Product = /* GraphQL */ `mutation CreateV2Product(
  $condition: ModelV2ProductConditionInput
  $input: CreateV2ProductInput!
) {
  createV2Product(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2ProductMutationVariables,
  APITypes.CreateV2ProductMutation
>;
export const createV2ProfitCenter = /* GraphQL */ `mutation CreateV2ProfitCenter(
  $condition: ModelV2ProfitCenterConditionInput
  $input: CreateV2ProfitCenterInput!
) {
  createV2ProfitCenter(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2ProfitCenterMutationVariables,
  APITypes.CreateV2ProfitCenterMutation
>;
export const createV2Relationship = /* GraphQL */ `mutation CreateV2Relationship(
  $condition: ModelV2RelationshipConditionInput
  $input: CreateV2RelationshipInput!
) {
  createV2Relationship(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2RelationshipMutationVariables,
  APITypes.CreateV2RelationshipMutation
>;
export const createV2RolPermissions = /* GraphQL */ `mutation CreateV2RolPermissions(
  $condition: ModelV2RolPermissionsConditionInput
  $input: CreateV2RolPermissionsInput!
) {
  createV2RolPermissions(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2RolPermissionsMutationVariables,
  APITypes.CreateV2RolPermissionsMutation
>;
export const createV2Roles = /* GraphQL */ `mutation CreateV2Roles(
  $condition: ModelV2RolesConditionInput
  $input: CreateV2RolesInput!
) {
  createV2Roles(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2RolesMutationVariables,
  APITypes.CreateV2RolesMutation
>;
export const createV2Schedule = /* GraphQL */ `mutation CreateV2Schedule(
  $condition: ModelV2ScheduleConditionInput
  $input: CreateV2ScheduleInput!
) {
  createV2Schedule(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2ScheduleMutationVariables,
  APITypes.CreateV2ScheduleMutation
>;
export const createV2SellersCommission = /* GraphQL */ `mutation CreateV2SellersCommission(
  $condition: ModelV2SellersCommissionConditionInput
  $input: CreateV2SellersCommissionInput!
) {
  createV2SellersCommission(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2SellersCommissionMutationVariables,
  APITypes.CreateV2SellersCommissionMutation
>;
export const createV2SentEmail = /* GraphQL */ `mutation CreateV2SentEmail(
  $condition: ModelV2SentEmailConditionInput
  $input: CreateV2SentEmailInput!
) {
  createV2SentEmail(condition: $condition, input: $input) {
    body
    createdAt
    emailState
    id
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateV2SentEmailMutationVariables,
  APITypes.CreateV2SentEmailMutation
>;
export const createV2SessionDetail = /* GraphQL */ `mutation CreateV2SessionDetail(
  $condition: ModelV2SessionDetailConditionInput
  $input: CreateV2SessionDetailInput!
) {
  createV2SessionDetail(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2SessionDetailMutationVariables,
  APITypes.CreateV2SessionDetailMutation
>;
export const createV2SessionType = /* GraphQL */ `mutation CreateV2SessionType(
  $condition: ModelV2SessionTypeConditionInput
  $input: CreateV2SessionTypeInput!
) {
  createV2SessionType(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2SessionTypeMutationVariables,
  APITypes.CreateV2SessionTypeMutation
>;
export const createV2ShoppingCart = /* GraphQL */ `mutation CreateV2ShoppingCart(
  $condition: ModelV2ShoppingCartConditionInput
  $input: CreateV2ShoppingCartInput!
) {
  createV2ShoppingCart(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2ShoppingCartMutationVariables,
  APITypes.CreateV2ShoppingCartMutation
>;
export const createV2ShoppingCartDetail = /* GraphQL */ `mutation CreateV2ShoppingCartDetail(
  $condition: ModelV2ShoppingCartDetailConditionInput
  $input: CreateV2ShoppingCartDetailInput!
) {
  createV2ShoppingCartDetail(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2ShoppingCartDetailMutationVariables,
  APITypes.CreateV2ShoppingCartDetailMutation
>;
export const createV2Student = /* GraphQL */ `mutation CreateV2Student(
  $condition: ModelV2StudentConditionInput
  $input: CreateV2StudentInput!
) {
  createV2Student(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2StudentMutationVariables,
  APITypes.CreateV2StudentMutation
>;
export const createV2StudentEvaluations = /* GraphQL */ `mutation CreateV2StudentEvaluations(
  $condition: ModelV2StudentEvaluationsConditionInput
  $input: CreateV2StudentEvaluationsInput!
) {
  createV2StudentEvaluations(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2StudentEvaluationsMutationVariables,
  APITypes.CreateV2StudentEvaluationsMutation
>;
export const createV2StudentEvaluationsDetail = /* GraphQL */ `mutation CreateV2StudentEvaluationsDetail(
  $condition: ModelV2StudentEvaluationsDetailConditionInput
  $input: CreateV2StudentEvaluationsDetailInput!
) {
  createV2StudentEvaluationsDetail(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2StudentEvaluationsDetailMutationVariables,
  APITypes.CreateV2StudentEvaluationsDetailMutation
>;
export const createV2Supplier = /* GraphQL */ `mutation CreateV2Supplier(
  $condition: ModelV2SupplierConditionInput
  $input: CreateV2SupplierInput!
) {
  createV2Supplier(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2SupplierMutationVariables,
  APITypes.CreateV2SupplierMutation
>;
export const createV2SupportTicket = /* GraphQL */ `mutation CreateV2SupportTicket(
  $condition: ModelV2SupportTicketConditionInput
  $input: CreateV2SupportTicketInput!
) {
  createV2SupportTicket(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2SupportTicketMutationVariables,
  APITypes.CreateV2SupportTicketMutation
>;
export const createV2TicketComment = /* GraphQL */ `mutation CreateV2TicketComment(
  $condition: ModelV2TicketCommentConditionInput
  $input: CreateV2TicketCommentInput!
) {
  createV2TicketComment(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2TicketCommentMutationVariables,
  APITypes.CreateV2TicketCommentMutation
>;
export const createV2TicketUser = /* GraphQL */ `mutation CreateV2TicketUser(
  $condition: ModelV2TicketUserConditionInput
  $input: CreateV2TicketUserInput!
) {
  createV2TicketUser(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2TicketUserMutationVariables,
  APITypes.CreateV2TicketUserMutation
>;
export const createV2Transactions = /* GraphQL */ `mutation CreateV2Transactions(
  $condition: ModelV2TransactionsConditionInput
  $input: CreateV2TransactionsInput!
) {
  createV2Transactions(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2TransactionsMutationVariables,
  APITypes.CreateV2TransactionsMutation
>;
export const createV2UserPermissions = /* GraphQL */ `mutation CreateV2UserPermissions(
  $condition: ModelV2UserPermissionsConditionInput
  $input: CreateV2UserPermissionsInput!
) {
  createV2UserPermissions(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateV2UserPermissionsMutationVariables,
  APITypes.CreateV2UserPermissionsMutation
>;
export const createV2Users = /* GraphQL */ `mutation CreateV2Users(
  $condition: ModelV2UsersConditionInput
  $input: CreateV2UsersInput!
) {
  createV2Users(condition: $condition, input: $input) {
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
    zipCode
    zoomLevel
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateV2UsersMutationVariables,
  APITypes.CreateV2UsersMutation
>;
export const deleteV2AcademyCourses = /* GraphQL */ `mutation DeleteV2AcademyCourses(
  $condition: ModelV2AcademyCoursesConditionInput
  $input: DeleteV2AcademyCoursesInput!
) {
  deleteV2AcademyCourses(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2AcademyCoursesMutationVariables,
  APITypes.DeleteV2AcademyCoursesMutation
>;
export const deleteV2AcademyEnrollment = /* GraphQL */ `mutation DeleteV2AcademyEnrollment(
  $condition: ModelV2AcademyEnrollmentConditionInput
  $input: DeleteV2AcademyEnrollmentInput!
) {
  deleteV2AcademyEnrollment(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2AcademyEnrollmentMutationVariables,
  APITypes.DeleteV2AcademyEnrollmentMutation
>;
export const deleteV2AcademyStudents = /* GraphQL */ `mutation DeleteV2AcademyStudents(
  $condition: ModelV2AcademyStudentsConditionInput
  $input: DeleteV2AcademyStudentsInput!
) {
  deleteV2AcademyStudents(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2AcademyStudentsMutationVariables,
  APITypes.DeleteV2AcademyStudentsMutation
>;
export const deleteV2Certificates = /* GraphQL */ `mutation DeleteV2Certificates(
  $condition: ModelV2CertificatesConditionInput
  $input: DeleteV2CertificatesInput!
) {
  deleteV2Certificates(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2CertificatesMutationVariables,
  APITypes.DeleteV2CertificatesMutation
>;
export const deleteV2Coach = /* GraphQL */ `mutation DeleteV2Coach(
  $condition: ModelV2CoachConditionInput
  $input: DeleteV2CoachInput!
) {
  deleteV2Coach(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2CoachMutationVariables,
  APITypes.DeleteV2CoachMutation
>;
export const deleteV2CoachSchedule = /* GraphQL */ `mutation DeleteV2CoachSchedule(
  $condition: ModelV2CoachScheduleConditionInput
  $input: DeleteV2CoachScheduleInput!
) {
  deleteV2CoachSchedule(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2CoachScheduleMutationVariables,
  APITypes.DeleteV2CoachScheduleMutation
>;
export const deleteV2CommentTickets = /* GraphQL */ `mutation DeleteV2CommentTickets(
  $condition: ModelV2CommentTicketsConditionInput
  $input: DeleteV2CommentTicketsInput!
) {
  deleteV2CommentTickets(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2CommentTicketsMutationVariables,
  APITypes.DeleteV2CommentTicketsMutation
>;
export const deleteV2Correlatives = /* GraphQL */ `mutation DeleteV2Correlatives(
  $condition: ModelV2CorrelativesConditionInput
  $input: DeleteV2CorrelativesInput!
) {
  deleteV2Correlatives(condition: $condition, input: $input) {
    correlative
    createdAt
    id
    type
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteV2CorrelativesMutationVariables,
  APITypes.DeleteV2CorrelativesMutation
>;
export const deleteV2Course = /* GraphQL */ `mutation DeleteV2Course(
  $condition: ModelV2CourseConditionInput
  $input: DeleteV2CourseInput!
) {
  deleteV2Course(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2CourseMutationVariables,
  APITypes.DeleteV2CourseMutation
>;
export const deleteV2CourseSessionType = /* GraphQL */ `mutation DeleteV2CourseSessionType(
  $condition: ModelV2CourseSessionTypeConditionInput
  $input: DeleteV2CourseSessionTypeInput!
) {
  deleteV2CourseSessionType(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2CourseSessionTypeMutationVariables,
  APITypes.DeleteV2CourseSessionTypeMutation
>;
export const deleteV2EmailSend = /* GraphQL */ `mutation DeleteV2EmailSend(
  $condition: ModelV2EmailSendConditionInput
  $input: DeleteV2EmailSendInput!
) {
  deleteV2EmailSend(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2EmailSendMutationVariables,
  APITypes.DeleteV2EmailSendMutation
>;
export const deleteV2Enrollment = /* GraphQL */ `mutation DeleteV2Enrollment(
  $condition: ModelV2EnrollmentConditionInput
  $input: DeleteV2EnrollmentInput!
) {
  deleteV2Enrollment(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2EnrollmentMutationVariables,
  APITypes.DeleteV2EnrollmentMutation
>;
export const deleteV2EvaluationLevel = /* GraphQL */ `mutation DeleteV2EvaluationLevel(
  $condition: ModelV2EvaluationLevelConditionInput
  $input: DeleteV2EvaluationLevelInput!
) {
  deleteV2EvaluationLevel(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2EvaluationLevelMutationVariables,
  APITypes.DeleteV2EvaluationLevelMutation
>;
export const deleteV2EvaluationObjetives = /* GraphQL */ `mutation DeleteV2EvaluationObjetives(
  $condition: ModelV2EvaluationObjetivesConditionInput
  $input: DeleteV2EvaluationObjetivesInput!
) {
  deleteV2EvaluationObjetives(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2EvaluationObjetivesMutationVariables,
  APITypes.DeleteV2EvaluationObjetivesMutation
>;
export const deleteV2GmailInbox = /* GraphQL */ `mutation DeleteV2GmailInbox(
  $condition: ModelV2GmailInboxConditionInput
  $input: DeleteV2GmailInboxInput!
) {
  deleteV2GmailInbox(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2GmailInboxMutationVariables,
  APITypes.DeleteV2GmailInboxMutation
>;
export const deleteV2Location = /* GraphQL */ `mutation DeleteV2Location(
  $condition: ModelV2LocationConditionInput
  $input: DeleteV2LocationInput!
) {
  deleteV2Location(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2LocationMutationVariables,
  APITypes.DeleteV2LocationMutation
>;
export const deleteV2Managers = /* GraphQL */ `mutation DeleteV2Managers(
  $condition: ModelV2ManagersConditionInput
  $input: DeleteV2ManagersInput!
) {
  deleteV2Managers(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2ManagersMutationVariables,
  APITypes.DeleteV2ManagersMutation
>;
export const deleteV2Metadata = /* GraphQL */ `mutation DeleteV2Metadata(
  $condition: ModelV2MetadataConditionInput
  $input: DeleteV2MetadataInput!
) {
  deleteV2Metadata(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2MetadataMutationVariables,
  APITypes.DeleteV2MetadataMutation
>;
export const deleteV2Parameters = /* GraphQL */ `mutation DeleteV2Parameters(
  $condition: ModelV2ParametersConditionInput
  $input: DeleteV2ParametersInput!
) {
  deleteV2Parameters(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2ParametersMutationVariables,
  APITypes.DeleteV2ParametersMutation
>;
export const deleteV2ParametersEnc = /* GraphQL */ `mutation DeleteV2ParametersEnc(
  $condition: ModelV2ParametersEncConditionInput
  $input: DeleteV2ParametersEncInput!
) {
  deleteV2ParametersEnc(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2ParametersEncMutationVariables,
  APITypes.DeleteV2ParametersEncMutation
>;
export const deleteV2PaymentTransactions = /* GraphQL */ `mutation DeleteV2PaymentTransactions(
  $condition: ModelV2PaymentTransactionsConditionInput
  $input: DeleteV2PaymentTransactionsInput!
) {
  deleteV2PaymentTransactions(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2PaymentTransactionsMutationVariables,
  APITypes.DeleteV2PaymentTransactionsMutation
>;
export const deleteV2Permissions = /* GraphQL */ `mutation DeleteV2Permissions(
  $condition: ModelV2PermissionsConditionInput
  $input: DeleteV2PermissionsInput!
) {
  deleteV2Permissions(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2PermissionsMutationVariables,
  APITypes.DeleteV2PermissionsMutation
>;
export const deleteV2PrivateEnrollment = /* GraphQL */ `mutation DeleteV2PrivateEnrollment(
  $condition: ModelV2PrivateEnrollmentConditionInput
  $input: DeleteV2PrivateEnrollmentInput!
) {
  deleteV2PrivateEnrollment(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2PrivateEnrollmentMutationVariables,
  APITypes.DeleteV2PrivateEnrollmentMutation
>;
export const deleteV2Product = /* GraphQL */ `mutation DeleteV2Product(
  $condition: ModelV2ProductConditionInput
  $input: DeleteV2ProductInput!
) {
  deleteV2Product(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2ProductMutationVariables,
  APITypes.DeleteV2ProductMutation
>;
export const deleteV2ProfitCenter = /* GraphQL */ `mutation DeleteV2ProfitCenter(
  $condition: ModelV2ProfitCenterConditionInput
  $input: DeleteV2ProfitCenterInput!
) {
  deleteV2ProfitCenter(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2ProfitCenterMutationVariables,
  APITypes.DeleteV2ProfitCenterMutation
>;
export const deleteV2Relationship = /* GraphQL */ `mutation DeleteV2Relationship(
  $condition: ModelV2RelationshipConditionInput
  $input: DeleteV2RelationshipInput!
) {
  deleteV2Relationship(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2RelationshipMutationVariables,
  APITypes.DeleteV2RelationshipMutation
>;
export const deleteV2RolPermissions = /* GraphQL */ `mutation DeleteV2RolPermissions(
  $condition: ModelV2RolPermissionsConditionInput
  $input: DeleteV2RolPermissionsInput!
) {
  deleteV2RolPermissions(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2RolPermissionsMutationVariables,
  APITypes.DeleteV2RolPermissionsMutation
>;
export const deleteV2Roles = /* GraphQL */ `mutation DeleteV2Roles(
  $condition: ModelV2RolesConditionInput
  $input: DeleteV2RolesInput!
) {
  deleteV2Roles(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2RolesMutationVariables,
  APITypes.DeleteV2RolesMutation
>;
export const deleteV2Schedule = /* GraphQL */ `mutation DeleteV2Schedule(
  $condition: ModelV2ScheduleConditionInput
  $input: DeleteV2ScheduleInput!
) {
  deleteV2Schedule(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2ScheduleMutationVariables,
  APITypes.DeleteV2ScheduleMutation
>;
export const deleteV2SellersCommission = /* GraphQL */ `mutation DeleteV2SellersCommission(
  $condition: ModelV2SellersCommissionConditionInput
  $input: DeleteV2SellersCommissionInput!
) {
  deleteV2SellersCommission(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2SellersCommissionMutationVariables,
  APITypes.DeleteV2SellersCommissionMutation
>;
export const deleteV2SentEmail = /* GraphQL */ `mutation DeleteV2SentEmail(
  $condition: ModelV2SentEmailConditionInput
  $input: DeleteV2SentEmailInput!
) {
  deleteV2SentEmail(condition: $condition, input: $input) {
    body
    createdAt
    emailState
    id
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteV2SentEmailMutationVariables,
  APITypes.DeleteV2SentEmailMutation
>;
export const deleteV2SessionDetail = /* GraphQL */ `mutation DeleteV2SessionDetail(
  $condition: ModelV2SessionDetailConditionInput
  $input: DeleteV2SessionDetailInput!
) {
  deleteV2SessionDetail(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2SessionDetailMutationVariables,
  APITypes.DeleteV2SessionDetailMutation
>;
export const deleteV2SessionType = /* GraphQL */ `mutation DeleteV2SessionType(
  $condition: ModelV2SessionTypeConditionInput
  $input: DeleteV2SessionTypeInput!
) {
  deleteV2SessionType(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2SessionTypeMutationVariables,
  APITypes.DeleteV2SessionTypeMutation
>;
export const deleteV2ShoppingCart = /* GraphQL */ `mutation DeleteV2ShoppingCart(
  $condition: ModelV2ShoppingCartConditionInput
  $input: DeleteV2ShoppingCartInput!
) {
  deleteV2ShoppingCart(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2ShoppingCartMutationVariables,
  APITypes.DeleteV2ShoppingCartMutation
>;
export const deleteV2ShoppingCartDetail = /* GraphQL */ `mutation DeleteV2ShoppingCartDetail(
  $condition: ModelV2ShoppingCartDetailConditionInput
  $input: DeleteV2ShoppingCartDetailInput!
) {
  deleteV2ShoppingCartDetail(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2ShoppingCartDetailMutationVariables,
  APITypes.DeleteV2ShoppingCartDetailMutation
>;
export const deleteV2Student = /* GraphQL */ `mutation DeleteV2Student(
  $condition: ModelV2StudentConditionInput
  $input: DeleteV2StudentInput!
) {
  deleteV2Student(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2StudentMutationVariables,
  APITypes.DeleteV2StudentMutation
>;
export const deleteV2StudentEvaluations = /* GraphQL */ `mutation DeleteV2StudentEvaluations(
  $condition: ModelV2StudentEvaluationsConditionInput
  $input: DeleteV2StudentEvaluationsInput!
) {
  deleteV2StudentEvaluations(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2StudentEvaluationsMutationVariables,
  APITypes.DeleteV2StudentEvaluationsMutation
>;
export const deleteV2StudentEvaluationsDetail = /* GraphQL */ `mutation DeleteV2StudentEvaluationsDetail(
  $condition: ModelV2StudentEvaluationsDetailConditionInput
  $input: DeleteV2StudentEvaluationsDetailInput!
) {
  deleteV2StudentEvaluationsDetail(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2StudentEvaluationsDetailMutationVariables,
  APITypes.DeleteV2StudentEvaluationsDetailMutation
>;
export const deleteV2Supplier = /* GraphQL */ `mutation DeleteV2Supplier(
  $condition: ModelV2SupplierConditionInput
  $input: DeleteV2SupplierInput!
) {
  deleteV2Supplier(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2SupplierMutationVariables,
  APITypes.DeleteV2SupplierMutation
>;
export const deleteV2SupportTicket = /* GraphQL */ `mutation DeleteV2SupportTicket(
  $condition: ModelV2SupportTicketConditionInput
  $input: DeleteV2SupportTicketInput!
) {
  deleteV2SupportTicket(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2SupportTicketMutationVariables,
  APITypes.DeleteV2SupportTicketMutation
>;
export const deleteV2TicketComment = /* GraphQL */ `mutation DeleteV2TicketComment(
  $condition: ModelV2TicketCommentConditionInput
  $input: DeleteV2TicketCommentInput!
) {
  deleteV2TicketComment(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2TicketCommentMutationVariables,
  APITypes.DeleteV2TicketCommentMutation
>;
export const deleteV2TicketUser = /* GraphQL */ `mutation DeleteV2TicketUser(
  $condition: ModelV2TicketUserConditionInput
  $input: DeleteV2TicketUserInput!
) {
  deleteV2TicketUser(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2TicketUserMutationVariables,
  APITypes.DeleteV2TicketUserMutation
>;
export const deleteV2Transactions = /* GraphQL */ `mutation DeleteV2Transactions(
  $condition: ModelV2TransactionsConditionInput
  $input: DeleteV2TransactionsInput!
) {
  deleteV2Transactions(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2TransactionsMutationVariables,
  APITypes.DeleteV2TransactionsMutation
>;
export const deleteV2UserPermissions = /* GraphQL */ `mutation DeleteV2UserPermissions(
  $condition: ModelV2UserPermissionsConditionInput
  $input: DeleteV2UserPermissionsInput!
) {
  deleteV2UserPermissions(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteV2UserPermissionsMutationVariables,
  APITypes.DeleteV2UserPermissionsMutation
>;
export const deleteV2Users = /* GraphQL */ `mutation DeleteV2Users(
  $condition: ModelV2UsersConditionInput
  $input: DeleteV2UsersInput!
) {
  deleteV2Users(condition: $condition, input: $input) {
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
    zipCode
    zoomLevel
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteV2UsersMutationVariables,
  APITypes.DeleteV2UsersMutation
>;
export const updateV2AcademyCourses = /* GraphQL */ `mutation UpdateV2AcademyCourses(
  $condition: ModelV2AcademyCoursesConditionInput
  $input: UpdateV2AcademyCoursesInput!
) {
  updateV2AcademyCourses(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2AcademyCoursesMutationVariables,
  APITypes.UpdateV2AcademyCoursesMutation
>;
export const updateV2AcademyEnrollment = /* GraphQL */ `mutation UpdateV2AcademyEnrollment(
  $condition: ModelV2AcademyEnrollmentConditionInput
  $input: UpdateV2AcademyEnrollmentInput!
) {
  updateV2AcademyEnrollment(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2AcademyEnrollmentMutationVariables,
  APITypes.UpdateV2AcademyEnrollmentMutation
>;
export const updateV2AcademyStudents = /* GraphQL */ `mutation UpdateV2AcademyStudents(
  $condition: ModelV2AcademyStudentsConditionInput
  $input: UpdateV2AcademyStudentsInput!
) {
  updateV2AcademyStudents(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2AcademyStudentsMutationVariables,
  APITypes.UpdateV2AcademyStudentsMutation
>;
export const updateV2Certificates = /* GraphQL */ `mutation UpdateV2Certificates(
  $condition: ModelV2CertificatesConditionInput
  $input: UpdateV2CertificatesInput!
) {
  updateV2Certificates(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2CertificatesMutationVariables,
  APITypes.UpdateV2CertificatesMutation
>;
export const updateV2Coach = /* GraphQL */ `mutation UpdateV2Coach(
  $condition: ModelV2CoachConditionInput
  $input: UpdateV2CoachInput!
) {
  updateV2Coach(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2CoachMutationVariables,
  APITypes.UpdateV2CoachMutation
>;
export const updateV2CoachSchedule = /* GraphQL */ `mutation UpdateV2CoachSchedule(
  $condition: ModelV2CoachScheduleConditionInput
  $input: UpdateV2CoachScheduleInput!
) {
  updateV2CoachSchedule(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2CoachScheduleMutationVariables,
  APITypes.UpdateV2CoachScheduleMutation
>;
export const updateV2CommentTickets = /* GraphQL */ `mutation UpdateV2CommentTickets(
  $condition: ModelV2CommentTicketsConditionInput
  $input: UpdateV2CommentTicketsInput!
) {
  updateV2CommentTickets(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2CommentTicketsMutationVariables,
  APITypes.UpdateV2CommentTicketsMutation
>;
export const updateV2Correlatives = /* GraphQL */ `mutation UpdateV2Correlatives(
  $condition: ModelV2CorrelativesConditionInput
  $input: UpdateV2CorrelativesInput!
) {
  updateV2Correlatives(condition: $condition, input: $input) {
    correlative
    createdAt
    id
    type
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateV2CorrelativesMutationVariables,
  APITypes.UpdateV2CorrelativesMutation
>;
export const updateV2Course = /* GraphQL */ `mutation UpdateV2Course(
  $condition: ModelV2CourseConditionInput
  $input: UpdateV2CourseInput!
) {
  updateV2Course(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2CourseMutationVariables,
  APITypes.UpdateV2CourseMutation
>;
export const updateV2CourseSessionType = /* GraphQL */ `mutation UpdateV2CourseSessionType(
  $condition: ModelV2CourseSessionTypeConditionInput
  $input: UpdateV2CourseSessionTypeInput!
) {
  updateV2CourseSessionType(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2CourseSessionTypeMutationVariables,
  APITypes.UpdateV2CourseSessionTypeMutation
>;
export const updateV2EmailSend = /* GraphQL */ `mutation UpdateV2EmailSend(
  $condition: ModelV2EmailSendConditionInput
  $input: UpdateV2EmailSendInput!
) {
  updateV2EmailSend(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2EmailSendMutationVariables,
  APITypes.UpdateV2EmailSendMutation
>;
export const updateV2Enrollment = /* GraphQL */ `mutation UpdateV2Enrollment(
  $condition: ModelV2EnrollmentConditionInput
  $input: UpdateV2EnrollmentInput!
) {
  updateV2Enrollment(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2EnrollmentMutationVariables,
  APITypes.UpdateV2EnrollmentMutation
>;
export const updateV2EvaluationLevel = /* GraphQL */ `mutation UpdateV2EvaluationLevel(
  $condition: ModelV2EvaluationLevelConditionInput
  $input: UpdateV2EvaluationLevelInput!
) {
  updateV2EvaluationLevel(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2EvaluationLevelMutationVariables,
  APITypes.UpdateV2EvaluationLevelMutation
>;
export const updateV2EvaluationObjetives = /* GraphQL */ `mutation UpdateV2EvaluationObjetives(
  $condition: ModelV2EvaluationObjetivesConditionInput
  $input: UpdateV2EvaluationObjetivesInput!
) {
  updateV2EvaluationObjetives(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2EvaluationObjetivesMutationVariables,
  APITypes.UpdateV2EvaluationObjetivesMutation
>;
export const updateV2GmailInbox = /* GraphQL */ `mutation UpdateV2GmailInbox(
  $condition: ModelV2GmailInboxConditionInput
  $input: UpdateV2GmailInboxInput!
) {
  updateV2GmailInbox(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2GmailInboxMutationVariables,
  APITypes.UpdateV2GmailInboxMutation
>;
export const updateV2Location = /* GraphQL */ `mutation UpdateV2Location(
  $condition: ModelV2LocationConditionInput
  $input: UpdateV2LocationInput!
) {
  updateV2Location(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2LocationMutationVariables,
  APITypes.UpdateV2LocationMutation
>;
export const updateV2Managers = /* GraphQL */ `mutation UpdateV2Managers(
  $condition: ModelV2ManagersConditionInput
  $input: UpdateV2ManagersInput!
) {
  updateV2Managers(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2ManagersMutationVariables,
  APITypes.UpdateV2ManagersMutation
>;
export const updateV2Metadata = /* GraphQL */ `mutation UpdateV2Metadata(
  $condition: ModelV2MetadataConditionInput
  $input: UpdateV2MetadataInput!
) {
  updateV2Metadata(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2MetadataMutationVariables,
  APITypes.UpdateV2MetadataMutation
>;
export const updateV2Parameters = /* GraphQL */ `mutation UpdateV2Parameters(
  $condition: ModelV2ParametersConditionInput
  $input: UpdateV2ParametersInput!
) {
  updateV2Parameters(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2ParametersMutationVariables,
  APITypes.UpdateV2ParametersMutation
>;
export const updateV2ParametersEnc = /* GraphQL */ `mutation UpdateV2ParametersEnc(
  $condition: ModelV2ParametersEncConditionInput
  $input: UpdateV2ParametersEncInput!
) {
  updateV2ParametersEnc(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2ParametersEncMutationVariables,
  APITypes.UpdateV2ParametersEncMutation
>;
export const updateV2PaymentTransactions = /* GraphQL */ `mutation UpdateV2PaymentTransactions(
  $condition: ModelV2PaymentTransactionsConditionInput
  $input: UpdateV2PaymentTransactionsInput!
) {
  updateV2PaymentTransactions(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2PaymentTransactionsMutationVariables,
  APITypes.UpdateV2PaymentTransactionsMutation
>;
export const updateV2Permissions = /* GraphQL */ `mutation UpdateV2Permissions(
  $condition: ModelV2PermissionsConditionInput
  $input: UpdateV2PermissionsInput!
) {
  updateV2Permissions(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2PermissionsMutationVariables,
  APITypes.UpdateV2PermissionsMutation
>;
export const updateV2PrivateEnrollment = /* GraphQL */ `mutation UpdateV2PrivateEnrollment(
  $condition: ModelV2PrivateEnrollmentConditionInput
  $input: UpdateV2PrivateEnrollmentInput!
) {
  updateV2PrivateEnrollment(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2PrivateEnrollmentMutationVariables,
  APITypes.UpdateV2PrivateEnrollmentMutation
>;
export const updateV2Product = /* GraphQL */ `mutation UpdateV2Product(
  $condition: ModelV2ProductConditionInput
  $input: UpdateV2ProductInput!
) {
  updateV2Product(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2ProductMutationVariables,
  APITypes.UpdateV2ProductMutation
>;
export const updateV2ProfitCenter = /* GraphQL */ `mutation UpdateV2ProfitCenter(
  $condition: ModelV2ProfitCenterConditionInput
  $input: UpdateV2ProfitCenterInput!
) {
  updateV2ProfitCenter(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2ProfitCenterMutationVariables,
  APITypes.UpdateV2ProfitCenterMutation
>;
export const updateV2Relationship = /* GraphQL */ `mutation UpdateV2Relationship(
  $condition: ModelV2RelationshipConditionInput
  $input: UpdateV2RelationshipInput!
) {
  updateV2Relationship(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2RelationshipMutationVariables,
  APITypes.UpdateV2RelationshipMutation
>;
export const updateV2RolPermissions = /* GraphQL */ `mutation UpdateV2RolPermissions(
  $condition: ModelV2RolPermissionsConditionInput
  $input: UpdateV2RolPermissionsInput!
) {
  updateV2RolPermissions(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2RolPermissionsMutationVariables,
  APITypes.UpdateV2RolPermissionsMutation
>;
export const updateV2Roles = /* GraphQL */ `mutation UpdateV2Roles(
  $condition: ModelV2RolesConditionInput
  $input: UpdateV2RolesInput!
) {
  updateV2Roles(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2RolesMutationVariables,
  APITypes.UpdateV2RolesMutation
>;
export const updateV2Schedule = /* GraphQL */ `mutation UpdateV2Schedule(
  $condition: ModelV2ScheduleConditionInput
  $input: UpdateV2ScheduleInput!
) {
  updateV2Schedule(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2ScheduleMutationVariables,
  APITypes.UpdateV2ScheduleMutation
>;
export const updateV2SellersCommission = /* GraphQL */ `mutation UpdateV2SellersCommission(
  $condition: ModelV2SellersCommissionConditionInput
  $input: UpdateV2SellersCommissionInput!
) {
  updateV2SellersCommission(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2SellersCommissionMutationVariables,
  APITypes.UpdateV2SellersCommissionMutation
>;
export const updateV2SentEmail = /* GraphQL */ `mutation UpdateV2SentEmail(
  $condition: ModelV2SentEmailConditionInput
  $input: UpdateV2SentEmailInput!
) {
  updateV2SentEmail(condition: $condition, input: $input) {
    body
    createdAt
    emailState
    id
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateV2SentEmailMutationVariables,
  APITypes.UpdateV2SentEmailMutation
>;
export const updateV2SessionDetail = /* GraphQL */ `mutation UpdateV2SessionDetail(
  $condition: ModelV2SessionDetailConditionInput
  $input: UpdateV2SessionDetailInput!
) {
  updateV2SessionDetail(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2SessionDetailMutationVariables,
  APITypes.UpdateV2SessionDetailMutation
>;
export const updateV2SessionType = /* GraphQL */ `mutation UpdateV2SessionType(
  $condition: ModelV2SessionTypeConditionInput
  $input: UpdateV2SessionTypeInput!
) {
  updateV2SessionType(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2SessionTypeMutationVariables,
  APITypes.UpdateV2SessionTypeMutation
>;
export const updateV2ShoppingCart = /* GraphQL */ `mutation UpdateV2ShoppingCart(
  $condition: ModelV2ShoppingCartConditionInput
  $input: UpdateV2ShoppingCartInput!
) {
  updateV2ShoppingCart(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2ShoppingCartMutationVariables,
  APITypes.UpdateV2ShoppingCartMutation
>;
export const updateV2ShoppingCartDetail = /* GraphQL */ `mutation UpdateV2ShoppingCartDetail(
  $condition: ModelV2ShoppingCartDetailConditionInput
  $input: UpdateV2ShoppingCartDetailInput!
) {
  updateV2ShoppingCartDetail(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2ShoppingCartDetailMutationVariables,
  APITypes.UpdateV2ShoppingCartDetailMutation
>;
export const updateV2Student = /* GraphQL */ `mutation UpdateV2Student(
  $condition: ModelV2StudentConditionInput
  $input: UpdateV2StudentInput!
) {
  updateV2Student(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2StudentMutationVariables,
  APITypes.UpdateV2StudentMutation
>;
export const updateV2StudentEvaluations = /* GraphQL */ `mutation UpdateV2StudentEvaluations(
  $condition: ModelV2StudentEvaluationsConditionInput
  $input: UpdateV2StudentEvaluationsInput!
) {
  updateV2StudentEvaluations(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2StudentEvaluationsMutationVariables,
  APITypes.UpdateV2StudentEvaluationsMutation
>;
export const updateV2StudentEvaluationsDetail = /* GraphQL */ `mutation UpdateV2StudentEvaluationsDetail(
  $condition: ModelV2StudentEvaluationsDetailConditionInput
  $input: UpdateV2StudentEvaluationsDetailInput!
) {
  updateV2StudentEvaluationsDetail(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2StudentEvaluationsDetailMutationVariables,
  APITypes.UpdateV2StudentEvaluationsDetailMutation
>;
export const updateV2Supplier = /* GraphQL */ `mutation UpdateV2Supplier(
  $condition: ModelV2SupplierConditionInput
  $input: UpdateV2SupplierInput!
) {
  updateV2Supplier(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2SupplierMutationVariables,
  APITypes.UpdateV2SupplierMutation
>;
export const updateV2SupportTicket = /* GraphQL */ `mutation UpdateV2SupportTicket(
  $condition: ModelV2SupportTicketConditionInput
  $input: UpdateV2SupportTicketInput!
) {
  updateV2SupportTicket(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2SupportTicketMutationVariables,
  APITypes.UpdateV2SupportTicketMutation
>;
export const updateV2TicketComment = /* GraphQL */ `mutation UpdateV2TicketComment(
  $condition: ModelV2TicketCommentConditionInput
  $input: UpdateV2TicketCommentInput!
) {
  updateV2TicketComment(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2TicketCommentMutationVariables,
  APITypes.UpdateV2TicketCommentMutation
>;
export const updateV2TicketUser = /* GraphQL */ `mutation UpdateV2TicketUser(
  $condition: ModelV2TicketUserConditionInput
  $input: UpdateV2TicketUserInput!
) {
  updateV2TicketUser(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2TicketUserMutationVariables,
  APITypes.UpdateV2TicketUserMutation
>;
export const updateV2Transactions = /* GraphQL */ `mutation UpdateV2Transactions(
  $condition: ModelV2TransactionsConditionInput
  $input: UpdateV2TransactionsInput!
) {
  updateV2Transactions(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2TransactionsMutationVariables,
  APITypes.UpdateV2TransactionsMutation
>;
export const updateV2UserPermissions = /* GraphQL */ `mutation UpdateV2UserPermissions(
  $condition: ModelV2UserPermissionsConditionInput
  $input: UpdateV2UserPermissionsInput!
) {
  updateV2UserPermissions(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateV2UserPermissionsMutationVariables,
  APITypes.UpdateV2UserPermissionsMutation
>;
export const updateV2Users = /* GraphQL */ `mutation UpdateV2Users(
  $condition: ModelV2UsersConditionInput
  $input: UpdateV2UsersInput!
) {
  updateV2Users(condition: $condition, input: $input) {
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
    zipCode
    zoomLevel
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateV2UsersMutationVariables,
  APITypes.UpdateV2UsersMutation
>;
export const v2CognitoCreateUser = /* GraphQL */ `mutation V2CognitoCreateUser(
  $contactPhone: String
  $email: String!
  $isEmployed: Boolean
  $name: String!
  $roleId: String
  $temporaryPassword: String!
) {
  v2CognitoCreateUser(
    contactPhone: $contactPhone
    email: $email
    isEmployed: $isEmployed
    name: $name
    roleId: $roleId
    temporaryPassword: $temporaryPassword
  ) {
    email
    name
    roleId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.V2CognitoCreateUserMutationVariables,
  APITypes.V2CognitoCreateUserMutation
>;
export const v2CognitoSetPassword = /* GraphQL */ `mutation V2CognitoSetPassword(
  $email: String!
  $password: String!
  $permanent: Boolean
) {
  v2CognitoSetPassword(
    email: $email
    password: $password
    permanent: $permanent
  )
}
` as GeneratedMutation<
  APITypes.V2CognitoSetPasswordMutationVariables,
  APITypes.V2CognitoSetPasswordMutation
>;
export const v2CognitoSetStatus = /* GraphQL */ `mutation V2CognitoSetStatus($email: String!, $enabled: Boolean!) {
  v2CognitoSetStatus(email: $email, enabled: $enabled)
}
` as GeneratedMutation<
  APITypes.V2CognitoSetStatusMutationVariables,
  APITypes.V2CognitoSetStatusMutation
>;
export const v2GenerateEnrollment = /* GraphQL */ `mutation V2GenerateEnrollment(
  $courseId: String!
  $scheduleId: String!
  $sessionTypeId: String!
  $startDate: String!
  $studentId: String!
  $userId: String!
) {
  v2GenerateEnrollment(
    courseId: $courseId
    scheduleId: $scheduleId
    sessionTypeId: $sessionTypeId
    startDate: $startDate
    studentId: $studentId
    userId: $userId
  ) {
    cartId
    enrollmentId
    sessions {
      date
      id
      sesionNumber
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.V2GenerateEnrollmentMutationVariables,
  APITypes.V2GenerateEnrollmentMutation
>;
export const v2GmailReply = /* GraphQL */ `mutation V2GmailReply(
  $body: String!
  $fromAccount: String!
  $inReplyToMessageId: String
  $subject: String!
  $threadId: String
  $toEmail: String!
) {
  v2GmailReply(
    body: $body
    fromAccount: $fromAccount
    inReplyToMessageId: $inReplyToMessageId
    subject: $subject
    threadId: $threadId
    toEmail: $toEmail
  ) {
    error
    messageId
    success
    __typename
  }
}
` as GeneratedMutation<
  APITypes.V2GmailReplyMutationVariables,
  APITypes.V2GmailReplyMutation
>;
export const v2GmailSync = /* GraphQL */ `mutation V2GmailSync {
  v2GmailSync
}
` as GeneratedMutation<
  APITypes.V2GmailSyncMutationVariables,
  APITypes.V2GmailSyncMutation
>;
export const v2WebpayCommit = /* GraphQL */ `mutation V2WebpayCommit($token: String!) {
  v2WebpayCommit(token: $token) {
    accounting_date
    amount
    authorization_code
    buy_order
    card_number
    installments_amount
    installments_number
    payment_type_code
    response_code
    session_id
    status
    transaction_date
    vci
    __typename
  }
}
` as GeneratedMutation<
  APITypes.V2WebpayCommitMutationVariables,
  APITypes.V2WebpayCommitMutation
>;
export const v2WebpayStart = /* GraphQL */ `mutation V2WebpayStart(
  $amount: Float!
  $cartId: String!
  $glosa: String!
  $userId: String!
) {
  v2WebpayStart(
    amount: $amount
    cartId: $cartId
    glosa: $glosa
    userId: $userId
  ) {
    orden
    token
    url
    __typename
  }
}
` as GeneratedMutation<
  APITypes.V2WebpayStartMutationVariables,
  APITypes.V2WebpayStartMutation
>;
export const v2WebpayStatus = /* GraphQL */ `mutation V2WebpayStatus($token: String!) {
  v2WebpayStatus(token: $token) {
    accounting_date
    amount
    authorization_code
    buy_order
    card_number
    installments_amount
    installments_number
    payment_type_code
    response_code
    session_id
    status
    transaction_date
    vci
    __typename
  }
}
` as GeneratedMutation<
  APITypes.V2WebpayStatusMutationVariables,
  APITypes.V2WebpayStatusMutation
>;
