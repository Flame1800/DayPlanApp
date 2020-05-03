import { createAction } from "redux-actions";
import axios from "axios";
import routes from "../routes.js";

export const fetchTasksRequest = createAction("TASKS_FETCH_REQUEST");
export const fetchTasksSuccess = createAction("TASKS_FETCH_SUCCESS");
export const fetchTasksFailure = createAction("TASKS_FETCH_FAILURE");

export const removeTaskRequest = createAction("TASK_REMOVE_REQUEST");
export const removeTaskSuccess = createAction("TASK_REMOVE_SUCCESS");
export const removeTaskFailure = createAction("TASK_REMOVE_FAILURE");

export const editTask = createAction("EDIT_TASK");
export const completeTaskSuccess = createAction("COMPLETE_TASK");
export const addTaskSuccess = createAction("TASK_ADD_SUCCESS");

export const addMoneySuccess = createAction("ADD_MONEY_SUCCSESS");
export const deleteMoneySuccess = createAction("DELETE_MONEY_SUCCSESS");
export const getBallanceSuccess = createAction("GET_BALLANCE_SUCCESS");

export const getCurrentUserSuccess = createAction("GET_CURRENT_USER_SUCCESS");



export const addTask = (task) => async (dispatch) => {
  const url = routes.tasksDayUrl();
  const response = await axios.post(url, task);
  dispatch(addTaskSuccess({ task: response.data }));
};

export const removeTask = ({ id }) => async (dispatch) => {
  dispatch(removeTaskRequest());
  try {
    const url = routes.taskDayUrl(id);
    await axios.delete(url);
    dispatch(removeTaskSuccess({ id }));
  } catch (e) {
    dispatch(removeTaskFailure());
    throw e;
  }
};

export const fetchTasks = () => async (dispatch) => {
  dispatch(fetchTasksRequest());
  try {
    const url = routes.tasksDayUrl();
    const response = await axios.get(url);
    dispatch(fetchTasksSuccess({ tasks: response.data }));
  } catch (e) {
    dispatch(fetchTasksFailure());
    throw e;
  }
};

export const completeTask = ({ task }) => async (dispatch) => {
  const url = routes.taskDayUrl(task.id);
  const newState = task.state === "active" ? "finished" : "active";
  task.state = newState;
  await axios.patch(url, task);
  //dispatch(completeTaskSuccess({ id: task.id }));
};



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// !!! Новая версия Actions с оперцаиями для пользователя, добавить после добавления логики текущего пользователя !!!
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getCurrentUser = ({ id }) => async (dispatch) => {
  const url = routes.userUrl(id);
  const response = await axios.get(url);
  dispatch(getCurrentUserSuccess({ user: response.data }));
};

// export const addMoney = (user, value) => async (dispatch) => {
//   const url = routes.userUrl(user.id);
//   user.ballance = user.ballance + value;
//   await axios.patch(url, user);
// };
// export const deleteMoney = (user, value) => async (dispatch) => {
//   const url = routes.userUrl(user.id);
//   user.ballance = user.ballance - value;
//   await axios.patch(url, user);
// };
