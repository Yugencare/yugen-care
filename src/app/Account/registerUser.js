import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const DateCleanUp = (dob) => {
  //DATE CLEANUP
  const jsondate = new Date(dob);
  const month =
    jsondate.getMonth() + 1 < 10
      ? `0${jsondate.getMonth() + 1}`
      : jsondate.getMonth() + 1;
  const day =
    jsondate.getDate() < 10 ? `0${jsondate.getDate()}` : jsondate.getDate();

  const date = `${jsondate.getFullYear()}-${month}-${day}`;
  return date;
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (
    { email, password, first_name, last_name, dob, referral_id },
    thunkAPI
  ) => {
    // console.log(email, password, first_name, last_name, dob);

    const date = DateCleanUp(dob);
    // console.log({
    //   dob: date,
    //   email: email,
    //   password: password,
    //   last_name: last_name,
    //   first_name: first_name,
    // });
    try {
      const response = await axios({
        method: "POST",
        url: "https://api.yugencare.com/v1/register/",
        data: {
          dob: date,
          email: email,
          password: password,
          last_name: last_name,
          first_name: first_name,
        },
      });
      let data = await response.data;
      if (response.status === 200) {
        console.log(data);
        // localStorage.setItem("token", data.token);
        const createCustomerResponse = await axios({
          method: "POST",
          url: "https://server.yugencare.com/api/v1/loyalty/customers/",
          data: {
            name: `${first_name} ${last_name}`,
            customer_id: data.id,
            referral_id: referral_id,
            customer: {
              dob: date,
              email: email,
            },
            date_expire: "2099-11-29T06:18:57.000Z",
            enabled_loyalty: true,
            is_active: true,
          },
        });
        console.log(createCustomerResponse);
        console.log(referral_id);
        if (referral_id) {
          const createReferalResponse = await axios({
            method: "PATCH",
            url: `https://server.yugencare.com/api/v1/loyalty/referal/${referral_id}`,
          });
          console.log(createReferalResponse);
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

const registerUserSlice = createSlice({
  name: "user",
  initialState: {
    status: null,
  },
  reducers: {
    clearSignup(state, action) {
      state.status = null;
    },
  },
  extraReducers: {
    [registerUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [registerUser.rejected]: (state, action) => {
      console.log(action);
      state.status = "failed";
    },
  },
});
export const { clearSignup } = registerUserSlice.actions;

export default registerUserSlice.reducer;
