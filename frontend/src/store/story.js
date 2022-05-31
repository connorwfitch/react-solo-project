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
    const output = await response.json();
    dispatch(loadAll(output.stories));
  }
}

// initial state
const initialState = { storyIdList: [] }

// utility sort
const sortList = (list) => {
  return list.sort((storyA, storyB) => {
    return storyB.updatedAt - storyA.updatedAt;
  }).map((story) => story.id)
}

// reducer
const storiesReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case LOAD_ALL:
      console.log('--------------TESTING--------------', typeof action.stories);
      action.stories.forEach(story => {
        newState[story.id] = story;
      });
      newState.storyIdList = sortList(action.stories);
      return newState;
    default:
      return state;
  }
}

export default storiesReducer;