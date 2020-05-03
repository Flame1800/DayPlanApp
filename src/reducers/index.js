import _ from "lodash";
import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { reducer as formReducer } from "redux-form";
import * as actions from "../actions/index.js";

const tasksDayFetchingState = handleActions(
  {
    [actions.fetchTasksRequest]() {
      return "requested";
    },
    [actions.fetchTasksFailure]() {
      return "failed";
    },
    [actions.fetchTasksSuccess]() {
      return "finished";
    },
  },
  "none"
);

const tasksDay = handleActions(
  {
    [actions.fetchTasksSuccess](state, { payload }) {
      return {
        byId: _.keyBy(payload.tasks, "id"),
        allIds: payload.tasks.map((t) => t.id),
      };
    },
    [actions.addTaskSuccess](state, { payload: { task } }) {
      const { byId, allIds } = state;

      return {
        byId: { ...byId, [task.id]: task },
        allIds: [task.id, ...allIds],
      };
    },
    [actions.removeTaskSuccess](state, { payload: { id } }) {
      const { byId, allIds } = state;
      return {
        byId: _.omit(byId, id),
        allIds: _.without(allIds, id),
      };
    },

    [actions.completeTaskSuccess](state, { payload: { id } }) {
      const task = state.byId[id];
      const newState = (task.state === 'active') ? 'finished' : 'active';
      const updatedTask = { ...task, state: newState };
      return {
        ...state,
        byId: { ...state.byId, [task.id]: updatedTask },
      };
    },
  },
  { byId: {}, allIds: [] }
);

// Исправить под логикку для user вместо ballance
const ballance = handleActions(
  {
    [actions.addMoneySuccess](state, { payload: { price } }) {
      const num =  Number.parseInt(price)
      state += num;
      return state;
    },
    [actions.deleteMoneySuccess](state, { payload: { price } }) {
      const num =  Number.parseInt(price)
      state -= num;
      return state;
    },
  },
  0
);

export default combineReducers({
  tasksDayFetchingState,
  tasksDay,
  ballance,
  form: formReducer,
});









// import _ from "lodash";
// import { combineReducers } from "redux";
// import { handleActions } from "redux-actions";
// import { reducer as formReducer } from "redux-form";
// import * as actions from "../actions/index.js";

// const tasksDayFetchingState = handleActions(
//   {
//     [actions.fetchTasksRequest]() {
//       return "requested";
//     },
//     [actions.fetchTasksFailure]() {
//       return "failed";
//     },
//     [actions.fetchTasksSuccess]() {
//       return "finished";
//     },
//   },
//   "none"
// );

// const tasksDay = handleActions(
//   {
//     [actions.fetchTasksSuccess](state, { payload }) {
//       return {
//         byId: _.keyBy(payload.tasks, "id"),
//         allIds: payload.tasks.map((t) => t.id),
//       };
//     },
//     [actions.addTaskSuccess](state, { payload: { task } }) {
//       const { byId, allIds } = state;

//       return {
//         byId: { ...byId, [task.id]: task },
//         allIds: [task.id, ...allIds],
//       };
//     },
//     [actions.removeTaskSuccess](state, { payload: { id } }) {
//       const { byId, allIds } = state;
//       return {
//         byId: _.omit(byId, id),
//         allIds: _.without(allIds, id),
//       };
//     },

//     [actions.completeTaskSuccess](state, { payload: { id } }) {
//       const task = state.byId[id];
//       const newState = task.state === "active" ? "finished" : "active";
//       const updatedTask = { ...task, state: newState };
//       return {
//         ...state,
//         byId: { ...state.byId, [task.id]: updatedTask },
//       };
//     },
//   },
//   { byId: {}, allIds: [] }
// );

// const user = handleActions(
//   {
//     [actions.getCurrentUserSuccess](state, { payload: { user } }) {
//       return user;
//     },
//     [actions.addMoneySuccess](state, { payload: { price } }) {
//       const num = Number.parseInt(price);
//       state.ballance += num;
//       console.log(state);
//       return state;
//     },
//     [actions.deleteMoneySuccess](state, { payload: { price } }) {
//       const num = Number.parseInt(price);
//       state.ballance -= num;
//       return state;
//     },
//   },
//   {
//     "id": 1,
//     "username": "admin",
//     "name": "Admin",
//     "ballance": 0
//   }
// );

// export default combineReducers({
//   tasksDayFetchingState,
//   tasksDay,
//   user,
//   form: formReducer,
// });
