export type Schedule = {
  id: string;
  day: string;
  startHour: string;
  endHour: string;
  isActive?: boolean;
  minimumQuotas?: number;
  maximumQuotas?: number;
  locationSchedulesId?: string;
  courseSchedulesId?: string;
  createdAt?: string;
  updatedAt?: string;
}
export const emptySchedules: Schedule = {
    id: "",
    day:  "",
    startHour:  "",
    endHour:  "",
  };

  
export type FilterOptions  = {
  id?: string;
  courseId?: string;
  locationId?: string;
  day?: string;
  startHour?: string;
  endHour?: string;
  isActive?: string;
  minimumQuotas?: number;
  maximumQuotas?: number;

}