// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { fetchData, fetchDataOnly, fetchDataAdmin, createLocationService, updateLocationService } from "./services";
import { Location, emptyLocation, FilterOptions, InputLocation } from "./types";

export interface LocationState {
  status: "idle" | "loading" | "failed";
  location: Location;
  locations: Location[];
  errorMessage: string;
  locationIdSelected: string;
  selectLocationId: {
    locationId: string;
    name: string;
  };
  locationsList: string[];
}

export const initialState: LocationState = {
  status: "idle",
  location: emptyLocation,
  locations: [emptyLocation],
  errorMessage: "",
  locationIdSelected: "",
  selectLocationId: {
    locationId: "",
    name: "",
  },
  locationsList: [],
};

export const getLocations = createAsyncThunk(
  "locations/list",
  async () => {
    try {
      const response: any = await fetchData();
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH LOCATIONS", error);
      return Promise.reject(error);
    }
  }
);

export const getLocationsOnly = createAsyncThunk(
  "locations/list-only",
  async (country?: string) => {
    try {
      const response: any = await fetchDataOnly(country || "");
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH LOCATIONS ONLY", error);
      return Promise.reject(error);
    }
  }
);

export const getLocationsAdmin = createAsyncThunk(
  "locations/list-admin",
  async (objFilter: FilterOptions) => {
    try {
      const response: any = await fetchDataAdmin(objFilter);
      return response;
    } catch (error) {
      console.error(">>>>ERROR FETCH LOCATIONS ADMIN", error);
      return Promise.reject(error);
    }
  }
);

export const createLocationThunk = createAsyncThunk(
  "locations/create",
  async (input: InputLocation) => {
    try {
      const response: any = await createLocationService(input);
      return response;
    } catch (error) {
      console.error(">>>>ERROR CREATE LOCATION", error);
      return Promise.reject(error);
    }
  }
);

export const updateLocationThunk = createAsyncThunk(
  "locations/update",
  async (input: InputLocation) => {
    try {
      const response: any = await updateLocationService(input);
      return response;
    } catch (error) {
      console.error(">>>>ERROR UPDATE LOCATION", error);
      return Promise.reject(error);
    }
  }
);

export const locationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLocationIdSelected: (state, action) => {
      state.locationIdSelected = action.payload;
    },
    setSelectLocationId: (state, action) => {
      state.selectLocationId = {
        locationId: action.payload.locationId,
        name: action.payload.name,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // GET LOCATIONS
      .addCase(getLocations.rejected, (state) => { state.status = "failed"; })
      .addCase(getLocations.pending, (state) => { state.status = "loading"; })
      .addCase(getLocations.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        state.locations = objPayload?.items || [];
      })

      // GET LOCATIONS ONLY (active+visible)
      .addCase(getLocationsOnly.rejected, (state) => { state.status = "failed"; })
      .addCase(getLocationsOnly.pending, (state) => { state.status = "loading"; })
      .addCase(getLocationsOnly.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        state.locations = objPayload?.items || [];
        const transformList = (items: Location[]): any[] => {
          const orderArray = [...items].sort((a, b) => a.name.localeCompare(b.name));
          const newArray = [
            { id: "TODOS", name: "Todos", city: "NA", minimumTemperature: 0, maximumTemperature: 0, address: "-", phone: "-", imageMap: "-", urlMap: "", directions: "-", region: "", group: "", country: "", isActive: true, isVisible: true, createdAt: "", updatedAt: "", courses: [], schedules: [] },
            ...orderArray,
          ];
          return newArray.map((item) => ({
            label: `${String(item.id).toUpperCase()}`,
            value: String(item.id === "TODOS" ? "" : item.id),
          }));
        };
        state.locationsList = transformList(objPayload?.items || []);
      })

      // GET LOCATIONS ADMIN
      .addCase(getLocationsAdmin.rejected, (state) => { state.status = "failed"; })
      .addCase(getLocationsAdmin.pending, (state) => { state.status = "loading"; })
      .addCase(getLocationsAdmin.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        state.locations = [...(objPayload?.items || [])].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      })

      // CREATE LOCATION
      .addCase(createLocationThunk.rejected, (state) => { state.status = "failed"; })
      .addCase(createLocationThunk.pending, (state) => { state.status = "loading"; })
      .addCase(createLocationThunk.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        if (objPayload?.id) {
          state.locations = [objPayload, ...state.locations].sort((a, b) =>
            a.name.localeCompare(b.name)
          );
        }
      })

      // UPDATE LOCATION
      .addCase(updateLocationThunk.rejected, (state) => { state.status = "failed"; })
      .addCase(updateLocationThunk.pending, (state) => { state.status = "loading"; })
      .addCase(updateLocationThunk.fulfilled, (state, action) => {
        const objPayload: any = action.payload;
        state.status = "idle";
        if (objPayload?.id) {
          const index = state.locations.findIndex((l: Location) => l.id === objPayload.id);
          if (index !== -1) {
            state.locations[index] = { ...state.locations[index], ...objPayload };
          }
        }
      });
  },
});

export const selectLocation = (state: RootState) => state.location;

export const { setLocationIdSelected, setSelectLocationId } = locationSlice.actions;

export default locationSlice.reducer;
