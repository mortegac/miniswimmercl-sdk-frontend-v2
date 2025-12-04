
export type SessionDetail = {
  id: String;
  date: String;
  month: String;
  year: String;
  sessionNumber: Number;
  totalSessions: Number;
  status: String;
  proratedValue: Number;
  wasEmailSent: Boolean;
  locationId: String;
  locationIdUsed: String;
  
  
  // enrollment: Enrollment[];
  // student: Student[];

  
}

export const emptySessionDetail: SessionDetail = {
  id: "",
  date: "",
  month: "",
  year:  "",
  sessionNumber: 0,
  totalSessions: 0,
  status:  "",
  proratedValue: 0,
  wasEmailSent: false,
  locationId:  "",
  locationIdUsed:  "",
  // sessionDetail: [emptySchedules],
};

export type FilterOptions  = {
  studentId?: string;
  enrollmentId?: string;
  status?: string;
  sessionDate?: string;
  sessionDateEnd?: string;
  locationId?: string;
  
};
export type InputOptions  = {
  userModifyId?: string;
  sessionNumber?: string;
  sessionId?: string;
  sessionDate?: string;
  currentSession?: string;
  totalSessions?: string;
  proratedValue?: string;
  status?: string;
  locationId?: string;
  locationIdUsed?: string;
  studentId?: string;
  enrollmentId?: string;
  date?: string;
  month?: string;
  year?: string;
  courseId?: string;
  scheduleId?: string;
  wasEmailSent?: string;
};