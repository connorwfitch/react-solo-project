import { csrfFetch } from "./csrf";

// types
const LOAD_ALL = 'story/loadAll';

// action creators
const loadAll = stories => ({
  type: LOAD_ALL,
  stories
});

// thunks
export const getStories = () => async dispatch => {
  const response = await csrfFetch('/api/stories');

  if (response.ok) {
    const stories = await response.json();
    dispatch(loadAll(stories));
  }
}

// initial state
const initialState = { }

// reducer
const storiesReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case LOAD_ALL:
      action.stories.forEach(story => {
        newState[story.id] = story;
      });
      return newState;
    default:
      return state;
  }
}

export default storiesReducer;