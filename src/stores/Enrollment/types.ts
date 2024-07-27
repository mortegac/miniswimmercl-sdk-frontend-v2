
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
  studentLastName?: string
  studentBithday?: string
  studentGender?: string
  studentResidence?: string
  studentEmail?: string
  studentPhone?: string
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
  studentLastName: "",
  studentBithday: "",
  studentGender: "",
  studentResidence: "",
  studentEmail: "",
  studentPhone: "",
}

export type FilterOptions  = {
  name?: string;

  
  
}