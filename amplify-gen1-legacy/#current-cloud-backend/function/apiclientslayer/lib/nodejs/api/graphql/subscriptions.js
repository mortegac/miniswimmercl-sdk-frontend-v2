const gql = require("graphql-tag");

const onCreateUsers = gql`
  subscription OnCreateUsers($filter: ModelSubscriptionUsersFilterInput) {
    onCreateUsers(filter: $filter) {
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
const onUpdateUsers = gql`
  subscription OnUpdateUsers($filter: ModelSubscriptionUsersFilterInput) {
    onUpdateUsers(filter: $filter) {
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
const onDeleteUsers = gql`
  subscription OnDeleteUsers($filter: ModelSubscriptionUsersFilterInput) {
    onDeleteUsers(filter: $filter) {
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
const onCreateRelationship = gql`
  subscription OnCreateRelationship(
    $filter: ModelSubscriptionRelationshipFilterInput
  ) {
    onCreateRelationship(filter: $filter) {
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
const onUpdateRelationship = gql`
  subscription OnUpdateRelationship(
    $filter: ModelSubscriptionRelationshipFilterInput
  ) {
    onUpdateRelationship(filter: $filter) {
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
const onDeleteRelationship = gql`
  subscription OnDeleteRelationship(
    $filter: ModelSubscriptionRelationshipFilterInput
  ) {
    onDeleteRelationship(filter: $filter) {
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
const onCreateStudent = gql`
  subscription OnCreateStudent($filter: ModelSubscriptionStudentFilterInput) {
    onCreateStudent(filter: $filter) {
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
const onUpdateStudent = gql`
  subscription OnUpdateStudent($filter: ModelSubscriptionStudentFilterInput) {
    onUpdateStudent(filter: $filter) {
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
const onDeleteStudent = gql`
  subscription OnDeleteStudent($filter: ModelSubscriptionStudentFilterInput) {
    onDeleteStudent(filter: $filter) {
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
const onCreateEnrollment = gql`
  subscription OnCreateEnrollment(
    $filter: ModelSubscriptionEnrollmentFilterInput
  ) {
    onCreateEnrollment(filter: $filter) {
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
const onUpdateEnrollment = gql`
  subscription OnUpdateEnrollment(
    $filter: ModelSubscriptionEnrollmentFilterInput
  ) {
    onUpdateEnrollment(filter: $filter) {
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
const onDeleteEnrollment = gql`
  subscription OnDeleteEnrollment(
    $filter: ModelSubscriptionEnrollmentFilterInput
  ) {
    onDeleteEnrollment(filter: $filter) {
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
const onCreateSessionDetail = gql`
  subscription OnCreateSessionDetail(
    $filter: ModelSubscriptionSessionDetailFilterInput
  ) {
    onCreateSessionDetail(filter: $filter) {
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
const onUpdateSessionDetail = gql`
  subscription OnUpdateSessionDetail(
    $filter: ModelSubscriptionSessionDetailFilterInput
  ) {
    onUpdateSessionDetail(filter: $filter) {
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
const onDeleteSessionDetail = gql`
  subscription OnDeleteSessionDetail(
    $filter: ModelSubscriptionSessionDetailFilterInput
  ) {
    onDeleteSessionDetail(filter: $filter) {
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
const onCreateTransaction = gql`
  subscription OnCreateTransaction(
    $filter: ModelSubscriptionTransactionFilterInput
  ) {
    onCreateTransaction(filter: $filter) {
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
const onUpdateTransaction = gql`
  subscription OnUpdateTransaction(
    $filter: ModelSubscriptionTransactionFilterInput
  ) {
    onUpdateTransaction(filter: $filter) {
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
const onDeleteTransaction = gql`
  subscription OnDeleteTransaction(
    $filter: ModelSubscriptionTransactionFilterInput
  ) {
    onDeleteTransaction(filter: $filter) {
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
const onCreateLocation = gql`
  subscription OnCreateLocation($filter: ModelSubscriptionLocationFilterInput) {
    onCreateLocation(filter: $filter) {
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
const onUpdateLocation = gql`
  subscription OnUpdateLocation($filter: ModelSubscriptionLocationFilterInput) {
    onUpdateLocation(filter: $filter) {
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
const onDeleteLocation = gql`
  subscription OnDeleteLocation($filter: ModelSubscriptionLocationFilterInput) {
    onDeleteLocation(filter: $filter) {
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
const onCreateExpense = gql`
  subscription OnCreateExpense($filter: ModelSubscriptionExpenseFilterInput) {
    onCreateExpense(filter: $filter) {
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
const onUpdateExpense = gql`
  subscription OnUpdateExpense($filter: ModelSubscriptionExpenseFilterInput) {
    onUpdateExpense(filter: $filter) {
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
const onDeleteExpense = gql`
  subscription OnDeleteExpense($filter: ModelSubscriptionExpenseFilterInput) {
    onDeleteExpense(filter: $filter) {
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
const onCreateCourse = gql`
  subscription OnCreateCourse($filter: ModelSubscriptionCourseFilterInput) {
    onCreateCourse(filter: $filter) {
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
const onUpdateCourse = gql`
  subscription OnUpdateCourse($filter: ModelSubscriptionCourseFilterInput) {
    onUpdateCourse(filter: $filter) {
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
const onDeleteCourse = gql`
  subscription OnDeleteCourse($filter: ModelSubscriptionCourseFilterInput) {
    onDeleteCourse(filter: $filter) {
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
const onCreateSchedule = gql`
  subscription OnCreateSchedule($filter: ModelSubscriptionScheduleFilterInput) {
    onCreateSchedule(filter: $filter) {
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
const onUpdateSchedule = gql`
  subscription OnUpdateSchedule($filter: ModelSubscriptionScheduleFilterInput) {
    onUpdateSchedule(filter: $filter) {
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
const onDeleteSchedule = gql`
  subscription OnDeleteSchedule($filter: ModelSubscriptionScheduleFilterInput) {
    onDeleteSchedule(filter: $filter) {
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
const onCreateSessionType = gql`
  subscription OnCreateSessionType(
    $filter: ModelSubscriptionSessionTypeFilterInput
  ) {
    onCreateSessionType(filter: $filter) {
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
const onUpdateSessionType = gql`
  subscription OnUpdateSessionType(
    $filter: ModelSubscriptionSessionTypeFilterInput
  ) {
    onUpdateSessionType(filter: $filter) {
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
const onDeleteSessionType = gql`
  subscription OnDeleteSessionType(
    $filter: ModelSubscriptionSessionTypeFilterInput
  ) {
    onDeleteSessionType(filter: $filter) {
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
const onCreateRoles = gql`
  subscription OnCreateRoles($filter: ModelSubscriptionRolesFilterInput) {
    onCreateRoles(filter: $filter) {
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
const onUpdateRoles = gql`
  subscription OnUpdateRoles($filter: ModelSubscriptionRolesFilterInput) {
    onUpdateRoles(filter: $filter) {
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
const onDeleteRoles = gql`
  subscription OnDeleteRoles($filter: ModelSubscriptionRolesFilterInput) {
    onDeleteRoles(filter: $filter) {
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
const onCreatePermissions = gql`
  subscription OnCreatePermissions(
    $filter: ModelSubscriptionPermissionsFilterInput
  ) {
    onCreatePermissions(filter: $filter) {
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
const onUpdatePermissions = gql`
  subscription OnUpdatePermissions(
    $filter: ModelSubscriptionPermissionsFilterInput
  ) {
    onUpdatePermissions(filter: $filter) {
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
const onDeletePermissions = gql`
  subscription OnDeletePermissions(
    $filter: ModelSubscriptionPermissionsFilterInput
  ) {
    onDeletePermissions(filter: $filter) {
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
const onCreateSupportTicket = gql`
  subscription OnCreateSupportTicket(
    $filter: ModelSubscriptionSupportTicketFilterInput
  ) {
    onCreateSupportTicket(filter: $filter) {
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
const onUpdateSupportTicket = gql`
  subscription OnUpdateSupportTicket(
    $filter: ModelSubscriptionSupportTicketFilterInput
  ) {
    onUpdateSupportTicket(filter: $filter) {
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
const onDeleteSupportTicket = gql`
  subscription OnDeleteSupportTicket(
    $filter: ModelSubscriptionSupportTicketFilterInput
  ) {
    onDeleteSupportTicket(filter: $filter) {
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
const onCreateCommentTickets = gql`
  subscription OnCreateCommentTickets(
    $filter: ModelSubscriptionCommentTicketsFilterInput
  ) {
    onCreateCommentTickets(filter: $filter) {
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
const onUpdateCommentTickets = gql`
  subscription OnUpdateCommentTickets(
    $filter: ModelSubscriptionCommentTicketsFilterInput
  ) {
    onUpdateCommentTickets(filter: $filter) {
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
const onDeleteCommentTickets = gql`
  subscription OnDeleteCommentTickets(
    $filter: ModelSubscriptionCommentTicketsFilterInput
  ) {
    onDeleteCommentTickets(filter: $filter) {
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
const onCreateTicketUser = gql`
  subscription OnCreateTicketUser(
    $filter: ModelSubscriptionTicketUserFilterInput
  ) {
    onCreateTicketUser(filter: $filter) {
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
const onUpdateTicketUser = gql`
  subscription OnUpdateTicketUser(
    $filter: ModelSubscriptionTicketUserFilterInput
  ) {
    onUpdateTicketUser(filter: $filter) {
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
const onDeleteTicketUser = gql`
  subscription OnDeleteTicketUser(
    $filter: ModelSubscriptionTicketUserFilterInput
  ) {
    onDeleteTicketUser(filter: $filter) {
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
const onCreateUserPermissions = gql`
  subscription OnCreateUserPermissions(
    $filter: ModelSubscriptionUserPermissionsFilterInput
  ) {
    onCreateUserPermissions(filter: $filter) {
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
const onUpdateUserPermissions = gql`
  subscription OnUpdateUserPermissions(
    $filter: ModelSubscriptionUserPermissionsFilterInput
  ) {
    onUpdateUserPermissions(filter: $filter) {
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
const onDeleteUserPermissions = gql`
  subscription OnDeleteUserPermissions(
    $filter: ModelSubscriptionUserPermissionsFilterInput
  ) {
    onDeleteUserPermissions(filter: $filter) {
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
const onCreateCourseSessionType = gql`
  subscription OnCreateCourseSessionType(
    $filter: ModelSubscriptionCourseSessionTypeFilterInput
  ) {
    onCreateCourseSessionType(filter: $filter) {
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
const onUpdateCourseSessionType = gql`
  subscription OnUpdateCourseSessionType(
    $filter: ModelSubscriptionCourseSessionTypeFilterInput
  ) {
    onUpdateCourseSessionType(filter: $filter) {
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
const onDeleteCourseSessionType = gql`
  subscription OnDeleteCourseSessionType(
    $filter: ModelSubscriptionCourseSessionTypeFilterInput
  ) {
    onDeleteCourseSessionType(filter: $filter) {
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
const onCreateRolPermissions = gql`
  subscription OnCreateRolPermissions(
    $filter: ModelSubscriptionRolPermissionsFilterInput
  ) {
    onCreateRolPermissions(filter: $filter) {
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
const onUpdateRolPermissions = gql`
  subscription OnUpdateRolPermissions(
    $filter: ModelSubscriptionRolPermissionsFilterInput
  ) {
    onUpdateRolPermissions(filter: $filter) {
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
const onDeleteRolPermissions = gql`
  subscription OnDeleteRolPermissions(
    $filter: ModelSubscriptionRolPermissionsFilterInput
  ) {
    onDeleteRolPermissions(filter: $filter) {
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
const onCreateComments = gql`
  subscription OnCreateComments($filter: ModelSubscriptionCommentsFilterInput) {
    onCreateComments(filter: $filter) {
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
const onUpdateComments = gql`
  subscription OnUpdateComments($filter: ModelSubscriptionCommentsFilterInput) {
    onUpdateComments(filter: $filter) {
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
const onDeleteComments = gql`
  subscription OnDeleteComments($filter: ModelSubscriptionCommentsFilterInput) {
    onDeleteComments(filter: $filter) {
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
