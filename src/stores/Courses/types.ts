
// export type User = {
//   name: string
// }
// export const emptyUser: User = {
//   name: "",
// };

// export type Relationship = {
//   id: string
//   relationType: string
//   user: User
   
// }
// export const emptyRelationship: Relationship = {
//   id: "",
//   relationType:  "",
//   user: emptyUser
// };
export type Course = {
  id: string
  title: string
  description: string
  startingAge: number
  endingAge: number
  ageType: number
  AgeGroupType: string
  duration: string
  isActive: boolean
  locationCoursesId: string

  // location: Location @belongsTo               # relación muchos a uno.
  // schedules: [Schedule] @hasMany              # relación uno a muchos
  // sessionTypes: [SessionType] @manyToMany(relationName: "CourseSessionType")
  // enrollments: [Enrollment] @hasMany  
  
  
  
  // sessionDetail: SessionDetail[];
  
}

export const emptyCourse: Course = {
  id:  "",
  title:  "",
  description:  "",
  startingAge: 0,
  endingAge: 0,
  ageType: 0,
  AgeGroupType:  "",
  duration:  "",
  isActive: false,
  locationCoursesId:"",
  // sessionDetail: [emptySchedules],
};



