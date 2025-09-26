/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAcademyStudents = /* GraphQL */ `
  query GetAcademyStudents($id: ID!) {
    getAcademyStudents(id: $id) {
      id
      status
      presence
      name
      urlImage
      email
      birthdate
      years
      address
      country
      phone
      profession
      studiesRelated
      medicalHistory
      emergencyContact
      isPaid
      isSponsored
      hasAgreement
      companyAgreement
      certificate {
        id
        title
        studentName
        instructorName
        instructorSignature
        descriptionOne
        theoreticalHours
        practicalHours
        date
        isOfficialCertification
        location
        createdAt
        updatedAt
        certificatesStudentId
        certificatesCourseId
        __typename
      }
      enrollments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      academyStudentsCertificateId
      __typename
    }
  }
`;
export const listAcademyStudents = /* GraphQL */ `
  query ListAcademyStudents(
    $id: ID
    $filter: ModelAcademyStudentsFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listAcademyStudents(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        status
        presence
        name
        urlImage
        email
        birthdate
        years
        address
        country
        phone
        profession
        studiesRelated
        medicalHistory
        emergencyContact
        isPaid
        isSponsored
        hasAgreement
        companyAgreement
        createdAt
        updatedAt
        academyStudentsCertificateId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getAcademyEnrollment = /* GraphQL */ `
  query GetAcademyEnrollment($id: ID!) {
    getAcademyEnrollment(id: $id) {
      id
      amountPaid
      date
      wasDeleted
      wasPaid
      students {
        id
        status
        presence
        name
        urlImage
        email
        birthdate
        years
        address
        country
        phone
        profession
        studiesRelated
        medicalHistory
        emergencyContact
        isPaid
        isSponsored
        hasAgreement
        companyAgreement
        createdAt
        updatedAt
        academyStudentsCertificateId
        __typename
      }
      user
      shoppingCartDetail {
        id
        type
        quantity
        amount
        detail
        wasDeleted
        createdAt
        updatedAt
        shoppingCartCartDetailsId
        shoppingCartDetailEnrollmentId
        shoppingCartDetailAcademyEnrollmentId
        __typename
      }
      course {
        id
        name
        description
        Address
        mapurl
        isActive
        createdAt
        updatedAt
        academyCoursesCertificateId
        __typename
      }
      createdAt
      updatedAt
      academyStudentsEnrollmentsId
      academyCoursesEnrollmentsId
      academyEnrollmentShoppingCartDetailId
      __typename
    }
  }
`;
export const listAcademyEnrollments = /* GraphQL */ `
  query ListAcademyEnrollments(
    $id: ID
    $filter: ModelAcademyEnrollmentFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listAcademyEnrollments(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        amountPaid
        date
        wasDeleted
        wasPaid
        user
        createdAt
        updatedAt
        academyStudentsEnrollmentsId
        academyCoursesEnrollmentsId
        academyEnrollmentShoppingCartDetailId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getAcademyCourses = /* GraphQL */ `
  query GetAcademyCourses($id: ID!) {
    getAcademyCourses(id: $id) {
      id
      name
      description
      Address
      mapurl
      isActive
      enrollments {
        nextToken
        __typename
      }
      certificate {
        id
        title
        studentName
        instructorName
        instructorSignature
        descriptionOne
        theoreticalHours
        practicalHours
        date
        isOfficialCertification
        location
        createdAt
        updatedAt
        certificatesStudentId
        certificatesCourseId
        __typename
      }
      createdAt
      updatedAt
      academyCoursesCertificateId
      __typename
    }
  }
`;
export const listAcademyCourses = /* GraphQL */ `
  query ListAcademyCourses(
    $id: ID
    $filter: ModelAcademyCoursesFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listAcademyCourses(
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
        Address
        mapurl
        isActive
        createdAt
        updatedAt
        academyCoursesCertificateId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getCertificates = /* GraphQL */ `
  query GetCertificates($id: ID!) {
    getCertificates(id: $id) {
      id
      title
      studentName
      instructorName
      instructorSignature
      descriptionOne
      theoreticalHours
      practicalHours
      date
      isOfficialCertification
      location
      student {
        id
        status
        presence
        name
        urlImage
        email
        birthdate
        years
        address
        country
        phone
        profession
        studiesRelated
        medicalHistory
        emergencyContact
        isPaid
        isSponsored
        hasAgreement
        companyAgreement
        createdAt
        updatedAt
        academyStudentsCertificateId
        __typename
      }
      course {
        id
        name
        description
        Address
        mapurl
        isActive
        createdAt
        updatedAt
        academyCoursesCertificateId
        __typename
      }
      createdAt
      updatedAt
      certificatesStudentId
      certificatesCourseId
      __typename
    }
  }
`;
export const listCertificates = /* GraphQL */ `
  query ListCertificates(
    $id: ID
    $filter: ModelCertificatesFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCertificates(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        title
        studentName
        instructorName
        instructorSignature
        descriptionOne
        theoreticalHours
        practicalHours
        date
        isOfficialCertification
        location
        createdAt
        updatedAt
        certificatesStudentId
        certificatesCourseId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getEmailSend = /* GraphQL */ `
  query GetEmailSend($id: ID!) {
    getEmailSend(id: $id) {
      id
      date
      typeSend
      type
      contentEmail
      contentMessage
      phone
      phoneState
      email
      emailState
      studentId
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
        country
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
        studentSessionDetailDate
        __typename
      }
      userSend {
        id
        name
        email
        validated
        isEmployed
        isAcademyStudent
        salesCommission
        contactPhone
        ig
        firstContact
        streetAddress
        city
        state
        zipCode
        country
        latitude
        longitude
        zoomLevel
        createdAt
        updatedAt
        usersRolesId
        __typename
      }
      enrollment {
        id
        amountPaid
        startDate
        endDate
        wasDeleted
        wasPaid
        timeAWeek
        numberOfSessions
        sessionsLeft
        sessionsUsed
        scheduleId
        scheduleName
        paymentToken
        typeOfPlan
        createdAt
        updatedAt
        courseEnrollmentsId
        sessionTypeEnrollmentsId
        studentEnrollmentsId
        usersEnrollmentsId
        enrollmentShoppingCartDetailId
        __typename
      }
      createdAt
      updatedAt
      privateEnrollmentEmailSendsId
      studentEmailSendId
      enrollmentEmailSendsId
      usersEmailSendId
      __typename
    }
  }
`;
export const listEmailSends = /* GraphQL */ `
  query ListEmailSends(
    $id: ID
    $filter: ModelEmailSendFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listEmailSends(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        date
        typeSend
        type
        contentEmail
        contentMessage
        phone
        phoneState
        email
        emailState
        studentId
        createdAt
        updatedAt
        privateEnrollmentEmailSendsId
        studentEmailSendId
        enrollmentEmailSendsId
        usersEmailSendId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getSentEmail = /* GraphQL */ `
  query GetSentEmail($id: ID!) {
    getSentEmail(id: $id) {
      id
      emailState
      body
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listSentEmails = /* GraphQL */ `
  query ListSentEmails(
    $id: ID
    $filter: ModelSentEmailFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSentEmails(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        emailState
        body
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getEvaluationLevel = /* GraphQL */ `
  query GetEvaluationLevel($id: ID!) {
    getEvaluationLevel(id: $id) {
      id
      ico
      name
      description
      startingAge
      endingAge
      order
      evaluationObjectives {
        nextToken
        __typename
      }
      studentEvaluations {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listEvaluationLevels = /* GraphQL */ `
  query ListEvaluationLevels(
    $id: ID
    $filter: ModelEvaluationLevelFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listEvaluationLevels(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        ico
        name
        description
        startingAge
        endingAge
        order
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getEvaluationObjetives = /* GraphQL */ `
  query GetEvaluationObjetives($id: ID!) {
    getEvaluationObjetives(id: $id) {
      id
      texto
      isMandatory
      evaluationLevel {
        id
        ico
        name
        description
        startingAge
        endingAge
        order
        createdAt
        updatedAt
        __typename
      }
      studentEvaluationsDetails {
        nextToken
        __typename
      }
      isActive
      createdAt
      updatedAt
      evaluationLevelEvaluationObjectivesId
      __typename
    }
  }
`;
export const listEvaluationObjetives = /* GraphQL */ `
  query ListEvaluationObjetives(
    $id: ID
    $filter: ModelEvaluationObjetivesFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listEvaluationObjetives(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        texto
        isMandatory
        isActive
        createdAt
        updatedAt
        evaluationLevelEvaluationObjectivesId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getStudentEvaluations = /* GraphQL */ `
  query GetStudentEvaluations($id: ID!) {
    getStudentEvaluations(id: $id) {
      id
      date
      previousLevel
      sessionsCarriedOut
      age
      wasApproved
      observations
      studentId
      evaluationLevelId
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
        country
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
        studentSessionDetailDate
        __typename
      }
      evaluationLevel {
        id
        ico
        name
        description
        startingAge
        endingAge
        order
        createdAt
        updatedAt
        __typename
      }
      studentEvaluationsDetails {
        nextToken
        __typename
      }
      userId
      user {
        id
        name
        email
        validated
        isEmployed
        isAcademyStudent
        salesCommission
        contactPhone
        ig
        firstContact
        streetAddress
        city
        state
        zipCode
        country
        latitude
        longitude
        zoomLevel
        createdAt
        updatedAt
        usersRolesId
        __typename
      }
      createdAt
      updatedAt
      evaluationLevelStudentEvaluationsId
      studentStudentEvaluationsId
      usersStudentEvaluationsId
      __typename
    }
  }
`;
export const listStudentEvaluations = /* GraphQL */ `
  query ListStudentEvaluations(
    $id: ID
    $filter: ModelStudentEvaluationsFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listStudentEvaluations(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        date
        previousLevel
        sessionsCarriedOut
        age
        wasApproved
        observations
        studentId
        evaluationLevelId
        userId
        createdAt
        updatedAt
        evaluationLevelStudentEvaluationsId
        studentStudentEvaluationsId
        usersStudentEvaluationsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getStudentEvaluationsDetail = /* GraphQL */ `
  query GetStudentEvaluationsDetail($id: ID!) {
    getStudentEvaluationsDetail(id: $id) {
      id
      text
      wasAchieved
      studentEvaluationId
      studentEvaluation {
        id
        date
        previousLevel
        sessionsCarriedOut
        age
        wasApproved
        observations
        studentId
        evaluationLevelId
        userId
        createdAt
        updatedAt
        evaluationLevelStudentEvaluationsId
        studentStudentEvaluationsId
        usersStudentEvaluationsId
        __typename
      }
      evaluationObjectiveId
      evaluationObjective {
        id
        texto
        isMandatory
        isActive
        createdAt
        updatedAt
        evaluationLevelEvaluationObjectivesId
        __typename
      }
      createdAt
      updatedAt
      evaluationObjetivesStudentEvaluationsDetailsId
      __typename
    }
  }
`;
export const listStudentEvaluationsDetails = /* GraphQL */ `
  query ListStudentEvaluationsDetails(
    $id: ID
    $filter: ModelStudentEvaluationsDetailFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listStudentEvaluationsDetails(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        text
        wasAchieved
        studentEvaluationId
        evaluationObjectiveId
        createdAt
        updatedAt
        evaluationObjetivesStudentEvaluationsDetailsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getExpense = /* GraphQL */ `
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
        country
        minimumTemperature
        maximumTemperature
        address
        phone
        imageMap
        urlMap
        directions
        isActive
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
export const listExpenses = /* GraphQL */ `
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
export const getParametersEnc = /* GraphQL */ `
  query GetParametersEnc($id: ID!) {
    getParametersEnc(id: $id) {
      id
      typeOfParameter {
        nextToken
        __typename
      }
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listParametersEncs = /* GraphQL */ `
  query ListParametersEncs(
    $id: ID
    $filter: ModelParametersEncFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listParametersEncs(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        description
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getMetadata = /* GraphQL */ `
  query GetMetadata($id: ID!) {
    getMetadata(id: $id) {
      id
      key
      value
      metadata {
        id
        label
        value
        country
        idParent
        createdAt
        updatedAt
        parametersEncTypeOfParameterId
        __typename
      }
      createdAt
      updatedAt
      parametersMetadataId
      __typename
    }
  }
`;
export const listMetadata = /* GraphQL */ `
  query ListMetadata(
    $filter: ModelMetadataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMetadata(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        key
        value
        createdAt
        updatedAt
        parametersMetadataId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getParameters = /* GraphQL */ `
  query GetParameters($id: ID!) {
    getParameters(id: $id) {
      id
      typeOfParameter {
        id
        description
        createdAt
        updatedAt
        __typename
      }
      label
      value
      country
      idParent
      metadata {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      parametersEncTypeOfParameterId
      __typename
    }
  }
`;
export const listParameters = /* GraphQL */ `
  query ListParameters(
    $id: ID
    $filter: ModelParametersFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listParameters(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        label
        value
        country
        idParent
        createdAt
        updatedAt
        parametersEncTypeOfParameterId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPrivateEnrollment = /* GraphQL */ `
  query GetPrivateEnrollment($id: ID!) {
    getPrivateEnrollment(id: $id) {
      id
      amountPaid
      startDate
      endDate
      wasDeleted
      wasPaid
      timeAWeek
      numberOfSessions
      scheduleId
      scheduleName
      paymentToken
      typeOfPlan
      streetAddress
      city
      state
      zipCode
      country
      latitude
      longitude
      zoomLevel
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
        country
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
        studentSessionDetailDate
        __typename
      }
      user {
        id
        name
        email
        validated
        isEmployed
        isAcademyStudent
        salesCommission
        contactPhone
        ig
        firstContact
        streetAddress
        city
        state
        zipCode
        country
        latitude
        longitude
        zoomLevel
        createdAt
        updatedAt
        usersRolesId
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
        isActive
        isTestClass
        packValidity
        createdAt
        updatedAt
        __typename
      }
      shoppingCartDetail {
        id
        type
        quantity
        amount
        detail
        wasDeleted
        createdAt
        updatedAt
        shoppingCartCartDetailsId
        shoppingCartDetailEnrollmentId
        shoppingCartDetailAcademyEnrollmentId
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
      sessionDetails {
        nextToken
        __typename
      }
      emailSends {
        nextToken
        __typename
      }
      coach {
        id
        name
        email
        validated
        isEmployed
        isAcademyStudent
        salesCommission
        contactPhone
        ig
        firstContact
        streetAddress
        city
        state
        zipCode
        country
        latitude
        longitude
        zoomLevel
        createdAt
        updatedAt
        usersRolesId
        __typename
      }
      createdAt
      updatedAt
      coursePrivateEnrollmentsId
      sessionTypePrivateEnrollmentsId
      studentPrivateEnrollmentsId
      usersPrivateEnrollmentsId
      privateEnrollmentShoppingCartDetailId
      __typename
    }
  }
`;
export const listPrivateEnrollments = /* GraphQL */ `
  query ListPrivateEnrollments(
    $id: ID
    $filter: ModelPrivateEnrollmentFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPrivateEnrollments(
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
        wasDeleted
        wasPaid
        timeAWeek
        numberOfSessions
        scheduleId
        scheduleName
        paymentToken
        typeOfPlan
        streetAddress
        city
        state
        zipCode
        country
        latitude
        longitude
        zoomLevel
        createdAt
        updatedAt
        coursePrivateEnrollmentsId
        sessionTypePrivateEnrollmentsId
        studentPrivateEnrollmentsId
        usersPrivateEnrollmentsId
        privateEnrollmentShoppingCartDetailId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getRoles = /* GraphQL */ `
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
export const listRoles = /* GraphQL */ `
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
export const getPermissions = /* GraphQL */ `
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
export const listPermissions = /* GraphQL */ `
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
export const getLocation = /* GraphQL */ `
  query GetLocation($id: ID!) {
    getLocation(id: $id) {
      id
      name
      city
      country
      minimumTemperature
      maximumTemperature
      address
      phone
      imageMap
      urlMap
      directions
      isActive
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
export const listLocations = /* GraphQL */ `
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
        country
        minimumTemperature
        maximumTemperature
        address
        phone
        imageMap
        urlMap
        directions
        isActive
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getCourse = /* GraphQL */ `
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
        country
        minimumTemperature
        maximumTemperature
        address
        phone
        imageMap
        urlMap
        directions
        isActive
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
      privateEnrollments {
        nextToken
        __typename
      }
      sessionDetails {
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
export const listCourses = /* GraphQL */ `
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
export const getSchedule = /* GraphQL */ `
  query GetSchedule($id: ID!) {
    getSchedule(id: $id) {
      id
      day
      startHour
      endHour
      isActive
      minimumQuotas
      maximumQuotas
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
        country
        minimumTemperature
        maximumTemperature
        address
        phone
        imageMap
        urlMap
        directions
        isActive
        createdAt
        updatedAt
        __typename
      }
      sessionDetails {
        nextToken
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
export const listSchedules = /* GraphQL */ `
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
        isActive
        minimumQuotas
        maximumQuotas
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
export const getSessionType = /* GraphQL */ `
  query GetSessionType($id: ID!) {
    getSessionType(id: $id) {
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
      courses {
        nextToken
        __typename
      }
      enrollments {
        nextToken
        __typename
      }
      privateEnrollments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listSessionTypes = /* GraphQL */ `
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
        isActive
        isTestClass
        packValidity
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getStudent = /* GraphQL */ `
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
      country
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
      privateEnrollments {
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
        locationId
        day
        month
        year
        sessionNumber
        totalSessions
        status
        proratedValue
        wasEmailSent
        locationIdUsed
        modifiedBy
        modifiedByDate
        sessionDetailStudentId
        courseId
        scheduleId
        createdAt
        updatedAt
        privateEnrollmentSessionDetailsId
        enrollmentSessionDetailsId
        usersCoachedSessionsId
        __typename
      }
      emailSend {
        nextToken
        __typename
      }
      supportTickets {
        nextToken
        __typename
      }
      studentEvaluations {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      studentSessionDetailId
      studentSessionDetailDate
      __typename
    }
  }
`;
export const listStudents = /* GraphQL */ `
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
        country
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
        studentSessionDetailDate
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getEnrollment = /* GraphQL */ `
  query GetEnrollment($id: ID!) {
    getEnrollment(id: $id) {
      id
      amountPaid
      startDate
      endDate
      wasDeleted
      wasPaid
      timeAWeek
      numberOfSessions
      sessionsLeft
      sessionsUsed
      scheduleId
      scheduleName
      paymentToken
      typeOfPlan
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
        country
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
        studentSessionDetailDate
        __typename
      }
      user {
        id
        name
        email
        validated
        isEmployed
        isAcademyStudent
        salesCommission
        contactPhone
        ig
        firstContact
        streetAddress
        city
        state
        zipCode
        country
        latitude
        longitude
        zoomLevel
        createdAt
        updatedAt
        usersRolesId
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
        isActive
        isTestClass
        packValidity
        createdAt
        updatedAt
        __typename
      }
      shoppingCartDetail {
        id
        type
        quantity
        amount
        detail
        wasDeleted
        createdAt
        updatedAt
        shoppingCartCartDetailsId
        shoppingCartDetailEnrollmentId
        shoppingCartDetailAcademyEnrollmentId
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
      sessionDetails {
        nextToken
        __typename
      }
      emailSends {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      courseEnrollmentsId
      sessionTypeEnrollmentsId
      studentEnrollmentsId
      usersEnrollmentsId
      enrollmentShoppingCartDetailId
      __typename
    }
  }
`;
export const listEnrollments = /* GraphQL */ `
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
        wasDeleted
        wasPaid
        timeAWeek
        numberOfSessions
        sessionsLeft
        sessionsUsed
        scheduleId
        scheduleName
        paymentToken
        typeOfPlan
        createdAt
        updatedAt
        courseEnrollmentsId
        sessionTypeEnrollmentsId
        studentEnrollmentsId
        usersEnrollmentsId
        enrollmentShoppingCartDetailId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getSessionDetail = /* GraphQL */ `
  query GetSessionDetail($id: ID!, $date: AWSDateTime!) {
    getSessionDetail(id: $id, date: $date) {
      id
      date
      locationId
      day
      month
      year
      sessionNumber
      totalSessions
      status
      proratedValue
      wasEmailSent
      locationIdUsed
      modifiedBy
      modifiedByDate
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
        country
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
        studentSessionDetailDate
        __typename
      }
      sessionDetailStudentId
      courseId
      scheduleId
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
      schedule {
        id
        day
        startHour
        endHour
        isActive
        minimumQuotas
        maximumQuotas
        createdAt
        updatedAt
        locationSchedulesId
        courseSchedulesId
        __typename
      }
      coach {
        id
        name
        email
        validated
        isEmployed
        isAcademyStudent
        salesCommission
        contactPhone
        ig
        firstContact
        streetAddress
        city
        state
        zipCode
        country
        latitude
        longitude
        zoomLevel
        createdAt
        updatedAt
        usersRolesId
        __typename
      }
      createdAt
      updatedAt
      privateEnrollmentSessionDetailsId
      enrollmentSessionDetailsId
      usersCoachedSessionsId
      __typename
    }
  }
`;
export const listSessionDetails = /* GraphQL */ `
  query ListSessionDetails(
    $id: ID
    $date: ModelStringKeyConditionInput
    $filter: ModelSessionDetailFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSessionDetails(
      id: $id
      date: $date
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        date
        locationId
        day
        month
        year
        sessionNumber
        totalSessions
        status
        proratedValue
        wasEmailSent
        locationIdUsed
        modifiedBy
        modifiedByDate
        sessionDetailStudentId
        courseId
        scheduleId
        createdAt
        updatedAt
        privateEnrollmentSessionDetailsId
        enrollmentSessionDetailsId
        usersCoachedSessionsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getSellersCommission = /* GraphQL */ `
  query GetSellersCommission($id: ID!) {
    getSellersCommission(id: $id) {
      id
      salesCommission
      paymentAmount
      amount
      type
      description
      status
      users {
        id
        name
        email
        validated
        isEmployed
        isAcademyStudent
        salesCommission
        contactPhone
        ig
        firstContact
        streetAddress
        city
        state
        zipCode
        country
        latitude
        longitude
        zoomLevel
        createdAt
        updatedAt
        usersRolesId
        __typename
      }
      shoppingCart {
        id
        totalPrice
        status
        createdAt
        updatedAt
        usersShoppingCartId
        usersShoppingCartSellerId
        shoppingCartSellersCommissionId
        __typename
      }
      createdAt
      updatedAt
      usersSellersCommissionsId
      sellersCommissionShoppingCartId
      __typename
    }
  }
`;
export const listSellersCommissions = /* GraphQL */ `
  query ListSellersCommissions(
    $id: ID
    $filter: ModelSellersCommissionFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSellersCommissions(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        salesCommission
        paymentAmount
        amount
        type
        description
        status
        createdAt
        updatedAt
        usersSellersCommissionsId
        sellersCommissionShoppingCartId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getShoppingCart = /* GraphQL */ `
  query GetShoppingCart($id: ID!) {
    getShoppingCart(id: $id) {
      id
      totalPrice
      status
      createdAt
      user {
        id
        name
        email
        validated
        isEmployed
        isAcademyStudent
        salesCommission
        contactPhone
        ig
        firstContact
        streetAddress
        city
        state
        zipCode
        country
        latitude
        longitude
        zoomLevel
        createdAt
        updatedAt
        usersRolesId
        __typename
      }
      seller {
        id
        name
        email
        validated
        isEmployed
        isAcademyStudent
        salesCommission
        contactPhone
        ig
        firstContact
        streetAddress
        city
        state
        zipCode
        country
        latitude
        longitude
        zoomLevel
        createdAt
        updatedAt
        usersRolesId
        __typename
      }
      sellersCommission {
        id
        salesCommission
        paymentAmount
        amount
        type
        description
        status
        createdAt
        updatedAt
        usersSellersCommissionsId
        sellersCommissionShoppingCartId
        __typename
      }
      cartDetails {
        nextToken
        __typename
      }
      paymentTransactions {
        nextToken
        __typename
      }
      updatedAt
      usersShoppingCartId
      usersShoppingCartSellerId
      shoppingCartSellersCommissionId
      __typename
    }
  }
`;
export const listShoppingCarts = /* GraphQL */ `
  query ListShoppingCarts(
    $filter: ModelShoppingCartFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShoppingCarts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        totalPrice
        status
        createdAt
        updatedAt
        usersShoppingCartId
        usersShoppingCartSellerId
        shoppingCartSellersCommissionId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getShoppingCartDetail = /* GraphQL */ `
  query GetShoppingCartDetail($id: ID!) {
    getShoppingCartDetail(id: $id) {
      id
      type
      quantity
      amount
      detail
      wasDeleted
      enrollment {
        id
        amountPaid
        startDate
        endDate
        wasDeleted
        wasPaid
        timeAWeek
        numberOfSessions
        sessionsLeft
        sessionsUsed
        scheduleId
        scheduleName
        paymentToken
        typeOfPlan
        createdAt
        updatedAt
        courseEnrollmentsId
        sessionTypeEnrollmentsId
        studentEnrollmentsId
        usersEnrollmentsId
        enrollmentShoppingCartDetailId
        __typename
      }
      academyEnrollment {
        id
        amountPaid
        date
        wasDeleted
        wasPaid
        user
        createdAt
        updatedAt
        academyStudentsEnrollmentsId
        academyCoursesEnrollmentsId
        academyEnrollmentShoppingCartDetailId
        __typename
      }
      cart {
        id
        totalPrice
        status
        createdAt
        updatedAt
        usersShoppingCartId
        usersShoppingCartSellerId
        shoppingCartSellersCommissionId
        __typename
      }
      createdAt
      updatedAt
      shoppingCartCartDetailsId
      shoppingCartDetailEnrollmentId
      shoppingCartDetailAcademyEnrollmentId
      __typename
    }
  }
`;
export const listShoppingCartDetails = /* GraphQL */ `
  query ListShoppingCartDetails(
    $filter: ModelShoppingCartDetailFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShoppingCartDetails(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        quantity
        amount
        detail
        wasDeleted
        createdAt
        updatedAt
        shoppingCartCartDetailsId
        shoppingCartDetailEnrollmentId
        shoppingCartDetailAcademyEnrollmentId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      sku
      name
      currentStock
      criticalStock
      purchasePrice
      sellingPrice
      profits
      isActive
      supplier {
        id
        name
        contactPerson
        email
        phone
        address
        taxId
        isActive
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      supplierProductsId
      __typename
    }
  }
`;
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        sku
        name
        currentStock
        criticalStock
        purchasePrice
        sellingPrice
        profits
        isActive
        createdAt
        updatedAt
        supplierProductsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getSupplier = /* GraphQL */ `
  query GetSupplier($id: ID!) {
    getSupplier(id: $id) {
      id
      name
      contactPerson
      email
      phone
      address
      taxId
      isActive
      products {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listSuppliers = /* GraphQL */ `
  query ListSuppliers(
    $filter: ModelSupplierFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSuppliers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        contactPerson
        email
        phone
        address
        taxId
        isActive
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getSupportTicket = /* GraphQL */ `
  query GetSupportTicket($id: ID!) {
    getSupportTicket(id: $id) {
      id
      date
      name
      email
      phoneNumber
      description
      day
      month
      year
      lastModificationUser
      statusTicket
      reason
      users {
        nextToken
        __typename
      }
      ticketComments {
        nextToken
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
        country
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
        studentSessionDetailDate
        __typename
      }
      createdAt
      updatedAt
      studentSupportTicketsId
      __typename
    }
  }
`;
export const listSupportTickets = /* GraphQL */ `
  query ListSupportTickets(
    $id: ID
    $filter: ModelSupportTicketFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSupportTickets(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        date
        name
        email
        phoneNumber
        description
        day
        month
        year
        lastModificationUser
        statusTicket
        reason
        createdAt
        updatedAt
        studentSupportTicketsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getCommentTickets = /* GraphQL */ `
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
export const listCommentTickets = /* GraphQL */ `
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
export const getCorrelatives = /* GraphQL */ `
  query GetCorrelatives($id: ID!) {
    getCorrelatives(id: $id) {
      id
      type
      correlative
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listCorrelatives = /* GraphQL */ `
  query ListCorrelatives(
    $filter: ModelCorrelativesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCorrelatives(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        correlative
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPaymentTransactions = /* GraphQL */ `
  query GetPaymentTransactions($id: ID!) {
    getPaymentTransactions(id: $id) {
      id
      status
      token
      urlWebpay
      amount
      buy_order
      card_number
      transaction_date
      accounting_date
      installments_number
      payment_type_code
      session_id
      card_detail
      installments_amount
      authorization_code
      response_code
      vci
      day
      month
      year
      hour
      glosa
      hasRefund
      users {
        id
        name
        email
        validated
        isEmployed
        isAcademyStudent
        salesCommission
        contactPhone
        ig
        firstContact
        streetAddress
        city
        state
        zipCode
        country
        latitude
        longitude
        zoomLevel
        createdAt
        updatedAt
        usersRolesId
        __typename
      }
      shoppingCart {
        id
        totalPrice
        status
        createdAt
        updatedAt
        usersShoppingCartId
        usersShoppingCartSellerId
        shoppingCartSellersCommissionId
        __typename
      }
      createdAt
      updatedAt
      shoppingCartPaymentTransactionsId
      usersPaymentTransactionsId
      __typename
    }
  }
`;
export const listPaymentTransactions = /* GraphQL */ `
  query ListPaymentTransactions(
    $filter: ModelPaymentTransactionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPaymentTransactions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        status
        token
        urlWebpay
        amount
        buy_order
        card_number
        transaction_date
        accounting_date
        installments_number
        payment_type_code
        session_id
        card_detail
        installments_amount
        authorization_code
        response_code
        vci
        day
        month
        year
        hour
        glosa
        hasRefund
        createdAt
        updatedAt
        shoppingCartPaymentTransactionsId
        usersPaymentTransactionsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getTransactions = /* GraphQL */ `
  query GetTransactions($id: ID!) {
    getTransactions(id: $id) {
      transactionsID
      categoryID
      categoryType
      amount
      description
      date
      month
      year
      profitCenterID
      profitCenter {
        profitCenterID
        name
        code
        description
        managerID
        parentProfitCenterID
        isActive
        id
        createdAt
        updatedAt
        __typename
      }
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listTransactions = /* GraphQL */ `
  query ListTransactions(
    $filter: ModelTransactionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTransactions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        transactionsID
        categoryID
        categoryType
        amount
        description
        date
        month
        year
        profitCenterID
        id
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getProfitCenter = /* GraphQL */ `
  query GetProfitCenter($id: ID!) {
    getProfitCenter(id: $id) {
      profitCenterID
      name
      code
      description
      managerID
      parentProfitCenterID
      isActive
      transactions {
        nextToken
        __typename
      }
      managers {
        nextToken
        __typename
      }
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listProfitCenters = /* GraphQL */ `
  query ListProfitCenters(
    $filter: ModelProfitCenterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfitCenters(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        profitCenterID
        name
        code
        description
        managerID
        parentProfitCenterID
        isActive
        id
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getManagers = /* GraphQL */ `
  query GetManagers($id: ID!) {
    getManagers(id: $id) {
      managerID
      firstName
      lastName
      email
      isActive
      profitCenterID
      profitCenter {
        profitCenterID
        name
        code
        description
        managerID
        parentProfitCenterID
        isActive
        id
        createdAt
        updatedAt
        __typename
      }
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listManagers = /* GraphQL */ `
  query ListManagers(
    $filter: ModelManagersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listManagers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        managerID
        firstName
        lastName
        email
        isActive
        profitCenterID
        id
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUsers = /* GraphQL */ `
  query GetUsers($id: ID!) {
    getUsers(id: $id) {
      id
      name
      email
      validated
      isEmployed
      isAcademyStudent
      salesCommission
      contactPhone
      ig
      firstContact
      streetAddress
      city
      state
      zipCode
      country
      latitude
      longitude
      zoomLevel
      emailSend {
        nextToken
        __typename
      }
      relationships {
        nextToken
        __typename
      }
      tickets {
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
      shoppingCart {
        nextToken
        __typename
      }
      shoppingCartSeller {
        nextToken
        __typename
      }
      paymentTransactions {
        nextToken
        __typename
      }
      sellersCommissions {
        nextToken
        __typename
      }
      enrollments {
        nextToken
        __typename
      }
      privateEnrollments {
        nextToken
        __typename
      }
      coachedSessions {
        nextToken
        __typename
      }
      studentEvaluations {
        nextToken
        __typename
      }
      workdayReports {
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
export const listUsers = /* GraphQL */ `
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
        isEmployed
        isAcademyStudent
        salesCommission
        contactPhone
        ig
        firstContact
        streetAddress
        city
        state
        zipCode
        country
        latitude
        longitude
        zoomLevel
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
export const getRelationship = /* GraphQL */ `
  query GetRelationship($id: ID!) {
    getRelationship(id: $id) {
      id
      user {
        id
        name
        email
        validated
        isEmployed
        isAcademyStudent
        salesCommission
        contactPhone
        ig
        firstContact
        streetAddress
        city
        state
        zipCode
        country
        latitude
        longitude
        zoomLevel
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
        country
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
        studentSessionDetailDate
        __typename
      }
      relationType
      createdAt
      updatedAt
      studentRelationshipsId
      usersRelationshipsId
      __typename
    }
  }
`;
export const listRelationships = /* GraphQL */ `
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
        studentRelationshipsId
        usersRelationshipsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getWorkdayReports = /* GraphQL */ `
  query GetWorkdayReports($workdayId: ID!) {
    getWorkdayReports(workdayId: $workdayId) {
      workdayId
      date
      day
      month
      year
      startTime
      endTime
      startingTemperature
      endingTemperature
      notes
      status
      totalHoursWorked
      totalSales
      totalIssues
      customersSatisfaction
      user {
        id
        name
        email
        validated
        isEmployed
        isAcademyStudent
        salesCommission
        contactPhone
        ig
        firstContact
        streetAddress
        city
        state
        zipCode
        country
        latitude
        longitude
        zoomLevel
        createdAt
        updatedAt
        usersRolesId
        __typename
      }
      createdAt
      updatedAt
      usersWorkdayReportsId
      __typename
    }
  }
`;
export const listWorkdayReports = /* GraphQL */ `
  query ListWorkdayReports(
    $workdayId: ID
    $filter: ModelWorkdayReportsFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listWorkdayReports(
      workdayId: $workdayId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        workdayId
        date
        day
        month
        year
        startTime
        endTime
        startingTemperature
        endingTemperature
        notes
        status
        totalHoursWorked
        totalSales
        totalIssues
        customersSatisfaction
        createdAt
        updatedAt
        usersWorkdayReportsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getRolPermissions = /* GraphQL */ `
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
export const listRolPermissions = /* GraphQL */ `
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
export const getUserPermissions = /* GraphQL */ `
  query GetUserPermissions($id: ID!) {
    getUserPermissions(id: $id) {
      id
      permissionsId
      usersId
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
      users {
        id
        name
        email
        validated
        isEmployed
        isAcademyStudent
        salesCommission
        contactPhone
        ig
        firstContact
        streetAddress
        city
        state
        zipCode
        country
        latitude
        longitude
        zoomLevel
        createdAt
        updatedAt
        usersRolesId
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUserPermissions = /* GraphQL */ `
  query ListUserPermissions(
    $filter: ModelUserPermissionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserPermissions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        permissionsId
        usersId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getCourseSessionType = /* GraphQL */ `
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
        isActive
        isTestClass
        packValidity
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
export const listCourseSessionTypes = /* GraphQL */ `
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
export const getTicketUser = /* GraphQL */ `
  query GetTicketUser($id: ID!) {
    getTicketUser(id: $id) {
      id
      supportTicketId
      usersId
      supportTicket {
        id
        date
        name
        email
        phoneNumber
        description
        day
        month
        year
        lastModificationUser
        statusTicket
        reason
        createdAt
        updatedAt
        studentSupportTicketsId
        __typename
      }
      users {
        id
        name
        email
        validated
        isEmployed
        isAcademyStudent
        salesCommission
        contactPhone
        ig
        firstContact
        streetAddress
        city
        state
        zipCode
        country
        latitude
        longitude
        zoomLevel
        createdAt
        updatedAt
        usersRolesId
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listTicketUsers = /* GraphQL */ `
  query ListTicketUsers(
    $filter: ModelTicketUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTicketUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        supportTicketId
        usersId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getComments = /* GraphQL */ `
  query GetComments($id: ID!) {
    getComments(id: $id) {
      id
      supportTicketId
      commentTicketsId
      supportTicket {
        id
        date
        name
        email
        phoneNumber
        description
        day
        month
        year
        lastModificationUser
        statusTicket
        reason
        createdAt
        updatedAt
        studentSupportTicketsId
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
export const listComments = /* GraphQL */ `
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
export const emailSendsByStudentId = /* GraphQL */ `
  query EmailSendsByStudentId(
    $studentId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelEmailSendFilterInput
    $limit: Int
    $nextToken: String
  ) {
    emailSendsByStudentId(
      studentId: $studentId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        date
        typeSend
        type
        contentEmail
        contentMessage
        phone
        phoneState
        email
        emailState
        studentId
        createdAt
        updatedAt
        privateEnrollmentEmailSendsId
        studentEmailSendId
        enrollmentEmailSendsId
        usersEmailSendId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const parametersByCountryAndLabel = /* GraphQL */ `
  query ParametersByCountryAndLabel(
    $country: String!
    $label: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelParametersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    parametersByCountryAndLabel(
      country: $country
      label: $label
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        label
        value
        country
        idParent
        createdAt
        updatedAt
        parametersEncTypeOfParameterId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const locationsByCountry = /* GraphQL */ `
  query LocationsByCountry(
    $country: String!
    $sortDirection: ModelSortDirection
    $filter: ModelLocationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    locationsByCountry(
      country: $country
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        city
        country
        minimumTemperature
        maximumTemperature
        address
        phone
        imageMap
        urlMap
        directions
        isActive
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const studentsByCountry = /* GraphQL */ `
  query StudentsByCountry(
    $country: String!
    $sortDirection: ModelSortDirection
    $filter: ModelStudentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    studentsByCountry(
      country: $country
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
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
        country
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
        studentSessionDetailDate
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const sessionDetailsByDateAndId = /* GraphQL */ `
  query SessionDetailsByDateAndId(
    $date: AWSDateTime!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSessionDetailFilterInput
    $limit: Int
    $nextToken: String
  ) {
    sessionDetailsByDateAndId(
      date: $date
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        date
        locationId
        day
        month
        year
        sessionNumber
        totalSessions
        status
        proratedValue
        wasEmailSent
        locationIdUsed
        modifiedBy
        modifiedByDate
        sessionDetailStudentId
        courseId
        scheduleId
        createdAt
        updatedAt
        privateEnrollmentSessionDetailsId
        enrollmentSessionDetailsId
        usersCoachedSessionsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const sessionDetailsByLocationIdAndDate = /* GraphQL */ `
  query SessionDetailsByLocationIdAndDate(
    $locationId: String!
    $date: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSessionDetailFilterInput
    $limit: Int
    $nextToken: String
  ) {
    sessionDetailsByLocationIdAndDate(
      locationId: $locationId
      date: $date
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        date
        locationId
        day
        month
        year
        sessionNumber
        totalSessions
        status
        proratedValue
        wasEmailSent
        locationIdUsed
        modifiedBy
        modifiedByDate
        sessionDetailStudentId
        courseId
        scheduleId
        createdAt
        updatedAt
        privateEnrollmentSessionDetailsId
        enrollmentSessionDetailsId
        usersCoachedSessionsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const sessionDetailsBySessionDetailStudentId = /* GraphQL */ `
  query SessionDetailsBySessionDetailStudentId(
    $sessionDetailStudentId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSessionDetailFilterInput
    $limit: Int
    $nextToken: String
  ) {
    sessionDetailsBySessionDetailStudentId(
      sessionDetailStudentId: $sessionDetailStudentId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        date
        locationId
        day
        month
        year
        sessionNumber
        totalSessions
        status
        proratedValue
        wasEmailSent
        locationIdUsed
        modifiedBy
        modifiedByDate
        sessionDetailStudentId
        courseId
        scheduleId
        createdAt
        updatedAt
        privateEnrollmentSessionDetailsId
        enrollmentSessionDetailsId
        usersCoachedSessionsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const productsBySku = /* GraphQL */ `
  query ProductsBySku(
    $sku: String!
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productsBySku(
      sku: $sku
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        sku
        name
        currentStock
        criticalStock
        purchasePrice
        sellingPrice
        profits
        isActive
        createdAt
        updatedAt
        supplierProductsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const supportTicketsByDate = /* GraphQL */ `
  query SupportTicketsByDate(
    $date: AWSDateTime!
    $sortDirection: ModelSortDirection
    $filter: ModelSupportTicketFilterInput
    $limit: Int
    $nextToken: String
  ) {
    supportTicketsByDate(
      date: $date
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        date
        name
        email
        phoneNumber
        description
        day
        month
        year
        lastModificationUser
        statusTicket
        reason
        createdAt
        updatedAt
        studentSupportTicketsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const paymentTransactionsByIdAndDayAndMonthAndYearAndHour = /* GraphQL */ `
  query PaymentTransactionsByIdAndDayAndMonthAndYearAndHour(
    $id: ID!
    $dayMonthYearHour: ModelPaymentTransactionsSearchByDiaMesAnoHourCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPaymentTransactionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    paymentTransactionsByIdAndDayAndMonthAndYearAndHour(
      id: $id
      dayMonthYearHour: $dayMonthYearHour
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        status
        token
        urlWebpay
        amount
        buy_order
        card_number
        transaction_date
        accounting_date
        installments_number
        payment_type_code
        session_id
        card_detail
        installments_amount
        authorization_code
        response_code
        vci
        day
        month
        year
        hour
        glosa
        hasRefund
        createdAt
        updatedAt
        shoppingCartPaymentTransactionsId
        usersPaymentTransactionsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const transactionsByTransactionsIDAndProfitCenterIDAndCategoryIDAndCategoryTypeAndMonthAndYear = /* GraphQL */ `
  query TransactionsByTransactionsIDAndProfitCenterIDAndCategoryIDAndCategoryTypeAndMonthAndYear(
    $transactionsID: ID!
    $profitCenterIDCategoryIDCategoryTypeMonthYear: ModelTransactionsSearchByProfitCenterCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTransactionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    transactionsByTransactionsIDAndProfitCenterIDAndCategoryIDAndCategoryTypeAndMonthAndYear(
      transactionsID: $transactionsID
      profitCenterIDCategoryIDCategoryTypeMonthYear: $profitCenterIDCategoryIDCategoryTypeMonthYear
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        transactionsID
        categoryID
        categoryType
        amount
        description
        date
        month
        year
        profitCenterID
        id
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const profitCentersByProfitCenterIDAndCode = /* GraphQL */ `
  query ProfitCentersByProfitCenterIDAndCode(
    $profitCenterID: ID!
    $code: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProfitCenterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    profitCentersByProfitCenterIDAndCode(
      profitCenterID: $profitCenterID
      code: $code
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        profitCenterID
        name
        code
        description
        managerID
        parentProfitCenterID
        isActive
        id
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const managersByManagerIDAndEmail = /* GraphQL */ `
  query ManagersByManagerIDAndEmail(
    $managerID: ID!
    $email: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelManagersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    managersByManagerIDAndEmail(
      managerID: $managerID
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        managerID
        firstName
        lastName
        email
        isActive
        profitCenterID
        id
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const usersByCountry = /* GraphQL */ `
  query UsersByCountry(
    $country: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usersByCountry(
      country: $country
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        email
        validated
        isEmployed
        isAcademyStudent
        salesCommission
        contactPhone
        ig
        firstContact
        streetAddress
        city
        state
        zipCode
        country
        latitude
        longitude
        zoomLevel
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
export const workdayReportsByDateAndWorkdayId = /* GraphQL */ `
  query WorkdayReportsByDateAndWorkdayId(
    $date: AWSDateTime!
    $workdayId: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelWorkdayReportsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    workdayReportsByDateAndWorkdayId(
      date: $date
      workdayId: $workdayId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        workdayId
        date
        day
        month
        year
        startTime
        endTime
        startingTemperature
        endingTemperature
        notes
        status
        totalHoursWorked
        totalSales
        totalIssues
        customersSatisfaction
        createdAt
        updatedAt
        usersWorkdayReportsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const rolPermissionsByRolesId = /* GraphQL */ `
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
export const rolPermissionsByPermissionsId = /* GraphQL */ `
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
export const userPermissionsByPermissionsId = /* GraphQL */ `
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
        permissionsId
        usersId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const userPermissionsByUsersId = /* GraphQL */ `
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
        permissionsId
        usersId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const courseSessionTypesByCourseId = /* GraphQL */ `
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
export const courseSessionTypesBySessionTypeId = /* GraphQL */ `
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
export const ticketUsersBySupportTicketId = /* GraphQL */ `
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
        supportTicketId
        usersId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const ticketUsersByUsersId = /* GraphQL */ `
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
        supportTicketId
        usersId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const commentsBySupportTicketId = /* GraphQL */ `
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
export const commentsByCommentTicketsId = /* GraphQL */ `
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
