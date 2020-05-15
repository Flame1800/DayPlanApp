import { createAction } from "redux-actions";
import fb from '../config/firebase.js';


export const fetchTasksRequest = createAction("TASKS_FETCH_REQUEST");
export const fetchTasksSuccess = createAction("TASKS_FETCH_SUCCESS");
export const fetchTasksFailure = createAction("TASKS_FETCH_FAILURE");

export const removeTaskRequest = createAction("TASK_REMOVE_REQUEST");
export const removeTaskSuccess = createAction("TASK_REMOVE_SUCCESS");
export const removeTaskFailure = createAction("TASK_REMOVE_FAILURE");

export const setUserRequest = createAction("SET_USER_REQUEST");
export const setUserSuccess = createAction("SET_USER_SUCCESS");
export const setUserFailure = createAction("SET_USER_FAILURE");
export const setUserEmptyState = createAction("SET_USER_EMPTY_STATE");

export const editTask = createAction("EDIT_TASK");
export const completeTaskSuccess = createAction("COMPLETE_TASK");
export const addTaskSuccess = createAction("TASK_ADD_SUCCESS");

export const calculateMoneySuccess = createAction("CALCULATE_MONEY_SUCCSESS");

export const getCurrentUser = () => async (dispatch) => {
  await fb.auth().onAuthStateChanged(async (user) => {
    if (user) {
      const userVal = await fb.database().ref('users').once('value');
      const users = userVal.val();
      Object.keys(users).forEach(key => {
        if (users[key].uid === user.uid) {
          dispatch(setUserSuccess({ user: {id: key,...users[key]} }));
          dispatch(fetchTasks());
        } 
      });
    }
  })
}

export const calculateMoney = ({ price, user, mode }) => async (dispatch) => {
  const num = Number.parseInt(price);
  if (mode === 'delete') {
    user.ballance = user.ballance - num;
  }
  if (mode === 'add') {
    user.ballance = user.ballance + num;
  }
  await fb.database().ref('users').child(user.id).update({ ballance: user.ballance });
  dispatch(calculateMoneySuccess({ ballance: user.ballance }));
}


export const addUser = ({ user }) => async (dispatch) => {
  dispatch(setUserRequest());
  try {
    const userResponce = await fb.auth().createUserWithEmailAndPassword(user.email, user.password);
    const newUser = {
      email: user.email,
      name: user.name,
      ballance: 0,
      uid: userResponce.user.uid
    }
    const responce = await fb.database().ref('users').push(newUser);
    const key = responce.key;
    dispatch(setUserSuccess({ user: { id: key, ...newUser } }));

  } catch (e) {
    dispatch(setUserFailure());
    //throw e;
  }
}

export const loginUser = ({ user }) => async (dispatch) => {
  dispatch(setUserRequest());
  try {
    await fb.auth().signInWithEmailAndPassword(user.email, user.password);
    const userVal = await fb.database().ref('users').once('value');

    const users = userVal.val();
    Object.keys(users).forEach(key => {
      if (users[key].email === user.email) {
        dispatch(setUserSuccess({ user: { id: key, ...users[key] } }));
      }
    });

  } catch (e) {
    dispatch(setUserFailure());
    //throw e;
  }
}


export const logoutUser = () => async (dispatch) => {
  await fb.auth().signOut();
  dispatch(setUserSuccess({ user: null }));
}

export const addTask = (task) => async (dispatch) => {
  const responce = await fb.database().ref('tasks').push(task);
  const key = responce.key;

  dispatch(addTaskSuccess({ task: { id: key, ...task } }));
};

export const removeTask = ({ id }) => async (dispatch) => {
  dispatch(removeTaskRequest());
  try {
    await fb.database().ref('tasks').child(id).remove()
    dispatch(removeTaskSuccess({ id }));
  } catch (e) {
    dispatch(removeTaskFailure());
    //throw e;
  }
};

export const fetchTasks = () => async (dispatch) => {
  dispatch(fetchTasksRequest());
  try {
    const tasksValue = await fb.database().ref('tasks').once('value');
    const mapTasks = [];
    const tasks = tasksValue.val();

    if (tasks !== null) {
      Object.keys(tasks).forEach(key => mapTasks.push({ id: key, ...tasks[key] }));
      dispatch(fetchTasksSuccess({ tasks: mapTasks }));
    }
    else {
      dispatch(fetchTasksSuccess({ tasks: [] }))
    }
  } catch (e) {
    dispatch(fetchTasksFailure());
    //throw e;
  }
};

export const completeTask = ({ task }) => async (dispatch) => {
  const newState = task.state === "active" ? "finished" : "active";
  task.state = newState;
  await fb.database().ref('tasks').child(task.id).update({ state: task.state });
  dispatch(completeTaskSuccess({ task }));
};

