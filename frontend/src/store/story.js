import { csrfFetch } from "./csrf";

// types
const LOAD_ALL = 'story/loadAll';
const ADD_ONE = 'story/addOne';

// action creators
const loadAll = stories => ({
  type: LOAD_ALL,
  stories
});

const addOne = story => ({
  type: ADD_ONE,
  story
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

  if(response.ok) {
    const output = await response.json();
    dispatch(addOne(output.story));
  }
}

export const editStory = (story) => async dispatch => {
  const { title, headerImgUrl, content } = story;
  const response = await csrfFetch('/api/stories', {
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
    case ADD_ONE:
      newState = { ...state };
      newState[action.story.id] = action.story;
      return newState;
    default:
      return state;
  }
}

export default storiesReducer;