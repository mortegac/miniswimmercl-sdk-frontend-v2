// ** Redux Imports
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// import {transformResponse} from "../../utils/parser";
import {fetchGuardian, fetchData, createEnrollment, deleteEnrollment, updatePayEnrollment, createUpdateStep01, createUpdateStep02, createUpdateStep03} from "./services"
import {Enrollment, emptyEnrollment, EnrollmentExtra, emptyEnrollmentExtra, FilterOptions, FilterUser} from "./types"

export interface EnrollmentState {
  currentStep: number,
  status: "idle" | "loading" | "failed";
  sessions: any,
  cartId:string;
  enrollment: EnrollmentExtra;
  enrollments: Enrollment[];
  errorMessage:string;
  resume:any;
}

export const initialState: EnrollmentState = {
  currentStep: 1,
  status: "idle",
  sessions: [],
  cartId: "",
  enrollment: emptyEnrollmentExtra,
  enrollments: [emptyEnrollment],
  errorMessage:"",
  resume:{
    wasPaidCount: 0,
    unpaidCount: 0,
    totalAmountPaid: 0,
    unpaidCourses: 0,
  }
};


export const getGuardian = createAsyncThunk(
  "Enrollment/getGuardian ",
  async (objFilter: FilterUser) => {
    try {
      const response:any = await fetchGuardian({ ...objFilter });
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH getUser", error)
      return Promise.reject(error);
    }
  }
);


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


export const removeEnrollment = createAsyncThunk(
  "Enrollment/deleteEnroll",
  async (objFilter: FilterOptions, { dispatch }) => {
    try {
      // console.error(">>>>setEnrollment-objFilter", objFilter)
      const response:any = await deleteEnrollment({ ...objFilter });
      // console.error(">>>>setEnrollment-response", response)
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH setEnrollment", error)
      return Promise.reject(error);
    }
  }
);
export const updateEnrollmentPay = createAsyncThunk(
  "Enrollment/updateEnrollmentPay",
  async (objFilter: FilterOptions, { dispatch }) => {
    try {
      const response:any = await updatePayEnrollment({ ...objFilter });
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH updatePayEnrollment", error)
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
      console.error(">>>>ERROR FETCH Enrollment/list", error)
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
        guardianPhone: objAction.phone,
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
        ...emptyEnrollmentExtra,
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
       // Contar elementos con wasPaid true y false
        const countWasPaid = objPayload.reduce((acc:any, item:any) => {
          item.wasPaid ? acc.paid++ : acc.unpaid++;
          return acc;
        }, { paid: 0, unpaid: 0 });

        // Sumar amountPaid de los elementos con wasPaid true
        const totalAmountPaid = objPayload
          .filter((item:any) => item.wasPaid)
          .reduce((total:any, item:any) => total + item.amountPaid, 0);

        // Obtener arreglo de cursos con wasPaid false
        const unpaidCourses = objPayload
          .filter((item:any) => !item.wasPaid)
          .map((item:any) => ({
            id: item.course.id,
            title: item.course.title
          }));
  
        state.enrollments = objPayload || [];
        state.resume = {
          wasPaidCount: countWasPaid.paid,
          unpaidCount: countWasPaid.unpaid,
          totalAmountPaid: totalAmountPaid,
          unpaidCourses: unpaidCourses
        }

      })
      
      
       // get Guardian
       .addCase(getGuardian.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(getGuardian.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getGuardian.fulfilled, (state, action) => {
        state.status = "idle";
        const objPayload: any = action.payload;
        console.log("---objPayload---", objPayload)
        
        // if(objPayload?.id !== ""){
        const data:{} = objPayload?.id && {
          guardianId:objPayload?.id,
          guardianEmail: objPayload?.email,
          guardianPhone: objPayload?.contactPhone,
          guardianName: objPayload?.name
        }
          state.enrollment = {
            ...state.enrollment,
            ...action.payload,
            ...data
            // guardianId:objPayload?.id,
            // guardianEmail: objPayload?.email,
            // guardianPhone: objPayload?.contactPhone,
            // guardianName: objPayload?.name
            
          // };
        }
       
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
      
      
      // REMOVE ENROLLMENT
      .addCase(removeEnrollment.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(removeEnrollment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeEnrollment.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        console.log("---setEnrollment --action---", objPayload)
      })
      
      
      // UPDATE PAYMENT ENROLLMENT
      .addCase(updateEnrollmentPay.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(updateEnrollmentPay.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateEnrollmentPay.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        console.log("---updateEnrollmentPay --action---", objPayload)
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
