import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface BreadcrumbState {
  start:string;
  startURL:string;
  first?:string;
  firstURL?:string;
  second?:string;
  secondURL?:string;
  third?:string;
  thirdURL?:string;
}


export const initialState: BreadcrumbState = {
  start: "Inicio",
  startURL: "/",
  first: "",
  firstURL: "",
  second: "",
  secondURL: "",
  third: "",
  thirdURL: "",
};


export const breadcrumbSlice = createSlice({
  name: "breadcrumb",
  initialState,
  reducers: {
    setBreadcrumb: (state, action: PayloadAction<{}>) => {
      const objAction: any = action.payload;

      state.first = objAction.first ? objAction.first : "";
      state.firstURL = objAction.firstURL ? objAction.firstURL : "";
      state.second = objAction.second ? objAction.second : "";
      state.secondURL = objAction.secondURL ? objAction.secondURL : "";
      state.third = objAction.third ? objAction.third : "";
      state.thirdURL = objAction.thirdURL ? objAction.thirdURL : "";
    },
    // setBreadcrumb: (state, action: PayloadAction<any>) => {
    // },
  },
});

export const { setBreadcrumb } = breadcrumbSlice.actions;
export const selectBreadcrumb = (state: RootState) => state.breadcrumb;


export default breadcrumbSlice.reducer;
