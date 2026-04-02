/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateV2AcademyCourses = /* GraphQL */ `subscription OnCreateV2AcademyCourses(
  $filter: ModelSubscriptionV2AcademyCoursesFilterInput
) {
  onCreateV2AcademyCourses(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2AcademyCoursesSubscriptionVariables,
  APITypes.OnCreateV2AcademyCoursesSubscription
>;
export const onCreateV2AcademyEnrollment = /* GraphQL */ `subscription OnCreateV2AcademyEnrollment(
  $filter: ModelSubscriptionV2AcademyEnrollmentFilterInput
) {
  onCreateV2AcademyEnrollment(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2AcademyEnrollmentSubscriptionVariables,
  APITypes.OnCreateV2AcademyEnrollmentSubscription
>;
export const onCreateV2AcademyStudents = /* GraphQL */ `subscription OnCreateV2AcademyStudents(
  $filter: ModelSubscriptionV2AcademyStudentsFilterInput
) {
  onCreateV2AcademyStudents(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2AcademyStudentsSubscriptionVariables,
  APITypes.OnCreateV2AcademyStudentsSubscription
>;
export const onCreateV2Certificates = /* GraphQL */ `subscription OnCreateV2Certificates(
  $filter: ModelSubscriptionV2CertificatesFilterInput
) {
  onCreateV2Certificates(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2CertificatesSubscriptionVariables,
  APITypes.OnCreateV2CertificatesSubscription
>;
export const onCreateV2Coach = /* GraphQL */ `subscription OnCreateV2Coach($filter: ModelSubscriptionV2CoachFilterInput) {
  onCreateV2Coach(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2CoachSubscriptionVariables,
  APITypes.OnCreateV2CoachSubscription
>;
export const onCreateV2CoachSchedule = /* GraphQL */ `subscription OnCreateV2CoachSchedule(
  $filter: ModelSubscriptionV2CoachScheduleFilterInput
) {
  onCreateV2CoachSchedule(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2CoachScheduleSubscriptionVariables,
  APITypes.OnCreateV2CoachScheduleSubscription
>;
export const onCreateV2CommentTickets = /* GraphQL */ `subscription OnCreateV2CommentTickets(
  $filter: ModelSubscriptionV2CommentTicketsFilterInput
) {
  onCreateV2CommentTickets(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2CommentTicketsSubscriptionVariables,
  APITypes.OnCreateV2CommentTicketsSubscription
>;
export const onCreateV2Correlatives = /* GraphQL */ `subscription OnCreateV2Correlatives(
  $filter: ModelSubscriptionV2CorrelativesFilterInput
) {
  onCreateV2Correlatives(filter: $filter) {
    correlative
    createdAt
    id
    type
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateV2CorrelativesSubscriptionVariables,
  APITypes.OnCreateV2CorrelativesSubscription
>;
export const onCreateV2Course = /* GraphQL */ `subscription OnCreateV2Course($filter: ModelSubscriptionV2CourseFilterInput) {
  onCreateV2Course(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2CourseSubscriptionVariables,
  APITypes.OnCreateV2CourseSubscription
>;
export const onCreateV2CourseSessionType = /* GraphQL */ `subscription OnCreateV2CourseSessionType(
  $filter: ModelSubscriptionV2CourseSessionTypeFilterInput
) {
  onCreateV2CourseSessionType(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2CourseSessionTypeSubscriptionVariables,
  APITypes.OnCreateV2CourseSessionTypeSubscription
>;
export const onCreateV2EmailSend = /* GraphQL */ `subscription OnCreateV2EmailSend(
  $filter: ModelSubscriptionV2EmailSendFilterInput
) {
  onCreateV2EmailSend(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2EmailSendSubscriptionVariables,
  APITypes.OnCreateV2EmailSendSubscription
>;
export const onCreateV2Enrollment = /* GraphQL */ `subscription OnCreateV2Enrollment(
  $filter: ModelSubscriptionV2EnrollmentFilterInput
) {
  onCreateV2Enrollment(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2EnrollmentSubscriptionVariables,
  APITypes.OnCreateV2EnrollmentSubscription
>;
export const onCreateV2EvaluationLevel = /* GraphQL */ `subscription OnCreateV2EvaluationLevel(
  $filter: ModelSubscriptionV2EvaluationLevelFilterInput
) {
  onCreateV2EvaluationLevel(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2EvaluationLevelSubscriptionVariables,
  APITypes.OnCreateV2EvaluationLevelSubscription
>;
export const onCreateV2EvaluationObjetives = /* GraphQL */ `subscription OnCreateV2EvaluationObjetives(
  $filter: ModelSubscriptionV2EvaluationObjetivesFilterInput
) {
  onCreateV2EvaluationObjetives(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2EvaluationObjetivesSubscriptionVariables,
  APITypes.OnCreateV2EvaluationObjetivesSubscription
>;
export const onCreateV2GmailInbox = /* GraphQL */ `subscription OnCreateV2GmailInbox(
  $filter: ModelSubscriptionV2GmailInboxFilterInput
) {
  onCreateV2GmailInbox(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2GmailInboxSubscriptionVariables,
  APITypes.OnCreateV2GmailInboxSubscription
>;
export const onCreateV2Location = /* GraphQL */ `subscription OnCreateV2Location(
  $filter: ModelSubscriptionV2LocationFilterInput
) {
  onCreateV2Location(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2LocationSubscriptionVariables,
  APITypes.OnCreateV2LocationSubscription
>;
export const onCreateV2Managers = /* GraphQL */ `subscription OnCreateV2Managers(
  $filter: ModelSubscriptionV2ManagersFilterInput
) {
  onCreateV2Managers(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2ManagersSubscriptionVariables,
  APITypes.OnCreateV2ManagersSubscription
>;
export const onCreateV2Metadata = /* GraphQL */ `subscription OnCreateV2Metadata(
  $filter: ModelSubscriptionV2MetadataFilterInput
) {
  onCreateV2Metadata(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2MetadataSubscriptionVariables,
  APITypes.OnCreateV2MetadataSubscription
>;
export const onCreateV2Parameters = /* GraphQL */ `subscription OnCreateV2Parameters(
  $filter: ModelSubscriptionV2ParametersFilterInput
) {
  onCreateV2Parameters(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2ParametersSubscriptionVariables,
  APITypes.OnCreateV2ParametersSubscription
>;
export const onCreateV2ParametersEnc = /* GraphQL */ `subscription OnCreateV2ParametersEnc(
  $filter: ModelSubscriptionV2ParametersEncFilterInput
) {
  onCreateV2ParametersEnc(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2ParametersEncSubscriptionVariables,
  APITypes.OnCreateV2ParametersEncSubscription
>;
export const onCreateV2PaymentTransactions = /* GraphQL */ `subscription OnCreateV2PaymentTransactions(
  $filter: ModelSubscriptionV2PaymentTransactionsFilterInput
) {
  onCreateV2PaymentTransactions(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2PaymentTransactionsSubscriptionVariables,
  APITypes.OnCreateV2PaymentTransactionsSubscription
>;
export const onCreateV2Permissions = /* GraphQL */ `subscription OnCreateV2Permissions(
  $filter: ModelSubscriptionV2PermissionsFilterInput
) {
  onCreateV2Permissions(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2PermissionsSubscriptionVariables,
  APITypes.OnCreateV2PermissionsSubscription
>;
export const onCreateV2PrivateEnrollment = /* GraphQL */ `subscription OnCreateV2PrivateEnrollment(
  $filter: ModelSubscriptionV2PrivateEnrollmentFilterInput
) {
  onCreateV2PrivateEnrollment(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2PrivateEnrollmentSubscriptionVariables,
  APITypes.OnCreateV2PrivateEnrollmentSubscription
>;
export const onCreateV2Product = /* GraphQL */ `subscription OnCreateV2Product($filter: ModelSubscriptionV2ProductFilterInput) {
  onCreateV2Product(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2ProductSubscriptionVariables,
  APITypes.OnCreateV2ProductSubscription
>;
export const onCreateV2ProfitCenter = /* GraphQL */ `subscription OnCreateV2ProfitCenter(
  $filter: ModelSubscriptionV2ProfitCenterFilterInput
) {
  onCreateV2ProfitCenter(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2ProfitCenterSubscriptionVariables,
  APITypes.OnCreateV2ProfitCenterSubscription
>;
export const onCreateV2Relationship = /* GraphQL */ `subscription OnCreateV2Relationship(
  $filter: ModelSubscriptionV2RelationshipFilterInput
) {
  onCreateV2Relationship(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2RelationshipSubscriptionVariables,
  APITypes.OnCreateV2RelationshipSubscription
>;
export const onCreateV2RolPermissions = /* GraphQL */ `subscription OnCreateV2RolPermissions(
  $filter: ModelSubscriptionV2RolPermissionsFilterInput
) {
  onCreateV2RolPermissions(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2RolPermissionsSubscriptionVariables,
  APITypes.OnCreateV2RolPermissionsSubscription
>;
export const onCreateV2Roles = /* GraphQL */ `subscription OnCreateV2Roles($filter: ModelSubscriptionV2RolesFilterInput) {
  onCreateV2Roles(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2RolesSubscriptionVariables,
  APITypes.OnCreateV2RolesSubscription
>;
export const onCreateV2Schedule = /* GraphQL */ `subscription OnCreateV2Schedule(
  $filter: ModelSubscriptionV2ScheduleFilterInput
) {
  onCreateV2Schedule(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2ScheduleSubscriptionVariables,
  APITypes.OnCreateV2ScheduleSubscription
>;
export const onCreateV2SellersCommission = /* GraphQL */ `subscription OnCreateV2SellersCommission(
  $filter: ModelSubscriptionV2SellersCommissionFilterInput
) {
  onCreateV2SellersCommission(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2SellersCommissionSubscriptionVariables,
  APITypes.OnCreateV2SellersCommissionSubscription
>;
export const onCreateV2SentEmail = /* GraphQL */ `subscription OnCreateV2SentEmail(
  $filter: ModelSubscriptionV2SentEmailFilterInput
) {
  onCreateV2SentEmail(filter: $filter) {
    body
    createdAt
    emailState
    id
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateV2SentEmailSubscriptionVariables,
  APITypes.OnCreateV2SentEmailSubscription
>;
export const onCreateV2SessionDetail = /* GraphQL */ `subscription OnCreateV2SessionDetail(
  $filter: ModelSubscriptionV2SessionDetailFilterInput
) {
  onCreateV2SessionDetail(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2SessionDetailSubscriptionVariables,
  APITypes.OnCreateV2SessionDetailSubscription
>;
export const onCreateV2SessionType = /* GraphQL */ `subscription OnCreateV2SessionType(
  $filter: ModelSubscriptionV2SessionTypeFilterInput
) {
  onCreateV2SessionType(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2SessionTypeSubscriptionVariables,
  APITypes.OnCreateV2SessionTypeSubscription
>;
export const onCreateV2ShoppingCart = /* GraphQL */ `subscription OnCreateV2ShoppingCart(
  $filter: ModelSubscriptionV2ShoppingCartFilterInput
) {
  onCreateV2ShoppingCart(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2ShoppingCartSubscriptionVariables,
  APITypes.OnCreateV2ShoppingCartSubscription
>;
export const onCreateV2ShoppingCartDetail = /* GraphQL */ `subscription OnCreateV2ShoppingCartDetail(
  $filter: ModelSubscriptionV2ShoppingCartDetailFilterInput
) {
  onCreateV2ShoppingCartDetail(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2ShoppingCartDetailSubscriptionVariables,
  APITypes.OnCreateV2ShoppingCartDetailSubscription
>;
export const onCreateV2Student = /* GraphQL */ `subscription OnCreateV2Student($filter: ModelSubscriptionV2StudentFilterInput) {
  onCreateV2Student(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2StudentSubscriptionVariables,
  APITypes.OnCreateV2StudentSubscription
>;
export const onCreateV2StudentEvaluations = /* GraphQL */ `subscription OnCreateV2StudentEvaluations(
  $filter: ModelSubscriptionV2StudentEvaluationsFilterInput
) {
  onCreateV2StudentEvaluations(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2StudentEvaluationsSubscriptionVariables,
  APITypes.OnCreateV2StudentEvaluationsSubscription
>;
export const onCreateV2StudentEvaluationsDetail = /* GraphQL */ `subscription OnCreateV2StudentEvaluationsDetail(
  $filter: ModelSubscriptionV2StudentEvaluationsDetailFilterInput
) {
  onCreateV2StudentEvaluationsDetail(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2StudentEvaluationsDetailSubscriptionVariables,
  APITypes.OnCreateV2StudentEvaluationsDetailSubscription
>;
export const onCreateV2Supplier = /* GraphQL */ `subscription OnCreateV2Supplier(
  $filter: ModelSubscriptionV2SupplierFilterInput
) {
  onCreateV2Supplier(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2SupplierSubscriptionVariables,
  APITypes.OnCreateV2SupplierSubscription
>;
export const onCreateV2SupportTicket = /* GraphQL */ `subscription OnCreateV2SupportTicket(
  $filter: ModelSubscriptionV2SupportTicketFilterInput
) {
  onCreateV2SupportTicket(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2SupportTicketSubscriptionVariables,
  APITypes.OnCreateV2SupportTicketSubscription
>;
export const onCreateV2TicketComment = /* GraphQL */ `subscription OnCreateV2TicketComment(
  $filter: ModelSubscriptionV2TicketCommentFilterInput
) {
  onCreateV2TicketComment(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2TicketCommentSubscriptionVariables,
  APITypes.OnCreateV2TicketCommentSubscription
>;
export const onCreateV2TicketUser = /* GraphQL */ `subscription OnCreateV2TicketUser(
  $filter: ModelSubscriptionV2TicketUserFilterInput
) {
  onCreateV2TicketUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2TicketUserSubscriptionVariables,
  APITypes.OnCreateV2TicketUserSubscription
>;
export const onCreateV2Transactions = /* GraphQL */ `subscription OnCreateV2Transactions(
  $filter: ModelSubscriptionV2TransactionsFilterInput
) {
  onCreateV2Transactions(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2TransactionsSubscriptionVariables,
  APITypes.OnCreateV2TransactionsSubscription
>;
export const onCreateV2UserPermissions = /* GraphQL */ `subscription OnCreateV2UserPermissions(
  $filter: ModelSubscriptionV2UserPermissionsFilterInput
) {
  onCreateV2UserPermissions(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2UserPermissionsSubscriptionVariables,
  APITypes.OnCreateV2UserPermissionsSubscription
>;
export const onCreateV2Users = /* GraphQL */ `subscription OnCreateV2Users($filter: ModelSubscriptionV2UsersFilterInput) {
  onCreateV2Users(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateV2UsersSubscriptionVariables,
  APITypes.OnCreateV2UsersSubscription
>;
export const onDeleteV2AcademyCourses = /* GraphQL */ `subscription OnDeleteV2AcademyCourses(
  $filter: ModelSubscriptionV2AcademyCoursesFilterInput
) {
  onDeleteV2AcademyCourses(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2AcademyCoursesSubscriptionVariables,
  APITypes.OnDeleteV2AcademyCoursesSubscription
>;
export const onDeleteV2AcademyEnrollment = /* GraphQL */ `subscription OnDeleteV2AcademyEnrollment(
  $filter: ModelSubscriptionV2AcademyEnrollmentFilterInput
) {
  onDeleteV2AcademyEnrollment(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2AcademyEnrollmentSubscriptionVariables,
  APITypes.OnDeleteV2AcademyEnrollmentSubscription
>;
export const onDeleteV2AcademyStudents = /* GraphQL */ `subscription OnDeleteV2AcademyStudents(
  $filter: ModelSubscriptionV2AcademyStudentsFilterInput
) {
  onDeleteV2AcademyStudents(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2AcademyStudentsSubscriptionVariables,
  APITypes.OnDeleteV2AcademyStudentsSubscription
>;
export const onDeleteV2Certificates = /* GraphQL */ `subscription OnDeleteV2Certificates(
  $filter: ModelSubscriptionV2CertificatesFilterInput
) {
  onDeleteV2Certificates(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2CertificatesSubscriptionVariables,
  APITypes.OnDeleteV2CertificatesSubscription
>;
export const onDeleteV2Coach = /* GraphQL */ `subscription OnDeleteV2Coach($filter: ModelSubscriptionV2CoachFilterInput) {
  onDeleteV2Coach(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2CoachSubscriptionVariables,
  APITypes.OnDeleteV2CoachSubscription
>;
export const onDeleteV2CoachSchedule = /* GraphQL */ `subscription OnDeleteV2CoachSchedule(
  $filter: ModelSubscriptionV2CoachScheduleFilterInput
) {
  onDeleteV2CoachSchedule(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2CoachScheduleSubscriptionVariables,
  APITypes.OnDeleteV2CoachScheduleSubscription
>;
export const onDeleteV2CommentTickets = /* GraphQL */ `subscription OnDeleteV2CommentTickets(
  $filter: ModelSubscriptionV2CommentTicketsFilterInput
) {
  onDeleteV2CommentTickets(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2CommentTicketsSubscriptionVariables,
  APITypes.OnDeleteV2CommentTicketsSubscription
>;
export const onDeleteV2Correlatives = /* GraphQL */ `subscription OnDeleteV2Correlatives(
  $filter: ModelSubscriptionV2CorrelativesFilterInput
) {
  onDeleteV2Correlatives(filter: $filter) {
    correlative
    createdAt
    id
    type
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteV2CorrelativesSubscriptionVariables,
  APITypes.OnDeleteV2CorrelativesSubscription
>;
export const onDeleteV2Course = /* GraphQL */ `subscription OnDeleteV2Course($filter: ModelSubscriptionV2CourseFilterInput) {
  onDeleteV2Course(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2CourseSubscriptionVariables,
  APITypes.OnDeleteV2CourseSubscription
>;
export const onDeleteV2CourseSessionType = /* GraphQL */ `subscription OnDeleteV2CourseSessionType(
  $filter: ModelSubscriptionV2CourseSessionTypeFilterInput
) {
  onDeleteV2CourseSessionType(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2CourseSessionTypeSubscriptionVariables,
  APITypes.OnDeleteV2CourseSessionTypeSubscription
>;
export const onDeleteV2EmailSend = /* GraphQL */ `subscription OnDeleteV2EmailSend(
  $filter: ModelSubscriptionV2EmailSendFilterInput
) {
  onDeleteV2EmailSend(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2EmailSendSubscriptionVariables,
  APITypes.OnDeleteV2EmailSendSubscription
>;
export const onDeleteV2Enrollment = /* GraphQL */ `subscription OnDeleteV2Enrollment(
  $filter: ModelSubscriptionV2EnrollmentFilterInput
) {
  onDeleteV2Enrollment(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2EnrollmentSubscriptionVariables,
  APITypes.OnDeleteV2EnrollmentSubscription
>;
export const onDeleteV2EvaluationLevel = /* GraphQL */ `subscription OnDeleteV2EvaluationLevel(
  $filter: ModelSubscriptionV2EvaluationLevelFilterInput
) {
  onDeleteV2EvaluationLevel(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2EvaluationLevelSubscriptionVariables,
  APITypes.OnDeleteV2EvaluationLevelSubscription
>;
export const onDeleteV2EvaluationObjetives = /* GraphQL */ `subscription OnDeleteV2EvaluationObjetives(
  $filter: ModelSubscriptionV2EvaluationObjetivesFilterInput
) {
  onDeleteV2EvaluationObjetives(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2EvaluationObjetivesSubscriptionVariables,
  APITypes.OnDeleteV2EvaluationObjetivesSubscription
>;
export const onDeleteV2GmailInbox = /* GraphQL */ `subscription OnDeleteV2GmailInbox(
  $filter: ModelSubscriptionV2GmailInboxFilterInput
) {
  onDeleteV2GmailInbox(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2GmailInboxSubscriptionVariables,
  APITypes.OnDeleteV2GmailInboxSubscription
>;
export const onDeleteV2Location = /* GraphQL */ `subscription OnDeleteV2Location(
  $filter: ModelSubscriptionV2LocationFilterInput
) {
  onDeleteV2Location(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2LocationSubscriptionVariables,
  APITypes.OnDeleteV2LocationSubscription
>;
export const onDeleteV2Managers = /* GraphQL */ `subscription OnDeleteV2Managers(
  $filter: ModelSubscriptionV2ManagersFilterInput
) {
  onDeleteV2Managers(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2ManagersSubscriptionVariables,
  APITypes.OnDeleteV2ManagersSubscription
>;
export const onDeleteV2Metadata = /* GraphQL */ `subscription OnDeleteV2Metadata(
  $filter: ModelSubscriptionV2MetadataFilterInput
) {
  onDeleteV2Metadata(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2MetadataSubscriptionVariables,
  APITypes.OnDeleteV2MetadataSubscription
>;
export const onDeleteV2Parameters = /* GraphQL */ `subscription OnDeleteV2Parameters(
  $filter: ModelSubscriptionV2ParametersFilterInput
) {
  onDeleteV2Parameters(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2ParametersSubscriptionVariables,
  APITypes.OnDeleteV2ParametersSubscription
>;
export const onDeleteV2ParametersEnc = /* GraphQL */ `subscription OnDeleteV2ParametersEnc(
  $filter: ModelSubscriptionV2ParametersEncFilterInput
) {
  onDeleteV2ParametersEnc(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2ParametersEncSubscriptionVariables,
  APITypes.OnDeleteV2ParametersEncSubscription
>;
export const onDeleteV2PaymentTransactions = /* GraphQL */ `subscription OnDeleteV2PaymentTransactions(
  $filter: ModelSubscriptionV2PaymentTransactionsFilterInput
) {
  onDeleteV2PaymentTransactions(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2PaymentTransactionsSubscriptionVariables,
  APITypes.OnDeleteV2PaymentTransactionsSubscription
>;
export const onDeleteV2Permissions = /* GraphQL */ `subscription OnDeleteV2Permissions(
  $filter: ModelSubscriptionV2PermissionsFilterInput
) {
  onDeleteV2Permissions(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2PermissionsSubscriptionVariables,
  APITypes.OnDeleteV2PermissionsSubscription
>;
export const onDeleteV2PrivateEnrollment = /* GraphQL */ `subscription OnDeleteV2PrivateEnrollment(
  $filter: ModelSubscriptionV2PrivateEnrollmentFilterInput
) {
  onDeleteV2PrivateEnrollment(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2PrivateEnrollmentSubscriptionVariables,
  APITypes.OnDeleteV2PrivateEnrollmentSubscription
>;
export const onDeleteV2Product = /* GraphQL */ `subscription OnDeleteV2Product($filter: ModelSubscriptionV2ProductFilterInput) {
  onDeleteV2Product(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2ProductSubscriptionVariables,
  APITypes.OnDeleteV2ProductSubscription
>;
export const onDeleteV2ProfitCenter = /* GraphQL */ `subscription OnDeleteV2ProfitCenter(
  $filter: ModelSubscriptionV2ProfitCenterFilterInput
) {
  onDeleteV2ProfitCenter(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2ProfitCenterSubscriptionVariables,
  APITypes.OnDeleteV2ProfitCenterSubscription
>;
export const onDeleteV2Relationship = /* GraphQL */ `subscription OnDeleteV2Relationship(
  $filter: ModelSubscriptionV2RelationshipFilterInput
) {
  onDeleteV2Relationship(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2RelationshipSubscriptionVariables,
  APITypes.OnDeleteV2RelationshipSubscription
>;
export const onDeleteV2RolPermissions = /* GraphQL */ `subscription OnDeleteV2RolPermissions(
  $filter: ModelSubscriptionV2RolPermissionsFilterInput
) {
  onDeleteV2RolPermissions(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2RolPermissionsSubscriptionVariables,
  APITypes.OnDeleteV2RolPermissionsSubscription
>;
export const onDeleteV2Roles = /* GraphQL */ `subscription OnDeleteV2Roles($filter: ModelSubscriptionV2RolesFilterInput) {
  onDeleteV2Roles(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2RolesSubscriptionVariables,
  APITypes.OnDeleteV2RolesSubscription
>;
export const onDeleteV2Schedule = /* GraphQL */ `subscription OnDeleteV2Schedule(
  $filter: ModelSubscriptionV2ScheduleFilterInput
) {
  onDeleteV2Schedule(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2ScheduleSubscriptionVariables,
  APITypes.OnDeleteV2ScheduleSubscription
>;
export const onDeleteV2SellersCommission = /* GraphQL */ `subscription OnDeleteV2SellersCommission(
  $filter: ModelSubscriptionV2SellersCommissionFilterInput
) {
  onDeleteV2SellersCommission(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2SellersCommissionSubscriptionVariables,
  APITypes.OnDeleteV2SellersCommissionSubscription
>;
export const onDeleteV2SentEmail = /* GraphQL */ `subscription OnDeleteV2SentEmail(
  $filter: ModelSubscriptionV2SentEmailFilterInput
) {
  onDeleteV2SentEmail(filter: $filter) {
    body
    createdAt
    emailState
    id
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteV2SentEmailSubscriptionVariables,
  APITypes.OnDeleteV2SentEmailSubscription
>;
export const onDeleteV2SessionDetail = /* GraphQL */ `subscription OnDeleteV2SessionDetail(
  $filter: ModelSubscriptionV2SessionDetailFilterInput
) {
  onDeleteV2SessionDetail(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2SessionDetailSubscriptionVariables,
  APITypes.OnDeleteV2SessionDetailSubscription
>;
export const onDeleteV2SessionType = /* GraphQL */ `subscription OnDeleteV2SessionType(
  $filter: ModelSubscriptionV2SessionTypeFilterInput
) {
  onDeleteV2SessionType(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2SessionTypeSubscriptionVariables,
  APITypes.OnDeleteV2SessionTypeSubscription
>;
export const onDeleteV2ShoppingCart = /* GraphQL */ `subscription OnDeleteV2ShoppingCart(
  $filter: ModelSubscriptionV2ShoppingCartFilterInput
) {
  onDeleteV2ShoppingCart(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2ShoppingCartSubscriptionVariables,
  APITypes.OnDeleteV2ShoppingCartSubscription
>;
export const onDeleteV2ShoppingCartDetail = /* GraphQL */ `subscription OnDeleteV2ShoppingCartDetail(
  $filter: ModelSubscriptionV2ShoppingCartDetailFilterInput
) {
  onDeleteV2ShoppingCartDetail(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2ShoppingCartDetailSubscriptionVariables,
  APITypes.OnDeleteV2ShoppingCartDetailSubscription
>;
export const onDeleteV2Student = /* GraphQL */ `subscription OnDeleteV2Student($filter: ModelSubscriptionV2StudentFilterInput) {
  onDeleteV2Student(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2StudentSubscriptionVariables,
  APITypes.OnDeleteV2StudentSubscription
>;
export const onDeleteV2StudentEvaluations = /* GraphQL */ `subscription OnDeleteV2StudentEvaluations(
  $filter: ModelSubscriptionV2StudentEvaluationsFilterInput
) {
  onDeleteV2StudentEvaluations(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2StudentEvaluationsSubscriptionVariables,
  APITypes.OnDeleteV2StudentEvaluationsSubscription
>;
export const onDeleteV2StudentEvaluationsDetail = /* GraphQL */ `subscription OnDeleteV2StudentEvaluationsDetail(
  $filter: ModelSubscriptionV2StudentEvaluationsDetailFilterInput
) {
  onDeleteV2StudentEvaluationsDetail(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2StudentEvaluationsDetailSubscriptionVariables,
  APITypes.OnDeleteV2StudentEvaluationsDetailSubscription
>;
export const onDeleteV2Supplier = /* GraphQL */ `subscription OnDeleteV2Supplier(
  $filter: ModelSubscriptionV2SupplierFilterInput
) {
  onDeleteV2Supplier(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2SupplierSubscriptionVariables,
  APITypes.OnDeleteV2SupplierSubscription
>;
export const onDeleteV2SupportTicket = /* GraphQL */ `subscription OnDeleteV2SupportTicket(
  $filter: ModelSubscriptionV2SupportTicketFilterInput
) {
  onDeleteV2SupportTicket(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2SupportTicketSubscriptionVariables,
  APITypes.OnDeleteV2SupportTicketSubscription
>;
export const onDeleteV2TicketComment = /* GraphQL */ `subscription OnDeleteV2TicketComment(
  $filter: ModelSubscriptionV2TicketCommentFilterInput
) {
  onDeleteV2TicketComment(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2TicketCommentSubscriptionVariables,
  APITypes.OnDeleteV2TicketCommentSubscription
>;
export const onDeleteV2TicketUser = /* GraphQL */ `subscription OnDeleteV2TicketUser(
  $filter: ModelSubscriptionV2TicketUserFilterInput
) {
  onDeleteV2TicketUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2TicketUserSubscriptionVariables,
  APITypes.OnDeleteV2TicketUserSubscription
>;
export const onDeleteV2Transactions = /* GraphQL */ `subscription OnDeleteV2Transactions(
  $filter: ModelSubscriptionV2TransactionsFilterInput
) {
  onDeleteV2Transactions(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2TransactionsSubscriptionVariables,
  APITypes.OnDeleteV2TransactionsSubscription
>;
export const onDeleteV2UserPermissions = /* GraphQL */ `subscription OnDeleteV2UserPermissions(
  $filter: ModelSubscriptionV2UserPermissionsFilterInput
) {
  onDeleteV2UserPermissions(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2UserPermissionsSubscriptionVariables,
  APITypes.OnDeleteV2UserPermissionsSubscription
>;
export const onDeleteV2Users = /* GraphQL */ `subscription OnDeleteV2Users($filter: ModelSubscriptionV2UsersFilterInput) {
  onDeleteV2Users(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteV2UsersSubscriptionVariables,
  APITypes.OnDeleteV2UsersSubscription
>;
export const onUpdateV2AcademyCourses = /* GraphQL */ `subscription OnUpdateV2AcademyCourses(
  $filter: ModelSubscriptionV2AcademyCoursesFilterInput
) {
  onUpdateV2AcademyCourses(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2AcademyCoursesSubscriptionVariables,
  APITypes.OnUpdateV2AcademyCoursesSubscription
>;
export const onUpdateV2AcademyEnrollment = /* GraphQL */ `subscription OnUpdateV2AcademyEnrollment(
  $filter: ModelSubscriptionV2AcademyEnrollmentFilterInput
) {
  onUpdateV2AcademyEnrollment(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2AcademyEnrollmentSubscriptionVariables,
  APITypes.OnUpdateV2AcademyEnrollmentSubscription
>;
export const onUpdateV2AcademyStudents = /* GraphQL */ `subscription OnUpdateV2AcademyStudents(
  $filter: ModelSubscriptionV2AcademyStudentsFilterInput
) {
  onUpdateV2AcademyStudents(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2AcademyStudentsSubscriptionVariables,
  APITypes.OnUpdateV2AcademyStudentsSubscription
>;
export const onUpdateV2Certificates = /* GraphQL */ `subscription OnUpdateV2Certificates(
  $filter: ModelSubscriptionV2CertificatesFilterInput
) {
  onUpdateV2Certificates(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2CertificatesSubscriptionVariables,
  APITypes.OnUpdateV2CertificatesSubscription
>;
export const onUpdateV2Coach = /* GraphQL */ `subscription OnUpdateV2Coach($filter: ModelSubscriptionV2CoachFilterInput) {
  onUpdateV2Coach(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2CoachSubscriptionVariables,
  APITypes.OnUpdateV2CoachSubscription
>;
export const onUpdateV2CoachSchedule = /* GraphQL */ `subscription OnUpdateV2CoachSchedule(
  $filter: ModelSubscriptionV2CoachScheduleFilterInput
) {
  onUpdateV2CoachSchedule(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2CoachScheduleSubscriptionVariables,
  APITypes.OnUpdateV2CoachScheduleSubscription
>;
export const onUpdateV2CommentTickets = /* GraphQL */ `subscription OnUpdateV2CommentTickets(
  $filter: ModelSubscriptionV2CommentTicketsFilterInput
) {
  onUpdateV2CommentTickets(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2CommentTicketsSubscriptionVariables,
  APITypes.OnUpdateV2CommentTicketsSubscription
>;
export const onUpdateV2Correlatives = /* GraphQL */ `subscription OnUpdateV2Correlatives(
  $filter: ModelSubscriptionV2CorrelativesFilterInput
) {
  onUpdateV2Correlatives(filter: $filter) {
    correlative
    createdAt
    id
    type
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateV2CorrelativesSubscriptionVariables,
  APITypes.OnUpdateV2CorrelativesSubscription
>;
export const onUpdateV2Course = /* GraphQL */ `subscription OnUpdateV2Course($filter: ModelSubscriptionV2CourseFilterInput) {
  onUpdateV2Course(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2CourseSubscriptionVariables,
  APITypes.OnUpdateV2CourseSubscription
>;
export const onUpdateV2CourseSessionType = /* GraphQL */ `subscription OnUpdateV2CourseSessionType(
  $filter: ModelSubscriptionV2CourseSessionTypeFilterInput
) {
  onUpdateV2CourseSessionType(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2CourseSessionTypeSubscriptionVariables,
  APITypes.OnUpdateV2CourseSessionTypeSubscription
>;
export const onUpdateV2EmailSend = /* GraphQL */ `subscription OnUpdateV2EmailSend(
  $filter: ModelSubscriptionV2EmailSendFilterInput
) {
  onUpdateV2EmailSend(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2EmailSendSubscriptionVariables,
  APITypes.OnUpdateV2EmailSendSubscription
>;
export const onUpdateV2Enrollment = /* GraphQL */ `subscription OnUpdateV2Enrollment(
  $filter: ModelSubscriptionV2EnrollmentFilterInput
) {
  onUpdateV2Enrollment(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2EnrollmentSubscriptionVariables,
  APITypes.OnUpdateV2EnrollmentSubscription
>;
export const onUpdateV2EvaluationLevel = /* GraphQL */ `subscription OnUpdateV2EvaluationLevel(
  $filter: ModelSubscriptionV2EvaluationLevelFilterInput
) {
  onUpdateV2EvaluationLevel(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2EvaluationLevelSubscriptionVariables,
  APITypes.OnUpdateV2EvaluationLevelSubscription
>;
export const onUpdateV2EvaluationObjetives = /* GraphQL */ `subscription OnUpdateV2EvaluationObjetives(
  $filter: ModelSubscriptionV2EvaluationObjetivesFilterInput
) {
  onUpdateV2EvaluationObjetives(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2EvaluationObjetivesSubscriptionVariables,
  APITypes.OnUpdateV2EvaluationObjetivesSubscription
>;
export const onUpdateV2GmailInbox = /* GraphQL */ `subscription OnUpdateV2GmailInbox(
  $filter: ModelSubscriptionV2GmailInboxFilterInput
) {
  onUpdateV2GmailInbox(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2GmailInboxSubscriptionVariables,
  APITypes.OnUpdateV2GmailInboxSubscription
>;
export const onUpdateV2Location = /* GraphQL */ `subscription OnUpdateV2Location(
  $filter: ModelSubscriptionV2LocationFilterInput
) {
  onUpdateV2Location(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2LocationSubscriptionVariables,
  APITypes.OnUpdateV2LocationSubscription
>;
export const onUpdateV2Managers = /* GraphQL */ `subscription OnUpdateV2Managers(
  $filter: ModelSubscriptionV2ManagersFilterInput
) {
  onUpdateV2Managers(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2ManagersSubscriptionVariables,
  APITypes.OnUpdateV2ManagersSubscription
>;
export const onUpdateV2Metadata = /* GraphQL */ `subscription OnUpdateV2Metadata(
  $filter: ModelSubscriptionV2MetadataFilterInput
) {
  onUpdateV2Metadata(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2MetadataSubscriptionVariables,
  APITypes.OnUpdateV2MetadataSubscription
>;
export const onUpdateV2Parameters = /* GraphQL */ `subscription OnUpdateV2Parameters(
  $filter: ModelSubscriptionV2ParametersFilterInput
) {
  onUpdateV2Parameters(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2ParametersSubscriptionVariables,
  APITypes.OnUpdateV2ParametersSubscription
>;
export const onUpdateV2ParametersEnc = /* GraphQL */ `subscription OnUpdateV2ParametersEnc(
  $filter: ModelSubscriptionV2ParametersEncFilterInput
) {
  onUpdateV2ParametersEnc(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2ParametersEncSubscriptionVariables,
  APITypes.OnUpdateV2ParametersEncSubscription
>;
export const onUpdateV2PaymentTransactions = /* GraphQL */ `subscription OnUpdateV2PaymentTransactions(
  $filter: ModelSubscriptionV2PaymentTransactionsFilterInput
) {
  onUpdateV2PaymentTransactions(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2PaymentTransactionsSubscriptionVariables,
  APITypes.OnUpdateV2PaymentTransactionsSubscription
>;
export const onUpdateV2Permissions = /* GraphQL */ `subscription OnUpdateV2Permissions(
  $filter: ModelSubscriptionV2PermissionsFilterInput
) {
  onUpdateV2Permissions(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2PermissionsSubscriptionVariables,
  APITypes.OnUpdateV2PermissionsSubscription
>;
export const onUpdateV2PrivateEnrollment = /* GraphQL */ `subscription OnUpdateV2PrivateEnrollment(
  $filter: ModelSubscriptionV2PrivateEnrollmentFilterInput
) {
  onUpdateV2PrivateEnrollment(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2PrivateEnrollmentSubscriptionVariables,
  APITypes.OnUpdateV2PrivateEnrollmentSubscription
>;
export const onUpdateV2Product = /* GraphQL */ `subscription OnUpdateV2Product($filter: ModelSubscriptionV2ProductFilterInput) {
  onUpdateV2Product(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2ProductSubscriptionVariables,
  APITypes.OnUpdateV2ProductSubscription
>;
export const onUpdateV2ProfitCenter = /* GraphQL */ `subscription OnUpdateV2ProfitCenter(
  $filter: ModelSubscriptionV2ProfitCenterFilterInput
) {
  onUpdateV2ProfitCenter(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2ProfitCenterSubscriptionVariables,
  APITypes.OnUpdateV2ProfitCenterSubscription
>;
export const onUpdateV2Relationship = /* GraphQL */ `subscription OnUpdateV2Relationship(
  $filter: ModelSubscriptionV2RelationshipFilterInput
) {
  onUpdateV2Relationship(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2RelationshipSubscriptionVariables,
  APITypes.OnUpdateV2RelationshipSubscription
>;
export const onUpdateV2RolPermissions = /* GraphQL */ `subscription OnUpdateV2RolPermissions(
  $filter: ModelSubscriptionV2RolPermissionsFilterInput
) {
  onUpdateV2RolPermissions(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2RolPermissionsSubscriptionVariables,
  APITypes.OnUpdateV2RolPermissionsSubscription
>;
export const onUpdateV2Roles = /* GraphQL */ `subscription OnUpdateV2Roles($filter: ModelSubscriptionV2RolesFilterInput) {
  onUpdateV2Roles(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2RolesSubscriptionVariables,
  APITypes.OnUpdateV2RolesSubscription
>;
export const onUpdateV2Schedule = /* GraphQL */ `subscription OnUpdateV2Schedule(
  $filter: ModelSubscriptionV2ScheduleFilterInput
) {
  onUpdateV2Schedule(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2ScheduleSubscriptionVariables,
  APITypes.OnUpdateV2ScheduleSubscription
>;
export const onUpdateV2SellersCommission = /* GraphQL */ `subscription OnUpdateV2SellersCommission(
  $filter: ModelSubscriptionV2SellersCommissionFilterInput
) {
  onUpdateV2SellersCommission(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2SellersCommissionSubscriptionVariables,
  APITypes.OnUpdateV2SellersCommissionSubscription
>;
export const onUpdateV2SentEmail = /* GraphQL */ `subscription OnUpdateV2SentEmail(
  $filter: ModelSubscriptionV2SentEmailFilterInput
) {
  onUpdateV2SentEmail(filter: $filter) {
    body
    createdAt
    emailState
    id
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateV2SentEmailSubscriptionVariables,
  APITypes.OnUpdateV2SentEmailSubscription
>;
export const onUpdateV2SessionDetail = /* GraphQL */ `subscription OnUpdateV2SessionDetail(
  $filter: ModelSubscriptionV2SessionDetailFilterInput
) {
  onUpdateV2SessionDetail(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2SessionDetailSubscriptionVariables,
  APITypes.OnUpdateV2SessionDetailSubscription
>;
export const onUpdateV2SessionType = /* GraphQL */ `subscription OnUpdateV2SessionType(
  $filter: ModelSubscriptionV2SessionTypeFilterInput
) {
  onUpdateV2SessionType(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2SessionTypeSubscriptionVariables,
  APITypes.OnUpdateV2SessionTypeSubscription
>;
export const onUpdateV2ShoppingCart = /* GraphQL */ `subscription OnUpdateV2ShoppingCart(
  $filter: ModelSubscriptionV2ShoppingCartFilterInput
) {
  onUpdateV2ShoppingCart(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2ShoppingCartSubscriptionVariables,
  APITypes.OnUpdateV2ShoppingCartSubscription
>;
export const onUpdateV2ShoppingCartDetail = /* GraphQL */ `subscription OnUpdateV2ShoppingCartDetail(
  $filter: ModelSubscriptionV2ShoppingCartDetailFilterInput
) {
  onUpdateV2ShoppingCartDetail(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2ShoppingCartDetailSubscriptionVariables,
  APITypes.OnUpdateV2ShoppingCartDetailSubscription
>;
export const onUpdateV2Student = /* GraphQL */ `subscription OnUpdateV2Student($filter: ModelSubscriptionV2StudentFilterInput) {
  onUpdateV2Student(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2StudentSubscriptionVariables,
  APITypes.OnUpdateV2StudentSubscription
>;
export const onUpdateV2StudentEvaluations = /* GraphQL */ `subscription OnUpdateV2StudentEvaluations(
  $filter: ModelSubscriptionV2StudentEvaluationsFilterInput
) {
  onUpdateV2StudentEvaluations(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2StudentEvaluationsSubscriptionVariables,
  APITypes.OnUpdateV2StudentEvaluationsSubscription
>;
export const onUpdateV2StudentEvaluationsDetail = /* GraphQL */ `subscription OnUpdateV2StudentEvaluationsDetail(
  $filter: ModelSubscriptionV2StudentEvaluationsDetailFilterInput
) {
  onUpdateV2StudentEvaluationsDetail(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2StudentEvaluationsDetailSubscriptionVariables,
  APITypes.OnUpdateV2StudentEvaluationsDetailSubscription
>;
export const onUpdateV2Supplier = /* GraphQL */ `subscription OnUpdateV2Supplier(
  $filter: ModelSubscriptionV2SupplierFilterInput
) {
  onUpdateV2Supplier(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2SupplierSubscriptionVariables,
  APITypes.OnUpdateV2SupplierSubscription
>;
export const onUpdateV2SupportTicket = /* GraphQL */ `subscription OnUpdateV2SupportTicket(
  $filter: ModelSubscriptionV2SupportTicketFilterInput
) {
  onUpdateV2SupportTicket(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2SupportTicketSubscriptionVariables,
  APITypes.OnUpdateV2SupportTicketSubscription
>;
export const onUpdateV2TicketComment = /* GraphQL */ `subscription OnUpdateV2TicketComment(
  $filter: ModelSubscriptionV2TicketCommentFilterInput
) {
  onUpdateV2TicketComment(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2TicketCommentSubscriptionVariables,
  APITypes.OnUpdateV2TicketCommentSubscription
>;
export const onUpdateV2TicketUser = /* GraphQL */ `subscription OnUpdateV2TicketUser(
  $filter: ModelSubscriptionV2TicketUserFilterInput
) {
  onUpdateV2TicketUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2TicketUserSubscriptionVariables,
  APITypes.OnUpdateV2TicketUserSubscription
>;
export const onUpdateV2Transactions = /* GraphQL */ `subscription OnUpdateV2Transactions(
  $filter: ModelSubscriptionV2TransactionsFilterInput
) {
  onUpdateV2Transactions(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2TransactionsSubscriptionVariables,
  APITypes.OnUpdateV2TransactionsSubscription
>;
export const onUpdateV2UserPermissions = /* GraphQL */ `subscription OnUpdateV2UserPermissions(
  $filter: ModelSubscriptionV2UserPermissionsFilterInput
) {
  onUpdateV2UserPermissions(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2UserPermissionsSubscriptionVariables,
  APITypes.OnUpdateV2UserPermissionsSubscription
>;
export const onUpdateV2Users = /* GraphQL */ `subscription OnUpdateV2Users($filter: ModelSubscriptionV2UsersFilterInput) {
  onUpdateV2Users(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateV2UsersSubscriptionVariables,
  APITypes.OnUpdateV2UsersSubscription
>;
