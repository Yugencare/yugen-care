import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, thunkAPI) => {
    console.log(email, password);

    try {
      const response = await axios({
        withCredentials: true,
        method: "POST",
        url: "https://api.yugencare.com/v1/login/",
        data: {
          email: email,
          password: password,
        },
      });
      let data = await response.data;
      console.log(data);
      if (response.status === 200) {
        // store the user in localStorage
        localStorage.setItem("user", JSON.stringify(data));
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

export const loginFBUser = createAsyncThunk(
  "user/loginFBUser",
  async ({ token, first_name, last_name, fb_id, email }, thunkAPI) => {
    console.log(token);
    try {
      const response = await axios({
        withCredentials: true,
        method: "POST",
        url: "https://api.yugencare.com/v1/fb_register/",
        data: {
          email: email,
          token: token,
          fb_id: fb_id,
          first_name: first_name,
          last_name: last_name,
        },
      });
      let data = await response.data;
      console.log(response);
      if (response.status === 200) {
        // store the user in localStorage
        localStorage.setItem("user", JSON.stringify(data));
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

export const loginGoogleUser = createAsyncThunk(
  "user/loginGoogleUser",
  async ({ token, first_name, last_name, g_id, email }, thunkAPI) => {
    console.log(token);
    try {
      const response = await axios({
        // withCredentials: true,
        method: "POST",
        url: "https://api.yugencare.com/v1/google_register/",
        data: {
          email: email,
          token: token,
          g_id: g_id,
          first_name: first_name,
          last_name: last_name,
        },
      });
      let data = await response.data;
      console.log(response);
      if (response.status === 200) {
        // store the user in localStorage
        localStorage.setItem("user", JSON.stringify(data));
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

export const getLoyalty = createAsyncThunk("user/Loyalty", async ({ id }) => {
  const response = await axios.get(
    "https://server.yugencare.com/api/v1/loyalty/customers/" + id
  );
  const data = await response.data;
  return data;
});

const loginUserSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    details: null,
    isLoggedIn: false,
    status: null,
    HasDetails: false,
    loyalty: null,
  },
  reducers: {
    userLogout(state, action) {
      state.isLoggedIn = null;
      state.profile = null;
      state.details = null;
      state.HasDetails = false;
      state.status = null;
      localStorage.clear();
    },
    setHasDetails(state, action) {
      state.HasDetails = true;
    },
    setDetails(state, { payload }) {
      console.log(payload);
      state.details = payload;
    },
    setMr_no(state, { payload }) {
      state.details.mr_no = payload;
    },
    setPatient_phone(state, { payload }) {
      if (state.details === undefined || state.details === null) {
        state.details = {};
        state.details.patient_phone = payload;
      } else {
        state.details.patient_phone = payload;
      }
    },
    setUser(state, { payload }) {
      state.profile = payload.profile;
      state.details = payload.patient_details;
      state.isLoggedIn = true;
      if (payload.patient_details !== undefined) {
        state.HasDetails = true;
      } else {
        state.HasDetails = false;
      }
    },
  },
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      console.log("payload", payload);
      if (payload.status === 200) {
        state.profile = payload.profile;
        state.details = payload.patient_details;
        console.log(payload.patient_details);
        state.isLoggedIn = true;
        console.log(payload);
        if (payload.patient_details !== undefined) {
          state.HasDetails = true;
        } else {
          state.HasDetails = false;
        }
        state.status = "success";
      } else if (payload.status === 401) {
        state.status = "wrong";
      } else {
        state.status = "failed";
      }
    },
    [loginUser.rejected]: (state, action) => {
      console.log(action);
      state.status = "failed";
    },

    [getLoyalty.pending]: (state, action) => {
      state.loyalty = null;
    },
    [getLoyalty.fulfilled]: (state, { payload }) => {
      state.loyalty = payload.data;
    },
    [getLoyalty.rejected]: (state, action) => {
      state.loyalty = null;
    },
    [loginFBUser.fulfilled]: (state, { payload }) => {
      state.loyalty = payload.data;
    },
  },
});
export const {
  userLogout,
  setHasDetails,
  setDetails,
  setMr_no,
  setPatient_phone,
  setUser,
} = loginUserSlice.actions;

export default loginUserSlice.reducer;
