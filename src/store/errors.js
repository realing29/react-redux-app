import { createSlice } from "@reduxjs/toolkit";

const initialState = { entities: [] };

const errrorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    set(state, aciton) {
      state.entities.push(aciton.payload);
    },
  },
});

const {
  actions: { set },
  reducer: errorReducer,
} = errrorSlice;

export const setError = (message) => (dispatch) => {
  dispatch(set(message));
};

export const getErrors = () => (state) => state.errors.entities[0];

export default errorReducer;
