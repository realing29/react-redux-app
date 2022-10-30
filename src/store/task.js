import { createSlice, createAction } from "@reduxjs/toolkit";
import todosService from "../services/todos.service";
import { setError } from "./errors";

const initialState = { entities: [], isLoading: true };

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    recived(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    update(state, action) {
      const elementIndex = state.entities.findIndex(
        (el) => el.id === action.payload.id
      );
      state.entities[elementIndex] = {
        ...state.entities[elementIndex],
        ...action.payload,
      };
    },
    create(state, aciton) {
      state.entities.unshift(aciton.payload);
    },
    remove(state, action) {
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    taskRequested(state) {
      state.isLoading = true;
    },
    taskRequestedFailed(state, action) {
      state.isLoading = false;
    },
  },
});

const {
  actions: {
    update,
    remove,
    recived,
    taskRequested,
    taskRequestedFailed,
    create,
  },
  reducer: taskReducer,
} = taskSlice;

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todosService.fetch();
    dispatch(recived(data));
  } catch (error) {
    dispatch(taskRequestedFailed());
    dispatch(setError(error.message));
  }
};

export const completeTask = (id) => (dispatch) => {
  dispatch(update({ id, completed: true }));
};

export function titleChanged(id) {
  return update({ id, title: `New title for ${id}` });
}

export function taskDeleted(id) {
  return remove({ id });
}

export const taskCreated = () => async (dispatch) => {
  try {
    const data = await todosService.create({
      title: "newTodos",
      completed: false,
      userId: 1,
    });
    dispatch(create(data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const getTasks = () => (state) => state.tasks.entities;
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading;

export default taskReducer;
