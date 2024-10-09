
export type Course = {
  id: string;
  title: string;
}
export const emptyCourse: Course = {
  id: "",
  title: "",
}

export type Schedules = {
  id: string;
  day: string;
  startHour: string;
  course: Course;
  // course: {
  //   id: string;
  //   title: string;
  // }
}
export const emptySchedules: Schedules = {
  id: "",
  day: "",
  startHour: "",
  course: { 
    id: "",
    title: "",
  },
}

export type Location = {  
  id: string;
  name: string;
  city: string;
  minimumTemperature: number;
  maximumTemperature: number;
  address: string;
  phone: string;
  
  imageMap: string;
  urlMap: string;
  directions: string;
  
  createdAt: string;
  updatedAt: string;

  courses: Course[];
  schedules: Schedules[];
  
  // schedules: { items: Schedule[] };
  // expenses: { items: Expense[] };
};

export const emptyLocation: Location = {
  id: "",
  name: "",
  city: "",
  minimumTemperature: 28,
  maximumTemperature: 28,
  address: "",
  phone: "",
  
  imageMap: "",
  urlMap: "",
  directions: "",
  
  createdAt: "",
  updatedAt: "",
  courses: [emptyCourse],
  schedules: [emptySchedules],
};



