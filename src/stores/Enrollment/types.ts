// import { emptyCourse } from "../Locations/types";

interface Relationship {
  usersRelationshipsId: string;
  relationType: string;
  user: {
    id: string;
    name: string;
  };
}


interface Student {
  id: string;
  name: string;
  lastName: string;
  birthdate: string;
  relationships: {
    items: Relationship[];
  };
  // relationships: {
  //   items: Array<{
  //     usersRelationshipsId: string;
  //     relationType: string;
  //     user: {
  //       id: string;
  //       name: string;
  //     };
  //   }>;
  // };
}

export const emptyStudent: Student = {
  id: "",
  name: "",
  lastName: "",
  birthdate: "",
  relationships: {
    items: []
  }
}

interface Course {
  id: string;
  title: string;
  location: {
    id: string;
    name: string;
  };
}

export const emptyCourse: Course = {
  id: "",
  title: "",
  location: {
    id: "",
    name: "",
  }
}

export type Enrollment = {
  id: string
  amountPaid: number
  startDate: string
  endDate: string 
  wasPaid: boolean
  timeAWeek: number
  numberOfSessions: number
  sessionsLeft: number
  sessionsUsed: number
  
  
  student: Student;
  course: Course;
  
  // student: Student! @belongsTo
  // sessionType: SessionType! @belongsTo
  // course: Course! @belongsTo
  // transaction: Transaction @hasOne   # Relacion ono to one con la transaccion del pago
  // sessionDetails: [SessionDetail] @hasMany
}

export const emptyEnrollment: Enrollment = {
  id: "",
  amountPaid: 0,
  startDate: "",
  endDate: "",
  wasPaid: false,
  timeAWeek: 0,
  numberOfSessions: 0,
  sessionsLeft: 0,
  sessionsUsed: 0,
  course: emptyCourse,
  student: emptyStudent,
};




export type EnrollmentExtra = {
  // GUARDIAN
  guardianId?: string
  guardianEmail?: string
  guardianName?: string
  guardianRelation?: string
  
  // STUDENT
  studentId?: string
  studentName?: string
  studentFullName?: string
  studentLastName?: string
  studentAge?: string
  studentBithday?: string
  studentGender?: string
  studentResidence?: string
  studentEmail?: string
  studentPhone?: string
  
  // ENROLLMENT
  enrollmentStartDate?: string
  enrollmentSessionTypeId?: string
  enrollmentSessionTypeName?: string
  enrollmentScheduleId?: string
  enrollmentScheduleName?: string
  enrollmentCourseId?: string
  enrollmentCourseName?: string
  
}

export const emptyEnrollmentExtra : EnrollmentExtra = {
  // GUARDIAN
  guardianId: "",
  guardianEmail: "",
  guardianName: "",
  guardianRelation: "",
  
  // STUDENT
  studentId: "",
  studentName: "",
  studentFullName: "",
  studentLastName: "",
  studentAge: "",
  studentBithday: "",
  studentGender: "",
  studentResidence: "",
  studentEmail: "",
  studentPhone: "",
  
  // CREACION SESSIONES
  enrollmentStartDate: "",
  enrollmentSessionTypeId: "",
  enrollmentSessionTypeName: "",
  enrollmentScheduleId: "",
  enrollmentScheduleName: "",
  enrollmentCourseId: "",
  enrollmentCourseName: "",
}

export type FilterOptions  = {
  name?: string;
    
  userId?: string;
  locationId?: string;
  studentId?: string;
  enrollmentStartDate?: string;
  enrollmentSessionTypeId?: string;
  enrollmentScheduleId?: string;
  enrollmentCourseId?: string;
  day?: string;
  month?: string;
  year?: string;
  
}