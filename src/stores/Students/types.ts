
export type Enrollment = {
  id: string
}
export const emptyEnrollment: Enrollment = {
  id: "",
};

export type User = {
  name: string
}
export const emptyUser: User = {
  name: "",
};

export type Relationship = {
  id: string
  relationType: string
  user: User
   
}
export const emptyRelationship: Relationship = {
  id: "",
  relationType:  "",
  user: emptyUser
};
export type Student = {
  id: string
  name: string
  lastName: string
  middleName: string
  birthdate: string
  placeOfResidence: string
  contactPhone: string
  whoIsTheContact: string
  emailPhone: string
  gender: string
  
  firstSwimmingClass: boolean;
  attendedDaycare: boolean;
  immersesWithoutSwallowingWater: boolean;
  bornPrematurely: boolean;
  waterOnHisFaceBothersHim: boolean;
  putYourFaceInTheWater: boolean;

  anyIllnessInjuryMedicalCondition: string;
  
 
  
  enrollments: Enrollment[];
  relationships: Relationship[];
  // sessionDetail: SessionDetail[];
  
}

export const emptyStudent: Student = {
  id: "",
  name: "",
  lastName: "",
  middleName: "",
  birthdate: "",
  placeOfResidence: "",
  contactPhone: "",
  whoIsTheContact: "",
  emailPhone: "",
  gender: "",
  
  firstSwimmingClass: false,
  attendedDaycare: false,
  immersesWithoutSwallowingWater: false,
  bornPrematurely: false,
  waterOnHisFaceBothersHim: false,
  putYourFaceInTheWater: false,

  anyIllnessInjuryMedicalCondition: "",
  enrollments: [emptyEnrollment],
  relationships: [emptyRelationship],
  // sessionDetail: [emptySchedules],
};



export type FilterOptions  = {
  name?: string;
  lastName?: string;
  middleName?: string;
  birthdate?: string;
  placeOfResidence?: string;
  contactPhone?: string;
  whoIsTheContact?: string;
  emailPhone?: string;
  gender?: string;
  
  
}