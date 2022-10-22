import * as actions from "./actionTypes";

export const taskReducer = (state = [], action) =>
  ({
    [actions.taskUpdated]: () =>
      state.map((el) =>
        el.id === action.payload.id ? { ...el, ...action.payload } : el
      ),
    [actions.taskDeleted]: () =>
      state.filter((el) => el.id !== action.payload.id),
  }[action.type]?.() ?? state);
