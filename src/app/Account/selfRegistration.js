import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const SaveProfile = createAsyncThunk(
  "saveprofile/SaveProfile",
  async (
    {
      agein,
      country,
      custom_field5,
      custom_list1_value,
      custom_list2_value,
      custom_list3_value,
      dateofbirth,
      email_id,
      government_identifier,
      identifier_id,
      last_name,
      middle_name,
      middle_name2,
      nationality_id,
      patient_address,
      patient_area,
      patient_category_id,
      patient_city,
      patient_gender,
      patient_group,
      patient_name,
      patient_phone,
      patient_state,
      preferred_language,
      salutation,
    },
    thunkAPI
  ) => {
    console.log({
      agein: agein,
      country: country,
      custom_field5: custom_field5,
      custom_list1_value: custom_list1_value,
      custom_list2_value: custom_list2_value,
      custom_list3_value: custom_list3_value,
      dateofbirth: dateofbirth,
      email_id: email_id,
      government_identifier: government_identifier,
      identifier_id: identifier_id,
      last_name: last_name,
      middle_name: middle_name,
      middle_name2: middle_name2,
      nationality_id: nationality_id,
      patient_address: patient_address,
      patient_area: patient_area,
      patient_category_id: patient_category_id,
      patient_city: patient_city,
      patient_gender: patient_gender,
      patient_group: patient_group,
      patient_name: patient_name,
      patient_phone: patient_phone,
      patient_state: patient_state,
      preferred_language: preferred_language,
      salutation: salutation,
    });
    try {
      const response = await axios({
        withCredentials: true,
        method: "POST",
        url: "https://api.yugencare.com/v1/booking/self_registration",
        data: {
          patient: {
            agein: agein,
            country: country,
            custom_field5: custom_field5,
            custom_list1_value: custom_list1_value,
            custom_list2_value: custom_list2_value,
            custom_list3_value: custom_list3_value,
            dateofbirth: dateofbirth,
            email_id: email_id,
            government_identifier: government_identifier,
            identifier_id: identifier_id,
            last_name: last_name,
            middle_name: middle_name,
            middle_name2: middle_name2,
            nationality_id: nationality_id,
            patient_address: patient_address,
            patient_area: patient_area,
            patient_category_id: patient_category_id,
            patient_city: patient_city,
            patient_gender: patient_gender,
            patient_group: patient_group,
            patient_name: patient_name,
            patient_phone: patient_phone,
            patient_state: patient_state,
            preferred_language: preferred_language,
            salutation: salutation,
          },
        },
      });
      let data = await response.data;
      console.log(response);
      if (response.status === 200) {
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

const SelfRegisterSlice = createSlice({
  name: "saveprofile",
  initialState: {
    registeration_data: null,
    status: null,
  },

  extraReducers: {
    [SaveProfile.pending]: (state, action) => {
      state.status = "loading";
    },
    [SaveProfile.fulfilled]: (state, { payload }) => {
      console.log("payload", payload);

      state.registeration_data = payload.data;
      state.status = "success";
    },
    [SaveProfile.rejected]: (state, action) => {
      console.log(action);
      state.status = "failed";
    },
  },
});
// export const {} = SelfRegisterSlice.actions;

export default SelfRegisterSlice.reducer;
