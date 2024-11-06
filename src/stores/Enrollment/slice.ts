// ** Redux Imports
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// import {transformResponse} from "../../utils/parser";
import {fetchData, createEnrollment, createUpdateStep01, createUpdateStep02, createUpdateStep03} from "./services"
import {Enrollment, emptyEnrollment, EnrollmentExtra, emptyEnrollmentExtra, FilterOptions} from "./types"

export interface EnrollmentState {
  currentStep: number,
  status: "idle" | "loading" | "failed";
  sessions: any,
  cartId:string;
  enrollment: EnrollmentExtra;
  enrollments: Enrollment[];
  errorMessage:string;
}

export const initialState: EnrollmentState = {
  currentStep: 1,
  status: "idle",
  sessions: [],
  cartId: "",
  enrollment: emptyEnrollmentExtra,
  enrollments: [emptyEnrollment],
  errorMessage:"",
};



export const setEnrollment = createAsyncThunk(
  "Enrollment/create",
  async (objFilter: FilterOptions, { dispatch }) => {
    try {
      // console.error(">>>>setEnrollment-objFilter", objFilter)
      const response:any = await createEnrollment({ ...objFilter });
      // console.error(">>>>setEnrollment-response", response)
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH setEnrollment", error)
      return Promise.reject(error);
    }
  }
);

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

export const getStudents = createAsyncThunk(
  "Enrollment/list",
  async (objFilter: FilterOptions) => {
    try {
      const response:any = await fetchData(objFilter);
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH AcademyStudentsS", error)
      return Promise.reject(error);
    }
  }
);


export const enrollmentSlice = createSlice({
  name: "enrollmen",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<{}>) => {
      const objAction: any = action.payload;
      state.currentStep = objAction;
    },
    // setStep: (state, action: PayloadAction<{}>) => {
    //   const objAction: any = action.payload;
    //   state.status = "loading";
    //   state.currentStep = objAction.value;
    //   state.status = "idle";
    // },
    increment: (state) => {
      state.status = "loading";
      // if (state.currentStep <= 2) 
        state.currentStep += 1;
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
      // console.log(">> objAction >>", objAction)
      state.enrollment = {
        ...state.enrollment,
        [objAction.key]: objAction.value,
      };
    },
    setDataUser: (state, action: PayloadAction<{}>) => {
      const objAction: any = action.payload;
      // console.log(">> objAction >>", objAction)
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
      // console.log(">> objAction >>", objAction)
      // console.log(">> state.enrollment >>", state.enrollment)
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
        
        // ENROLLMENT
        enrollmentStartDate: "",
        enrollmentSessionTypeId: "",
        enrollmentSessionTypeName: "",
        enrollmentScheduleId: "",
        enrollmentScheduleName: "",
        enrollmentCourseId: "",
        enrollmentCourseName: "",
        
      }
      
    },
  },
  
  extraReducers: (builder) => {
    builder
       // GET Estudents
       .addCase(getStudents.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(getStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        // console.log("--objPayload--", objPayload)
                
        function sortByEndDate(data: Enrollment[]): Enrollment[] {
          return data.sort((a, b) => {
            const dateA = convertToDate(a.startDate);
            const dateB = convertToDate(b.startDate);
            return dateA.getTime() - dateB.getTime();
          });
        }
        
        function convertToDate(dateString: string): Date {
          const [day, month, year] = dateString.split('-');
          return new Date(`${year}-${month}-${day}`);
        }
        
        const sortedData = sortByEndDate(objPayload);
        
        state.enrollments = sortedData || [];

      })
      
      
      // SET ENROLLMENT
      .addCase(setEnrollment.rejected, (state, action) => {
        const objPayload: any = action.payload;
        // state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(setEnrollment.pending, (state) => {
        // state.status = "loading";
      })
      .addCase(setEnrollment.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        // state.status = "idle";
        
        // console.log("---setEnrollment --action---", objPayload)
        
          
        function transformApiResponse(apiResponse:any) {
          // Remove the surrounding curly braces
          const cleanedResponse = apiResponse.slice(1, -1);
        
          // Split the response into key-value pairs
          const pairs = cleanedResponse.split(', ');
        
          // Create an object from the key-value pairs
          const responseObj:any = {};
          for (const pair of pairs) {
            const [key, value] = pair.split('=');
            responseObj[key] = value.startsWith('{') ? JSON.parse(value) : value;
          }
        
          console.log("---responseObj--", responseObj)
          // console.log("---responseObj?.body?.sessions--", responseObj?.body?.sessions)
          
          const { statusCode, body } = responseObj;
    
          return {
            statusCode: parseInt(statusCode),
            sessions: responseObj?.body?.sessions,
            cartId: responseObj?.body?.cartId
            // ...JSON.parse(body)
          };
        }

        const jsonResponse = transformApiResponse(objPayload?.data);
        console.log("jsonResponse>>  ", jsonResponse);
        
          
        state.sessions = jsonResponse?.sessions || [];
        state.cartId = jsonResponse?.cartId || [];
      })
      
      
    
  },
});

export const {
  setStep,
  decrement,
  increment,
  setDataEnroll,
  setDataUser,
  setDataStudent,
  cleanData,
} = enrollmentSlice.actions;
export const selectEnrollment = (state: RootState) => state.enrollment;

export default enrollmentSlice.reducer;
