export type Schedule = {
  id: string;
  day: string;
  startHour: string;
  endHour: string;
}
export const emptySchedules: Schedule = {
    id: "",
    day:  "",
    startHour:  "",
    endHour:  "",
  };
  export type SessionType = {
    id: string;
    name: string;
    description: string;
    durationSession: number;
    timeAWeek: number;
    totalSessions: number;
    amount: number;
  }
  export const emptySessionTypes: SessionType = {
    id: "",
    name:  "",
    description:  "",
    durationSession: 0,
    timeAWeek: 0,
    totalSessions: 0,
    amount: 0,
  };

type AgeType = "MONTHS" | "YEARS"; 
type AgeGroupType = "ALL" | "BABIES" | "CHILDREN" | "ADULTS" | "PREGNANT" | "OLDER_ADULTS"; 
export type Course = {
  id: string
  title: string
  description: string
  startingAge: number
  endingAge: number
  ageType: AgeType
  AgeGroupType: AgeGroupType
  duration: string
  isActive: boolean
  locationCoursesId: string

  schedules: {items: Schedule[]};
  sessionTypes: {items: SessionType[]};

}

export const emptyCourse: Course = {
  id:  "",
  title:  "",
  description:  "",
  startingAge: 0,
  endingAge: 0,
  ageType: "MONTHS",
  AgeGroupType:  "CHILDREN",
  duration:  "",
  isActive: false,
  locationCoursesId:"",
  schedules: {items: [emptySchedules]},
  sessionTypes: {items: [emptySessionTypes]},
};



export type FilterOptions  = {
  locationId?: string;
  isActive?: boolean;

}