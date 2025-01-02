// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

import {fetchData, fetchDataStudent} from "./services"
import {Course, emptyCourse, FilterOptions} from "./types"



export interface CourseState {
  status: "idle" | "loading" | "failed";
  course: Course;
 courses: Course[];
 errorMessage:string;
 resumeByLocation:any;
 resumeByLocationTotal:number;
}

export const initialState: CourseState = {
  status: "idle",
  course: emptyCourse,
  courses: [emptyCourse],
  errorMessage:"",
  resumeByLocation:[],
  resumeByLocationTotal:0,
};

// locationId?: string;
// isActive?: boolean;
  

export const getCourses = createAsyncThunk(
  "Courses/list",
  async (objFilter: FilterOptions) => {
    try {
      const response:any = await fetchData({...objFilter});
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH CourseS", error)
      return Promise.reject(error);
    }
  }
);
  

export const getCourseStudent = createAsyncThunk(
  "Courses/listStudent",
  async (objFilter: FilterOptions) => {
    try {
      const response:any = await fetchDataStudent({...objFilter});
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH CourseS", error)
      return Promise.reject(error);
    }
  }
);


export const CourseSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET CourseS
      .addCase(getCourses.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(getCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        
        // console.log("---getCourses --action---", objPayload)
         
        const sortedArray = objPayload?.items.sort((a:any, b:any) => {
          // Primero, comparamos por locationCoursesId
          if (a.locationCoursesId < b.locationCoursesId) return -1;
          if (a.locationCoursesId > b.locationCoursesId) return 1;
          
          // Si locationCoursesId es igual, comparamos por AgeGroupType
          if (a.AgeGroupType < b.AgeGroupType) return -1;
          if (a.AgeGroupType > b.AgeGroupType) return 1;
          
          // Si ambos son iguales, no cambiamos el orden
          return 0;
        });
  
        // state.courses = objPayload?.items || [];
        state.courses = sortedArray || [];
        
      })
      
      // GET CourseS
      .addCase(getCourseStudent.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(getCourseStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCourseStudent.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        
        console.log("---getCourses Students --action---", objPayload)
         
        const sortedArray = objPayload?.items.sort((a:any, b:any) => {
          // Primero, comparamos por locationCoursesId
          if (a.locationCoursesId < b.locationCoursesId) return -1;
          if (a.locationCoursesId > b.locationCoursesId) return 1;
          
          // Si locationCoursesId es igual, comparamos por AgeGroupType
          if (a.AgeGroupType < b.AgeGroupType) return -1;
          if (a.AgeGroupType > b.AgeGroupType) return 1;
          
          // Por id
          if (a.id < b.id) return -1;
          if (a.id > b.id) return 1;
          
          // Si ambos son iguales, no cambiamos el orden
          return 0;
        });
        state.courses = sortedArray || [];
        
        let totalCounts:number = 0;
        // Función para contar enrollments por locationCoursesId y id
        const countEnrollments = (data:any) => {
          // Objeto para almacenar los conteos
          const counts:any = {};
          
          // Recorrer el array
          data.forEach((item:any) => {
            const locationId = item.locationCoursesId;
            const courseId = item.id;
            const enrollmentCount = item.enrollments.items.length;
            
            // Inicializar la ubicación si no existe
            if (!counts[locationId]) {
              counts[locationId] = {
                totalEnrollments: 0,
                courses: {}
              };
            }
            
            // Agregar conteo para el curso específico
            counts[locationId].courses[courseId] = enrollmentCount;
            
            // Actualizar el total de la ubicación
            counts[locationId].totalEnrollments += enrollmentCount;
            totalCounts += enrollmentCount;
            // console.log("--totalCounts-", totalCounts)
          });
          
          return counts;
        };

        const getEnrollmentSummary = (data:any) => {
          const counts = countEnrollments(data);
          
          return Object.entries(counts).map(([location, data]:[any,any]) => ({
            location,
            totalEnrollments: data.totalEnrollments,
            courseDetails: Object.entries(data.courses).map(([courseId, count]) => ({
              courseId,
              enrollments: count
            }))
          }));
        };
        state.resumeByLocation=getEnrollmentSummary(sortedArray);
        console.log("--totalCounts 22-", totalCounts)
        state.resumeByLocationTotal=Number(totalCounts);
        
      })
      
      
    
  },
});

export const selectCourse = (state: RootState) => state.course;

export default CourseSlice.reducer;
