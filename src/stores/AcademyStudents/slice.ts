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
        
        const _orderBySponsored = Array.isArray(objPayload?.items) ? objPayload?.items.sort((a:any, b:any) => String(a.isSponsored).localeCompare(String(b.isSponsored))) : objPayload?.items;
        const _orderByPaid = Array.isArray(_orderBySponsored) ? _orderBySponsored.sort((a:any, b:any) => String(a.isPaid).localeCompare(String(b.isPaid))) : _orderBySponsored;

        state.academyStudents = _orderByPaid || [];

      })
  },
});

export const selectAcademyStudents = (state: RootState) => state.academyStudents;

export default academyStudentsSlice.reducer;
