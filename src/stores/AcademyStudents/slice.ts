// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";


import {fetchData} from "./services"
import {AcademyStudents, emptyAcademyStudents, FilterOptions} from "./types"



export interface UserState {
  status: "idle" | "loading" | "failed";
  academyStudent: AcademyStudents;
  academyStudents: AcademyStudents[];
 errorMessage:string;
}

export const initialState: UserState = {
  status: "idle",
  academyStudent: emptyAcademyStudents,
  academyStudents: [emptyAcademyStudents],
  errorMessage:"",
};



// export const setAcademyStudents = createAsyncThunk(
//   "AcademyStudents/create",
//   async (objFilter: FilterOptions, { dispatch }) => {
//     try {
//       const response:any = await createAcademyStudentsquick({ ...objFilter });
      
//       console.log("---AcademyStudents/create-----", response)
//       // Dispatch setDataEnroll action after creating the AcademyStudents
//       await Promise.all([
//         await dispatch(setDataEnroll({ key: "AcademyStudentsId", value: response?.id || "" })),
//         await dispatch(setRelationship({ 
//           userId: objFilter.idUser,
//           AcademyStudentsId: response?.id,
//           relation: objFilter.relation,
//         })),
//       ]);
      
//       return response;
//     } catch (error) {
//       console.error(">>>>ERROR FETCH create AcademyStudents and relationship", error)
//       return Promise.reject(error);
//     }
//   }
// );
export const getAcademyStudents = createAsyncThunk(
  "AcademyStudentss/list",
  async () => {
    try {
      const response:any = await fetchData();
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH AcademyStudentsS", error)
      return Promise.reject(error);
    }
  }
);


export const academyStudentsSlice = createSlice({
  name: "academyStudents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET AcademyStudentsS
      .addCase(getAcademyStudents.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(getAcademyStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAcademyStudents.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        
        // console.log("---getAcademyStudentss --action---", objPayload)
        state.academyStudents = objPayload?.items || [];
        
      })
      
      // setAcademyStudents
      // .addCase(setAcademyStudents.rejected, (state, action) => {
      //   const objPayload: any = action.payload;
      //   state.status = "failed";
      //   state.errorMessage = objPayload.errorMessage;
      // })
      // .addCase(setAcademyStudents.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(setAcademyStudents.fulfilled, (state, action) => {
      //   state.status = "idle";
      //   const objPayload: any = action.payload;
      //   console.log("---objPayload---", objPayload)

      //   state.AcademyStudents.id = objPayload?.id || "";
      //   // state.name = objPayload[0]?.name || "";
      //   // state.email = objPayload[0]?.email || "";
      // })
      
      
      
    
  },
});

export const selectAcademyStudents = (state: RootState) => state.academyStudents;

export default academyStudentsSlice.reducer;
