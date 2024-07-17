

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
  
  // sessionDetail: [emptySchedules],
};

export type FilterOptions  = {
  studentId?: string;
  status?: string;
};
export type InputOptions  = {
  sessionId?: string;
  status?: string;
};