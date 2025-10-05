
export type SessionType = {
  id: string;
  name: string;
  description?: string;
  durationSession: number;
  timeAWeek: number;
  totalSessions: number;
  amount: number;
  isActive: boolean;
  isTestClass: boolean;
  packValidity?: number;
  createdAt: string;
  updatedAt: string;
  
  // Relations
  courses?: { items: Course[] };
  enrollments?: { items: Enrollment[] };
  privateEnrollments?: { items: PrivateEnrollment[] };
};

export const emptySessionType: SessionType = {
  id: "",
  name: "",
  description: "",
  durationSession: 0,
  timeAWeek: 0,
  totalSessions: 0,
  amount: 0,
  isActive: false,
  isTestClass: false,
  packValidity: 0,
  createdAt: "",
  updatedAt: "",
  courses: { items: [] },
  enrollments: { items: [] },
  privateEnrollments: { items: [] }
};

// Types for relations
export type Course = {
  id: string;
  title: string;
  description?: string;
};

export type Enrollment = {
  id: string;
  amountPaid: number;
  startDate: string;
  endDate: string;
  wasPaid: boolean;
};

export type PrivateEnrollment = {
  id: string;
  amountPaid: number;
  startDate: string;
  endDate: string;
  wasPaid: boolean;
};

export type FilterOptions = {
  id?: string;
  isActive?: boolean;
  isTestClass?: boolean;
  name?: string;
  limit?: number;
  nextToken?: string;
  sortDirection?: "ASC" | "DESC";
};

export type InputOptions = {
  id?: string;
  name: string;
  description?: string;
  durationSession: number;
  timeAWeek: number;
  totalSessions: number;
  amount: number;
  isActive?: boolean;
  isTestClass?: boolean;
  packValidity?: number;
};