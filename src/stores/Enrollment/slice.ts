// ** Redux Imports
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import {fetchData, createUpdateStep01, createUpdateStep02, createUpdateStep03} from "./services"
import {Enrollment, emptyEnrollment, EnrollmentExtra, emptyEnrollmentExtra, FilterOptions} from "./types"

export interface EnrollmentState {
  currentStep: number,
  status: "idle" | "loading" | "failed";
  enrollment: EnrollmentExtra;
  enrollments: Enrollment[];
  errorMessage:string;
}

export const initialState: EnrollmentState = {
  currentStep: 1,
  status: "idle",
  enrollment: emptyEnrollmentExtra,
  enrollments: [emptyEnrollment],
  errorMessage:"",
};


export const getEnrollmen = createAsyncThunk(
  "Enrollmen/list",
  async () => {
    try {
      const response:any = await fetchData();
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH CourseS", error)
      return Promise.reject(error);
    }
  }
);


/**
 * 1)--------------------------------
 * Si existe USER
 *        --> UPDATE DATOS
 * NO EXISTE CREAR USER
 * 
 * 2)--------------------------------
 * Si existe STUDENT
 *        --> UPDATE DATOS
 * NO EXISTE CREAR STUDENT
 * 
 * 3)--------------------------------
 * CON EL ID del USER e ID STUDENTS Crear relacion 
 * 
 * 4)--------------------------------
 * Seleccion del curso
 * e Inscribir en el curso
 * Indicar FECHA DE INICIO
 * 
 * 
 * 5)--------------------------------
 * Seleccion del Pack de sesion
 * 
 * 
 * 6)--------------------------------
 * CREAR SESSIONES
 *  startDate: "07-03-2024",
    studentId: "fcd490d0-1954-4392-a8fd-11c74da3981e",
    sessionTypeId: "78651d17-9ebd-4580-8543-92f02aa3aa60",
    scheduleId: "3972b5f9-a46f-4945-95b0-13ba9d0b667b",
    courseId: "NINOS-2-3-ANOS-VITACURA" 
 */
//   params: {
//   model: string;
//   vehicleBrandTypeOfBrandId: string;
//   type: string;
//   // idBrand: string,
// }

    
    export const setModelAPI = createAsyncThunk(
      "Enrollmen/createInscription",
      async ( params: FilterOptions, { getState }) => {
        
        const currentState: any = getState();
        const { enrollment } = currentState;
        
        let response;
        if (enrollment.currentStep === 1){
          // Save o update USER
          // Save o update RELATION
          response = await createUpdateStep01({ ...params });
          
        }else if (enrollment.currentStep === 2){
          // Save o update STUDENT
          // Save o update RELATION
          response = await createUpdateStep02({ ...params });
          
        }else if (enrollment.currentStep === 3){
          // Save o update INSCRIPCION EN EL CURSO
          // Save o update PACK DE SESSIONES
          // Crear detalle sesiones (FECHA INICIO)
          response = await createUpdateStep03({ ...params });
        }
        
        return response;
      }
    );
    
//     const currentState: any = getState();
//     const { vehiclesManagment } = currentState;
//     const dataVehicle: any = {
//       ...initialStateVehicle.vehicle,
//       ...vehiclesManagment.vehicle,
//     };
//     delete dataVehicle.step;
    
//     const dataProcess: any = {
//       id: vehiclesManagment.id,
//       flagShip: vehiclesManagment.flagShip,
//       currentStep: dataVehicle.currentStep,
//     };
  
//     const response = await addVehicles(dataProcess);
//     // The value we return becomes the `fulfilled` action payload
//     return response;
//   }
// );

export const enrollmentSlice = createSlice({
  name: "enrollmen",
  initialState,
  reducers: {
    increment: (state) => {
      state.status = "loading";
      if (state.currentStep <= 2) state.currentStep += 1;
      // const ID = addApoderado(state);
      state.status = "idle";
    },
    decrement: (state) => {
      state.status = "loading";
      if (state.currentStep >= 2) state.currentStep -= 1;
      state.status = "idle";
    },
    setDataEnroll: (state, action: PayloadAction<{}>) => {
      const objAction: any = action.payload;
      console.log(">> objAction >>", objAction)
      state.enrollment = {
        ...state.enrollment,
        [objAction.key]: objAction.value,
      };
    },
    setDataUser: (state, action: PayloadAction<{}>) => {
      const objAction: any = action.payload;
      console.log(">> objAction >>", objAction)
      state.enrollment = {
        ...state.enrollment,
        guardianId: objAction.id,
        guardianEmail: objAction.email,
        guardianName: objAction.name,
        studentEmail: objAction.email,
      };
    },
    setDataStudent: (state, action: PayloadAction<{}>) => {
      const objAction: any = action.payload;
      console.log(">> objAction >>", objAction)
      console.log(">> state.enrollment >>", state.enrollment)
      state.enrollment = {
        ...state.enrollment,
        studentId: objAction.id,
        studentName: objAction.name,
        studentLastName: objAction.lastName,
        studentBithday: objAction.birthday,
        studentGender: objAction.gender,
        studentResidence: objAction.residence,
        studentEmail: objAction.email,
        studentPhone: objAction.phone,
      };
    },
    cleanData: (state) => {
      state.enrollment = {
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
      
    },
  },
  
  extraReducers: (builder) => {
    builder
      // GET CourseS
      .addCase(getEnrollmen.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(getEnrollmen.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEnrollmen.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        
        // console.log("---getEnrollmen --action---", objPayload)
         
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
        state.enrollment = sortedArray || [];
        
      })
      
      
    
  },
});

export const {
  decrement,
  increment,
  setDataEnroll,
  setDataUser,
  setDataStudent,
  cleanData,
} = enrollmentSlice.actions;
export const selectEnrollment = (state: RootState) => state.enrollment;

export default enrollmentSlice.reducer;
