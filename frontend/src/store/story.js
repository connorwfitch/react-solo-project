import { csrfFetch } from "./csrf";

// types
const LOAD_ALL = 'story/loadAll';
const ADD_ONE = 'story/addOne';
const SET_DETAIL = 'story/setDetail';
const DELETE_ONE = 'story/deleteOne';

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
  const {title, image, content, userId} = story;

  const formData = new FormData();
  formData.append("title", title);
  formData.append("image", image);
  formData.append("content", content);
  formData.append("userId", userId);

  const response = await csrfFetch('/api/stories', {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
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

export const writeComment = (comment) => async dispatch => {
  const { content, userId, storyId } = comment;
  const response = await csrfFetch(`/api/comments`, {
    method: 'POST',
    body: JSON.stringify({
      content,
      userId,
      storyId,
    }),
  });

  if (response.ok) {
    const output = await response.json();
    dispatch(setDetail(output.story));
  }
}

export const editComment = (comment) => async dispatch => {
  const { content, commentId } = comment;
  const response = await csrfFetch(`/api/comments/${commentId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      content,
    }),
  });

  if (response.ok) {
    const output = await response.json();
    dispatch(setDetail(output.story));
  }
}

export const deleteComment = (commentId) => async dispatch => {
  const response = await csrfFetch(`/api/comments/${commentId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    const output = await response.json();
    dispatch(setDetail(output.story));
  }
}

export const addLike = (like) => async dispatch => {
  const {userId, storyId} = like;
  const response = await csrfFetch(`/api/likes`, {
    method: 'POST',
    body: JSON.stringify({
      userId,
      storyId,
    }),
  });

  if (response.ok) {
    const output = await response.json();
    dispatch(setDetail(output.story));
  }
}

export const deleteLike = (likeId) => async dispatch => {
  const response = await csrfFetch(`/api/likes/${likeId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    const output = await response.json();
    dispatch(setDetail(output.story));
  }
}

// initial state
const initialState = { detail: null };

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