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

const setUserState = handleActions(
  {
    [actions.setUserRequest]() {
      return "requested";
    },
    [actions.setUserSuccess]() {
      return "finished";
    },
    [actions.setUserFailure]() {
      return "failed";
    },
    [actions.setUserEmptyState]() {
      return 'none'
    }
  },
  "none"
)

const tasksDay = handleActions(
  {
    [actions.fetchTasksSuccess](state, { payload }) {
      if (payload.tasks === []) return state;

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

    [actions.completeTaskSuccess](state, { payload: { task } }) {
      return {
        ...state,
        byId: { ...state.byId, [task.id]: task },
      };
    },
  },
  { byId: {}, allIds: [] }
);

const user = handleActions(
  {
    [actions.setUserSuccess](state, { payload: { user } }) {
      return user;
    },
    [actions.calculateMoneySuccess](state, { payload: { ballance } }) {
      return { ...state, ballance };
    },
  },
  null
);

export default combineReducers({
  tasksDayFetchingState,
  setUserState,
  tasksDay,
  user,
  form: formReducer,
});
