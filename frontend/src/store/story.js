import { csrfFetch } from "./csrf";

// types
const LOAD_ALL = 'story/loadAll';
const ADD_ONE = 'story/addOne';
const SET_DETAIL = 'story/setDetail';
const DELETE_ONE = 'sory/deleteOne';

// action creators
const loadAll = stories => ({
  type: LOAD_ALL,
  stories
});

const addOne = story => ({
  type: ADD_ONE,
  story
});

const setDetail = story => ({
  type: SET_DETAIL,
  story
});

const deleteOne = storyId => ({
  type: DELETE_ONE,
  storyId
});

// thunks
export const getStories = () => async dispatch => {
  const response = await csrfFetch('/api/stories');

  if (response.ok) {
    const output = await response.json();
    dispatch(loadAll(output.stories));
  }
}

export const writeStory = (story) => async dispatch => {
  const {title, headerImgUrl, content, userId} = story;
  const response = await csrfFetch('/api/stories', {
    method: 'POST',
    body: JSON.stringify({
      title,
      headerImgUrl,
      content,
      userId
    }),
  });

  if (response.ok) {
    const output = await response.json();
    dispatch(addOne(output.story));
  }
}

export const getStoryDetail = (storyId) => async dispatch => {
  const response = await csrfFetch(`/api/stories/${storyId}`);

  if (response.ok) {
    const output = await response.json();
    dispatch(setDetail(output.story));
  }
}

export const editStory = (storyId, story) => async dispatch => {
  const { title, headerImgUrl, content } = story;
  const response = await csrfFetch(`/api/stories/${storyId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      title,
      headerImgUrl,
      content,
    }),
  });

  if (response.ok) {
    const output = await response.json();
    dispatch(addOne(output.story));
  }
}

export const deleteStory = (storyId) => async dispatch => {
  const response = await csrfFetch(`/api/stories/${storyId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    const output = await response.json();
    dispatch(deleteOne(output.storyId));
  }
}

// initial state
const initialState = { detail: null }

// reducer
const storiesReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_ALL:
      action.stories.forEach(story => {
        newState[story.id] = story;
      });
      return newState;
    case ADD_ONE:
      newState[action.story.id] = action.story;
      return newState;
    case SET_DETAIL:
      newState.detail = action.story;
      return newState;
    case DELETE_ONE:
      newState.detail = null;
      delete newState[action.storyId];
      return newState;
    default:
      return state;
  }
}

export default storiesReducer;