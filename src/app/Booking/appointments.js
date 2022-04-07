import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAppointments = createAsyncThunk(
  "appointments/getAppointments",
  async () => {
    const response = await axios({
      withCredentials: true,
      method: "GET",
      url: "https://api.yugencare.com/v1/booking/appointments",
    });
    const data = await response.data;
    console.log(data);
    return data;
  }
);

export const saveAppointment = createAsyncThunk(
  "appointment/saveAppointment",
  async ({ NewApp }, thunkAPI) => {
    console.log("saving appoint");
    console.log(NewApp);
    try {
      const response = await axios({
        withCredentials: true,
        method: "POST",
        url: "https://api.yugencare.com/v1/booking/self_booking",
        data: NewApp,
      });
      let data = await response.data;
      console.log(response);
      if (response.status === 200) {
        const profile = thunkAPI.getState()?.loginUser?.profile;
        if (profile) {
          const updateCustomer = await axios({
            // withCredentials: true,
            method: "PATCH",
            url: "https://server.yugencare.com/api/v1/loyalty/customers/service",
            data: {
              id: profile.id,
            },
          });
          console.log(updateCustomer);
        }

        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
const AppointmentsSlice = createSlice({
  name: "appointments",
  initialState: {
    appointments: [],
    status: null,
    isSaved: null,
    appointdata: null,
  },
  //GET APPOINTMENT
  extraReducers: {
    [getAppointments.pending]: (state, action) => {
      state.status = "loading";
    },
    [getAppointments.fulfilled]: (state, { payload }) => {
      state.appointments = payload.data?.appointments;
      state.status = "success";
    },
    [getAppointments.rejected]: (state, action) => {
      state.status = "failed";
    },

    //SAVE APPOINTMENT
    [saveAppointment.pending]: (state, action) => {
      state.isSaved = "loading";
    },
    [saveAppointment.fulfilled]: (state, { payload }) => {
      state.appointdata = payload.data;
      state.isSaved = "success";
    },
    [saveAppointment.rejected]: (state, action) => {
      console.log(action);
      state.isSaved = "failed";
    },
  },
});
export const {} = AppointmentsSlice.actions;
export default AppointmentsSlice.reducer;
