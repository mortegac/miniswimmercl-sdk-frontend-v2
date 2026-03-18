
export type Enrollment = {
  id: string
  items?:any[]
}
export const emptyEnrollment: Enrollment = {
  id: "",
  items:[]
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
  createdAt: string;
  
 
  
  enrollments: Enrollment[];
  relationships: Relationship[];
  evaluationLevelId?: string;
  evaluationIcon?: string;
  evaluationDescription?: string;
  studentEvaluations?: { items: Array<{ id: string; date: string; wasApproved: boolean; evaluationLevelId: string; evaluationLevel?: { id: string; ico?: string; name?: string; description?: string } }> };
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
  createdAt: "",
  enrollments: [emptyEnrollment],
  relationships: [emptyRelationship],
  // sessionDetail: [emptySchedules],
};



export type FilterOptions  = {
  studentId?: string;
  name?: string;
  lastName?: string;
  middleName?: string;
  birthdate?: string;
  placeOfResidence?: string;
  contactPhone?: string;
  whoIsTheContact?: string;
  emailPhone?: string;
  gender?: string;
  idUser?: string;
  relation?: string;
  
}