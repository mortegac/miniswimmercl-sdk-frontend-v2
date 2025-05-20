// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

import {fetchData, fetchDataCourseQuote, updateData, updateSession, fetchSessionsByStudent} from "./services"
import {SessionDetail, emptySessionDetail, FilterOptions, InputOptions} from "./types"



export interface SessionDetailsState {
  status: "idle" | "loading" | "failed";
  SessionDetail: SessionDetail;
 sessionDetails: SessionDetail[];
 sessionDetailsQuote: any[];
 resume: any;
 errorMessage:string;
 wasModified:boolean;
}

export const initialState: SessionDetailsState = {
  status: "idle",
  SessionDetail: emptySessionDetail,
  sessionDetails: [emptySessionDetail],
  sessionDetailsQuote: [],
  resume:{},
  errorMessage:"",
  wasModified:false
};




export const getSessionDetails = createAsyncThunk(
  "sessionDetails/list",
  async (objFilter: FilterOptions) => {
    try {
      const response:any = await fetchData({ ...objFilter });
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH SessionDetails", error)
      return Promise.reject(error);
    }
  }
);


export const getSessionByStudent= createAsyncThunk(
  "sessionDetails/listByStudent",
  async (objFilter: FilterOptions) => {
    try {
      const response:any = await fetchSessionsByStudent({ ...objFilter });
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH SessionDetails", error)
      return Promise.reject(error);
    }
  }
);


export const getSessionQuote = createAsyncThunk(
  "sessionDetails/quote",
  async (objFilter: FilterOptions) => {
    try {
      const response:any = await fetchDataCourseQuote({ ...objFilter });
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH getSessionQuote", error)
      return Promise.reject(error);
    }
  }
);



export const setOneSessionDetail = createAsyncThunk(
  "sessionDetails/updateOne",
  async (objInput: InputOptions) => {
    try {
      const response:any = await updateSession({ ...objInput });
      return response;
    } catch (error) {
      console.error(">>>>ERROR UPDATE SessionDetails ONE", error)
      return Promise.reject(error);
    }
  }
);
export const setSessionDetails = createAsyncThunk(
  "sessionDetails/update",
  async (objInput: InputOptions) => {
    try {
      const response:any = await updateData({ ...objInput });
      return response;
    } catch (error) {
      console.error(">>>>ERROR UPDATE SessionDetails", error)
      return Promise.reject(error);
    }
  }
);


export const sessionDetailslice = createSlice({
  name: "SessionDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET SessionDetails
      .addCase(getSessionDetails.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(getSessionDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSessionDetails.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        
        const newArray = objPayload.items.sort((a:any, b:any) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        
        const counts = objPayload?.items.reduce((acc:any, item:any) => {
          acc[item.status] = (acc[item.status] || 0) + 1;
          return acc;
        }, {
          USED: 0,
          RECOVERED: 0,
          ACTIVE: 0
        });
        
        state.sessionDetails = newArray || [];
        state.resume = counts || {};
      })
      
      // getSessionByStudent
      .addCase(getSessionByStudent.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(getSessionByStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSessionByStudent.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        
        // const newArray = objPayload.items.sort((a:any, b:any) => {
        //   return new Date(a.date).getTime() - new Date(b.date).getTime();
        // });
        
        // const counts = objPayload?.items.reduce((acc:any, item:any) => {
        //   acc[item.status] = (acc[item.status] || 0) + 1;
        //   return acc;
        // }, {
        //   USED: 0,
        //   RECOVERED: 0,
        //   ACTIVE: 0
        // });
        
        state.sessionDetails = objPayload.items || [];
        // state.resume = counts || {};
      })
      
      // GET getSessionQuote COURSES
      .addCase(getSessionQuote.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(getSessionQuote.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSessionQuote.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        // const newArray = objPayload.sort((a:any, b:any) => {
        //   return new Date(a.date).getTime() - new Date(b.date).getTime();
        // });
        
        // {
        //   title: "8 | Bebes - 2 a 12 meses - 10:00 ",
        //  
        // },
        console.log("---objPayload GET QUOTES----", objPayload)
        
        // const newArray = objPayload?.items?.map((item:any, i:number) => {
        //   // if (item?.sessionNumber === 4) {
        //     return {
        //       title:`${item?.student?.lastName} ${item?.student?.lastName}\n${item?.sessionNumber}-${item?.totalSessions} `, //${item?.locationId}
        //       start: item?.date.replace('T00:00:00.000Z', ''),
        //       end: item?.date.replace('T00:00:00.000Z', ''),
        //     }
        //   // }
        // });
        
        const newArray = objPayload?.items
        ?.filter((item:any) => item?.totalSessions === item?.sessionNumber)
        ?.map((item:any, i:number) => ({
          title: `${item?.student?.name} ${item?.student?.lastName}\n${item?.sessionNumber}-${item?.totalSessions} ${item?.schedule?.day}-${item?.schedule?.startHour}`,
          start: item?.date.replace('T00:00:00.000Z', ''),
          end: item?.date.replace('T00:00:00.000Z', '')
        }));
        
        
        state.sessionDetails = objPayload || [];
        state.sessionDetailsQuote = newArray || [];
        
      })
      
      // UPDATE SessionDetails
      .addCase(setSessionDetails.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(setSessionDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setSessionDetails.fulfilled, (state, action) => {
        // const objPayload: any = action.payload;
        state.status = "idle";
        
        // const newArray = objPayload.items.sort((a:any, b:any) => {
        //   return new Date(a.date).getTime() - new Date(b.date).getTime();
        // });
        // state.sessionDetails = newArray || [];
      })
      
      // UPDATE SessionDetails
      .addCase(setOneSessionDetail.rejected, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "failed";
        state.errorMessage = objPayload.errorMessage;
      })
      .addCase(setOneSessionDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setOneSessionDetail.fulfilled, (state, action) => {
        // const objPayload: any = action.payload;
        state.status = "idle";
        state.wasModified = action.payload;
      })
      
      
    
  },
});

export const selectSessionDetails = (state: RootState) => state.sessionDetail;

export default sessionDetailslice.reducer;
