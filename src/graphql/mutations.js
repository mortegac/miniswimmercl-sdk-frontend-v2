/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const generateEnrollment = /* GraphQL */ `
  mutation GenerateEnrollment(
    $userId: String!
    $studentId: String!
    $startDate: String!
    $sessionTypeId: String!
    $scheduleId: String!
    $courseId: String!
  ) {
    generateEnrollment(
      userId: $userId
      studentId: $studentId
      startDate: $startDate
      sessionTypeId: $sessionTypeId
      scheduleId: $scheduleId
      courseId: $courseId
    )
  }
`;
export const removeEnrollment = /* GraphQL */ `
  mutation RemoveEnrollment($enrollId: String!, $employeeId: String!) {
    removeEnrollment(enrollId: $enrollId, employeeId: $employeeId)
  }
`;
export const renovationEnrollment = /* GraphQL */ `
  mutation RenovationEnrollment($enrollId: String!, $startDate: AWSDateTime!) {
    renovationEnrollment(enrollId: $enrollId, startDate: $startDate)
  }
`;
export const sendWhatsapp = /* GraphQL */ `
  mutation SendWhatsapp(
    $JWT: String!
    $clientPhoneNumber: String!
    $clientName: String!
  ) {
    sendWhatsapp(
      JWT: $JWT
      clientPhoneNumber: $clientPhoneNumber
      clientName: $clientName
    )
  }
`;
export const sendEmail = /* GraphQL */ `
  mutation SendEmail($templateParams: AWSJSON!, $type: String!) {
    sendEmail(templateParams: $templateParams, type: $type)
  }
`;
export const setStart = /* GraphQL */ `
  mutation SetStart(
    $amount: Float!
    $userId: String!
    $glosa: String!
    $cartId: String!
  ) {
    setStart(amount: $amount, userId: $userId, glosa: $glosa, cartId: $cartId)
  }
`;
export const setCommit = /* GraphQL */ `
  mutation SetCommit($token: String!) {
    setCommit(token: $token)
  }
`;
export const setStatus = /* GraphQL */ `
  mutation SetStatus($token: String!) {
    setStatus(token: $token)
  }
`;
export const createAcademyStudents = /* GraphQL */ `
  mutation CreateAcademyStudents(
    $input: CreateAcademyStudentsInput!
    $condition: ModelAcademyStudentsConditionInput
  ) {
    createAcademyStudents(input: $input, condition: $condition) {
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
export const updateAcademyStudents = /* GraphQL */ `
  mutation UpdateAcademyStudents(
    $input: UpdateAcademyStudentsInput!
    $condition: ModelAcademyStudentsConditionInput
  ) {
    updateAcademyStudents(input: $input, condition: $condition) {
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
export const deleteAcademyStudents = /* GraphQL */ `
  mutation DeleteAcademyStudents(
    $input: DeleteAcademyStudentsInput!
    $condition: ModelAcademyStudentsConditionInput
  ) {
    deleteAcademyStudents(input: $input, condition: $condition) {
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
export const createAcademyEnrollment = /* GraphQL */ `
  mutation CreateAcademyEnrollment(
    $input: CreateAcademyEnrollmentInput!
    $condition: ModelAcademyEnrollmentConditionInput
  ) {
    createAcademyEnrollment(input: $input, condition: $condition) {
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
export const updateAcademyEnrollment = /* GraphQL */ `
  mutation UpdateAcademyEnrollment(
    $input: UpdateAcademyEnrollmentInput!
    $condition: ModelAcademyEnrollmentConditionInput
  ) {
    updateAcademyEnrollment(input: $input, condition: $condition) {
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
export const deleteAcademyEnrollment = /* GraphQL */ `
  mutation DeleteAcademyEnrollment(
    $input: DeleteAcademyEnrollmentInput!
    $condition: ModelAcademyEnrollmentConditionInput
  ) {
    deleteAcademyEnrollment(input: $input, condition: $condition) {
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
export const createAcademyCourses = /* GraphQL */ `
  mutation CreateAcademyCourses(
    $input: CreateAcademyCoursesInput!
    $condition: ModelAcademyCoursesConditionInput
  ) {
    createAcademyCourses(input: $input, condition: $condition) {
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
export const updateAcademyCourses = /* GraphQL */ `
  mutation UpdateAcademyCourses(
    $input: UpdateAcademyCoursesInput!
    $condition: ModelAcademyCoursesConditionInput
  ) {
    updateAcademyCourses(input: $input, condition: $condition) {
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
export const deleteAcademyCourses = /* GraphQL */ `
  mutation DeleteAcademyCourses(
    $input: DeleteAcademyCoursesInput!
    $condition: ModelAcademyCoursesConditionInput
  ) {
    deleteAcademyCourses(input: $input, condition: $condition) {
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
export const createCertificates = /* GraphQL */ `
  mutation CreateCertificates(
    $input: CreateCertificatesInput!
    $condition: ModelCertificatesConditionInput
  ) {
    createCertificates(input: $input, condition: $condition) {
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
export const updateCertificates = /* GraphQL */ `
  mutation UpdateCertificates(
    $input: UpdateCertificatesInput!
    $condition: ModelCertificatesConditionInput
  ) {
    updateCertificates(input: $input, condition: $condition) {
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
export const deleteCertificates = /* GraphQL */ `
  mutation DeleteCertificates(
    $input: DeleteCertificatesInput!
    $condition: ModelCertificatesConditionInput
  ) {
    deleteCertificates(input: $input, condition: $condition) {
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
export const createEmailSend = /* GraphQL */ `
  mutation CreateEmailSend(
    $input: CreateEmailSendInput!
    $condition: ModelEmailSendConditionInput
  ) {
    createEmailSend(input: $input, condition: $condition) {
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
        salesCommission
        contactPhone
        ig
        firstContact
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
      studentEmailSendId
      enrollmentEmailSendsId
      usersEmailSendId
      __typename
    }
  }
`;
export const updateEmailSend = /* GraphQL */ `
  mutation UpdateEmailSend(
    $input: UpdateEmailSendInput!
    $condition: ModelEmailSendConditionInput
  ) {
    updateEmailSend(input: $input, condition: $condition) {
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
        salesCommission
        contactPhone
        ig
        firstContact
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
      studentEmailSendId
      enrollmentEmailSendsId
      usersEmailSendId
      __typename
    }
  }
`;
export const deleteEmailSend = /* GraphQL */ `
  mutation DeleteEmailSend(
    $input: DeleteEmailSendInput!
    $condition: ModelEmailSendConditionInput
  ) {
    deleteEmailSend(input: $input, condition: $condition) {
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
        salesCommission
        contactPhone
        ig
        firstContact
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
      studentEmailSendId
      enrollmentEmailSendsId
      usersEmailSendId
      __typename
    }
  }
`;
export const createSentEmail = /* GraphQL */ `
  mutation CreateSentEmail(
    $input: CreateSentEmailInput!
    $condition: ModelSentEmailConditionInput
  ) {
    createSentEmail(input: $input, condition: $condition) {
      id
      emailState
      body
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateSentEmail = /* GraphQL */ `
  mutation UpdateSentEmail(
    $input: UpdateSentEmailInput!
    $condition: ModelSentEmailConditionInput
  ) {
    updateSentEmail(input: $input, condition: $condition) {
      id
      emailState
      body
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteSentEmail = /* GraphQL */ `
  mutation DeleteSentEmail(
    $input: DeleteSentEmailInput!
    $condition: ModelSentEmailConditionInput
  ) {
    deleteSentEmail(input: $input, condition: $condition) {
      id
      emailState
      body
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createExpense = /* GraphQL */ `
  mutation CreateExpense(
    $input: CreateExpenseInput!
    $condition: ModelExpenseConditionInput
  ) {
    createExpense(input: $input, condition: $condition) {
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
        imageMap
        urlMap
        directions
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
export const updateExpense = /* GraphQL */ `
  mutation UpdateExpense(
    $input: UpdateExpenseInput!
    $condition: ModelExpenseConditionInput
  ) {
    updateExpense(input: $input, condition: $condition) {
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
        imageMap
        urlMap
        directions
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
export const deleteExpense = /* GraphQL */ `
  mutation DeleteExpense(
    $input: DeleteExpenseInput!
    $condition: ModelExpenseConditionInput
  ) {
    deleteExpense(input: $input, condition: $condition) {
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
        imageMap
        urlMap
        directions
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
export const createParametersEnc = /* GraphQL */ `
  mutation CreateParametersEnc(
    $input: CreateParametersEncInput!
    $condition: ModelParametersEncConditionInput
  ) {
    createParametersEnc(input: $input, condition: $condition) {
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
export const updateParametersEnc = /* GraphQL */ `
  mutation UpdateParametersEnc(
    $input: UpdateParametersEncInput!
    $condition: ModelParametersEncConditionInput
  ) {
    updateParametersEnc(input: $input, condition: $condition) {
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
export const deleteParametersEnc = /* GraphQL */ `
  mutation DeleteParametersEnc(
    $input: DeleteParametersEncInput!
    $condition: ModelParametersEncConditionInput
  ) {
    deleteParametersEnc(input: $input, condition: $condition) {
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
export const createMetadata = /* GraphQL */ `
  mutation CreateMetadata(
    $input: CreateMetadataInput!
    $condition: ModelMetadataConditionInput
  ) {
    createMetadata(input: $input, condition: $condition) {
      id
      key
      value
      metadata {
        id
        label
        value
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
export const updateMetadata = /* GraphQL */ `
  mutation UpdateMetadata(
    $input: UpdateMetadataInput!
    $condition: ModelMetadataConditionInput
  ) {
    updateMetadata(input: $input, condition: $condition) {
      id
      key
      value
      metadata {
        id
        label
        value
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
export const deleteMetadata = /* GraphQL */ `
  mutation DeleteMetadata(
    $input: DeleteMetadataInput!
    $condition: ModelMetadataConditionInput
  ) {
    deleteMetadata(input: $input, condition: $condition) {
      id
      key
      value
      metadata {
        id
        label
        value
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
export const createParameters = /* GraphQL */ `
  mutation CreateParameters(
    $input: CreateParametersInput!
    $condition: ModelParametersConditionInput
  ) {
    createParameters(input: $input, condition: $condition) {
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
export const updateParameters = /* GraphQL */ `
  mutation UpdateParameters(
    $input: UpdateParametersInput!
    $condition: ModelParametersConditionInput
  ) {
    updateParameters(input: $input, condition: $condition) {
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
export const deleteParameters = /* GraphQL */ `
  mutation DeleteParameters(
    $input: DeleteParametersInput!
    $condition: ModelParametersConditionInput
  ) {
    deleteParameters(input: $input, condition: $condition) {
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
export const createRoles = /* GraphQL */ `
  mutation CreateRoles(
    $input: CreateRolesInput!
    $condition: ModelRolesConditionInput
  ) {
    createRoles(input: $input, condition: $condition) {
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
export const updateRoles = /* GraphQL */ `
  mutation UpdateRoles(
    $input: UpdateRolesInput!
    $condition: ModelRolesConditionInput
  ) {
    updateRoles(input: $input, condition: $condition) {
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
export const deleteRoles = /* GraphQL */ `
  mutation DeleteRoles(
    $input: DeleteRolesInput!
    $condition: ModelRolesConditionInput
  ) {
    deleteRoles(input: $input, condition: $condition) {
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
export const createPermissions = /* GraphQL */ `
  mutation CreatePermissions(
    $input: CreatePermissionsInput!
    $condition: ModelPermissionsConditionInput
  ) {
    createPermissions(input: $input, condition: $condition) {
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
export const updatePermissions = /* GraphQL */ `
  mutation UpdatePermissions(
    $input: UpdatePermissionsInput!
    $condition: ModelPermissionsConditionInput
  ) {
    updatePermissions(input: $input, condition: $condition) {
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
export const deletePermissions = /* GraphQL */ `
  mutation DeletePermissions(
    $input: DeletePermissionsInput!
    $condition: ModelPermissionsConditionInput
  ) {
    deletePermissions(input: $input, condition: $condition) {
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
export const createLocation = /* GraphQL */ `
  mutation CreateLocation(
    $input: CreateLocationInput!
    $condition: ModelLocationConditionInput
  ) {
    createLocation(input: $input, condition: $condition) {
      id
      name
      city
      minimumTemperature
      maximumTemperature
      address
      phone
      imageMap
      urlMap
      directions
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
export const updateLocation = /* GraphQL */ `
  mutation UpdateLocation(
    $input: UpdateLocationInput!
    $condition: ModelLocationConditionInput
  ) {
    updateLocation(input: $input, condition: $condition) {
      id
      name
      city
      minimumTemperature
      maximumTemperature
      address
      phone
      imageMap
      urlMap
      directions
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
export const deleteLocation = /* GraphQL */ `
  mutation DeleteLocation(
    $input: DeleteLocationInput!
    $condition: ModelLocationConditionInput
  ) {
    deleteLocation(input: $input, condition: $condition) {
      id
      name
      city
      minimumTemperature
      maximumTemperature
      address
      phone
      imageMap
      urlMap
      directions
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
export const createCourse = /* GraphQL */ `
  mutation CreateCourse(
    $input: CreateCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    createCourse(input: $input, condition: $condition) {
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
        imageMap
        urlMap
        directions
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
export const updateCourse = /* GraphQL */ `
  mutation UpdateCourse(
    $input: UpdateCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    updateCourse(input: $input, condition: $condition) {
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
        imageMap
        urlMap
        directions
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
export const deleteCourse = /* GraphQL */ `
  mutation DeleteCourse(
    $input: DeleteCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    deleteCourse(input: $input, condition: $condition) {
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
        imageMap
        urlMap
        directions
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
export const createSchedule = /* GraphQL */ `
  mutation CreateSchedule(
    $input: CreateScheduleInput!
    $condition: ModelScheduleConditionInput
  ) {
    createSchedule(input: $input, condition: $condition) {
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
        minimumTemperature
        maximumTemperature
        address
        phone
        imageMap
        urlMap
        directions
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
export const updateSchedule = /* GraphQL */ `
  mutation UpdateSchedule(
    $input: UpdateScheduleInput!
    $condition: ModelScheduleConditionInput
  ) {
    updateSchedule(input: $input, condition: $condition) {
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
        minimumTemperature
        maximumTemperature
        address
        phone
        imageMap
        urlMap
        directions
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
export const deleteSchedule = /* GraphQL */ `
  mutation DeleteSchedule(
    $input: DeleteScheduleInput!
    $condition: ModelScheduleConditionInput
  ) {
    deleteSchedule(input: $input, condition: $condition) {
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
        minimumTemperature
        maximumTemperature
        address
        phone
        imageMap
        urlMap
        directions
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
export const createSessionType = /* GraphQL */ `
  mutation CreateSessionType(
    $input: CreateSessionTypeInput!
    $condition: ModelSessionTypeConditionInput
  ) {
    createSessionType(input: $input, condition: $condition) {
      id
      name
      description
      durationSession
      timeAWeek
      totalSessions
      amount
      isActive
      packValidity
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
export const updateSessionType = /* GraphQL */ `
  mutation UpdateSessionType(
    $input: UpdateSessionTypeInput!
    $condition: ModelSessionTypeConditionInput
  ) {
    updateSessionType(input: $input, condition: $condition) {
      id
      name
      description
      durationSession
      timeAWeek
      totalSessions
      amount
      isActive
      packValidity
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
export const deleteSessionType = /* GraphQL */ `
  mutation DeleteSessionType(
    $input: DeleteSessionTypeInput!
    $condition: ModelSessionTypeConditionInput
  ) {
    deleteSessionType(input: $input, condition: $condition) {
      id
      name
      description
      durationSession
      timeAWeek
      totalSessions
      amount
      isActive
      packValidity
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
export const createStudent = /* GraphQL */ `
  mutation CreateStudent(
    $input: CreateStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    createStudent(input: $input, condition: $condition) {
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
        day
        month
        year
        sessionNumber
        totalSessions
        status
        proratedValue
        wasEmailSent
        locationId
        locationIdUsed
        modifiedBy
        modifiedByDate
        sessionDetailStudentId
        courseId
        scheduleId
        createdAt
        updatedAt
        enrollmentSessionDetailsId
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
      createdAt
      updatedAt
      studentSessionDetailId
      studentSessionDetailDate
      __typename
    }
  }
`;
export const updateStudent = /* GraphQL */ `
  mutation UpdateStudent(
    $input: UpdateStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    updateStudent(input: $input, condition: $condition) {
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
        day
        month
        year
        sessionNumber
        totalSessions
        status
        proratedValue
        wasEmailSent
        locationId
        locationIdUsed
        modifiedBy
        modifiedByDate
        sessionDetailStudentId
        courseId
        scheduleId
        createdAt
        updatedAt
        enrollmentSessionDetailsId
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
      createdAt
      updatedAt
      studentSessionDetailId
      studentSessionDetailDate
      __typename
    }
  }
`;
export const deleteStudent = /* GraphQL */ `
  mutation DeleteStudent(
    $input: DeleteStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    deleteStudent(input: $input, condition: $condition) {
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
        day
        month
        year
        sessionNumber
        totalSessions
        status
        proratedValue
        wasEmailSent
        locationId
        locationIdUsed
        modifiedBy
        modifiedByDate
        sessionDetailStudentId
        courseId
        scheduleId
        createdAt
        updatedAt
        enrollmentSessionDetailsId
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
      createdAt
      updatedAt
      studentSessionDetailId
      studentSessionDetailDate
      __typename
    }
  }
`;
export const createEnrollment = /* GraphQL */ `
  mutation CreateEnrollment(
    $input: CreateEnrollmentInput!
    $condition: ModelEnrollmentConditionInput
  ) {
    createEnrollment(input: $input, condition: $condition) {
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
        studentSessionDetailDate
        __typename
      }
      user {
        id
        name
        email
        validated
        isEmployed
        salesCommission
        contactPhone
        ig
        firstContact
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
export const updateEnrollment = /* GraphQL */ `
  mutation UpdateEnrollment(
    $input: UpdateEnrollmentInput!
    $condition: ModelEnrollmentConditionInput
  ) {
    updateEnrollment(input: $input, condition: $condition) {
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
        studentSessionDetailDate
        __typename
      }
      user {
        id
        name
        email
        validated
        isEmployed
        salesCommission
        contactPhone
        ig
        firstContact
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
export const deleteEnrollment = /* GraphQL */ `
  mutation DeleteEnrollment(
    $input: DeleteEnrollmentInput!
    $condition: ModelEnrollmentConditionInput
  ) {
    deleteEnrollment(input: $input, condition: $condition) {
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
        studentSessionDetailDate
        __typename
      }
      user {
        id
        name
        email
        validated
        isEmployed
        salesCommission
        contactPhone
        ig
        firstContact
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
export const createSessionDetail = /* GraphQL */ `
  mutation CreateSessionDetail(
    $input: CreateSessionDetailInput!
    $condition: ModelSessionDetailConditionInput
  ) {
    createSessionDetail(input: $input, condition: $condition) {
      id
      date
      day
      month
      year
      sessionNumber
      totalSessions
      status
      proratedValue
      wasEmailSent
      locationId
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
      createdAt
      updatedAt
      enrollmentSessionDetailsId
      __typename
    }
  }
`;
export const updateSessionDetail = /* GraphQL */ `
  mutation UpdateSessionDetail(
    $input: UpdateSessionDetailInput!
    $condition: ModelSessionDetailConditionInput
  ) {
    updateSessionDetail(input: $input, condition: $condition) {
      id
      date
      day
      month
      year
      sessionNumber
      totalSessions
      status
      proratedValue
      wasEmailSent
      locationId
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
      createdAt
      updatedAt
      enrollmentSessionDetailsId
      __typename
    }
  }
`;
export const deleteSessionDetail = /* GraphQL */ `
  mutation DeleteSessionDetail(
    $input: DeleteSessionDetailInput!
    $condition: ModelSessionDetailConditionInput
  ) {
    deleteSessionDetail(input: $input, condition: $condition) {
      id
      date
      day
      month
      year
      sessionNumber
      totalSessions
      status
      proratedValue
      wasEmailSent
      locationId
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
      createdAt
      updatedAt
      enrollmentSessionDetailsId
      __typename
    }
  }
`;
export const createSellersCommission = /* GraphQL */ `
  mutation CreateSellersCommission(
    $input: CreateSellersCommissionInput!
    $condition: ModelSellersCommissionConditionInput
  ) {
    createSellersCommission(input: $input, condition: $condition) {
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
        salesCommission
        contactPhone
        ig
        firstContact
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
export const updateSellersCommission = /* GraphQL */ `
  mutation UpdateSellersCommission(
    $input: UpdateSellersCommissionInput!
    $condition: ModelSellersCommissionConditionInput
  ) {
    updateSellersCommission(input: $input, condition: $condition) {
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
        salesCommission
        contactPhone
        ig
        firstContact
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
export const deleteSellersCommission = /* GraphQL */ `
  mutation DeleteSellersCommission(
    $input: DeleteSellersCommissionInput!
    $condition: ModelSellersCommissionConditionInput
  ) {
    deleteSellersCommission(input: $input, condition: $condition) {
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
        salesCommission
        contactPhone
        ig
        firstContact
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
export const createShoppingCart = /* GraphQL */ `
  mutation CreateShoppingCart(
    $input: CreateShoppingCartInput!
    $condition: ModelShoppingCartConditionInput
  ) {
    createShoppingCart(input: $input, condition: $condition) {
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
        salesCommission
        contactPhone
        ig
        firstContact
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
        salesCommission
        contactPhone
        ig
        firstContact
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
export const updateShoppingCart = /* GraphQL */ `
  mutation UpdateShoppingCart(
    $input: UpdateShoppingCartInput!
    $condition: ModelShoppingCartConditionInput
  ) {
    updateShoppingCart(input: $input, condition: $condition) {
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
        salesCommission
        contactPhone
        ig
        firstContact
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
        salesCommission
        contactPhone
        ig
        firstContact
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
export const deleteShoppingCart = /* GraphQL */ `
  mutation DeleteShoppingCart(
    $input: DeleteShoppingCartInput!
    $condition: ModelShoppingCartConditionInput
  ) {
    deleteShoppingCart(input: $input, condition: $condition) {
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
        salesCommission
        contactPhone
        ig
        firstContact
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
        salesCommission
        contactPhone
        ig
        firstContact
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
export const createShoppingCartDetail = /* GraphQL */ `
  mutation CreateShoppingCartDetail(
    $input: CreateShoppingCartDetailInput!
    $condition: ModelShoppingCartDetailConditionInput
  ) {
    createShoppingCartDetail(input: $input, condition: $condition) {
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
export const updateShoppingCartDetail = /* GraphQL */ `
  mutation UpdateShoppingCartDetail(
    $input: UpdateShoppingCartDetailInput!
    $condition: ModelShoppingCartDetailConditionInput
  ) {
    updateShoppingCartDetail(input: $input, condition: $condition) {
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
export const deleteShoppingCartDetail = /* GraphQL */ `
  mutation DeleteShoppingCartDetail(
    $input: DeleteShoppingCartDetailInput!
    $condition: ModelShoppingCartDetailConditionInput
  ) {
    deleteShoppingCartDetail(input: $input, condition: $condition) {
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
export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
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
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
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
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
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
export const createSupplier = /* GraphQL */ `
  mutation CreateSupplier(
    $input: CreateSupplierInput!
    $condition: ModelSupplierConditionInput
  ) {
    createSupplier(input: $input, condition: $condition) {
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
export const updateSupplier = /* GraphQL */ `
  mutation UpdateSupplier(
    $input: UpdateSupplierInput!
    $condition: ModelSupplierConditionInput
  ) {
    updateSupplier(input: $input, condition: $condition) {
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
export const deleteSupplier = /* GraphQL */ `
  mutation DeleteSupplier(
    $input: DeleteSupplierInput!
    $condition: ModelSupplierConditionInput
  ) {
    deleteSupplier(input: $input, condition: $condition) {
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
export const createSupportTicket = /* GraphQL */ `
  mutation CreateSupportTicket(
    $input: CreateSupportTicketInput!
    $condition: ModelSupportTicketConditionInput
  ) {
    createSupportTicket(input: $input, condition: $condition) {
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
export const updateSupportTicket = /* GraphQL */ `
  mutation UpdateSupportTicket(
    $input: UpdateSupportTicketInput!
    $condition: ModelSupportTicketConditionInput
  ) {
    updateSupportTicket(input: $input, condition: $condition) {
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
export const deleteSupportTicket = /* GraphQL */ `
  mutation DeleteSupportTicket(
    $input: DeleteSupportTicketInput!
    $condition: ModelSupportTicketConditionInput
  ) {
    deleteSupportTicket(input: $input, condition: $condition) {
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
export const createCommentTickets = /* GraphQL */ `
  mutation CreateCommentTickets(
    $input: CreateCommentTicketsInput!
    $condition: ModelCommentTicketsConditionInput
  ) {
    createCommentTickets(input: $input, condition: $condition) {
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
export const updateCommentTickets = /* GraphQL */ `
  mutation UpdateCommentTickets(
    $input: UpdateCommentTicketsInput!
    $condition: ModelCommentTicketsConditionInput
  ) {
    updateCommentTickets(input: $input, condition: $condition) {
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
export const deleteCommentTickets = /* GraphQL */ `
  mutation DeleteCommentTickets(
    $input: DeleteCommentTicketsInput!
    $condition: ModelCommentTicketsConditionInput
  ) {
    deleteCommentTickets(input: $input, condition: $condition) {
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
export const createCorrelatives = /* GraphQL */ `
  mutation CreateCorrelatives(
    $input: CreateCorrelativesInput!
    $condition: ModelCorrelativesConditionInput
  ) {
    createCorrelatives(input: $input, condition: $condition) {
      id
      type
      correlative
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateCorrelatives = /* GraphQL */ `
  mutation UpdateCorrelatives(
    $input: UpdateCorrelativesInput!
    $condition: ModelCorrelativesConditionInput
  ) {
    updateCorrelatives(input: $input, condition: $condition) {
      id
      type
      correlative
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteCorrelatives = /* GraphQL */ `
  mutation DeleteCorrelatives(
    $input: DeleteCorrelativesInput!
    $condition: ModelCorrelativesConditionInput
  ) {
    deleteCorrelatives(input: $input, condition: $condition) {
      id
      type
      correlative
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createPaymentTransactions = /* GraphQL */ `
  mutation CreatePaymentTransactions(
    $input: CreatePaymentTransactionsInput!
    $condition: ModelPaymentTransactionsConditionInput
  ) {
    createPaymentTransactions(input: $input, condition: $condition) {
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
        salesCommission
        contactPhone
        ig
        firstContact
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
export const updatePaymentTransactions = /* GraphQL */ `
  mutation UpdatePaymentTransactions(
    $input: UpdatePaymentTransactionsInput!
    $condition: ModelPaymentTransactionsConditionInput
  ) {
    updatePaymentTransactions(input: $input, condition: $condition) {
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
        salesCommission
        contactPhone
        ig
        firstContact
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
export const deletePaymentTransactions = /* GraphQL */ `
  mutation DeletePaymentTransactions(
    $input: DeletePaymentTransactionsInput!
    $condition: ModelPaymentTransactionsConditionInput
  ) {
    deletePaymentTransactions(input: $input, condition: $condition) {
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
        salesCommission
        contactPhone
        ig
        firstContact
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
export const createUsers = /* GraphQL */ `
  mutation CreateUsers(
    $input: CreateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    createUsers(input: $input, condition: $condition) {
      id
      name
      email
      validated
      isEmployed
      salesCommission
      contactPhone
      ig
      firstContact
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
      createdAt
      updatedAt
      usersRolesId
      __typename
    }
  }
`;
export const updateUsers = /* GraphQL */ `
  mutation UpdateUsers(
    $input: UpdateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    updateUsers(input: $input, condition: $condition) {
      id
      name
      email
      validated
      isEmployed
      salesCommission
      contactPhone
      ig
      firstContact
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
      createdAt
      updatedAt
      usersRolesId
      __typename
    }
  }
`;
export const deleteUsers = /* GraphQL */ `
  mutation DeleteUsers(
    $input: DeleteUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    deleteUsers(input: $input, condition: $condition) {
      id
      name
      email
      validated
      isEmployed
      salesCommission
      contactPhone
      ig
      firstContact
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
      createdAt
      updatedAt
      usersRolesId
      __typename
    }
  }
`;
export const createRelationship = /* GraphQL */ `
  mutation CreateRelationship(
    $input: CreateRelationshipInput!
    $condition: ModelRelationshipConditionInput
  ) {
    createRelationship(input: $input, condition: $condition) {
      id
      user {
        id
        name
        email
        validated
        isEmployed
        salesCommission
        contactPhone
        ig
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
export const updateRelationship = /* GraphQL */ `
  mutation UpdateRelationship(
    $input: UpdateRelationshipInput!
    $condition: ModelRelationshipConditionInput
  ) {
    updateRelationship(input: $input, condition: $condition) {
      id
      user {
        id
        name
        email
        validated
        isEmployed
        salesCommission
        contactPhone
        ig
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
export const deleteRelationship = /* GraphQL */ `
  mutation DeleteRelationship(
    $input: DeleteRelationshipInput!
    $condition: ModelRelationshipConditionInput
  ) {
    deleteRelationship(input: $input, condition: $condition) {
      id
      user {
        id
        name
        email
        validated
        isEmployed
        salesCommission
        contactPhone
        ig
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
export const createRolPermissions = /* GraphQL */ `
  mutation CreateRolPermissions(
    $input: CreateRolPermissionsInput!
    $condition: ModelRolPermissionsConditionInput
  ) {
    createRolPermissions(input: $input, condition: $condition) {
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
export const updateRolPermissions = /* GraphQL */ `
  mutation UpdateRolPermissions(
    $input: UpdateRolPermissionsInput!
    $condition: ModelRolPermissionsConditionInput
  ) {
    updateRolPermissions(input: $input, condition: $condition) {
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
export const deleteRolPermissions = /* GraphQL */ `
  mutation DeleteRolPermissions(
    $input: DeleteRolPermissionsInput!
    $condition: ModelRolPermissionsConditionInput
  ) {
    deleteRolPermissions(input: $input, condition: $condition) {
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
export const createUserPermissions = /* GraphQL */ `
  mutation CreateUserPermissions(
    $input: CreateUserPermissionsInput!
    $condition: ModelUserPermissionsConditionInput
  ) {
    createUserPermissions(input: $input, condition: $condition) {
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
        salesCommission
        contactPhone
        ig
        firstContact
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
export const updateUserPermissions = /* GraphQL */ `
  mutation UpdateUserPermissions(
    $input: UpdateUserPermissionsInput!
    $condition: ModelUserPermissionsConditionInput
  ) {
    updateUserPermissions(input: $input, condition: $condition) {
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
        salesCommission
        contactPhone
        ig
        firstContact
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
export const deleteUserPermissions = /* GraphQL */ `
  mutation DeleteUserPermissions(
    $input: DeleteUserPermissionsInput!
    $condition: ModelUserPermissionsConditionInput
  ) {
    deleteUserPermissions(input: $input, condition: $condition) {
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
        salesCommission
        contactPhone
        ig
        firstContact
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
export const createCourseSessionType = /* GraphQL */ `
  mutation CreateCourseSessionType(
    $input: CreateCourseSessionTypeInput!
    $condition: ModelCourseSessionTypeConditionInput
  ) {
    createCourseSessionType(input: $input, condition: $condition) {
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
export const updateCourseSessionType = /* GraphQL */ `
  mutation UpdateCourseSessionType(
    $input: UpdateCourseSessionTypeInput!
    $condition: ModelCourseSessionTypeConditionInput
  ) {
    updateCourseSessionType(input: $input, condition: $condition) {
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
export const deleteCourseSessionType = /* GraphQL */ `
  mutation DeleteCourseSessionType(
    $input: DeleteCourseSessionTypeInput!
    $condition: ModelCourseSessionTypeConditionInput
  ) {
    deleteCourseSessionType(input: $input, condition: $condition) {
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
export const createTicketUser = /* GraphQL */ `
  mutation CreateTicketUser(
    $input: CreateTicketUserInput!
    $condition: ModelTicketUserConditionInput
  ) {
    createTicketUser(input: $input, condition: $condition) {
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
        salesCommission
        contactPhone
        ig
        firstContact
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
export const updateTicketUser = /* GraphQL */ `
  mutation UpdateTicketUser(
    $input: UpdateTicketUserInput!
    $condition: ModelTicketUserConditionInput
  ) {
    updateTicketUser(input: $input, condition: $condition) {
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
        salesCommission
        contactPhone
        ig
        firstContact
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
export const deleteTicketUser = /* GraphQL */ `
  mutation DeleteTicketUser(
    $input: DeleteTicketUserInput!
    $condition: ModelTicketUserConditionInput
  ) {
    deleteTicketUser(input: $input, condition: $condition) {
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
        salesCommission
        contactPhone
        ig
        firstContact
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
export const createComments = /* GraphQL */ `
  mutation CreateComments(
    $input: CreateCommentsInput!
    $condition: ModelCommentsConditionInput
  ) {
    createComments(input: $input, condition: $condition) {
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
export const updateComments = /* GraphQL */ `
  mutation UpdateComments(
    $input: UpdateCommentsInput!
    $condition: ModelCommentsConditionInput
  ) {
    updateComments(input: $input, condition: $condition) {
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
export const deleteComments = /* GraphQL */ `
  mutation DeleteComments(
    $input: DeleteCommentsInput!
    $condition: ModelCommentsConditionInput
  ) {
    deleteComments(input: $input, condition: $condition) {
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
