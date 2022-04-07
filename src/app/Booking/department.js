import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const _ = require("lodash");

export const getDepartments = createAsyncThunk(
  "departments/getDepartments",
  async () => {
    const response = await axios({
      withCredentials: true,
      method: "GET",
      url: "https://api.yugencare.com/v1/booking/scheduler",
      // url: "https://api.yugencare.com/v1/booking/services",
    });
    const data = await response.data;
    return data;
  }
);

const DepartmentsSlice = createSlice({
  name: "departments",
  initialState: {
    departments: [],
    status: null,
    ActiveStep: 0,
    departmentSelected: null,
  },
  reducers: {
    SelectDepartment(state, { payload }) {
      state.departmentSelected = payload;
    },
    DeSelectDepartment(state, { payload }) {
      state.departmentSelected = null;
    },
    ChangeStep(state, { payload }) {
      console.log(payload);
      state.ActiveStep = payload;
    },
  },
  extraReducers: {
    [getDepartments.pending]: (state, action) => {
      state.status = "loading";
    },
    [getDepartments.fulfilled]: (state, { payload }) => {
      state.departments = payload.data;
      // const uniqueDepartments = _.uniqBy(payload.data, "department_id");
      // if (uniqueDepartments) {
      //   const sorted = [];
      //   for (let i = 0; i < uniqueDepartments?.length; i++) {
      //     let object = {
      //       department: uniqueDepartments[i].department,
      //       service: [],
      //     };
      //     for (let j = 0; j < payload.data?.length; j++) {
      //       if (
      //         uniqueDepartments[i].department === payload.data[j].department
      //       ) {
      //         object.service.push(payload.data[j]);
      //       }
      //     }
      //     sorted.push(object);
      //   }
      //   state.departments = sorted;
      //   state.departments = uniqueDepartments;
      // } else {
      //   state.departments = [];
      // }

      state.status = "success";
    },
    [getDepartments.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});
export const { SelectDepartment, DeSelectDepartment, ChangeStep } =
  DepartmentsSlice.actions;
export default DepartmentsSlice.reducer;
