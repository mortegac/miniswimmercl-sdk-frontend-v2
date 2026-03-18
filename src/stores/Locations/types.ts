export type Course = {
  id: string;
  title: string;
  isActive: boolean;
}
export const emptyCourse: Course = {
  id: "",
  title: "",
  isActive: false,
}

export type Schedules = {
  id: string;
  day: string;
  startHour: string;
  course: Course;
}
export const emptySchedules: Schedules = {
  id: "",
  day: "",
  startHour: "",
  course: { id: "", title: "", isActive: false },
}

export type Location = {
  id: string;
  name: string;
  city: string;
  region: string;
  group: string;
  country: string;
  minimumTemperature: number;
  maximumTemperature: number;
  address: string;
  phone: string;
  imageMap: string;
  urlMap: string;
  directions: string;
  isActive: boolean;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
  courses: Course[];
  schedules: Schedules[];
};

export const emptyLocation: Location = {
  id: "",
  name: "",
  city: "",
  region: "",
  group: "",
  country: "CHILE",
  minimumTemperature: 28,
  maximumTemperature: 28,
  address: "",
  phone: "",
  imageMap: "",
  urlMap: "",
  directions: "",
  isActive: true,
  isVisible: true,
  createdAt: "",
  updatedAt: "",
  courses: [emptyCourse],
  schedules: [emptySchedules],
};

export type FilterOptions = {
  isActive?: boolean;
  isVisible?: boolean;
  skipFilter?: boolean;
  country?: string;
};

export type InputLocation = {
  id?: string;
  name: string;
  city: string;
  region: string;
  group: string;
  country: string;
  minimumTemperature: number;
  maximumTemperature: number;
  address: string;
  phone: string;
  imageMap?: string;
  urlMap?: string;
  directions?: string;
  isActive: boolean;
  isVisible: boolean;
};
