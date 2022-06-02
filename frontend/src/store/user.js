import { csrfFetch } from "./csrf";

// types
const LOAD_ALL = 'user/loadAll';
const SET_DETAIL = 'user/setDetail';

// action creators
const loadAll = users => ({
  type: LOAD_ALL,
  users
});

const setDetail = user => ({
  type: SET_DETAIL,
  user
});

// thunks
export const getUsers = () => async dispatch => {
  const response = await csrfFetch('/api/users');

  if (response.ok) {
    const output = await response.json();
    dispatch(loadAll(output.users));
  }
}

export const getUserDetail = (userId) => async dispatch => {
  const response = await csrfFetch(`/api/users/${userId}`);

  if (response.ok) {
    const output = await response.json();
    dispatch(setDetail(output.user));
  }
}

// initial state
const initialState = { detail: null };

// reducer
const usersReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_ALL:
      action.users.forEach(user => {
        newState[user.id] = user;
      });
      return newState;
    case SET_DETAIL:
      newState.detail = action.user;
      return newState;
    default:
      return state;
  }
}

export default usersReducer;